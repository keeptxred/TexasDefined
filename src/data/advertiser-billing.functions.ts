import {createServerFn} from '@tanstack/react-start';
import {z} from 'zod';

const accessKey=z.string().min(32).max(200);

export const getAdvertiserBillingAccounts=createServerFn({method:'POST'})
 .inputValidator(z.object({accessKey}))
 .handler(async({data})=>{
   const {listAdvertiserBillingAccounts}=await import('@/data/advertiser-billing.server');
   return listAdvertiserBillingAccounts(data.accessKey);
 });

export const prepareAdvertiserInvoice=createServerFn({method:'POST'})
 .inputValidator(z.object({
   accessKey,
   agreementId:z.string().uuid(),
   billingAccountId:z.string().uuid().nullable().optional(),
   daysUntilDue:z.number().int().min(0).max(90).default(15),
   acceptedBy:z.string().trim().min(2).max(180).default('TexasDefined advertiser admin'),
 }))
 .handler(async({data})=>{
   const {prepareAdvertiserDraftInvoice}=await import('@/data/advertiser-billing.server');
   return prepareAdvertiserDraftInvoice(data.accessKey,data);
 });
