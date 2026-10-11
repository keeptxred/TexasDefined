import {createServerFn} from '@tanstack/react-start';
import {z} from 'zod';

const accessKey=z.string().min(32).max(200);

export const getTexasDefinedBillingDashboard=createServerFn({method:'POST'})
 .inputValidator(z.object({accessKey}))
 .handler(async({data})=>{
   const {loadTexasDefinedBillingDashboard}=await import('@/data/texasdefined-billing-admin.server');
   return loadTexasDefinedBillingDashboard(data.accessKey);
 });

export const createTexasDefinedManualInvoice=createServerFn({method:'POST'})
 .inputValidator(z.object({
   accessKey,
   billingAccountId:z.string().uuid(),
   requestId:z.string().uuid(),
   productFamily:z.enum(['network','advertising','other']),
   description:z.string().trim().min(2).max(500),
   quantity:z.number().int().min(1).max(1000).default(1),
   unitAmountCents:z.number().int().min(1).max(100000000),
   daysUntilDue:z.number().int().min(0).max(90).default(15),
   memo:z.string().trim().max(2000).optional().default(''),
 }))
 .handler(async({data})=>{
   const {createAdminManualDraftInvoice}=await import('@/data/texasdefined-billing-admin.server');
   return createAdminManualDraftInvoice(data.accessKey,data);
 });

export const sendTexasDefinedBillingInvoice=createServerFn({method:'POST'})
 .inputValidator(z.object({accessKey,localInvoiceId:z.string().uuid()}))
 .handler(async({data})=>{
   const {sendAdminBillingInvoice}=await import('@/data/texasdefined-billing-admin.server');
   return sendAdminBillingInvoice(data.accessKey,data.localInvoiceId);
 });
