# TexasDefined calculator platform

TexasDefined calculators are one decision platform, not a collection of unrelated forms.

## Architecture

Financial formulas live in `src/lib/financial/` as pure functions. React components collect inputs, display results and orchestrate official data helpers; they do not own core financial formulas. When two calculators use the same concept (for example fixed-rate mortgage principal and interest), they must call the same engine.

The existing property-tax framework remains the shared UI foundation. Mainstream financial calculators now inherit the same persistence actions: save, restore, share by URL, print and reset.

## Required calculator quality gate

A production calculator should provide, where relevant:

- responsive inputs and results down to narrow mobile widths
- semantic labels, keyboard operation and live result announcements
- bounded numeric inputs plus engine-level validation for cross-field rules
- a pure calculation engine with deterministic golden tests
- cross-calculator consistency tests for shared formulas
- save, restore, share, print and reset
- a detailed numeric breakdown and an accessible visual breakdown when categories matter
- basic/advanced disclosure when the complete model has many inputs
- methodology, assumptions and limitations
- official-source attribution and data year when TexasDefined supplies an authoritative value
- editable user-entered assumptions rather than unsupported local averages
- scenario comparison for high-value decision calculators
- state handoff to the next calculator when the same household/property inputs apply
- existing WebApplication/FAQ/breadcrumb/canonical governance and crawlable local-page architecture

## Source-of-truth rules

Official Texas data and user-entered assumptions must remain distinguishable. Loading a finalized taxing-unit rate does not prove parcel membership, taxable value or exemption treatment. Insurance, utilities, maintenance, appreciation, closing costs and similar values must not be described as local averages unless a governed source actually supports that claim.

## Testing

`npm run calculators:validate` runs deterministic calculator math and architecture checks. The canonical pre-merge runner also executes this gate. Any intentional change to shared financial math must update the corresponding golden expectation and should explain why the calculation changed.

## Flagship mortgage standard

The mortgage calculator supports basic financing inputs, advanced taxes/insurance/PMI/HOA/special-district/ownership inputs, official Texas tax-rate assistance, amortization, lifetime interest, sensitivity checks, visual and tabular payment breakdowns, three-scenario comparison, persistence/share/print/reset, and handoff into homeownership and rent-versus-buy tools.

The same fixed-rate principal-and-interest engine is consumed by rent-versus-buy and refinance calculations so identical loan assumptions cannot silently produce different payment math.
