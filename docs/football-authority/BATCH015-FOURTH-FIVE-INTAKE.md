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

## Primary-source findings — checked 2026-11-08 UTC (research only)

These first-party pages were retrieved and inspected. The addresses below are **campus addresses**, not independently verified football game venues. No current schedule, opponent, coach, scores, accessibility or image rights are inferred.

| School | First-party campus source | Verified campus address | Distinct football evidence / caution |
| --- | --- | --- | --- |
| Dimmitt | [Dimmitt High School](https://hs.dimmittisd.net/) | 1405 Western Circle, Dimmitt, TX 79027 | [Dimmitt ISD athletics](https://dimmittisd.net/athletics-department) links Bobcats Football; district administration at 608 W Halsell is **not** the campus. Stadium address remains unverified. |
| Donna | [Donna High School](https://donnahigh.donnaisd.net/) | 2301 E. Wood Ave, Donna, TX 78537 | Separate campus from Donna North; football venue and current varsity schedule require official verification. |
| Donna North | [Donna North High School](https://donnanorth.donnaisd.net/) | 7250 N. Val Verde, Donna, TX 78537 | Independent official campus and phone 956-464-4190; do not substitute Donna High's Wood Avenue address or athletics schedule. |
| Dripping Springs | [Dripping Springs High School about](https://www.dsisdtx.us/o/dshs/page/about-dshs/) | 940 Highway 290 West, Dripping Springs, TX 78620 | [District high-school athletics](https://www.dsisdtx.us/page/highschool-athletics) explicitly lists football and its athletics field-house address at 940 Hwy 290 West; stadium entrance, fixtures and parking remain unverified. |
| Dublin | [Dublin Secondary](https://secondary.dublinisd.us/) | 2233 East State Hwy 6, Dublin, TX 76446 | Official school calendar lists varsity district football events; “@ DHS” does not establish a street address for the field. The [syllabi page](https://secondary.dublinisd.us/syllabi/high-school) explicitly warns it contains incorrect information and must not be used for facts. |

**Still required before implementation:** authoritative county/TEA/UIL source verification; exact varsity program/season-specific athletics and official game venue where claimed. This is not SSR implementation, protected merge, release attestation or Chrome certification.
