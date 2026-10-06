#!/usr/bin/env bash
set -euo pipefail
node scripts/enable-loops-spurs-faq-schema.mjs
node scripts/verify-loops-spurs-faq-schema.mjs
