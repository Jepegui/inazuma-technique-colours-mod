"""Writes src/data/techniques.json from the VRFW ids workbook (mods\\VRFW\\VRFW ids.xlsx): every move of the base game that has
its own cut-in, with its names (en / pt / es), category, element, power (level 1 / highest level), TP cost, effect object and
cut-in events, and for a combination move its number of players and partners.
With VRFW's list of the game's files (its cache: %LOCALAPPDATA%\\VRFW\\cache\\VRFW\\loader\\boot_list.bin) it also writes each
move's other effect objects (x) and its 3D props (pr: chr/_waza models, with the cut-in seats that play them), so those take
the colour too.
Usage: python tools/make_techniques.py "path\\to\\VRFW ids.xlsx" ["path\\to\\boot_list.bin"]   (needs openpyxl)"""
import collections, json, re, sys, pathlib
import openpyxl
wb = openpyxl.load_workbook(sys.argv[1], read_only=True)
rows = wb['Techniques'].iter_rows(values_only=True); head = next(rows); ix = {k: i for i, k in enumerate(head)}
# the characters' names (en / pt / es): a combination move's partners
crows = wb['Characters'].iter_rows(values_only=True); chead = next(crows); cix = {k: i for i, k in enumerate(chead)}
CHARS = {r[cix['character']]: [r[cix['name_en']], r[cix['name_pt']], r[cix['name_es']]] for r in crows if r[cix['character']]}

folders, evfiles, waza = set(), collections.defaultdict(list), set()
if len(sys.argv) > 2:
    raw = pathlib.Path(sys.argv[2]).read_bytes()
    for m in re.findall(rb'data/common/[\x21-\x7e]+?\.[a-z0-9]{2,8}(?=data/|[\x00-\x20]|$)', raw):
        p = m.decode()
        if (f := re.match(r'data/common/effect/event/ev\d\d/([^/]+)/', p)): folders.add(f[1])
        if (f := re.match(r'data/common/event/ev\d\d/(ev\d\d_\d{5})/(.+)$', p)): evfiles[f[1]].append(f[2])
        if (f := re.match(r'data/common/chr/_waza/([^/]+)/', p)): waza.add(f[1])

out, seen = [], set()
for r in rows:
    if r[ix['source']] != 'retail': continue
    ev = str(r[ix['event']] or ''); m = re.fullmatch(r'ev(\d\d)_(\d{5})(_\d)?', ev)
    if not m: continue
    t = {'k': r[ix['technique']], 'en': r[ix['name_en']], 'pt': r[ix['name_pt']], 'es': r[ix['name_es']], 'cat': r[ix['category']],
         'el': r[ix['element']], 'obj': f'ev{m[1]}{m[2]}0', 'ev': ev}   # the effect object: the cut-in's stem + 0 (ev60_00650 -> ev60006500)
    if r[ix['fail_event']]: t['fail'] = str(r[ix['fail_event']])
    if r[ix['power_min']] is not None: t['pw'] = [int(r[ix['power_min']]), int(r[ix['power_max']] or r[ix['power_min']])]
    if r[ix['tp']] is not None: t['tp'] = int(r[ix['tp']])
    # a combination move: its number of players (us) and the characters it needs (pa: en / pt / es names; an avatar: '*')
    if (r[ix['users']] or 1) > 1:
        t['us'] = int(r[ix['users']])
        pa = [CHARS.get(c) or '*' for c in str(r[ix['partners']] or '').split()]
        if pa: t['pa'] = pa
    if (t['en'], t['obj']) in seen: continue
    seen.add((t['en'], t['obj']))
    evs = [ev] + ([t['fail']] if t.get('fail') else [])
    # the cut-ins' other effect objects (ev60100901, ev60004100_wingfire …)
    x = sorted({f for e in evs for f in folders if f.startswith(e[:4] + e[5:10]) and f != t['obj']})
    if x: t['x'] = x
    # the 3D props: an actor <prop>_s<NN>_p<VARIATION> of the cut-in (its animation packs name it), or the cut-in's own one
    props = collections.defaultdict(set)
    for e in evs:   # (a cut-in ev63_01620_1 has its files in ev63_01620)
        for f in evfiles.get(e[:10], []):
            if (a := re.match(re.escape(e[:10]) + r'_(.+?)_s(\d\d)_p\d\d_c\d+\.g4pk$', f)) and a[1] in waza: props[a[1]].add((e, a[2]))
    for e in evs:
        if e[:10] in waza and e[:10] not in props: props[e[:10]].add((e, '00'))
    if props: t['pr'] = [[p, sorted(v)] for p, v in sorted(props.items())]
    out.append(t)
dst = pathlib.Path(__file__).parent.parent / 'src' / 'data' / 'techniques.json'
dst.write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
print(len(out), 'moves ->', dst, '|', sum('x' in t for t in out), 'with more effect objects,', sum('pr' in t for t in out), 'with 3D props')
