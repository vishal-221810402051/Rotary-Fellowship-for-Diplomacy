"""Phase 1 documentation checks; preserves the historical Phase 0 validator/output."""
from datetime import datetime, timezone
from pathlib import Path
import argparse
import hashlib
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', default='docs/evidence/phase-1-docs.json', help='Evidence path relative to the repository; select a new path to preserve previous results.')
OUT = ROOT / parser.parse_args().output
checks = []


def check(name, passed, details):
    checks.append({'name': name, 'passed': bool(passed), 'details': details})


documents = [ROOT / 'README.md', ROOT / 'AGENTS.md', *sorted((ROOT / 'docs').rglob('*.md'))]
broken = []
link_count = 0
for document in documents:
    for match in re.finditer(r'\]\(([^)]+)\)', document.read_text(encoding='utf-8')):
        target = match[1].strip('<>')
        if re.match(r'^(https?://|mailto:|#)', target):
            continue
        link_count += 1
        resolved = (document.parent / target.split('#')[0]).resolve()
        if not resolved.exists() and resolved != OUT.resolve():
            broken.append({'document': document.relative_to(ROOT).as_posix(), 'target': target})
check('local_document_links', not broken, {'checked': link_count, 'broken': broken, 'limit': 'File existence, not external HTTP or anchor validation.'})

baseline = json.loads((ROOT / 'docs/evidence/phase-0-closure-baseline.json').read_text(encoding='utf-8'))
unchanged = {name: hashlib.sha256((ROOT / name).read_bytes()).hexdigest() == digest
             for name, digest in baseline['preserved_evidence_sha256'].items()}
check('original_source_evidence_preserved', all(unchanged.values()), unchanged)
rows = [line for line in (ROOT / 'docs/requirements-register.md').read_text(encoding='utf-8').splitlines()
        if re.match(r'^\| A\d{2}\.\d{2} \|', line)]
check('data_a_rows_preserved', len(rows) == baseline['data_a_requirement_rows']
      and hashlib.sha256('\n'.join(rows).encode('utf-8')).hexdigest() == baseline['data_a_requirement_rows_sha256'], {'rows': len(rows)})
request = ROOT / 'docs/phase-1-instructions.md'
attachment = Path('C:/Users/visha/.codex/attachments/2c1f8044-2302-4a9f-bcf3-e0c2c0ab8330/Pasted text.txt')
check('phase_1_request_verbatim', request.read_bytes() == attachment.read_bytes(), str(attachment))
required = ['phase-1-report.md', 'phase-1-implementation.md', 'phase-1-verification.md']
check('phase_1_documents_present', all((ROOT / 'docs' / name).is_file() for name in required), required)
plan = (ROOT / 'docs/phase-plan.md').read_text(encoding='utf-8')
check('exactly_five_phases', re.findall(r'^## Phase (\d+) ', plan, re.M) == list('01234'), 'Phase numbering retained; owner acceptance amendments recorded separately in phase-1-acceptance-change.md.')


def git(*args):
    result = subprocess.run(['git', *args], cwd=ROOT, capture_output=True, text=True)
    return {'exit_code': result.returncode, 'output': result.stdout.strip(), 'error': result.stderr.strip()}


state = {'status': git('status', '--short', '--branch'), 'branch': git('symbolic-ref', '--short', 'HEAD'),
         'origin': git('config', '--get', 'remote.origin.url'), 'head': git('rev-parse', '--verify', 'HEAD'),
         'staged': git('diff', '--cached', '--name-only')}
check('git_preserved_no_commit_or_staging', state['branch']['output'] == 'master' and state['head']['exit_code'] != 0
      and state['origin']['output'] == 'https://github.com/vishal-221810402051/Rotary-Fellowship-for-Diplomacy.git'
      and state['staged']['output'] == '', state)
phase1_baseline = json.loads((ROOT / 'docs/evidence/phase-1-baseline.json').read_text(encoding='utf-8'))
modified = [name for name, digest in phase1_baseline['existing_files_sha256'].items()
            if hashlib.sha256((ROOT / name).read_bytes()).hexdigest() != digest]
check('no_previous_document_deleted', all((ROOT / name).is_file() for name in phase1_baseline['existing_files_sha256']), {'modified_existing_documents': modified})

result = {'checked_at_utc': datetime.now(timezone.utc).isoformat(), 'passed': all(c['passed'] for c in checks),
          'checks': checks, 'acceptance_report': 'docs/phase-1-report.md',
          'limits': ['Local Chrome browser/keyboard and reviewed accessibility scans performed; scope recorded in report',
                     'Reference typography/menu equivalence remains unverified; closure basis is owner D-024, not this documentation validator']}
OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'passed': result['passed'], 'checks': len(checks), 'links': link_count, 'source_rows': len(rows),
                  'failed': [c['name'] for c in checks if not c['passed']]}, indent=2))
raise SystemExit(0 if result['passed'] else 1)
