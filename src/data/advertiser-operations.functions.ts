import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const accessKeySchema = z.string().min(20).max(200);
const agreementIdSchema = z.string().uuid();
const nullableDateSchema = z.string().regex(/^$|^\d{4}-\d{2}-\d{2}$/).transform((value) => value || null);
const nullableTextSchema = (max: number) => z.string().trim().max(max).transform((value) => value || null);
const lineItemSchema = z.string().trim().min(1).max(1000);

export const getAdvertiserOperationsDashboard = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: accessKeySchema }))
  .handler(async ({ data }) => {
    const { loadAdvertiserOperationsDashboard } = await import('@/data/advertiser-operations.server');
    return loadAdvertiserOperationsDashboard(data.accessKey);
  });

export const updateAdvertiserPublisherDecision = createServerFn({ method: 'POST' })
  .inputValidator(z.object({
    accessKey: accessKeySchema,
    agreementId: agreementIdSchema,
    decision: z.enum(['accepted', 'declined', 'void']),
    publisherName: z.string().trim().max(120).transform((value) => value || null),
  }))
  .handler(async ({ data }) => {
    const { setAdvertiserPublisherDecision } = await import('@/data/advertiser-operations.server');
    return setAdvertiserPublisherDecision(data.accessKey, data.agreementId, data.decision, data.publisherName);
  });

export const updateAdvertiserOperations = createServerFn({ method: 'POST' })
  .inputValidator(z.object({
    accessKey: accessKeySchema,
    agreementId: agreementIdSchema,
    paymentStatus: z.enum(['not_started', 'pending', 'paid', 'past_due', 'waived', 'refunded', 'failed']),
    invoiceStatus: z.enum(['not_created', 'draft', 'open', 'paid', 'void', 'uncollectible']),
    campaignStartDate: nullableDateSchema,
    campaignEndDate: nullableDateSchema,
    destinationUrl: nullableTextSchema(1000),
    assets: z.array(lineItemSchema).max(30),
    placementLocations: z.array(lineItemSchema).max(30),
    disclosureStatus: z.enum(['pending', 'approved', 'live', 'not_applicable']),
    internalNotes: nullableTextSchema(5000),
    stripeCustomerId: nullableTextSchema(255),
    stripeInvoiceId: nullableTextSchema(255),
    stripeSubscriptionId: nullableTextSchema(255),
  }))
  .handler(async ({ data }) => {
    const { updateAdvertiserOperationalState } = await import('@/data/advertiser-operations.server');
    return updateAdvertiserOperationalState(data.accessKey, data.agreementId, {
      paymentStatus: data.paymentStatus,
      invoiceStatus: data.invoiceStatus,
      campaignStartDate: data.campaignStartDate,
      campaignEndDate: data.campaignEndDate,
      destinationUrl: data.destinationUrl,
      assets: data.assets,
      placementLocations: data.placementLocations,
      disclosureStatus: data.disclosureStatus,
      internalNotes: data.internalNotes,
      stripeCustomerId: data.stripeCustomerId,
      stripeInvoiceId: data.stripeInvoiceId,
      stripeSubscriptionId: data.stripeSubscriptionId,
    });
  });
