"""Verify Phase 0 documentation/evidence; no app tests or installs are performed."""
from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'docs/evidence/phase-0-validation.json'
checks = []


def check(name, passed, details):
    checks.append({'check': name, 'passed': bool(passed), 'details': details})


required = ['source-register', 'requirements-register', 'reference-ui-audit', 'part-a-scope',
            'sitemap', 'architecture', 'content-and-assets', 'decisions-and-gaps', 'phase-plan', 'phase-0-report']
check('required_documents', all((ROOT / 'docs' / (n + '.md')).is_file() for n in required), required)
originals = {
    'standing-instructions.md': Path('C:/Users/visha/.codex/attachments/5891f3be-fbba-4e4d-b79d-c4c846ad02fc/Pasted text.txt'),
    'phase-0-instructions.md': Path('C:/Users/visha/.codex/attachments/e546a052-d5cd-4544-b95c-9a873a507335/Pasted text.txt'),
}
for saved, source in originals.items():
    check('verbatim_' + saved, (ROOT / 'docs' / saved).read_bytes() == source.read_bytes(), 'Byte comparison against original request attachment')

extraction = json.loads((ROOT / 'docs/evidence/questionnaire-extraction.json').read_text(encoding='utf-8'))
for key, expected_count, date in [('data-a', 8, '15/10/2026'), ('earlier-questionnaire', 10, '11/10/2026')]:
    record = extraction[key]
    source_bytes = Path(record['path']).read_bytes()
    valid = (len(record['pages']) == record['page_count'] == expected_count
             and hashlib.sha256(source_bytes).hexdigest() == record['sha256']
             and date in record['pages'][0]['text']
             and all(f"{p['page']} / {expected_count}" in p['text'] for p in record['pages']))
    check(key + '_source_integrity', valid, {'page_count': record['page_count'], 'printed_date': date, 'sha256': record['sha256'], 'text_objects': sum(p['text_objects'] for p in record['pages'])})

register = (ROOT / 'docs/requirements-register.md').read_text(encoding='utf-8')
rows = []
errors = []
primary_pages = {1: {2}, 2: {2, 3}, 3: {3}, 4: {4}, 5: {4, 5}, 6: {5}, 7: {6}, 8: {6, 7}, 9: {7}, 10: {7, 8}, 11: {8}}
for line in register.splitlines():
    if re.match(r'^\| A\d{2}\.\d{2} \|', line):
        cells = [s.strip() for s in line.strip().strip('|').split('|')]
        if len(cells) != 8 or not all(cells):
            errors.append({'row': cells[0], 'issue': 'Missing/extra register column'})
            continue
        section = int(cells[0][1:3])
        pages = [int(v) for v in re.findall(r'\d+', cells[1])]
        if not pages or pages[0] not in primary_pages[section] or not all(1 <= n <= 8 for n in pages):
            errors.append({'row': cells[0], 'issue': 'Page reference outside section/source range'})
        rows.append(cells)
check('requirements_columns_ids_pages', not errors and len({r[0] for r in rows}) == len(rows), {'row_count': len(rows), 'errors': errors, 'limit': 'Structural/page-range check; faithful summaries also manually reviewed against extracted pages.'})
coverage = []
for section in range(1, 12):
    headings = [{'page': p['page'], 'heading': line} for p in extraction['data-a']['pages']
                for line in p['text'].splitlines() if line.startswith(f'{section:02} · ')]
    ids = [r[0] for r in rows if r[0].startswith(f'A{section:02}.')]
    coverage.append({'section': section, 'source_headings': headings, 'requirement_ids': ids})
check('all_eleven_sections_covered', all(c['source_headings'] and c['requirement_ids'] for c in coverage), coverage)
earlier = extraction['earlier-questionnaire']['pages']
check('earlier_selections_page_refs', 'Événements à venir, Galerie photo' in earlier[4]['text'] and 'Communiqués, Podcasts' in earlier[5]['text'] and '| E-01 | 5 |' in register and '| E-02 | 6 |' in register, 'Upcoming/photo p.5; press releases/podcasts p.6; blanks do not override Data A.')

broken = []
links_checked = 0
for document in [ROOT / 'AGENTS.md', *sorted((ROOT / 'docs').rglob('*.md'))]:
    for match in re.finditer(r'\]\(([^)]+)\)', document.read_text(encoding='utf-8')):
        target = match.group(1).strip('<>')
        if re.match(r'^(?:https?://|mailto:|#)', target):
            continue
        resolved = (document.parent / target.split('#')[0]).resolve()
        links_checked += 1
        if not resolved.exists() and resolved != OUT.resolve():
            broken.append({'document': str(document.relative_to(ROOT)), 'target': target})
check('relative_document_links', not broken, {'links_checked': links_checked, 'broken': broken, 'limit': 'Existence of local targets, not external-site link or anchor testing.'})

observations = json.loads((ROOT / 'docs/evidence/reference-source-observations.json').read_text(encoding='utf-8'))
check('reference_http_evidence', len(observations) == 7 and all(x.get('http_status') == 200 and x.get('response_sha256') and x.get('observed_at_utc') for x in observations), {'urls': [x['url'] for x in observations], 'limit': 'HTML/CSS only; zero rendered viewport screenshots or interaction checks.'})
plan = (ROOT / 'docs/phase-plan.md').read_text(encoding='utf-8')
phase_numbers = re.findall(r'^## Phase (\d+) ', plan, re.M)
check('exactly_phases_0_to_4', phase_numbers == ['0', '1', '2', '3', '4'], phase_numbers)

# Preserve completed source work; do not re-extract PDFs or fetch the site.
baseline = json.loads((ROOT / 'docs/evidence/phase-0-closure-baseline.json').read_text(encoding='utf-8'))
unchanged = {p: hashlib.sha256((ROOT / p).read_bytes()).hexdigest() == digest
             for p, digest in baseline['preserved_evidence_sha256'].items()}
check('completed_source_evidence_preserved', all(unchanged.values()), unchanged)
row_lines = [line for line in register.splitlines() if re.match(r'^\| A\d{2}\.\d{2} \|', line)]
check('original_requirement_rows_preserved', len(row_lines) == baseline['data_a_requirement_rows']
      and hashlib.sha256('\n'.join(row_lines).encode('utf-8')).hexdigest() == baseline['data_a_requirement_rows_sha256'],
      {'rows': len(row_lines), 'limit': 'All original row cells preserved, including PDF priorities and historical treatment proposals; current owner decisions are separate.'})
owner = (ROOT / 'docs/owner-decisions.md').read_text(encoding='utf-8')
owner_ids = re.findall(r'^\| (D-\d{3}) \|', owner, re.M)
check('explicit_owner_decisions_separate', owner_ids == [f'D-{n:03}' for n in range(9, 21)]
      and 'not statements extracted from Data A' in owner,
      {'ids': owner_ids, 'source': 'Latest explicit owner chat instructions, not PDF answers.'})
architecture = (ROOT / 'docs/architecture.md').read_text(encoding='utf-8')
root_instructions = (ROOT / 'AGENTS.md').read_text(encoding='utf-8')
check('selected_stack_reconciled', all('Tailwind CSS' in text for text in [owner, architecture, root_instructions, plan])
      and 'supersedes the earlier CSS Modules recommendation' in architecture,
      'Next.js App Router, TypeScript, Tailwind CSS; previous styling recommendation explicitly superseded; no installation performed.')
sitemap = (ROOT / 'docs/sitemap.md').read_text(encoding='utf-8')
route_pairs = [('/fr', '/en'), ('/fr/mission', '/en/mission'), ('/fr/equipe', '/en/team'),
               ('/fr/evenements', '/en/events'), ('/fr/photos', '/en/photos')]
check('five_area_routes_and_email_policy', all(f'`{path}`' in sitemap for pair in route_pairs for path in pair)
      and '/fr/contact' not in sitemap and 'ContactPage' not in sitemap
      and 'mailto:' in sitemap and 'otherwise no public contact action' in sitemap,
      {'route_pairs': route_pairs, 'contact': 'Supplied public email only; omit while missing, no contact route/form.'})
inventory = (ROOT / 'docs/content-and-assets.md').read_text(encoding='utf-8')
check('development_and_release_contracts', all(term in inventory for term in [
    'Dependency classification', 'Required formats and planned locations', 'Content that may arrive during development',
    'Release blockers', 'public/media/brand/', 'team.json', 'events.json', 'albums.json', 'legal.json']),
    'Planning evidence gap, development deliveries, optional email and publication gates classified separately; future formats/paths documented without scaffolding.')
availability = json.loads((ROOT / 'docs/evidence/reference-browser-availability.json').read_text(encoding='utf-8'))
capture_request = (ROOT / 'docs/reference-capture-request.md').read_text(encoding='utf-8')
fallback_complete = (availability['connected_browser_inventory'] == {'apps': [], 'browsers': []}
    and availability['screenshots_captured'] == 0 and not availability['rendered_verification_performed']
    and all(term in capture_request for term in ['1440', '390', '/a-propos/', '/equipe/',
            '/category/evenement/', '/evenement/journee-rotary-unesco-2024/', 'nested submenu expanded',
            'Implementation decisions still dependent'])
    and 'conditional gate D-018' in plan)
check('owner_authorized_no_browser_fallback', fallback_complete,
      {'availability_record': 'docs/evidence/reference-browser-availability.json',
       'request': 'docs/reference-capture-request.md', 'rendered_reference_verified': False,
       'limit': 'Closes the conditional planning gate; does not verify appearance, interaction, keyboard/focus or fidelity.'})

def git(*args):
    run = subprocess.run(['git', *args], cwd=ROOT, capture_output=True, text=True)
    return {'exit_code': run.returncode, 'stdout': run.stdout.strip(), 'stderr': run.stderr.strip()}

git_evidence = {name: git(*args) for name, args in {
    'status': ['status', '--short', '--branch'], 'root': ['rev-parse', '--show-toplevel'],
    'branch': ['symbolic-ref', '--short', 'HEAD'], 'remotes': ['remote', '-v'],
    'staged_files': ['diff', '--cached', '--name-only'], 'head': ['rev-parse', '--verify', 'HEAD'],
}.items()}
initial_validation = json.loads((ROOT / 'docs/evidence/phase-0-initial-validation.json').read_text(encoding='utf-8'))
prior_git = next(c['details'] for c in initial_validation['checks'] if c['check'] == 'git_expected_state')
git_evidence['remote_refs'] = prior_git['remote_refs']
git_evidence['remote_head'] = prior_git['remote_head']
git_evidence['remote_observation_note'] = 'Reused prior read-only remote observation; no network remote inspection repeated at closure.'
check('git_expected_state', git_evidence['root']['exit_code'] == 0 and git_evidence['branch']['stdout'] == 'master'
      and 'https://github.com/vishal-221810402051/Rotary-Fellowship-for-Diplomacy.git' in git_evidence['remotes']['stdout']
      and git_evidence['remote_refs']['exit_code'] == 0 and not git_evidence['remote_refs']['stdout']
      and git_evidence['head']['exit_code'] != 0 and not git_evidence['staged_files']['stdout'], git_evidence)
files = [p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*') if p.is_file() and '.git' not in p.relative_to(ROOT).parts]
unexpected = [p for p in files if p != 'AGENTS.md' and not p.startswith('docs/')]
check('documentation_only_working_tree', not unexpected, {'unexpected_files': unexpected, 'limit': 'Final tree plus recorded command history; not a claim that application tests/build/deployment ran.'})

passed = all(c['passed'] for c in checks)
result = {'validated_at_utc': datetime.now(timezone.utc).isoformat(), 'documentation_checks_passed': passed,
          'phase_0_status': 'complete' if passed and fallback_complete else 'incomplete',
          'completion_basis': 'Owner-authorized no-browser fallback plus resolved owner scope decisions and documented development/release contracts.',
          'remaining_phase_0_closure_blockers': [] if passed and fallback_complete else ['Documentation/fallback checks not satisfied'],
          'rendered_reference_verified': False,
          'remaining_reference_evidence_gaps': ['B-01: desktop/mobile appearance, proportions, menu/navigation and keyboard/focus interaction evidence'],
          'release_dependencies': ['Approved required factual content, media rights and translations', 'Final legal/privacy text and responsible identity', 'Actual production configuration/ownership and release verification'],
          'phase_1_started': False,
          'checks': checks, 'files': sorted(set(files + ['docs/evidence/phase-0-validation.json']))}
OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'documentation_checks_passed': result['documentation_checks_passed'], 'checks': len(checks), 'requirement_rows': len(rows), 'links_checked': links_checked, 'failed': [c['check'] for c in checks if not c['passed']], 'phase_0_status': result['phase_0_status']}, indent=2))
raise SystemExit(0 if result['documentation_checks_passed'] else 1)
