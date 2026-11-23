"""Builds src/data/spirits.json: the game's keshins (warrior spirits) and totems that a copy can be made of.
Inputs (on the developer's PC, not shipped): VRFW ids.xlsx (mods/VRFW), the aura table, the model table and the scenes' tag words VRFW builds in
its cache (types/technique/.../aura_skill_config_*.cfg.bin, types/table/.../chara_model_*.cfg.bin,
types/technique/.../event/event_tag_word_replace_config_*.cfg.bin), read with the
Atelier Inazuma's cfgbin.py (MIT). Only names, keys and codes are kept."""
import sys, json, zlib, openpyxl
XLSX, AURA, MODEL, CFGBIN, OUT, TAGS = sys.argv[1:7]
sys.path.insert(0, CFGBIN); import cfgbin
wb = openpyxl.load_workbook(XLSX, read_only=True)
A = list(wb['Auras'].iter_rows(values_only=True))
T = {r[0]: r for r in list(wb['Techniques'].iter_rows(values_only=True))[1:]}
cards = {r[0]: r for r in list(wb['Cards'].iter_rows(values_only=True))[1:]}
info = {(v[0] & 0xffffffff): v for k, v in cfgbin.parse(AURA) if k == 'AURA_CMD_INFO'}
mrow = {(v[0] & 0xffffffff): v for k, v in cfgbin.parse(MODEL) if k == 'CHARA_MODEL_INFO'}
ka = {zlib.crc32(('ka%04d01' % i).encode()): 'ka%04d01' % i for i in range(100)}
evn = {zlib.crc32(s.encode()): s for pre in ('ev80', 'ev81', 'ev83') for n in range(0, 1000, 10) for s in (f'{pre}_{n:05d}', f'{pre}_{n:05d}_1', f'{pre}_{n:05d}_2')}
byid = {(r[2] or 0) & 0xffffffff: r[0] for r in T.values() if r[2]}
L = ['en', 'de', 'es', 'fr', 'it', 'ja', 'pt', 'zh_hans', 'zh_hant']
out, armed = [], {}
# the scenes' tag words (event_tag_word_replace_config): a spirit whose word stands for another spirit's code in some
# scenes takes that spirit's animations there (Firebird k000400 does Thunderclaw with Thunderbird k000120's)
codes = {zlib.crc32(c.encode()): c for n in range(3000) for c in ('k%06d' % n, 'a%06d' % n)}
alias = {}
for k, v in cfgbin.parse(TAGS):
    if k == 'EVENT_ASSIGN_TAG_WORD_REPLACE_TARGET' and (v[0] & 0xffffffff) in codes and codes[v[0] & 0xffffffff] != v[1] and v[1] in codes.values():
        alias.setdefault(codes[v[0] & 0xffffffff], set()).add(v[1])
# auras whose code has no model of its own in chara_model: the model their scenes show (Plasma Shadow SH/DF/GK show AT's)
MODEL_OF = {'k000730': 'k000720', 'k000740': 'k000720', 'k000750': 'k000720'}
for r in A[1:]:
    if r[3] != 'armed' or not r[17] or r[0] in armed: continue
    c = cards.get(r[17]); ch = c[2] if c else None
    m = mrow.get(zlib.crc32(('mdl_' + ch).encode())) if ch else None
    a = next((ka[x & 0xffffffff] for x in (m or []) if isinstance(x, int) and (x & 0xffffffff) in ka), None)
    if a: armed.setdefault(r[16], []).append({'key': r[0], 'chara': ch, 'ka': a})
for r in A[1:]:
    # the shoot ones (kind keshin / soul) and the offence, defence and keeper ones (kind other, keys wko/wkd/wkk, wso/wsd/wsk)
    if not r[16] or not (r[3] in ('keshin', 'soul') or r[3] == 'other' and str(r[0])[:2] in ('wk', 'ws') and '_' not in str(r[0])): continue
    v = info.get(r[2] & 0xffffffff)
    if not v: continue
    ev = evn.get(v[12] & 0xffffffff)
    lk = byid.get(v[6] & 0xffffffff) if v[6] else None
    d = {'key': r[0], 'kind': 'keshin' if str(r[0]).startswith('wk') else 'totem', 'code': r[16], 'n': {l: r[4 + i] for i, l in enumerate(L)},
         'ev': [ev, ev[:-1] + '2'] if ev and ev.endswith('_1') else [ev] if ev else [], 'pw': [r[13], r[14]]}
    if r[16] in MODEL_OF: d['mdl'] = MODEL_OF[r[16]]
    elif zlib.crc32(('mdl_' + r[16]).encode()) not in mrow: print('no model row for', r[16], r[0])
    if alias.get(r[16]): d['al'] = sorted(alias[r[16]])
    d['el'] = {1: 'wind', 2: 'forest', 3: 'fire', 4: 'mountain', 5: 'void'}.get(v[8], 'fire')   # its element (AURA_CMD_INFO cell 8)
    if lk: d['lk'], d['lev'], d['lnm'] = lk, T[lk][19], T[lk][3]
    if lk: d['ln'] = {l: T[lk][3 + i] for i, l in enumerate(L) if T[lk][3 + i] and T[lk][3 + i] != T[lk][3]}   # its name in the other languages
    if lk and T[lk][20]: d['lfail'] = T[lk][20]
    if d['kind'] == 'keshin' and armed.get(r[16]): d['armed'] = armed[r[16]][0]
    out.append(d)
json.dump(out, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
# the move scenes whose events are <scene>_1 / <scene>_2 (success / failure), next to it
import os
split = sorted({e[:-2] for r in T.values() for e in (r[19], r[20]) if e and e.count('_') > 1 and e[-2:] in ('_1', '_2')})
json.dump(split, open(os.path.join(os.path.dirname(OUT), 'split_scenes.json'), 'w'), separators=(',', ':'))
print(len(out), 'spirits,', sum('armed' in d for d in out), 'with an armour')
