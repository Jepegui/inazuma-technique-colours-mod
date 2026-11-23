// ---- BC7 codec + G4TX container (BC7 tables and decode flow after bimg / texture2ddecoder, MIT / BSD-2) ----
const BC7 = (() => {
const P2 = [52428, 34952, 61166, 60616, 51328, 65260, 65224, 60544, 51200, 65516, 65152, 59392, 65512, 65280, 65520, 61440, 63248, 142, 28928, 2254, 140, 29456, 12544, 36046, 2188, 12560, 26214, 13932, 6120, 4080, 29070, 14748, 43690, 61680, 23130, 13260, 15420, 21930, 38550, 42330, 29646, 5064, 12876, 15324, 27030, 49980, 39270, 1632, 626, 1252, 20032, 10016, 51510, 37740, 14790, 25500, 37686, 40134, 33150, 59160, 52464, 4044, 30532, 60962];
const A2 = [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 2, 8, 2, 2, 8, 8, 15, 2, 8, 2, 2, 8, 8, 2, 2, 15, 15, 6, 8, 2, 8, 15, 15, 2, 8, 2, 2, 2, 15, 15, 6, 6, 2, 6, 8, 15, 15, 2, 2, 15, 15, 15, 15, 15, 2, 2, 15];
const FACT = [[0, 21, 43, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 9, 18, 27, 37, 46, 55, 64, 0, 0, 0, 0, 0, 0, 0, 0], [0, 4, 9, 13, 17, 21, 26, 30, 34, 38, 43, 47, 51, 55, 60, 64]];
const P3 = [2858963024, 1784303680, 1515864576, 1414570152, 2779054080, 2694860880, 1431675040, 1515868240, 2857697280, 2857719040, 2863289600, 2425393296, 2492765332, 2762253476, 2846200912, 705315408, 2777960512, 172118100, 2779096320, 1436590240, 2829603924, 1785348160, 2762231808, 437912832, 5285028, 2862977168, 342452500, 1768494080, 2693105056, 2860651540, 1352967248, 1784283648, 2846195712, 1351655592, 2829094992, 606348324, 11162880, 613566756, 608801316, 1352993360, 1342874960, 2863285316, 1717960704, 2778768800, 1352683680, 1764256040, 1152035396, 1717986816, 2856600644, 1420317864, 2508232064, 2526451200, 2824098984, 2157286784, 2853442580, 2526412800, 2863272980, 2689618080, 2695210400, 2516582400, 1082146944, 2846402984, 2863311428, 709513812];
const A3 = [[3, 3, 15, 15, 8, 3, 15, 15, 8, 8, 6, 6, 6, 5, 3, 3, 3, 3, 8, 15, 3, 3, 6, 10, 5, 8, 8, 6, 8, 5, 15, 15, 8, 15, 3, 5, 6, 10, 8, 15, 15, 3, 15, 5, 15, 15, 15, 15, 3, 15, 5, 5, 5, 8, 5, 10, 5, 10, 8, 13, 15, 12, 3, 3], [15, 8, 8, 3, 15, 15, 3, 8, 15, 15, 15, 15, 15, 15, 15, 8, 15, 8, 15, 3, 15, 8, 15, 8, 3, 15, 6, 10, 15, 15, 10, 8, 15, 3, 15, 10, 10, 8, 9, 10, 6, 15, 8, 15, 3, 6, 6, 8, 15, 3, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 3, 15, 15, 8]];
// subsets, partitionBits, rotationBits, indexSelBits, colorBits, alphaBits, endpointPBits, sharedPBits, indexBits0, indexBits1
const MODES = [[3,4,0,0,4,0,1,0,3,0],[2,6,0,0,6,0,0,1,3,0],[3,6,0,0,5,0,0,0,2,0],[2,6,0,0,7,0,1,0,2,0],
               [1,0,2,1,5,6,0,0,2,3],[1,0,2,0,7,8,0,0,2,2],[1,0,0,0,7,7,1,0,4,0],[2,6,0,0,5,5,1,0,2,0]];
function rd(d, o, pos, n) { let v = 0; for (let i = 0; i < n; i++) { const p = pos + i; v |= ((d[o + (p >> 3)] >> (p & 7)) & 1) << i; } return v; }
function expand(v, bits) { v = (v << (8 - bits)) & 255; return v | (v >> bits); }
// decodes one 16-byte block into out[0..63] (RGBA per pixel, row major)
function decodeBlock(d, o, out) {
  let mode = 0, pos = 0;
  while (mode < 8 && rd(d, o, pos++, 1) === 0) mode++;
  if (mode === 8) { out.fill(0); return; }
  const m = MODES[mode], ns = m[0], pb = m[6] || m[7];
  const part = rd(d, o, pos, m[1]); pos += m[1];
  const rot = rd(d, o, pos, m[2]); pos += m[2];
  const isel = rd(d, o, pos, m[3]); pos += m[3];
  const ep = [[], [], [], []];
  for (let c = 0; c < 3; c++) for (let i = 0; i < ns * 2; i++) { ep[c][i] = rd(d, o, pos, m[4]) << pb; pos += m[4]; }
  if (m[5]) for (let i = 0; i < ns * 2; i++) { ep[3][i] = rd(d, o, pos, m[5]) << pb; pos += m[5]; }
  else for (let i = 0; i < ns * 2; i++) ep[3][i] = 255;
  if (pb) for (let s = 0; s < ns; s++) {
    const pa = rd(d, o, pos, pb); pos += pb; let pbb = pa;
    if (!m[7]) { pbb = rd(d, o, pos, pb); pos += pb; }
    for (let c = 0; c < 4; c++) { if (c === 3 && !m[5]) continue; ep[c][s * 2] |= pa; ep[c][s * 2 + 1] |= pbb; }
  }
  const cb = m[4] + pb, ab = m[5] + pb;
  for (let i = 0; i < ns * 2; i++) { for (let c = 0; c < 3; c++) ep[c][i] = expand(ep[c][i], cb); if (m[5]) ep[3][i] = expand(ep[3][i], ab); }
  const ib0 = m[8], ib1 = m[9], has1 = ib1 !== 0;
  const f0 = FACT[ib0 - 2], f1 = has1 ? FACT[ib1 - 2] : f0;
  let off0 = pos, off1 = pos + (16 * ib0 - ns);
  for (let idx = 0; idx < 16; idx++) {
    let sub = 0, anchor = 0;
    if (ns === 2) { sub = (P2[part] >> idx) & 1; anchor = sub ? A2[part] : 0; }
    else if (ns === 3) { sub = (P3[part] >>> (2 * idx)) & 3; anchor = sub ? A3[sub - 1][part] : 0; }
    const an = idx === anchor ? 1 : 0;
    const n0 = ib0 - an, n1 = has1 ? ib1 - an : 0;
    const i0 = rd(d, o, off0, n0), i1 = has1 ? rd(d, o, off1, n1) : i0;
    off0 += n0; off1 += n1;
    const fc = isel ? f1[i1] : f0[i0], fa = isel ? f0[i0] : f1[i1];
    const s = sub * 2;
    let r = (ep[0][s] * (64 - fc) + ep[0][s + 1] * fc + 32) >> 6, g = (ep[1][s] * (64 - fc) + ep[1][s + 1] * fc + 32) >> 6,
        b = (ep[2][s] * (64 - fc) + ep[2][s + 1] * fc + 32) >> 6, a = (ep[3][s] * (64 - fa) + ep[3][s + 1] * fa + 32) >> 6;
    if (rot === 1) { const t = a; a = r; r = t; } else if (rot === 2) { const t = a; a = g; g = t; } else if (rot === 3) { const t = a; a = b; b = t; }
    out[idx * 4] = r; out[idx * 4 + 1] = g; out[idx * 4 + 2] = b; out[idx * 4 + 3] = a;
  }
}
// data: Uint8Array of BC7 blocks at offset o; returns RGBA Uint8ClampedArray (w*h*4)
function decode(d, o, w, h) {
  const out = new Uint8ClampedArray(w * h * 4), blk = new Uint8Array(64), bw = (w + 3) >> 2, bh = (h + 3) >> 2;
  let prev = -1;
  for (let by = 0; by < bh; by++) for (let bx = 0; bx < bw; bx++) {
    const p = o + (by * bw + bx) * 16;
    let same = prev >= 0;
    if (same) for (let i = 0; i < 16; i++) if (d[p + i] !== d[prev + i]) { same = false; break; }
    if (!same) { decodeBlock(d, p, blk); prev = p; }
    for (let y = 0; y < 4 && by * 4 + y < h; y++) for (let x = 0; x < 4 && bx * 4 + x < w; x++) {
      const q = ((by * 4 + y) * w + bx * 4 + x) * 4, s = (y * 4 + x) * 4;
      out[q] = blk[s]; out[q + 1] = blk[s + 1]; out[q + 2] = blk[s + 2]; out[q + 3] = blk[s + 3];
    }
  }
  return out;
}
// ---- encoder: mode 6 only (one subset, RGBA 7 bits + p bit, 4-bit indices)
const W4 = FACT[2];
function wr(d, o, pos, n, v) { for (let i = 0; i < n; i++) { const p = pos + i; if ((v >> i) & 1) d[o + (p >> 3)] |= 1 << (p & 7); } }
function quant(c, p) { // 8-bit endpoint with low bit p nearest to c
  let v = ((c - p + 1) >> 1 << 1) + p; if (v > 255) v -= 2; if (v < 0) v += 2; return v;
}
const _px = new Int32Array(64), _idx = new Uint8Array(16), _best = new Uint8Array(16);
function tryPair(px, a, b, flat, st) { // endpoints from pixels a and b; keeps the best in st
  const e0 = [0, 0, 0, 0], e1 = [0, 0, 0, 0];
  const combos = flat ? [[0, 0], [1, 1], [0, 1]] : [[0, 0], [0, 1], [1, 0], [1, 1]];
  for (const [p0, p1] of combos) {
    for (let c = 0; c < 4; c++) { e0[c] = quant(px[a * 4 + c], p0); e1[c] = quant(px[b * 4 + c], p1); }
    let err = 0;
    for (let i = 0; i < 16; i++) {
      let bi = 0, bd = Infinity;
      if (flat && i > 0) { bi = _idx[0]; bd = err / i; }
      else for (let k = 0; k < 16; k++) {
        const w = W4[k]; let dd = 0;
        for (let c = 0; c < 4; c++) { const t = ((e0[c] * (64 - w) + e1[c] * w + 32) >> 6) - px[i * 4 + c]; dd += t * t; }
        if (dd < bd) { bd = dd; bi = k; if (dd === 0) break; }
      }
      _idx[i] = bi; err += bd;
      if (err >= st.err) break;
    }
    if (err < st.err) { st.err = err; st.e0 = e0.slice(); st.e1 = e1.slice(); _best.set(_idx); if (err === 0) return; }
  }
}
function encodeBlock(px, d, o) { // px: 64 ints RGBA
  for (let i = 0; i < 16; i++) d[o + i] = 0;
  // distinct colours of the block (first pixel index of each)
  const uniq = [];
  for (let i = 0; i < 16; i++) {
    let seen = false;
    for (const u of uniq) if (px[u * 4] === px[i * 4] && px[u * 4 + 1] === px[i * 4 + 1] && px[u * 4 + 2] === px[i * 4 + 2] && px[u * 4 + 3] === px[i * 4 + 3]) { seen = true; break; }
    if (!seen) uniq.push(i);
  }
  const st = { err: Infinity, e0: null, e1: null };
  if (uniq.length === 1) tryPair(px, 0, 0, true, st);
  else if (uniq.length <= 6) { // every pair of colours as the line's ends
    for (let i = 0; i < uniq.length && st.err > 0; i++) for (let j = i + 1; j < uniq.length && st.err > 0; j++) tryPair(px, uniq[i], uniq[j], false, st);
  } else { // the two most distant pixels
    let a = 0, b = 0, far = -1;
    for (let i = 0; i < 16; i++) for (let j = i + 1; j < 16; j++) {
      let dd = 0; for (let c = 0; c < 4; c++) { const t = px[i * 4 + c] - px[j * 4 + c]; dd += t * t; }
      if (dd > far) { far = dd; a = i; b = j; }
    }
    tryPair(px, a, b, false, st);
  }
  let E0 = st.e0, E1 = st.e1;
  if (_best[0] >= 8) { E0 = st.e1; E1 = st.e0; for (let i = 0; i < 16; i++) _best[i] = 15 - _best[i]; }
  let pos = 7; wr(d, o, 6, 1, 1);
  for (let c = 0; c < 4; c++) { wr(d, o, pos, 7, E0[c] >> 1); pos += 7; wr(d, o, pos, 7, E1[c] >> 1); pos += 7; }
  wr(d, o, pos++, 1, E0[0] & 1); wr(d, o, pos++, 1, E1[0] & 1);
  wr(d, o, pos, 3, _best[0]); pos += 3;
  for (let i = 1; i < 16; i++) { wr(d, o, pos, 4, _best[i]); pos += 4; }
}
// rgba (w*h*4, w and h multiples of 4 or smaller than 4) -> writes blocks into d at o; returns bytes written
function encode(rgba, w, h, d, o) {
  const bw = (w + 3) >> 2, bh = (h + 3) >> 2;
  let prevKey = null, prevAt = -1;
  for (let by = 0; by < bh; by++) for (let bx = 0; bx < bw; bx++) {
    let same = prevAt >= 0;
    for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) {
      const sx = Math.min(w - 1, bx * 4 + x), sy = Math.min(h - 1, by * 4 + y), q = (sy * w + sx) * 4, s = (y * 4 + x) * 4;
      for (let c = 0; c < 4; c++) { const v = rgba[q + c]; if (_px[s + c] !== v) { same = false; _px[s + c] = v; } }
    }
    const p = o + (by * bw + bx) * 16;
    if (same) { for (let i = 0; i < 16; i++) d[p + i] = d[prevAt + i]; }
    else { encodeBlock(_px, d, p); prevAt = p; }
  }
  return bw * bh * 16;
}
function halve(rgba, w, h) { // 2x2 box filter
  const nw = Math.max(1, w >> 1), nh = Math.max(1, h >> 1), out = new Uint8ClampedArray(nw * nh * 4);
  for (let y = 0; y < nh; y++) for (let x = 0; x < nw; x++) for (let c = 0; c < 4; c++) {
    const x0 = Math.min(w - 1, x * 2), x1 = Math.min(w - 1, x * 2 + 1), y0 = Math.min(h - 1, y * 2), y1 = Math.min(h - 1, y * 2 + 1);
    out[(y * nw + x) * 4 + c] = (rgba[(y0 * w + x0) * 4 + c] + rgba[(y0 * w + x1) * 4 + c] + rgba[(y1 * w + x0) * 4 + c] + rgba[(y1 * w + x1) * 4 + c] + 2) >> 2;
  }
  return { data: out, w: nw, h: nh };
}
return { decode, encode, halve, decodeBlock, encodeBlock };
})();

const G4TX = (() => {
const u16 = (d, o) => d[o] | d[o + 1] << 8, u32 = (d, o) => (d[o] | d[o + 1] << 8 | d[o + 2] << 16 | d[o + 3] << 24) >>> 0;
const al = (n, a) => Math.ceil(n / a) * a;
// d: Uint8Array of at least the header and tables. Returns the entries with absolute offsets.
function parse(d) {
  if (String.fromCharCode(d[0], d[1], d[2], d[3]) !== 'G4TX') throw new Error('not a G4TX file');
  const hdr = u16(d, 4), tableSize = u32(d, 0xc), n = u16(d, 0x20), total = u16(d, 0x22);
  const dataStart = al(hdr + tableSize, 16);
  let p = hdr + n * 0x30 + (total - n) * 0 ; p += 4 * total; p += total; p = al(p, 4);
  const ents = [];
  for (let i = 0; i < n; i++) {
    const o = hdr + i * 0x30, noff = u16(d, p + i * 2);
    let s = '', q = p + noff; while (d[q]) s += String.fromCharCode(d[q++]);
    const off = dataStart + u32(d, o + 4), size = u32(d, o + 8);
    ents.push({ name: s, off, size, w: u16(d, o + 0x18), h: u16(d, o + 0x1a), mips: d[o + 0x11] });
  }
  return { ents, dataStart, simple: n === total };
}
// DDS inside an entry: returns {bc7, pix (offset of mip 0)}
function dds(d, e) {
  const o = e.off, dx10 = String.fromCharCode(d[o + 0x54], d[o + 0x55], d[o + 0x56], d[o + 0x57]) === 'DX10';
  const fmt = dx10 ? u32(d, o + 0x80) : 0;
  return { bc7: dx10 && (fmt === 98 || fmt === 99), pix: o + 0x94, w: u32(d, o + 16), h: u32(d, o + 12), mips: u32(d, o + 28) || 1 };
}
const mipSize = (w, h, l) => (((Math.max(1, w >> l) + 3) >> 2) * ((Math.max(1, h >> l) + 3) >> 2)) * 16;
function mipOffset(info, l) { let o = info.pix; for (let i = 0; i < l; i++) o += mipSize(info.w, info.h, i); return o; }
function decodeEntry(d, e, level = 0) {
  const info = dds(d, e); if (!info.bc7) return null;
  const w = Math.max(1, info.w >> level), h = Math.max(1, info.h >> level);
  return { data: BC7.decode(d, mipOffset(info, level), w, h), w, h };
}
// writes rgba (same size as the entry) over the entry's mip chain, in place
function replaceEntry(d, e, rgba) {
  const info = dds(d, e); if (!info.bc7) throw new Error('texture without BC7: ' + e.name);
  let cur = { data: rgba, w: info.w, h: info.h }, o = info.pix;
  for (let l = 0; l < info.mips; l++) {
    if (l) cur = BC7.halve(cur.data, cur.w, cur.h);
    o += BC7.encode(cur.data, cur.w, cur.h, d, o);
  }
  if (o > e.off + e.size) throw new Error('unexpected size in ' + e.name);
}
// builds a simple G4TX (one DDS per entry, ntex == ntotal) from a template (head bytes, entry fields, DDS header) and BC7 blobs
function build(tpl, names, blobs) {
  const hex = h => Uint8Array.from(h.match(/../g).map(x => parseInt(x, 16)));
  const crc = s => { let c = ~0; for (let i = 0; i < s.length; i++) { c ^= s.charCodeAt(i); for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xEDB88320 & -(c & 1)); } return ~c >>> 0; };
  const head = hex(tpl.head), hdr = head.length, n = names.length, ddsHead = hex(tpl.dds);
  const datas = blobs.map(b => { const d = new Uint8Array(ddsHead.length + b.length); d.set(ddsHead); d.set(b, ddsHead.length); return d; });
  const hashes = names.map(crc), idx = [...Array(n).keys()].sort((a, b) => hashes[a] - hashes[b]);
  const entSize = n * 0x30, oHash = entSize, oIdx = oHash + 4 * n, oNoff = al(oIdx + n, 4), first = al(2 * n, 4) + 4;
  const enc = names.map(s => Uint8Array.from([...s].map(c => c.charCodeAt(0)).concat([0])));
  const blobLen = enc.reduce((a, b) => a + b.length, 0), tableSize = al(oNoff + first + blobLen, 4), dataStart = al(hdr + tableSize, 16);
  let total = 0; const offs = datas.map(d => { const o = total; total = al(total + d.length, 16); return o; });
  const out = new Uint8Array(dataStart + total), dv = new DataView(out.buffer);
  out.set(head);
  dv.setUint32(0x0c, tableSize, true); dv.setUint16(0x20, n, true); dv.setUint16(0x22, n, true); dv.setUint32(0x2c, total, true);
  const sh = [entSize / 4, oHash / 4, (dataStart - hdr) / 4, oIdx / 4, entSize / 4, oHash / 4, oNoff / 4];
  dv.setUint32(0x38, sh[0], true); for (let i = 1; i < 7; i++) dv.setUint16(0x3c + (i - 1) * 2, sh[i], true);
  for (let i = 0; i < n; i++) {
    const e = tpl.ents[Math.min(i, tpl.ents.length - 1)], o = hdr + i * 0x30, d = datas[i];
    dv.setUint32(o, e.unk0, true); dv.setUint32(o + 4, offs[i], true); dv.setUint32(o + 8, d.length, true);
    dv.setUint32(o + 12, u32(d, 20), true); out[o + 16] = e.fmt; out[o + 17] = u32(d, 28); out[o + 18] = e.b2; out[o + 19] = e.b3;
    dv.setUint32(o + 20, e.k, true); dv.setUint16(o + 24, u32(d, 16), true); dv.setUint16(o + 26, u32(d, 12), true); dv.setUint32(o + 28, e.depth, true);
    out.set(hex(e.tail), o + 32);
    dv.setUint32(hdr + oHash + i * 4, hashes[i], true); out[hdr + oIdx + i] = idx[i];
  }
  let q = 0;
  for (let i = 0; i < n; i++) { dv.setUint16(hdr + oNoff + i * 2, first + q, true); out.set(enc[i], hdr + oNoff + first + q); q += enc[i].length; }
  datas.forEach((d, i) => out.set(d, dataStart + offs[i]));
  return out;
}
return { parse, dds, decodeEntry, replaceEntry, mipOffset, mipSize, build };
})();
if (typeof module !== 'undefined') module.exports = { BC7, G4TX };
