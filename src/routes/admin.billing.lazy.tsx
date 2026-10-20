import {createLazyFileRoute} from '@tanstack/react-router';
import {FormEvent,useMemo,useState} from 'react';
import {Container} from '@/components/layout/Container';
import {
  createTexasDefinedManualInvoice,
  getTexasDefinedBillingDashboard,
  sendTexasDefinedBillingInvoice,
} from '@/data/texasdefined-billing-admin.functions';
import {prepareAdvertiserInvoice} from '@/data/advertiser-billing.functions';

export const Route=createLazyFileRoute('/admin/billing')({component:BillingAdmin});

type Dashboard=Awaited<ReturnType<typeof getTexasDefinedBillingDashboard>>;
const money=(cents:number,currency='usd')=>new Intl.NumberFormat('en-US',{
  style:'currency',currency:currency.toUpperCase()
}).format((Number(cents)||0)/100);
const when=(value:string|null|undefined)=>value?new Date(value).toLocaleString('en-US',{dateStyle:'medium',timeStyle:'short'}):'—';

function BillingAdmin(){
  const [key,setKey]=useState('');
  const [dashboard,setDashboard]=useState<Dashboard|null>(null);
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState('');
  const [selectedAccount,setSelectedAccount]=useState('');
  const [selectedAgreement,setSelectedAgreement]=useState('');
  const [requestId,setRequestId]=useState(()=>crypto.randomUUID());

  async function reload(){
    const next=await getTexasDefinedBillingDashboard({data:{accessKey:key}});
    setDashboard(next);
    if(!selectedAccount&&next.accounts[0]?.id)setSelectedAccount(String(next.accounts[0].id));
  }
  async function unlock(event:FormEvent){
    event.preventDefault();setBusy(true);setMessage('');
    try{await reload()}catch(e){setMessage(e instanceof Error?e.message:'Billing admin access denied.')}
    finally{setBusy(false)}
  }
  async function prepareAdvertisingInvoice(event:FormEvent<HTMLFormElement>){
    event.preventDefault();if(!selectedAgreement)return;
    setBusy(true);setMessage('');
    const form=new FormData(event.currentTarget);
    try{
      const result=await prepareAdvertiserInvoice({data:{
        accessKey:key,
        agreementId:selectedAgreement,
        billingAccountId:String(form.get('billingAccountId')||'')||null,
        daysUntilDue:Number(form.get('daysUntilDue')||15),
        acceptedBy:String(form.get('acceptedBy')||'TexasDefined billing admin'),
      }});
      setMessage('Draft advertiser invoice '+result.stripeInvoiceId+' prepared. It has not been sent.');
      await reload();
    }catch(e){setMessage(e instanceof Error?e.message:'Advertiser invoice could not be prepared.')}
    finally{setBusy(false)}
  }
  async function createManual(event:FormEvent<HTMLFormElement>){
    event.preventDefault();if(!selectedAccount)return;
    setBusy(true);setMessage('');
    const form=new FormData(event.currentTarget);
    const dollars=Number(form.get('unitAmountDollars')||0);
    try{
      const result=await createTexasDefinedManualInvoice({data:{
        accessKey:key,
        billingAccountId:selectedAccount,
        requestId,
        productFamily:String(form.get('productFamily')) as 'network'|'advertising'|'other',
        description:String(form.get('description')||''),
        quantity:Number(form.get('quantity')||1),
        unitAmountCents:Math.round(dollars*100),
        daysUntilDue:Number(form.get('daysUntilDue')||15),
        memo:String(form.get('memo')||''),
      }});
      setMessage('Draft invoice '+result.stripeInvoiceId+' prepared. It has not been sent.');
      setRequestId(crypto.randomUUID());
      await reload();
    }catch(e){setMessage(e instanceof Error?e.message:'Manual invoice could not be prepared.')}
    finally{setBusy(false)}
  }
  async function sendInvoice(id:string){
    setBusy(true);setMessage('');
    try{
      const result=await sendTexasDefinedBillingInvoice({data:{accessKey:key,localInvoiceId:id}});
      setMessage(result.hostedInvoiceUrl
        ?'Invoice sent. Hosted Invoice Page: '+result.hostedInvoiceUrl
        :'Invoice sent.');
      await reload();
    }catch(e){setMessage(e instanceof Error?e.message:'Invoice could not be sent.')}
    finally{setBusy(false)}
  }

  const accountById=useMemo(()=>new Map((dashboard?.accounts||[]).map((a:any)=>[String(a.id),a])),[dashboard]);
  const itemsByInvoice=useMemo(()=>{
    const map=new Map<string,any[]>();
    for(const item of dashboard?.invoiceItems||[]){
      const id=String((item as any).invoice_id);
      map.set(id,[...(map.get(id)||[]),item]);
    }
    return map;
  },[dashboard]);
  const pendingAds=(dashboard?.advertiserAgreements||[]).filter((a:any)=>
    ['pending_publisher_acceptance','accepted'].includes(String(a.status))
    && typeof a.published_price_cents==='number'
    && !a.stripe_invoice_id
  );
  const totalOpen=(dashboard?.invoices||[]).filter((i:any)=>i.status==='open')
    .reduce((sum:number,i:any)=>sum+Number(i.amount_remaining_cents||0),0);
  const totalPaid=(dashboard?.invoices||[]).filter((i:any)=>i.status==='paid')
    .reduce((sum:number,i:any)=>sum+Number(i.amount_paid_cents||0),0);
  const activeNetwork=(dashboard?.networkMemberships||[]).filter((m:any)=>m.paid_entitlement_active).length;

  return <Container className="py-12">
    <p className="eyebrow text-primary">TexasDefined operations</p>
    <h1 className="mt-2 font-display text-4xl">Billing & invoices</h1>
    <p className="mt-3 max-w-3xl text-muted-foreground">One business billing identity and one Stripe customer across Business Network memberships and Advertising. Product entitlements remain separate even when purchases share the same customer and invoice history.</p>

    {!dashboard?<form onSubmit={unlock} className="mt-8 flex flex-wrap items-end gap-3">
      <label className="grid gap-2 text-sm font-semibold">Dedicated admin key
        <input type="password" minLength={32} maxLength={200} value={key} onChange={e=>setKey(e.target.value)}
          className="min-h-11 border border-border bg-background px-3 py-2" required/>
      </label>
      <button disabled={busy} className="min-h-11 bg-primary px-5 py-2 font-semibold text-primary-foreground disabled:opacity-50">{busy?'Checking…':'Unlock billing'}</button>
    </form>:<>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Billing customers" value={dashboard.accounts.length}/>
        <Metric label="Active Network memberships" value={activeNetwork}/>
        <Metric label="Open invoice balance" value={money(totalOpen)}/>
        <Metric label="Recorded paid invoices" value={money(totalPaid)}/>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <span className={dashboard.invoicingEnabled?'text-primary':'text-muted-foreground'}>Draft invoice creation: <strong>{dashboard.invoicingEnabled?'enabled':'disabled'}</strong></span>
        <span className={dashboard.invoiceSendingEnabled?'text-primary':'text-muted-foreground'}>Invoice sending: <strong>{dashboard.invoiceSendingEnabled?'enabled':'disabled'}</strong></span>
        <button type="button" onClick={()=>void reload()} disabled={busy} className="border border-border px-3 py-1.5 font-semibold disabled:opacity-50">Refresh</button>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-3xl">Customers</h2>
        <p className="mt-2 text-sm text-muted-foreground">A business may have Network and Advertising purchases under the same billing account. Matching is never based on email alone.</p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead><tr className="border-b border-border">
              <Th>Business</Th><Th>Billing</Th><Th>Stripe customer</Th><Th>Network</Th><Th>Advertising</Th>
            </tr></thead>
            <tbody>{dashboard.accounts.map((a:any)=>{
              const networks=dashboard.networkMemberships.filter((m:any)=>m.billing_account_id===a.id);
              const ads=dashboard.advertiserAgreements.filter((ad:any)=>ad.billing_account_id===a.id);
              return <tr key={a.id} className="border-b border-border align-top">
                <Td><strong>{a.display_name}</strong><div className="text-xs text-muted-foreground">{a.website||'No website'} · source {a.source}</div></Td>
                <Td>{a.billing_email}</Td>
                <Td><code className="text-xs">{a.stripe_customer_id||'Not created yet'}</code></Td>
                <Td>{networks.length?networks.map((m:any)=><div key={m.id}>{m.plan} · {m.status} · {m.paid_entitlement_active?'paid entitlement':'no paid entitlement'}</div>):'—'}</Td>
                <Td>{ads.length?ads.map((ad:any)=><div key={ad.id}>{ad.tier}/{ad.billing_cycle} · {ad.payment_status}</div>):'—'}</Td>
              </tr>;
            })}</tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-3xl">Invoices</h2>
        <p className="mt-2 text-sm text-muted-foreground">Standalone advertising/manual invoices are reconciled here. Recurring Network subscription invoices remain part of the same Stripe customer history.</p>
        <div className="mt-5 space-y-4">{dashboard.invoices.length?dashboard.invoices.map((invoice:any)=>{
          const account=accountById.get(String(invoice.billing_account_id)) as any;
          const lines=itemsByInvoice.get(String(invoice.id))||[];
          return <article key={invoice.id} className="border border-border bg-background p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><h3 className="font-display text-xl">{account?.display_name||'Billing customer'}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{invoice.stripe_invoice_id||'Local draft'} · created {when(invoice.created_at)}</p>
              </div>
              <div className="text-right"><strong>{money(invoice.amount_due_cents,invoice.currency)}</strong><div className="text-xs uppercase tracking-wide text-muted-foreground">{invoice.status}</div></div>
            </div>
            <div className="mt-4 space-y-2">{lines.map((line:any)=><div key={line.id} className="flex justify-between gap-4 border-t border-border pt-2 text-sm">
              <span>{line.description}<span className="ml-2 text-xs text-muted-foreground">{line.product_family} · {line.source_type}</span></span>
              <span>{line.quantity} × {money(line.unit_amount_cents,invoice.currency)}</span>
            </div>)}</div>
            {invoice.status==='draft'?<button type="button" disabled={busy||!dashboard.invoiceSendingEnabled} onClick={()=>void sendInvoice(String(invoice.id))}
              className="mt-4 border border-primary px-4 py-2 text-sm font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-40">
              {dashboard.invoiceSendingEnabled?'Finalize & send invoice':'Sending disabled until launch verification'}
            </button>:null}
          </article>;
        }):<p className="text-sm text-muted-foreground">No invoices have been created.</p>}</div>
      </section>

      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-display text-3xl">Prepare advertiser invoice</h2>
        <p className="mt-2 text-sm text-muted-foreground">Signed advertising orders require publisher acceptance. Choose an existing billing customer when the advertiser is already a TexasDefined customer; otherwise leave the customer field blank and the exact verified-match rules will reuse or create one safely.</p>
        <form onSubmit={prepareAdvertisingInvoice} className="mt-5 grid max-w-3xl gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold md:col-span-2">Signed agreement
            <select value={selectedAgreement} onChange={e=>setSelectedAgreement(e.target.value)} required className="min-h-11 border border-border bg-background px-3 py-2 font-normal">
              <option value="">Choose signed advertiser agreement</option>
              {pendingAds.map((a:any)=><option key={a.id} value={a.id}>{a.business_name} · {a.tier}/{a.billing_cycle} · {money(a.published_price_cents)}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold md:col-span-2">Existing billing customer (optional)
            <select name="billingAccountId" defaultValue="" className="min-h-11 border border-border bg-background px-3 py-2 font-normal">
              <option value="">Use verified exact match or create a new billing account</option>
              {dashboard.accounts.map((a:any)=><option key={a.id} value={a.id}>{a.display_name} · {a.billing_email}{a.stripe_customer_id?' · Stripe customer':''}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">Due in days
            <input name="daysUntilDue" type="number" min="0" max="90" defaultValue="15" className="min-h-11 border border-border bg-background px-3 py-2 font-normal"/>
          </label>
          <label className="grid gap-2 text-sm font-semibold">Publisher acceptance label
            <input name="acceptedBy" defaultValue="TexasDefined billing admin" minLength={2} maxLength={180} className="min-h-11 border border-border bg-background px-3 py-2 font-normal"/>
          </label>
          <button disabled={busy||!dashboard.invoicingEnabled||!selectedAgreement} className="min-h-11 justify-self-start bg-primary px-5 py-2 font-semibold text-primary-foreground disabled:opacity-40">Accept & prepare draft invoice</button>
        </form>
      </section>

      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-display text-3xl">Manual invoice</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">For a separately approved charge that does not already have its own automated order flow. A manual Network line is accounting only and never grants or changes membership entitlement.</p>
        <form onSubmit={createManual} className="mt-5 grid max-w-3xl gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold md:col-span-2">Customer
            <select value={selectedAccount} onChange={e=>setSelectedAccount(e.target.value)} required className="min-h-11 border border-border bg-background px-3 py-2 font-normal">
              <option value="">Choose billing customer</option>
              {dashboard.accounts.map((a:any)=><option key={a.id} value={a.id}>{a.display_name} · {a.billing_email}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">Product family
            <select name="productFamily" defaultValue="other" className="min-h-11 border border-border bg-background px-3 py-2 font-normal">
              <option value="network">Business Network</option><option value="advertising">Advertising</option><option value="other">Other</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">Description
            <input name="description" minLength={2} maxLength={500} required className="min-h-11 border border-border bg-background px-3 py-2 font-normal"/>
          </label>
          <label className="grid gap-2 text-sm font-semibold">Unit amount (USD)
            <input name="unitAmountDollars" type="number" step="0.01" min="0.01" max="1000000" required className="min-h-11 border border-border bg-background px-3 py-2 font-normal"/>
          </label>
          <label className="grid gap-2 text-sm font-semibold">Quantity
            <input name="quantity" type="number" min="1" max="1000" defaultValue="1" required className="min-h-11 border border-border bg-background px-3 py-2 font-normal"/>
          </label>
          <label className="grid gap-2 text-sm font-semibold">Due in days
            <input name="daysUntilDue" type="number" min="0" max="90" defaultValue="15" className="min-h-11 border border-border bg-background px-3 py-2 font-normal"/>
          </label>
          <label className="grid gap-2 text-sm font-semibold md:col-span-2">Memo
            <textarea name="memo" maxLength={2000} rows={3} className="border border-border bg-background px-3 py-2 font-normal"/>
          </label>
          <button disabled={busy||!dashboard.invoicingEnabled||!selectedAccount} className="min-h-11 justify-self-start border border-primary bg-primary px-5 py-2 font-semibold text-primary-foreground disabled:opacity-40">Prepare draft invoice</button>
        </form>
      </section>
    </>}
    {message?<p role="status" className="mt-6 border border-border bg-muted/30 p-4 text-sm">{message}</p>:null}
  </Container>;
}

function Metric({label,value}:{label:string;value:string|number}){
  return <article className="border-t border-border pt-3"><strong className="font-display text-3xl">{value}</strong><span className="mt-1 block text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</span></article>;
}
function Th({children}:{children:React.ReactNode}){return <th className="px-3 py-3 text-xs uppercase tracking-wide text-muted-foreground">{children}</th>}
function Td({children}:{children:React.ReactNode}){return <td className="px-3 py-4">{children}</td>}
