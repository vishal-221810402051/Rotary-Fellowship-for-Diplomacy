# Phase 1 GitHub checkpoint

**D-025, explicit owner authorization, 18 October 2026 (Europe/Paris):** checkpoint the completed Phase 1 foundation to <https://github.com/vishal-221810402051/Rotary-Fellowship-for-Diplomacy.git>. Commit and push are authorized; Phase 2 and deployment are not. This supersedes earlier no-commit/no-push instructions for this checkpoint only.

`origin` matches exactly. Local `master` had no commits; a noninteractive `git ls-remote --symref origin` completed successfully with no advertised refs. The unborn branch was renamed **main** before staging. No remote history is overwritten and no force push is permitted. Commit message: **Complete Phase 1 foundation and verification**. Actual commit SHA and verified remote outcome are reported after the operation, not predicted in this document.

## Included and inspected

- Application source, npm lockfile/manifest, framework/style/type/lint configuration, tests, project instructions and documentation. No application behaviour changes for this checkpoint; saved passing application checks are reused.
- Original final HTTP and browser result JSON after text/credential review: [216 HTTP checks](evidence/phase-1-http.json), [95 browser checks/20 reviewed axe scans](evidence/phase-1-browser/local/results.json), [six targeted checks/two reviewed axe scans](evidence/phase-1-fidelity-review/local-results.json).
- Six **visually inspected** local screenshots at 1440x900, 1024x900, 390x844 and 320x844 from the targeted run. They show only local development shells, organisation text, bilingual controls and focus/navigation states; no documents, accounts, credentials or personal desktop/browser chrome. The targeted JSON maps exact URLs/viewports/states to those six files.
- [Publication-safe verification summary](evidence/public/verification-summary.json) and [reference observations summary](evidence/public/reference-summary.json), derived from saved evidence with source hashes. Raw command output, local filesystem details and source-document text are omitted from these summaries. They do not claim fresh test execution or reference equivalence.

## Retained locally and excluded

All original files are preserved locally. [Exact omitted evidence inventory](evidence/public/omissions.json) lists repository-relative paths, source hashes and reasons; it contains no excluded file contents.

- Personal questionnaire PDFs and full-text equivalents: `data-a-pages.txt`, `earlier-questionnaire-pages.txt`, `questionnaire-extraction.json`. The latter embeds all questionnaire text. Originals outside this Git root are never staged. No identity documents/unrelated attachments were found in the proposed tree; PDFs, attachments and private/credential material are ignored by default.
- Historical raw command logs, error stacks, local validation/baseline manifests and report snapshots. They retain machine-specific paths/metadata and private-source assumptions; reviewed outcomes are published through the summary instead. No original log is rewritten or deleted.
- All reference-site screenshots, including HTTP 429/access-error screens, stay local. They are not asserted privacy-safe or republished as application assets. Reference failures and reliable geometry are summarized without request headers, client identifiers or copied media.
- Earlier local screenshots and regression records remain local as redundant historical material. The final full-run JSON's 28 screenshot entries describe local-only files; the six later targeted screenshots are the published visual evidence. Links to omitted captures in historical documents are intentional **local-only evidence references**, not missing implementation files.
- `node_modules`, `.next`, caches, build output, temporary files, environment secrets, credentials and tokens are excluded by `.gitignore` and checked against the staged tree. `.npmrc` contains only `save-exact=true`; no credentials. The publication review checks the staged bytes for common secret/private-key patterns; it is not a guarantee against every possible secret format.

## Documentation and validation boundaries

Historical source registers, reports and preserved instructions may link to the original evidence. When a target appears in the omissions inventory it is available only in the private working copy, intentionally absent from GitHub. Project requirement summaries and owner decisions remain in the documentation; excluding full questionnaires does not erase their requirement history. Publication does not approve missing factual content, media rights or legal text.

Run `python scripts/check-checkpoint.py` after staging or on a checkout. It checks staged/tracked contents, local Markdown targets against tracked files plus explicitly recorded local-only omissions, common secret patterns, evidence integrity and `git diff --cached --check`. It does not weaken the Phase 1 acceptance criteria or repeat application tests. The earlier `check-docs.py` and Phase 0 validators describe their local pre-commit environments, including private source files and unborn master, and are retained as historical tooling rather than portable GitHub validation.

Pre-commit review passed for **84 staged files**, 229 Markdown file links (51 explicitly local-only), three original published evidence hashes and six inspected screenshots. Both `git diff --check` and `git diff --cached --check` pass; the common-secret scan reports no findings. The omission inventory lists 73 retained evidence files. Application, test and dependency files match the closed Phase 1 snapshot; existing passing type/lint/build/test/browser results are reused. A normal Git line-ending warning does not change the local source/evidence files; the two actual trailing-space findings in the generated documentation index were corrected before the passing check.

Phase 1 remains closed under **D-024**. Exact reference typography/mobile-menu equivalence remains **UNVERIFIED** and outside closure requirements. No reference retries, Phase 2 implementation or deployment are part of this checkpoint. No changes are discarded; any push failure must leave the local commit intact and be reported without requesting or exposing credentials.
