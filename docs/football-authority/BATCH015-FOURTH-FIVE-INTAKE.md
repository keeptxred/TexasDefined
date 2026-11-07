# Batch015 fourth-five — source verification intake (not implementation or certification)

Canonical roster positions 16–20, preserved in order:

| Position | School slug | Primary source to verify | Required campus/football checks |
| --- | --- | --- | --- |
| 16 | `dimmitt` | Dimmitt ISD official district and high-school pages; UIL directory | Dimmitt High School physical campus vs district administrative address; Castro County; current varsity football participation and game venue |
| 17 | `donna` | Donna ISD official Donna High School and athletics pages; TEA directory | Donna High versus Donna North distinct campuses; Hidalgo County; verify school-specific fixtures |
| 18 | `donna-north` | Donna ISD official Donna North High School and athletics pages; TEA directory | Donna North is not Donna High; unique address, campus, schedules and venue |
| 19 | `dripping-springs` | Dripping Springs ISD official high-school and athletics pages; UIL | Hays County, school campus vs football stadium and current game-specific entrance |
| 20 | `dublin` | Dublin ISD official high-school and athletics pages; TEA | Erath County; distinct campus and current football source; avoid confusing Dublin Texas with Dublin elsewhere |

## Evidence gate before implementing

This file is a task roster, **not evidence that the five primary pages were fetched or that any current game/coach/venue claim is verified**. Before writing any of these five SSR guides, inspect the current official campus source, record a valid direct source URL, campus street address, county evidence and dated athletics source. Where first-party verification is unavailable, label the unknown and do not invent it. Do not conflate Donna and Donna North.

Implementation must extend the Batch015 SSR loader with a **single defined allowlist variable referenced consistently in its guard**, preserve all existing 15 guides and 330 historical VERIFIED records, and add required source-contract regression checks and verified reciprocal county links. Run the protected Merge Gate and built-Worker smoke; fix failures rather than bypassing tests. Production certification remains separate and requires signed exact SHA/Worker attestation and non-skipped Chrome 1366/390/320 for all 25 schools and county links.
