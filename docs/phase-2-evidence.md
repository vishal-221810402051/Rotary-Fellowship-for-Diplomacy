# Phase 2 evidence and reproduction

All paths below are **local-only evidence** under the existing ignore policy. No screenshots/logs are newly published or staged. Phase 1 evidence remains unchanged. These captures show developer drafts/empty states or explicitly labelled nonphotographic test fixtures, not approved association materials or exact reference fidelity.

## Commands and scope

Use the root README's Node/npm setup. With a production server at `http://127.0.0.1:3100`, run `npm.cmd run check:http` and `npm.cmd run check:browser`. The latter now runs the focused Phase 2 script, not the historical comprehensive Phase 1 suite. Outputs: `docs/evidence/phase-2/http.json` and `browser/results.json`; viewport measurements, checks, axe findings and gradient reviews are in that browser manifest. No external-reference audit is performed.

For populated image verification only, stop the local server first, then prepare the two obvious chart fixtures:

```powershell
New-Item -ItemType Directory -Force -Path public/media
Copy-Item -LiteralPath tests/fixtures/media/landscape.png -Destination public/media/verification-landscape.png
Copy-Item -LiteralPath tests/fixtures/media/portrait.png -Destination public/media/verification-portrait.png
npm.cmd run build
npm.cmd run start -- --hostname 127.0.0.1 --port 3100
```

In a second terminal run `npm.cmd run check:media`. It creates a separate random-port localhost preview with a prominent TEST DATA heading, renders the actual profile/gallery components with fixture records, proxies real Next optimiser requests and the compiled CSS, delays images to compare reserved/loaded dimensions, scans accessibility, captures six states and closes its isolated server. It does not create a fixture route inside the app or import test data into production content. Charts were generated locally with Python standard-library PNG/zlib encoding; they represent no real person/activity.

Afterwards stop the app server, remove only the two temporary static copies, and rebuild/restart for normal preview:

```powershell
Remove-Item -LiteralPath public/media/verification-landscape.png
Remove-Item -LiteralPath public/media/verification-portrait.png
npm.cmd run build
npm.cmd run start -- --hostname 127.0.0.1 --port 3100
```

This cleanup and final rebuild were performed in the recorded run. Only `tests/fixtures/media/*.png` remain as source fixtures; there are no public fixture files or production content imports. The normal routes show no invented profile/photograph. [Cleanup checks](evidence/phase-2/cleanup.json).

## Actual page captures

All are full-page PNGs including the shared header/footer, menu closed, with actual draft/empty content and no fixture records. Manifest timestamps and Chrome version are in [browser results](evidence/phase-2/browser/results.json). Desktop: 1440?900; mobile: 390?844. Both five-page sets were additionally measured/interacted with at 768?1024 and 320?844 without another screenshot set.

| Screenshot | Exact URL | Viewport / state |
| --- | --- | --- |
| [fr-home-1440.png](evidence/phase-2/browser/fr-home-1440.png) | `http://127.0.0.1:3100/fr` | 1440?900, menu closed |
| [fr-mission-1440.png](evidence/phase-2/browser/fr-mission-1440.png) | `http://127.0.0.1:3100/fr/mission` | 1440?900, menu closed |
| [fr-team-1440.png](evidence/phase-2/browser/fr-team-1440.png) | `http://127.0.0.1:3100/fr/equipe` | 1440?900, menu closed |
| [fr-events-1440.png](evidence/phase-2/browser/fr-events-1440.png) | `http://127.0.0.1:3100/fr/evenements` | 1440?900, menu closed |
| [fr-photos-1440.png](evidence/phase-2/browser/fr-photos-1440.png) | `http://127.0.0.1:3100/fr/photos` | 1440?900, menu closed |
| [en-home-1440.png](evidence/phase-2/browser/en-home-1440.png) | `http://127.0.0.1:3100/en` | 1440?900, menu closed |
| [en-mission-1440.png](evidence/phase-2/browser/en-mission-1440.png) | `http://127.0.0.1:3100/en/mission` | 1440?900, menu closed |
| [en-team-1440.png](evidence/phase-2/browser/en-team-1440.png) | `http://127.0.0.1:3100/en/team` | 1440?900, menu closed |
| [en-events-1440.png](evidence/phase-2/browser/en-events-1440.png) | `http://127.0.0.1:3100/en/events` | 1440?900, menu closed |
| [en-photos-1440.png](evidence/phase-2/browser/en-photos-1440.png) | `http://127.0.0.1:3100/en/photos` | 1440?900, menu closed |
| [fr-home-390.png](evidence/phase-2/browser/fr-home-390.png) | `http://127.0.0.1:3100/fr` | 390?844, menu closed |
| [fr-mission-390.png](evidence/phase-2/browser/fr-mission-390.png) | `http://127.0.0.1:3100/fr/mission` | 390?844, menu closed |
| [fr-team-390.png](evidence/phase-2/browser/fr-team-390.png) | `http://127.0.0.1:3100/fr/equipe` | 390?844, menu closed |
| [fr-events-390.png](evidence/phase-2/browser/fr-events-390.png) | `http://127.0.0.1:3100/fr/evenements` | 390?844, menu closed |
| [fr-photos-390.png](evidence/phase-2/browser/fr-photos-390.png) | `http://127.0.0.1:3100/fr/photos` | 390?844, menu closed |
| [en-home-390.png](evidence/phase-2/browser/en-home-390.png) | `http://127.0.0.1:3100/en` | 390?844, menu closed |
| [en-mission-390.png](evidence/phase-2/browser/en-mission-390.png) | `http://127.0.0.1:3100/en/mission` | 390?844, menu closed |
| [en-team-390.png](evidence/phase-2/browser/en-team-390.png) | `http://127.0.0.1:3100/en/team` | 390?844, menu closed |
| [en-events-390.png](evidence/phase-2/browser/en-events-390.png) | `http://127.0.0.1:3100/en/events` | 390?844, menu closed |
| [en-photos-390.png](evidence/phase-2/browser/en-photos-390.png) | `http://127.0.0.1:3100/en/photos` | 390?844, menu closed |

## Isolated populated states

Each URL below is the exact ephemeral local preview used during verification; that server is now closed. Production optimiser requests were proxied to `http://127.0.0.1:3100`. Each capture explicitly identifies TEST DATA and contains one test profile/portrait plus a test album with landscape/portrait charts. No real association photograph or person is implied. [Media results](evidence/phase-2/media-fixtures/results.json) records alt/captions/credit, natural/reserved/loaded dimensions, optimiser response URLs/statuses and axe results.

| Screenshot | Exact isolated URL | Viewport / state |
| --- | --- | --- |
| [fr-1440.png](evidence/phase-2/media-fixtures/fr-1440.png) | `http://127.0.0.1:60813/fr` | 1440?900, all three images loaded |
| [en-1440.png](evidence/phase-2/media-fixtures/en-1440.png) | `http://127.0.0.1:60813/en` | 1440?900, all three images loaded |
| [fr-390.png](evidence/phase-2/media-fixtures/fr-390.png) | `http://127.0.0.1:60813/fr` | 390?844, all three images loaded |
| [en-390.png](evidence/phase-2/media-fixtures/en-390.png) | `http://127.0.0.1:60813/en` | 390?844, all three images loaded |
| [fr-320.png](evidence/phase-2/media-fixtures/fr-320.png) | `http://127.0.0.1:60813/fr` | 320?844, all three images loaded |
| [en-320.png](evidence/phase-2/media-fixtures/en-320.png) | `http://127.0.0.1:60813/en` | 320?844, all three images loaded |

## Review boundaries and saved failures

Visually inspected the actual captures `fr-home-1440`, `en-mission-390`, `en-events-1440`, `fr-team-390`, `en-photos-1440` and isolated `en-390`: readable layout/heading hierarchy, editorial spacing, truthful empty states, full image proportions and caption/credit placement. This developer review is not client visual/content approval, a cross-browser claim, or a renewed reference comparison. Remaining reference differences retain D-024's UNVERIFIED status.

[Attempt history](evidence/phase-2/attempts.json) records early failures and corrections, separate from final passing evidence. [Final command outputs](evidence/phase-2/build.json) and [documentation/preservation results](evidence/phase-2/documentation.json) support the [Phase 2 report](phase-2-report.md). No unchanged external-reference tests were repeated, no application services added and no Phase 3/commit/push/deployment performed.
