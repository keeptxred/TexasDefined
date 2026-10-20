import "../network.css";
import {createLazyFileRoute} from "@tanstack/react-router";
import {Container} from "@/components/layout/Container";
import {
  NETWORK_TERMS_EFFECTIVE_DATE,
  NETWORK_TERMS_SECTIONS,
  NETWORK_TERMS_VERSION,
} from "@/data/network-terms";

export const Route=createLazyFileRoute("/network/terms")({component:NetworkTermsPage});

function NetworkTermsPage(){
  return <div className="bg-[#f9f6ef]">
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow text-primary">Texas Defined Network</p>
        <h1 className="mt-3 font-display text-5xl leading-none sm:text-6xl">Business Network Membership Terms</h1>
        <p className="mt-5 text-sm text-muted-foreground">Version {NETWORK_TERMS_VERSION} · Effective {NETWORK_TERMS_EFFECTIVE_DATE}</p>
        <div className="mt-8 border-y border-border bg-white p-6 text-sm leading-7 text-foreground">
          <p><strong>Important customer responsibilities:</strong> TexasDefined does not fact-check customer-supplied listing content. You are responsible for the accuracy of your facts and claims and for having all rights, licenses, permissions, and releases required for every image, logo, trademark, and other material you submit.</p>
          <p className="mt-3">If your listing is published, your business information and images may be publicly accessible and may appear in Google, Bing, other search engines, AI/answer systems, social networks, archives, and other third-party discovery services. TexasDefined cannot control third-party indexing, caching, ranking, or removal.</p>
        </div>
        <div className="mt-10 space-y-8">
          {NETWORK_TERMS_SECTIONS.map(([heading,body])=><section key={heading} className="border-t border-border pt-6">
            <h2 className="font-display text-2xl">{heading}</h2>
            <p className="mt-3 leading-8 text-muted-foreground">{body}</p>
          </section>)}
        </div>
        <div className="mt-10 border-t border-border pt-6 text-sm leading-7 text-muted-foreground">
          <p>See also the <a href="/privacy" className="font-semibold text-primary underline">Privacy Policy</a>. For questions, corrections, takedowns, or billing assistance, email <a href="mailto:admin@texasdefined.com" className="font-semibold text-primary underline">admin@texasdefined.com</a>.</p>
        </div>
      </div>
    </Container>
  </div>;
}
