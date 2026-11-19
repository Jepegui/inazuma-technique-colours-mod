"""Writes src/data/techniques.json from the VRFW ids workbook (mods\\VRFW\\VRFW ids.xlsx): every move of the base game that has
its own cut-in, with its names (en / pt / es), category, element, effect object and cut-in events.
Usage: python tools/make_techniques.py "path\\to\\VRFW ids.xlsx"   (needs openpyxl)"""
import json, re, sys, pathlib
import openpyxl
wb = openpyxl.load_workbook(sys.argv[1], read_only=True)
rows = wb['Techniques'].iter_rows(values_only=True); head = next(rows); ix = {k: i for i, k in enumerate(head)}
out, seen = [], set()
for r in rows:
    if r[ix['source']] != 'retail': continue
    ev = str(r[ix['event']] or ''); m = re.fullmatch(r'ev(\d\d)_(\d{5})(_\d)?', ev)
    if not m: continue
    t = {'k': r[ix['technique']], 'en': r[ix['name_en']], 'pt': r[ix['name_pt']], 'es': r[ix['name_es']], 'cat': r[ix['category']],
         'el': r[ix['element']], 'obj': f'ev{m[1]}{m[2]}0', 'ev': ev}   # the effect object: the cut-in's stem + 0 (ev60_00650 -> ev60006500)
    if r[ix['fail_event']]: t['fail'] = str(r[ix['fail_event']])
    if (t['en'], t['obj']) in seen: continue
    seen.add((t['en'], t['obj'])); out.append(t)
dst = pathlib.Path(__file__).parent.parent / 'src' / 'data' / 'techniques.json'
dst.write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
print(len(out), 'moves ->', dst)
