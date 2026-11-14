# Texas property-tax import unit change ledger

## Motivation

The October 21, 2026 historical import reported one modified 2022 normalized record,
but the prior system retained only the count. Its exact previous value is not
recoverable from the current publication. Do not create a retroactive guessed
before-value or attribute the change to an unidentified taxing unit.

## New audit model

The migration 20261021201000_add_tax_import_unit_change_history.sql creates
public.texas_tax_import_changes, with RLS and service-role-only access.
For every future material change it stores the import run ID, taxing-unit ID,
change type (added, removed, modified), the previous complete published row,
and its replacement after canonical database normalization.

The comparison excludes imported_at so routine reimports do not create
false changes; snapshots retain imported_at for recovery investigation.
Changes to names, jurisdictions, component rates, levies or source attribution
are included. The prior and next snapshots are recorded in the same
PostgreSQL transaction as annual source replacement and thus roll back
together if any stage fails.

Join the run ID to texas_tax_import_runs to obtain source fingerprints,
URLs, dates and import result. Raw original source observations remain
in texas_tax_import_source_rows. Never automatically restore an older rate
without reviewing the official source and the applicable tax year.

## Automated historical source archive integrity

The monthly GitHub import now follows the local-supplement identity check
with an additional **read-only** audit of the retained Comptroller source
archive. For every published year from 2021 onward, it verifies the exact
normalized record count and original parsed workbook-row count against the
last completed import, confirms that each retained source row uses that
run's fingerprint, checks all four workbook classes are present and their
counts reconcile, and requires all **254 county** taxing units. Missing
retained years or an archive mismatch fail the job; no rate or calculator
value is changed. This uses the same GitHub runner and Supabase credentials,
with no additional service or recurring workflow.

The archive retains parsed original workbook rows and signatures, **not**
binary XLSX files. The audit flags corruption or partial loss but does not
reconstruct missing sources automatically.
