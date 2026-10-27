/**
 * Provider report aggregation contract — pure functions, no credentials.
 * Do not turn nullable monetary fields into "$0", and never claim settlement.
 */
export function reportedCount(value,field){
  if(value===null||value===undefined||value==='')return null;
  const string=String(value);
  if(!/^\d+$/.test(string))throw new Error('Invalid nonnegative provider count: '+field);
  const number=Number(string);
  if(!Number.isSafeInteger(number))throw new Error('Provider count overflows integer: '+field);
  return number;
}
export function reportedDecimal(value,field){
  if(value===null||value===undefined||value==='')return null;
  // Impact can serialize zero as 0E-18. Accept exponent format within bounds.
  const string=String(value);
  if(!/^(?:0|[0-9]+)(?:\.[0-9]+)?(?:[eE][+-]?\d{1,2})?$/.test(string))
    throw new Error('Invalid nonnegative provider amount: '+field);
  const amount=Number(string);
  if(!Number.isFinite(amount)||amount<0||amount>999999999999999)
    throw new Error('Provider amount out of bounds: '+field);
  return Math.round(amount*10000)/10000;
}
export function normalizeDailyImpactRows(records,day,{currencyCode=null}={}){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(day))throw new Error('Invalid Texas report date.');
  if(!Array.isArray(records)||records.length>2)throw new Error('Unexpected Impact daily report row count.');
  if(records.length===0)return null; // No row is not a confirmed zero.
  if(records.length!==1)throw new Error('Impact daily report needs explicit grouping verification.');
  const row=records[0];
  if(!row||typeof row!=='object'||Array.isArray(row))throw new Error('Invalid Impact daily record.');
  const date=String(row.sort_date||'').slice(0,10);
  if(date!==day)throw new Error('Impact record date does not match requested completed day.');
  const verifiedCurrency=currencyCode!==null&&/^[A-Z]{3}$/.test(currencyCode)?currencyCode:null;
  const result={
    metric_date:date,
    source_report_id:'partner_performance_by_day',
    reported_clicks:reportedCount(row.Clicks,'Clicks'),
    reported_impressions:reportedCount(row.Impressions,'Impressions'),
    reported_actions:reportedCount(row.Actions,'Actions'),
    reported_sales:reportedCount(row.Sales,'Sales'),
    // Monetary values suppressed until account's currency is verified.
    reported_total_cost:verifiedCurrency?reportedDecimal(row.Total_Cost,'Total_Cost'):null,
    reported_action_cost:verifiedCurrency?reportedDecimal(row.Action_Cost,'Action_Cost'):null,
    currency_code:verifiedCurrency,
    data_status:'provider_reported_not_settled',
  };
  if(Object.values(result).filter(x=>typeof x==='number').length===0)
    throw new Error('Impact daily report returned no recognized numerical metrics.');
  return result;
}
