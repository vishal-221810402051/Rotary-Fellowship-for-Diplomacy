# Content, asset inventory and missing-content register

**18 October 2026.** At the Phase 0 source audit the workspace contained documentation/evidence only; two questionnaires exist outside it at registered paths. Phase 1 has since added code and typed missing-content slots, not a client asset package. No supplied association logo, photography, team data, event documents, approved legal text or factual translation files were found in the inspected working tree/parent `website` folder. Draft interface dictionaries are now implemented separately from approved client translations. Other locations/accounts were not exhaustively searched. MEDIS files remain outside scope.

Every missing fact remains a release dependency. The questionnaire's wording can inform draft copy; it does not approve invented factual detail or rights. Source availability and publication approval are separate statuses.

| ID | Item / source | Actually available | Missing / required delivery | Gate / owner |
| --- | --- | --- | --- | --- |
| C-01 | Logo, charter, permitted use of Rotary-associated branding (p.2, p.6) | Blue/yellow direction; promise Alix will send logo. | Actual vector/high-resolution mark, variants, colour/font specification and permission/brand-use confirmation; no verification from reference assets. | Foundation final branding and release; client/Alix. |
| C-02 | Mission, association introduction, welcome (pp.2–3) | Mission themes and French welcome sentence in Data A. | Approved publishable FR/EN copy and factual approval; no founding date/legal status supplied. Home previews link internally under D-010; optional external contact action follows D-015. | Development content input; approval required for core content completion/release. |
| C-03 | Homepage/event photography (p.6) | Availability claim only. | Delivered files, owner/photographer rights, publication consent as applicable, credits, alt/caption context, event associations and crops. | Phase 2 and release; client/media owner. |
| C-04 | Photo albums (pp.4–6) | Gallery requirement; organised-event restriction. | Selected albums/photos, sequence, descriptions, stable event grouping and rights; no open submissions. | Photos essential cannot complete without this; client/media owner. |
| C-05 | Team (pp.3,6,8) | Team essential; photos claimed available. | Approved names, roles, biographies, portraits, order, publication permissions and translations. | Team essential; client/team approver. |
| C-06 | Past events (pp.4–5) | Two candidate names with Paris/2026: Forum sur la paix Paris 2026; Forum sur la jeunesse et diplomatie Paris 2026. | Confirmation of ownership/past status/titles, approved descriptions/diplomatic dimension, precise dates/venue only if provided, verified speaker/partner details only if intended for publication; count interpretation. | Content input for approved past-events area; client event owner, not an unresolved page-scope question. |
| C-07 | Event programmes / other PDFs (pp.4–5) | Document types requested, no event PDFs delivered. | Actual public-release PDFs, rights, final filenames/version, access classification and approved FR/EN equivalents. No fabricated schedule or PDF translation. | Optional contextual controls omitted until delivered; no planning blocker. |
| C-08 | Videos, podcasts, editorial reports/articles (pp.3–4,6) | Selected formats; availability claim. | Later files/approved embeds, captions/transcripts, rights and translations. | Outside five-area Part A boundary D-009. |
| C-09 | Public contacts/social links/project contacts (pp.2,5–7) | Preferred channels named; actual destinations promised later. | For Part A, only an owner-supplied public email and publication approval. Other contact/social facts remain broader inputs, not substitute actions. Never derive addresses from reference or GitHub owner. | D-015 resolves Q-03: omit action while address missing; no contact page/form; not automatically a release blocker. |
| C-10 | Legal entity details, notices/privacy and data rules (pp.3,6–7) | Checklist/promise to send on WhatsApp; no actual legal text or status. | Approved legal identity/publisher/controller information, bilingual legal/privacy wording aligned with actual hosting/media; broader data rules if collection is later approved. | D-017: routes/layout can be developed; supplied final approved text is required before release, not before planning closure. |
| C-11 | FR/EN translations (pp.3,6) | Full bilingual requirement; availability claimed. | Approved paired content/UI terms, metadata, captions/alt, applicable PDFs; named approver and sign-off. Draft engineering translations clearly labelled. | Development input and release approval; locale/default policy already resolved D-011. |
| C-12 | Confirmed partners/sponsors (pp.3,5–6) | Explicitly later; no actual list. | Later approved names, relationship descriptions, logos/rights. | Deferred; no invented endorsements. |
| C-13 | Domain/hosting/email and release ownership (p.7) | No existing providers per Data A; Vercel specified by user. | Owner-controlled domain/DNS, eventual production origin, Vercel project/access, handover owner, backup destination/restore process. No email provider required for no-form A. | Phase 4; no deployment now. |

## Dependency classification at Phase 0 closure

[Owner decisions D-013/D-015/D-017/D-019](owner-decisions.md) permit planning and development with recorded missing inputs. **None of C-01–C-13 automatically blocks Phase 0 planning.** The earlier Q references in the inventory identify their original questions; scope disposition is now recorded in [decisions and gaps](decisions-and-gaps.md).

| Class | Items | Consequence |
| --- | --- | --- |
| Reference evidence gap | B-01: no rendered desktop/mobile/menu evidence. | Owner-authorized capture-request fallback permits planning closure; final layout proportions/menu/fidelity acceptance remain dependent on evidence. |
| Content that may arrive during development | C-01–C-07 and C-11: brand, copy, team, past-event facts, photos, optional PDFs, translations/approvals. | Document contracts below; clearly identified local drafts can be used without inventing people/facts. Required content cannot be declared finished or released until approved. |
| Optional missing address | C-09 public email. | Omit public contact action until supplied; no contact page/form and no fabricated address. Absence alone is not a planning or publication blocker under D-015. Official socials are not substituted. |
| Release blockers | Required core content/media/rights/translations still missing; C-10 legal/privacy/identity; C-13 actual production ownership/configuration; required visual/journey verification. | Must resolve before publication. Legal routes/layout can be developed first; draft legal text never presented as approved. |
| Deferred input | C-08/C-12 and broader systems. | No Part A feature/provider/content pipeline added merely because material exists. |

## Required formats and planned locations

These are documented future delivery/integration locations, **not application folders created during Phase 0**. Accept source files through an owner-provided local delivery folder; its actual path will be registered when supplied. The following stable integration contract avoids requiring final content before planning can close.

| Item | Required delivery format / metadata | Planned integration location |
| --- | --- | --- |
| Brand C-01 | Original SVG preferred, or high-resolution transparent PNG; permitted variants, colour/font specification and use approval. Actual dimensions recorded, no invented charter. | `public/media/brand/`; provenance/approval metadata in the content inventory. |
| Mission/home C-02 | FR/EN UTF-8 Markdown, JSON or editable text; section titles/body, approved welcome wording and source/approver status. | `src/content/{fr,en}/pages.json`; interface terms in `src/i18n/dictionaries/{fr,en}.json`. |
| Team C-05 | Structured JSON or editable list: stable ID, approved display name, role, biography per language, ordering and portrait file/permission. | `src/content/{fr,en}/team.json`; portraits `public/media/team/`. |
| Events C-06 | Structured JSON or editable records: stable ID, localized title/summary/body, own-event confirmation, dates/venue only at supplied precision, media references and approval. | `src/content/{fr,en}/events.json`; assets `public/media/events/<event-id>/`. Two source forum names stay candidates until confirmed. |
| Photographs/albums C-03–C-04 | Original JPEG/PNG/WebP files; event/person association, selection/order, photographer credit, rights/publication permission, FR/EN alt text/captions. Dimensions measured from files when received. | `public/media/events/<event-id>/`; `src/content/{fr,en}/albums.json`; shared IDs/asset metadata in `src/content/media-manifest.ts`. |
| Optional programmes C-07 | Actual approved public PDFs with event ID, version, language and paired translation/publication approval; never reconstruct a missing document. | `public/media/documents/{fr,en}/`; references from localized event records. Omit missing controls. |
| Email C-09 | Owner-supplied plain public address and approval for publication, no credentials. | Optional public-contact field in structured site configuration. Missing means no rendered email action. |
| Legal/privacy C-10 | Supplied final approved FR/EN Markdown or editable text with responsible entity/publisher information and approval/version. | `src/content/{fr,en}/legal.json`; render through legal/privacy route templates. No invented approved text. |
| Translation approval C-11 | Paired content IDs, approved interface vocabulary/metadata/captions, named approver and sign-off status. | Same localized files; approval status tracked separately from public output. |
| Production C-13 | Owner-confirmed domain/origin, Vercel project/access and handover/backup responsibilities; secrets through environment configuration only. | Actual deployment/environment setup in Phase 4; no fabricated production host now. |

## Publication workflow

Record each delivery's source path, version/date, owner/rights, stable ID, languages, factual approval and publication status. A delivered image is not automatically approved for public use. Keep private rights/contact evidence separate from public bundles. Development placeholders may be clearly identifiable locally, but cannot replace missing essentials in release output or metadata.

Name missing optional assets in validation reports and omit misleading controls; do not silently omit a required essential. Confirm delivery paths/approvals as content arrives during development. The target date remains **1 December 2026**, subject to actual readiness rather than invented content. Final required content, rights, legal text and translations gate publication, not completion of this planning record.
