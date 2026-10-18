"""Validate the proposed/tracked GitHub checkpoint without rerunning application tests."""
from pathlib import Path
import hashlib
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]


def git(*args):
    return subprocess.run(['git', *args], cwd=ROOT, capture_output=True)


names = [name for name in git('ls-files', '-z').stdout.decode().split('\0') if name]
assert names, 'Stage the proposed checkpoint first.'
tracked = set(names)
manifest = json.loads((ROOT / 'docs/evidence/public/omissions.json').read_text(encoding='utf-8'))
omitted = {entry['path']: entry for entry in manifest['omitted']}
issues = []
patterns = {
    'private_key': r'-----BEGIN (?:[A-Z ]+ )?PRIVATE KEY-----',
    'github_token': r'\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{30,})',
    'service_key': r'\b(?:sk_live_[A-Za-z0-9]{16,}|sk-[A-Za-z0-9_-]{24,}|AKIA[A-Z0-9]{16}|AIza[A-Za-z0-9_-]{25,})',
    'url_credentials': r'https?://[^\s/@:]+:[^\s/@]+@',
    'jwt': r'\beyJ[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{16,}',
}
links = 0
local_only_links = 0
for name in names:
    path = Path(name)
    if any(part in {'node_modules', '.next', '.cache', '__pycache__', '.vercel', 'attachments', 'private'} for part in path.parts) or path.suffix.lower() in {'.pdf', '.pem', '.key', '.p12', '.pfx', '.log', '.tmp', '.temp', '.tsbuildinfo'} or (path.name.startswith('.env') and path.name != '.env.example'):
        issues.append({'file': name, 'rule': 'excluded_file_type'})
    if name in omitted:
        issues.append({'file': name, 'rule': 'local_only_evidence_staged'})
    data = git('show', ':' + name).stdout
    if path.suffix.lower() in {'.png', '.jpg', '.jpeg', '.webp'}:
        if not name.startswith('docs/evidence/phase-1-fidelity-review/'):
            issues.append({'file': name, 'rule': 'unreviewed_image'})
        continue
    text = data.decode('utf-8-sig')
    for rule, pattern in patterns.items():
        if re.search(pattern, text):
            issues.append({'file': name, 'rule': rule})
    if path.suffix != '.md':
        continue
    for match in re.finditer(r'\]\(([^)]+)\)', text):
        target = match[1].strip('<>')
        if re.match(r'^(https?://|mailto:|#)', target):
            continue
        resolved = (ROOT / path.parent / target.split('#')[0]).resolve()
        try:
            relative = resolved.relative_to(ROOT).as_posix()
        except ValueError:
            issues.append({'file': name, 'rule': 'link_outside_checkout'})
            continue
        links += 1
        if relative in tracked:
            continue
        if relative in omitted:
            local_only_links += 1
            continue
        issues.append({'file': name, 'rule': 'unrecorded_missing_link', 'target': relative})

summary = json.loads((ROOT / 'docs/evidence/public/verification-summary.json').read_text(encoding='utf-8'))
checked_evidence = 0
for name, digest in summary['sourceSha256'].items():
    if name not in tracked:
        continue  # Raw local-only originals are declared in the omission inventory.
    checked_evidence += 1
    if hashlib.sha256(git('show', ':' + name).stdout).hexdigest() != digest:
        issues.append({'file': name, 'rule': 'published_source_hash_mismatch'})
whitespace = git('diff', '--cached', '--check')
if whitespace.returncode:
    issues.append({'rule': 'git_diff_check', 'detail': whitespace.stdout.decode().strip()})
result = {'passed': not issues, 'filesReviewed': len(names), 'localLinks': links,
          'explicitLocalOnlyLinks': local_only_links, 'sourceHashesChecked': checked_evidence,
          'diffCheckExitCode': whitespace.returncode, 'issues': issues,
          'limits': 'Common secret patterns and reviewed-image allowlist; no new application, browser or reference tests.'}
print(json.dumps(result, indent=2))
raise SystemExit(0 if result['passed'] else 1)
