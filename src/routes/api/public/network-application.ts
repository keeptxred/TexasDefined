import { createFileRoute } from "@tanstack/react-router";

function response(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

export const Route = createFileRoute("/api/public/network-application")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (Number(request.headers.get("content-length") || 0) > 16000000) {
          return response({ error: "Application too large" }, 413);
        }
        const url = new URL(request.url);
        const origin = request.headers.get("origin");
        if (origin && origin !== url.origin) return response({ error: "Invalid origin" }, 403);
        let form: FormData;
        try { form = await request.formData(); } catch { return response({ error: "Invalid form" }, 400); }
        const raw = form.get("application");
        if (typeof raw !== "string" || raw.length > 20000) return response({ error: "Invalid application" }, 400);
        let data: Record<string, unknown>;
        try { data = JSON.parse(raw); } catch { return response({ error: "Invalid application" }, 400); }
        const string = (field: string, limit = 200) =>
          typeof data[field] === "string" ? String(data[field]).trim().slice(0, limit) : "";
        const email = string("email", 254);
        if (!string("businessName") || !string("category") || !string("city") ||
            !email.includes("@") || data.authorized !== true)
          return response({ error: "Please complete required fields and authorization." }, 422);
        const plan = data.plan === "plus" ? "plus" : "basic";
        const media = [form.get("logo"), ...form.getAll("gallery")]
          .filter((value): value is File => value instanceof File && value.size > 0);
        if (media.length > 5 || media.some(file =>
          file.size > 3000000 || !["image/jpeg", "image/png", "image/webp"].includes(file.type)))
          return response({ error: "Unsupported image size or format" }, 422);
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const id = crypto.randomUUID();
          const paths: string[] = [];
          for (let index = 0; index < media.length; index++) {
            const file = media[index];
            const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
            const path = id + "/photo-" + index + "." + extension;
            const { error } = await supabaseAdmin.storage.from("texasdefined-network-submissions")
              .upload(path, new Uint8Array(await file.arrayBuffer()), { contentType: file.type });
            if (error) throw new Error("Media upload failed");
            paths.push(path);
          }
          const record = {
            id, plan, status: "pending_review",
            business_name: string("businessName", 160),
            category: string("category"), city: string("city"),
            description: string("description", 2000), contact_email: email,
            address: string("address") || null, phone: string("phone") || null,
            hours: string("hours") || null,
            website: plan === "plus" ? string("website") || null : null,
            social: plan === "plus" ? string("social") || null : null,
            services: plan === "plus" ? string("services", 2000) || null : null,
            faq: plan === "plus" ? string("faq", 2000) || null : null,
            offer: plan === "plus" ? string("offer") || null : null,
            logo_storage_path: paths[0] || null,
            gallery_storage_paths: plan === "plus" ? paths.slice(1) : [],
            paid_entitlement_active: false,
          };
          const { error } = await supabaseAdmin.from("texasdefined_network_applications").insert(record as never);
          if (error) throw new Error(error.code);
          return response({ ok: true, applicationId: id, reviewStatus: "pending_review" }, 201);
        } catch {
          return response({ error: "Submission could not be saved." }, 503);
        }
      },
    },
  },
});
