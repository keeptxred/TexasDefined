/**
 * Texas household budget: all values are user-provided planning assumptions.
 * No inferred state/local averages, contact details or server-side persistence.
 */
export const BUDGET_GROUPS = [
  { id: 'income', title: 'Take-home household income', description: 'Enter after-tax cash that actually arrives. Include partner income if relevant.', kind: 'income', fields: [
    { key: 'pay', label: 'Paychecks after deductions', example: 7000 },
    { key: 'extraIncome', label: 'Additional monthly income', example: 0 },
  ] },
  { id: 'housing', title: 'Housing and property', description: 'If your mortgage includes escrowed tax or insurance, do not enter those costs twice.', kind: 'expense', fields: [
    { key: 'housingPayment', label: 'Rent or mortgage payment', example: 2400 },
    { key: 'propertyTax', label: 'Property tax not included in payment', example: 0 },
    { key: 'homeInsurance', label: 'Home / renters insurance not escrowed', example: 0 },
    { key: 'hoa', label: 'HOA, MUD fees or special assessments', example: 0 },
    { key: 'homeMaintenance', label: 'Regular home maintenance', example: 0 },
  ] },
  { id: 'utilities', title: 'Utilities and communication', description: 'Consider summer electricity bills, not just one mild-weather month.', kind: 'expense', fields: [
    { key: 'electricity', label: 'Electricity', example: 230 },
    { key: 'water', label: 'Water, sewer and trash', example: 90 },
    { key: 'gas', label: 'Natural gas or propane', example: 35 },
    { key: 'internet', label: 'Internet', example: 65 },
    { key: 'phones', label: 'Mobile phones', example: 30 },
  ] },
  { id: 'transport', title: 'Transportation', description: 'Include tolls, insurance and fuel, not just the vehicle payment.', kind: 'expense', fields: [
    { key: 'vehiclePayment', label: 'Vehicle payments', example: 500 },
    { key: 'fuel', label: 'Fuel / charging', example: 200 },
    { key: 'autoInsurance', label: 'Auto insurance', example: 160 },
    { key: 'tolls', label: 'Tolls, parking and transit', example: 40 },
    { key: 'transportMaintenance', label: 'Regular vehicle upkeep', example: 0 },
  ] },
  { id: 'food', title: 'Food', description: 'Separate groceries from dining out to make tradeoffs easier to see.', kind: 'expense', fields: [
    { key: 'groceries', label: 'Groceries', example: 700 },
    { key: 'dining', label: 'Restaurants and coffee', example: 200 },
  ] },
  { id: 'family', title: 'Healthcare, family and pets', description: 'Enter insurance premiums here only when they are not already deducted from take-home pay.', kind: 'expense', fields: [
    { key: 'healthInsurance', label: 'Health insurance paid separately', example: 0 },
    { key: 'healthcare', label: 'Copays, medicines and medical care', example: 0 },
    { key: 'childcare', label: 'Childcare or eldercare', example: 0 },
    { key: 'education', label: 'School and education', example: 0 },
    { key: 'pets', label: 'Pet food, care and routine vet visits', example: 0 },
  ] },
  { id: 'debt', title: 'Debt payments', description: 'Exclude mortgage and car payments already entered above.', kind: 'expense', fields: [
    { key: 'creditCards', label: 'Credit-card payments', example: 350 },
    { key: 'studentLoans', label: 'Student loans', example: 250 },
    { key: 'otherDebt', label: 'Other monthly debt payments', example: 0 },
  ] },
  { id: 'lifestyle', title: 'Other recurring costs', description: 'Customize these to your household; avoid leaving predictable costs out.', kind: 'expense', fields: [
    { key: 'subscriptions', label: 'Subscriptions / memberships', example: 0 },
    { key: 'clothing', label: 'Clothing and personal care', example: 0 },
    { key: 'entertainment', label: 'Entertainment', example: 0 },
    { key: 'otherExpenses', label: 'Other recurring costs', example: 0 },
  ] },
  { id: 'annual', title: 'Annual and irregular bills', description: 'Enter the full yearly cost, not a monthly amount. We reserve one-twelfth each month. Do not duplicate costs already entered elsewhere.', kind: 'expense', fields: [
    { key: 'annualRegistration', label: 'Annual vehicle registration / inspection', example: 0, cadence: 'annual' },
    { key: 'annualInsurance', label: 'Annual insurance bills paid separately', example: 0, cadence: 'annual' },
    { key: 'annualPropertyTax', label: 'Property tax bills not included above', example: 0, cadence: 'annual' },
    { key: 'annualRepairs', label: 'Major repairs, deductibles and surprises', example: 0, cadence: 'annual' },
    { key: 'annualTravel', label: 'Travel, gifts and seasonal spending', example: 0, cadence: 'annual' },
  ] },
  { id: 'savings', title: 'Savings allocations', description: 'These are transfers to savings, not money spent on goods or services.', kind: 'savings', fields: [
    { key: 'emergencySavings', label: 'Emergency fund contribution', example: 400 },
    { key: 'retirementSavings', label: 'Retirement invested from take-home pay', example: 300 },
    { key: 'otherSavings', label: 'Other savings goals', example: 0 },
  ] },
] as const;

export type BudgetKey = (typeof BUDGET_GROUPS)[number]['fields'][number]['key'];
export type BudgetState = Record<BudgetKey, number>;
export const BUDGET_STORAGE_KEY = 'texasdefined:budget:v3';
export const MAX_BUDGET_VALUE = 10_000_000;

export function createBudgetDefaults(): BudgetState {
  return Object.fromEntries(BUDGET_GROUPS.flatMap(group => group.fields.map(field => [field.key, field.example]))) as BudgetState;
}

export function normalizeBudgetValue(value: unknown): number {
  const parsed = typeof value === 'number' ? value : typeof value === 'string' && value.trim() !== '' ? Number(value) : 0;
  return Number.isFinite(parsed) ? Math.round(Math.max(0, Math.min(MAX_BUDGET_VALUE, parsed)) * 100) / 100 : 0;
}

export function sanitizeBudget(value: unknown, fallback: BudgetState = createBudgetDefaults()): BudgetState {
  const object = value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
  return Object.fromEntries(BUDGET_GROUPS.flatMap(group => group.fields.map(field => [
    field.key, Object.prototype.hasOwnProperty.call(object, field.key) ? normalizeBudgetValue(object[field.key]) : fallback[field.key],
  ]))) as BudgetState;
}

export function migrateLegacyBudget(value: unknown): BudgetState {
  const previous = value !== null && typeof value === 'object' ? value as Record<string, unknown> : {};
  const defaults = createBudgetDefaults();
  const fields: Record<string, BudgetKey> = {
    income: 'pay', housing: 'housingPayment', transport: 'vehiclePayment', food: 'groceries',
    utilities: 'electricity', debt: 'creditCards', savings: 'emergencySavings', other: 'otherExpenses',
  };
  // Former single-category totals replace rather than add to illustrative subcategory defaults.
  for (const group of BUDGET_GROUPS) for (const field of group.fields) defaults[field.key] = 0;
  for (const [oldKey, nextKey] of Object.entries(fields)) defaults[nextKey] = normalizeBudgetValue(previous[oldKey]);
  return defaults;
}

export function calculateHouseholdBudget(state: BudgetState) {
  const safe = sanitizeBudget(state);
  const groups = BUDGET_GROUPS.map(group => {
    const monthly = group.fields.reduce((total, field) => total + safe[field.key] / ('cadence' in field ? 12 : 1), 0);
    return { id: group.id, title: group.title, kind: group.kind, monthly };
  });
  const income = groups.filter(group => group.kind === 'income').reduce((sum, group) => sum + group.monthly, 0);
  const expenses = groups.filter(group => group.kind === 'expense').reduce((sum, group) => sum + group.monthly, 0);
  const savings = groups.filter(group => group.kind === 'savings').reduce((sum, group) => sum + group.monthly, 0);
  const irregularReserve = groups.find(group => group.id === 'annual')?.monthly ?? 0;
  const allocated = expenses + savings;
  const remaining = income - allocated;
  const percent = (value: number) => income > 0 ? 100 * value / income : 0;
  return {
    income, expenses, savings, irregularReserve, allocated, remaining,
    savingsPercent: percent(savings), spendingPercent: percent(expenses),
    allocationPercent: percent(allocated),
    annualIncome: income * 12, annualExpenses: expenses * 12, annualSavings: savings * 12,
    annualRemaining: remaining * 12, groups,
    largestExpense: groups.filter(group => group.kind === 'expense').sort((a,b) => b.monthly-a.monthly)[0] ?? null,
  };
}

/** Pure export helpers, shared by browser interactions and regression tests. */
export function createBudgetShareQuery(state: BudgetState): string {
  const params = new URLSearchParams();
  // Sanitize and whitelist keys so unrelated data cannot leak into share links.
  params.set('b3', JSON.stringify(sanitizeBudget(state)));
  return params.toString();
}

export function createBudgetCsv(state: BudgetState): string {
  const safe = sanitizeBudget(state);
  const result = calculateHouseholdBudget(safe);
  const rows: string[][] = [['Category', 'Item', 'Entered USD', 'Period', 'Monthly USD']];
  for (const group of BUDGET_GROUPS) {
    for (const field of group.fields) {
      const annual = 'cadence' in field;
      rows.push([group.title, field.label, String(safe[field.key]), annual ? 'annual' : 'monthly', (safe[field.key] / (annual ? 12 : 1)).toFixed(2)]);
    }
  }
  rows.push(['Total', 'Monthly income', '', 'monthly', result.income.toFixed(2)]);
  rows.push(['Total', 'Monthly expenses and bill reserves', '', 'monthly', result.expenses.toFixed(2)]);
  rows.push(['Total', 'Monthly savings allocations', '', 'monthly', result.savings.toFixed(2)]);
  rows.push(['Total', 'Remaining after allocations', '', 'monthly', result.remaining.toFixed(2)]);
  const escapeCsv = (value: string) => `"${value.replace(/"/g, '""')}"`;
  return rows.map(row => row.map(escapeCsv).join(',')).join('\r\n');
}
