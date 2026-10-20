"""Validate Phase 2 working-tree documentation without staging or historical-state assumptions."""
from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
import re
import subprocess
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/evidence/phase-2'
checks = []
# The report links this check's output. Create an honest in-progress artifact
# before validating links, then replace it with the complete result below.
(OUT / 'documentation.json').write_text('{"status":"in_progress"}\n', encoding='utf-8')


def check(name, valid, detail):
    checks.append({'name': name, 'passed': bool(valid), 'detail': detail})


def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT).decode('utf-8').strip()


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


baseline = json.loads((OUT / 'baseline.json').read_text(encoding='utf-8-sig'))
check('checkpoint_preserved', git('rev-parse', 'HEAD') == baseline['head'] == 'e8582f3245540d2c32789da6a11db5937d44eb62', git('rev-parse', 'HEAD'))
check('branch_and_staging_preserved', git('branch', '--show-current') == 'main' and git('diff', '--cached', '--name-only') == '', 'main; no staged changes')
protected = {name: sha for name, sha in baseline['trackedSha256'].items() if name.startswith('docs/evidence/') or name in {'docs/requirements-register.md', 'docs/standing-instructions.md', 'docs/phase-0-instructions.md', 'docs/phase-0-report.md', 'docs/phase-1-instructions.md', 'docs/phase-1-report.md', 'docs/phase-1-acceptance-change.md', 'package-lock.json', 'src/styles/globals.css', 'src/i18n/routes.ts'} or name.startswith(('src/components/layout/', 'src/components/navigation/'))}
changed = [name for name, sha in protected.items() if digest(ROOT / name) != sha]
check('phase_1_checkpoint_evidence_and_shared_foundation_preserved', not changed, {'files': len(protected), 'changed': changed})
old = json.loads((ROOT / 'docs/evidence/phase-0-closure-baseline.json').read_text())
changed = [name for name, sha in old['preserved_evidence_sha256'].items() if digest(ROOT / name) != sha]
check('original_sources_preserved', not changed, changed)
register = (ROOT / 'docs/requirements-register.md').read_text(encoding='utf-8')
rows = [line for line in register.splitlines() if re.match(r'^\| A\d{2}\.\d{2} \|', line)]
check('original_86_requirement_rows_preserved', len(rows) == 86 and hashlib.sha256('\n'.join(rows).encode()).hexdigest() == old['data_a_requirement_rows_sha256'], len(rows))
request = Path(r'C:\Users\visha\.codex\attachments\bca30806-4198-4042-90e6-18e2645c2b66\Pasted text.txt')
check('phase_2_request_verbatim', request.read_bytes() == (ROOT / 'docs/phase-2-instructions.md').read_bytes(), str(request))
links, broken = 0, []
for path in [ROOT / 'AGENTS.md', ROOT / 'README.md', *sorted((ROOT / 'docs').glob('*.md'))]:
    for match in re.finditer(r'\]\(([^)]+)\)', path.read_text(encoding='utf-8')):
        target = match[1].strip('<>')
        if re.match(r'^(https?://|mailto:|#)', target):
            continue
        links += 1
        destination = (path.parent / unquote(target.split('#')[0])).resolve()
        if not destination.exists():
            broken.append({'file': path.relative_to(ROOT).as_posix(), 'target': target})
check('local_document_links', not broken, {'checked': links, 'broken': broken, 'limit': 'Private historical and Phase 2 local evidence intentionally remain ignored; not a GitHub packaging check'})
plan = (ROOT / 'docs/phase-plan.md').read_text(encoding='utf-8')
check('exact_five_phases', re.findall(r'^## Phase (\d+) ', plan, re.M) == ['0', '1', '2', '3', '4'], 'No Phase 3 execution authorized')
fixture_files = sorted((ROOT / 'public').rglob('*')) if (ROOT / 'public').exists() else []
fixture_files = [str(path.relative_to(ROOT)) for path in fixture_files if path.is_file()]
check('temporary_public_fixtures_removed', not fixture_files, fixture_files)
src = '\n'.join(path.read_text(encoding='utf-8') for path in (ROOT / 'src').rglob('*') if path.suffix in {'.ts', '.tsx'})
check('no_production_test_data', not any(term in src for term in ['tests/fixtures', 'TEST PROFILE', 'verification-landscape', 'verification-portrait']), 'Fixture data/assets stay under tests; isolated server closed')
browser = json.loads((OUT / 'browser/results.json').read_text())
media = json.loads((OUT / 'media-fixtures/results.json').read_text())
http = json.loads((OUT / 'http.json').read_text())
check('browser_and_media_evidence_complete', browser['summary'] == {'passed': 49, 'failed': 0, 'axeScans': 20} and len(media['results']) == 6 and not media['errors'], {'browser': browser['summary'], 'mediaStates': len(media['results'])})
check('http_evidence_complete', http['checks'] == 244 and len([item for item in http['results'] if item.get('status') == 200]) == 14, http['checks'])
for item in [*browser['screenshots'], *[{'path': result['screenshot']} for result in media['results']]]:
    check('screenshot_exists', (ROOT / item['path']).is_file(), item['path'])
for name in ['typecheck', 'lint', 'test', 'build']:
    result = json.loads((OUT / f'{name}.json').read_text(encoding='utf-8-sig'))
    check(f'{name}_exit', result['exit_code'] == 0, result['exit_code'])
check('git_whitespace', subprocess.run(['git', 'diff', '--check'], cwd=ROOT, capture_output=True).returncode == 0, 'Working diff; no stage/commit/push/deploy')
result = {'checkedAtUtc': datetime.now(timezone.utc).isoformat(), 'passed': all(item['passed'] for item in checks), 'checks': checks, 'limits': 'Local working-tree checks and saved actual application evidence, not publication approval, accessibility certification or reference fidelity acceptance'}
(OUT / 'documentation.json').write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'passed': result['passed'], 'checks': len(checks), 'links': links, 'protectedFiles': len(protected), 'failed': [item for item in checks if not item['passed']]}, indent=2))
raise SystemExit(0 if result['passed'] else 1)
