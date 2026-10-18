# Architecture blueprint — owner-approved stack

**Owner-selected stack: Next.js App Router, TypeScript and Tailwind CSS, compatible with Vercel (D-012).** The owner subsequently authorized Phase 1 foundation implementation; see [the request](phase-1-instructions.md), [actual implementation](phase-1-implementation.md) and [Phase 1 report](phase-1-report.md). This remains distinct from a PDF mandate or a completed Part A site. The retained [Phase 0 report](phase-0-report.md) describes its historical documentation-only state.

## Selected foundation and implementation choices

Use **Next.js App Router + TypeScript + Tailwind CSS**. The owner's Tailwind selection supersedes the earlier CSS Modules recommendation. Reusable components and semantic theme variables keep provisional colours/widths/spacing consistent; classes are statically detectable. Tailwind's [official Next.js guidance](https://tailwindcss.com/docs/installation/framework-guides/nextjs) supplies the PostCSS/import approach. The actual Phase 1 manifest/lockfile/configuration now records exact installed versions; this is not a claim of visual acceptance.

Recommend normal Next.js deployment on **Vercel**, with static generation of known public content routes. Vercel documents first-party Next.js support; this is a compatibility recommendation, not a configured or tested deployment. See [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs). Pin compatible stable runtime/package versions and record the lockfile **during authorized Phase 1**, after checking current official requirements.

Do not mandate `output: 'export'`: static prerendering on Vercel is sufficient, while full export imposes constraints such as image-loader and server-feature limitations. Consider export only if portable static hosting becomes a requirement. See [static export guidance](https://nextjs.org/docs/app/guides/static-exports). Framework choice is now settled by D-012; this remaining hosting/build-mode choice does not authorize later services.

## Proposed file and component boundaries

This retained tree is the full Part A blueprint, not a claim that all paths/features have been implemented. Phase 1's actual subset and typed missing-content slots are listed in [the implementation record](phase-1-implementation.md); content records, event-detail experiences, albums and production sitemap remain later work:

```text
src/
  app/
    [locale]/layout.tsx            # root document, validated html lang + shared shell
    [locale]/page.tsx              # homepage
    [locale]/[...segments]/page.tsx # explicit allowlisted route registry; never arbitrary content
    sitemap.ts, robots.ts          # unknown-route handling verified with actual chosen root layout
  components/
    layout/                       # SiteHeader, PrimaryNavigation, MobileNavigation, SiteFooter
    navigation/                   # LanguageSwitch, SkipLink
    content/                      # PageIntro, ContentSection, HomeIntro, MissionOverview,
                                  # TeamPreview, PastEventFeature, PhotoPreview, optional EmailLink
    people/                       # TeamMember
    events/                       # EventArchive, EventPreview, EventDetail, EventMedia, DocumentLink
    media/                        # EventAlbum, PhotoFigure
  content/
    fr/, en/                      # pages.json, team.json, events.json, albums.json, legal.json
    media-manifest.ts             # metadata and publication permissions, separate from UI
  i18n/
    locales.ts, routes.ts          # FR/EN allowlist and stable page/event IDs
    dictionaries/fr.json, en.json  # structured interface strings
  lib/content/                    # types, loaders, publication validation
  styles/                         # globals.css: Tailwind import + semantic theme/global base styles
public/media/                     # brand/, team/, events/<event-id>/, documents/{fr,en}/
docs/                             # requirements, decisions and validation evidence
```

The localized catch-all is a proposed implementation option for translated segments (`equipe`/`team`, `evenements`/`events`), backed by an explicit route registry and exhaustive static params; unknown combinations return 404. In Phase 1 choose this or explicit route folders after verifying actual framework behaviour, without changing the public route map. Never generate pages from arbitrary unvalidated paths. This avoids claiming `app/[locale]/team` alone can produce translated French segments.

Prefer server-rendered components. Phase 1 client boundaries are the mobile disclosure and locale context/error output; structured factual data does not enter a speculative client store. No additional animation, UI-theme, i18n-runtime or lightbox package has been added. Final tokens/menu geometry must await B-01; source declarations are provisional inputs, not rendered verification. A modest non-modal mobile disclosure is an explicitly recorded Phase 1 choice, not observed reference drawer behaviour.

## Content model and publication controls

| Record | Proposed fields / relationships | Integrity rule |
| --- | --- | --- |
| Localized page | Stable ID, locale, title, structured sections, metadata, source references, draft/approved status. | Do not render raw arbitrary HTML. Draft UI translations are explicitly tracked. |
| Team member | Stable ID, approved display name/role/biography per locale, portrait media ID, approval/provenance. | Missing identity/role is a release dependency; no invented people. |
| Past event | Stable ID, localized slug/title/summary/body, association-organised confirmation, optional supplied date/location, media IDs, approved document IDs. | Partial dates remain partial; no fabricated start dates/schema values. Candidates become public only after approval. |
| Photo/media | Asset ID, actual file path, dimensions, type, event/person link, localized alt/caption, credit, owner/rights/publication approval. | No reference-site assets; rights/consent recorded outside public metadata when private. |
| Public PDF | ID, locale, event ID, file path, descriptive label, publication/translation approval. | Only actual supplied files; paired language coverage or explicit scope decision. |
| Site configuration | Verified organisation label, approved contact/social destinations, production base URL. | Do not put unknown contacts/domain into production output. |

Separate UI dictionaries from factual content and from provenance records. Maintain key/type parity and stable IDs across locales. Approved content is loaded at build time; build validation should reject missing required translations, duplicate IDs/slugs, broken media references and draft core records being published. Development placeholders must carry a visible draft status and remain excluded from release output/indexing.

## Translation and routing strategy

Use owner-approved `/fr` and `/en`, `/ → /fr` and equivalent-page switching. The [sitemap](sitemap.md) specifies separate home, mission, team, past-events and photos routes with home previews. Locale allowlists, server dictionaries and stable page/event keys are implementation choices; Next.js documents locale segments, dictionaries and known locale generation. See [internationalization guidance](https://nextjs.org/docs/app/guides/internationalization). Translation approver/content delivery remains C-11, not an unsettled routing-scope decision.

For locale-specific `<html lang>`, propose the locale segment as root layout, with the `/` redirect handled by framework routing configuration. Do not nest a second `<html>` document. Verify unknown/unlocalized route handling, page language, metadata alternates and localized 404s in the actual framework build before accepting the routing foundation. Draft interface copy can be written; association prose and PDFs need source-backed human approval. Do not silently fall back to French on English pages.

## Services, configuration and operations

- **No database, CMS, auth, payment, CRM, newsletter or analytics provider selected.** D-013–D-016 approve developer-managed content and defer CMS/admin accounts, forms/uploads/accounts/payments, subscription/profiling and the named broader systems. No such endpoints or misleading controls in A.
- Use reviewed repository edits for structured A content, with bilingual/content/media checks before deployment. This owner-approved model intentionally defers the original four-admin/self-service requirement; it does not claim Git implements an admin dashboard.
- Contact is an optional supplied-public-email `mailto:` link only. Missing address means omit the public action; no contact page, form, synthetic address or substitute social channel. Legal/privacy layouts/routes can be built before text delivery; do not publish unapproved invented copy.
- Only actual configuration goes in environment variables (for example the eventual public site origin); secrets never enter source or client bundles. A needs no provider secrets. Document required variable names/examples without invented values during Phase 1/4.
- Optimize supplied images with explicit dimensions/sizes, intentional crops and appropriate loading; verify the chosen image pipeline on Vercel in later phases. Do not ship all full-resolution source photography as a gallery bundle.
- Keep versioned source and an owner-controlled media backup plus a documented restore procedure. Backup locations/access/retention are not yet configured; do not claim a remote backup while this repository has no pushed history.
- Legal/privacy must reflect actual hosting logs and published media even with no forms/trackers. Obtain owner-approved text; this blueprint is not legal approval.

## Phase boundaries

Phase 1, only when instructed, establishes the selected Next.js/TypeScript/Tailwind foundation, structured content interfaces, locale/route dictionaries, five area shell routes plus legal/privacy structures, `/ → /fr`, equivalent-page switch, shared shell/accessibility and relevant checks. Phase 2 supplies page previews/templates/content/media; Phase 3 verifies complete journeys/release output; Phase 4 deploys only when instructed and access is available. B-01 still prevents final geometry/menu/fidelity acceptance for dependent work, while the architecture/route/content/collection decisions are settled. Missing assets may arrive during development under [documented contracts](content-and-assets.md).
