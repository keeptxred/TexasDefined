import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  BACKLINK_LINK_ATTRIBUTES,
  BACKLINK_RESPONSE_VALUES,
  BACKLINK_SOURCE_TYPES,
  BACKLINK_STAGES,
  BACKLINK_STATUS_VALUES,
} from "@/data/backlink-command-center";

const accessKeySchema = z.string().min(20).max(200);
const nullableDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable();
const nullableHttpsUrl = z.string().url().refine((value) => value.startsWith("https://"), "HTTPS required").nullable();
const inputSchema = z.object({
  referringDomain: z.string().min(3).max(255),
  linkingUrl: nullableHttpsUrl,
  destinationUrl: z.string().url().refine((value) => value.startsWith("https://texasdefined.com/") || value === "https://texasdefined.com", "Canonical TexasDefined URL required"),
  topicCluster: z.string().min(2).max(120),
  contactOrganization: z.string().min(2).max(200),
  contactName: z.string().max(160).nullable(),
  contactEmail: z.string().email().max(320).nullable(),
  sourceType: z.enum(BACKLINK_SOURCE_TYPES),
  outreachReason: z.string().min(10).max(3000),
  outreachDate: nullableDate,
  lastFollowUpDate: nullableDate,
  responseStatus: z.enum(BACKLINK_RESPONSE_VALUES),
  backlinkStatus: z.enum(BACKLINK_STATUS_VALUES),
  linkAttribute: z.enum(BACKLINK_LINK_ATTRIBUTES),
  anchorText: z.string().max(500).nullable(),
  authorityRelevanceNotes: z.string().max(5000),
  nextAction: z.string().max(2000),
  campaign: z.string().min(2).max(160),
  stage: z.enum(BACKLINK_STAGES),
  dateFirstDiscovered: nullableDate,
  dateLastVerified: nullableDate,
});

export const getBacklinkCommandCenter = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessKey: accessKeySchema }))
  .handler(async ({ data }) => {
    const { loadBacklinkCommandCenter } = await import("@/data/backlink-command-center.server");
    return loadBacklinkCommandCenter(data.accessKey);
  });

export const addBacklinkProspect = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessKey: accessKeySchema, record: inputSchema }))
  .handler(async ({ data }) => {
    const { createBacklinkRecord } = await import("@/data/backlink-command-center.server");
    return createBacklinkRecord(data.accessKey, data.record);
  });

export const saveBacklinkProspect = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessKey: accessKeySchema, id: z.string().uuid(), record: inputSchema }))
  .handler(async ({ data }) => {
    const { updateBacklinkRecord } = await import("@/data/backlink-command-center.server");
    return updateBacklinkRecord(data.accessKey, data.id, data.record);
  });
