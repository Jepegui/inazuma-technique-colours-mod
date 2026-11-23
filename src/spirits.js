// ---------- keshins (warrior spirits) and totems: recoloured copies with a colour for each part
// A copy is made from the game's own files of the spirit, which the user keeps in a folder of theirs (one «pack» per spirit,
// with the game's common/ and dx11/ folders): its model, texture, animations of every scene and icon, copied under a code of
// the mod's own (k6BBNNN / a6BBNNN, the armour ka6BBNNN). The method follows Atelier Inazuma's (esprits.py, MIT): only the
// entry names of the packs change, the texture keeps its image names. The app writes them into its own mod folder only.
// renamePack and renameTex are ports of Atelier Inazuma's renommer_paquet and bustes.renommer:
// Copyright (c) 2026 muku, MIT License (src/lib/LICENSE-AtelierInazuma.txt).
const SPIRITS = /*SPIRITS*/[];
// the moves of a spirit whose scene shows the spirit itself (not the one the player has): a copy of the move is needed (surveys of 23/11/2026)
const SPIRIT_FIXED = new Set(["whs01780", "whs01790", "whs01860", "whs01865", "whs01890", "whs01900", "whd01170", "whd01180", "whk00980", "who10020", "whd10050"]);
// move scenes whose events are <scene>_1 and <scene>_2 (success and failure: the keeper moves and some defence moves)
const SPIRIT_SPLIT = new Set(/*SPLIT*/[]);
// move scenes that have a sound group (their [[event_env]] takes snd_tag_words)
const SPIRIT_SND = new Set(["ev60_02690", "ev60_02700", "ev60_02710", "ev60_02720", "ev60_02730", "ev60_02740", "ev61_01330", "ev61_01340", "ev61_01350", "ev61_01360", "ev61_01370", "ev61_01380", "ev61_01390", "ev62_01400", "ev62_01410", "ev62_01420", "ev62_01430", "ev62_01440", "ev62_01450", "ev63_01340_1", "ev63_01340_2", "ev63_01350_1", "ev63_01350_2", "ev63_01360_1", "ev63_01360_2", "ev63_01370_1", "ev63_01370_2", "ev63_01380_1", "ev63_01380_2", "ev63_01390_1", "ev63_01390_2"]);   // (surveys of 23/11/2026: the totems' moves)
Object.assign(PT, {
  'Connect the folder of the keshin and totem files first (on the left, under the mods folder).': 'Liga primeiro a pasta dos ficheiros das keshins e totens (à esquerda, por baixo da pasta mods).',
  'Keshin and totem files: connected': 'Ficheiros das keshins e totens: ligados', 'Reconnect the keshin and totem files «{name}»': 'Voltar a ligar os ficheiros das keshins e totens «{name}»',
  'Choose the folder of the keshin and totem files…': 'Escolher a pasta dos ficheiros das keshins e totens…', 'Another folder…': 'Outra pasta…',
  'Needed for the keshins and totems: the «pack» folder that comes with the app (the game\'s files of each keshin and totem).': 'Precisa-se para as keshins e totens: a pasta «pack» que vem com a app (os ficheiros do jogo de cada keshin e totem).',
  '⚠ This mod has {n} keshin(s)/totem(s): connect their files before «Generate the mod», or they will not be updated.': '⚠ Este mod tem {n} keshin(s)/totem(s): liga os ficheiros deles antes de «Gerar o mod», senão não são atualizados.',
  'The folder of the keshin and totem files is not connected: your {n} keshin(s)/totem(s) will not be written (the ones written before stay as they were). Generate the mod anyway?': 'A pasta dos ficheiros das keshins e totens não está ligada: as tuas {n} keshin(s)/totem(s) não vão ser escritas (as que já estavam ficam como estavam). Gerar o mod mesmo assim?',
  'The keshin\'s ({el})': 'O da keshin ({el})', 'the move of «{s}» (not sold: it comes with the keshin or totem)': 'a técnica de «{s}» (não é vendida: vem com a keshin ou totem)',
  'Back to the original move': 'Voltar à técnica original', 'Back to «{s}»': 'Voltar a «{s}»', '{el} · from {en} · the move of «{s}»': '{el} · de {en} · a técnica de «{s}»',
  'Its move': 'A sua técnica', 'Edit its move…': 'Editar a técnica…', 'Customise its move…': 'Personalizar a técnica…',
  '«{m}»: its own colours, name, element and TP/power (it comes with the keshin or totem, it is not sold).': '«{m}»: cores, nome, elemento e TP/poder próprios (vem com a keshin ou totem, não é vendida).',
  '«{m}», as in the game. Give it colours, a name, an element and TP/power of its own (it stays tied to this keshin or totem, it is not sold):': '«{m}», como no jogo. Dá-lhe cores, nome, elemento e TP/poder próprios (fica ligada a esta keshin ou totem, não é vendida):',
  'Create the copy first; then its move «{m}» can get colours, a name and TP/power of its own.': 'Cria primeiro a cópia; depois a técnica «{m}» pode ter cores, nome e TP/poder próprios.',
  'Name banner': 'Nome no ecrã', 'Its move «{m}» takes it too.': 'A técnica «{m}» também fica com ele.',
  'The name shown when it is summoned (the colours of its element, like the moves\' names):': 'O nome que aparece ao invocar (com as cores do elemento, como o nome das técnicas):',
  'Moves': 'Técnicas', 'Keshins & totems': 'Keshins e totens',
  'Search the keshin or totem…': 'Procurar a keshin ou o totem…',
  'Keshin': 'Keshin', 'Totem': 'Totem', 'Shot': 'Remate', 'Offence': 'Ataque', 'Defence': 'Defesa', 'Keeper': 'Guarda-redes',
  'Choose on the left the keshin or totem you want in other colours.': 'Escolhe à esquerda a keshin ou o totem que queres noutras cores.',
  'Folder of the keshin and totem files…': 'Pasta dos ficheiros das keshins e totens…',
  'The copies are made from the game\'s own files of each keshin and totem (model, texture, animations, icon), in a folder of yours: one folder per keshin or totem with the game\'s common and dx11 folders inside.': 'As cópias são feitas a partir dos ficheiros do próprio jogo de cada keshin e totem (modelo, textura, animações, ícone), numa pasta tua: uma pasta por keshin ou totem, com as pastas common e dx11 do jogo lá dentro.',
  'Folder «{name}»: files of {n} keshins and totems.': 'Pasta «{name}»: ficheiros de {n} keshins e totens.',
  'The files of this one are not in the folder ({missing}).': 'Os ficheiros desta não estão na pasta ({missing}).',
  'Choose the folder of the keshin and totem files first (above).': 'Escolhe primeiro a pasta dos ficheiros das keshins e totens (em cima).',
  'Reading the files…': 'A ler os ficheiros…',
  'Colour groups': 'Grupos de cor', 'Keep': 'Manter', 'New colour': 'Nova cor',
  'The texture is split into its main colours: give each group a new colour or keep it. The shading stays.': 'A textura é dividida nas cores principais: dá a cada grupo uma cor nova ou mantém-no. As sombras ficam.',
  'Texture (before → after) and icon': 'Textura (antes → depois) e ícone',
  'Armour (Armed)': 'Armadura (Armed)', 'Also make its armour, in colours of its own': 'Fazer também a armadura, com cores próprias',
  'Any player who has the keshin can wear it (with Character Reforged).': 'Qualquer jogador que tenha a keshin a pode vestir (com o Character Reforged).',
  'The armour needs Character Reforged in the mods folder.': 'A armadura precisa do Character Reforged na pasta mods.',
  'Create': 'Criar', 'New {kind}: {name}': '{kind} nova: {name}',
  '{kind} · copy of {name} ({code})': '{kind} · cópia de {name} ({code})',
  '{price} tokens · copy of {en}': '{price} fichas · cópia de {en}',
  'Your keshins and totems': 'As tuas keshins e totens',
  'A recoloured copy of {name}.': 'Uma cópia recolorida de {name}.',
  'Delete «{name}»? Take it off your players in the game first.': 'Apagar «{name}»? Tira-a primeiro aos jogadores no jogo.',
  'Making the copies of the keshins and totems ({i}/{n})…': 'A fazer as cópias das keshins e totens ({i}/{n})…',
  'Moves written. The keshins and totems were left as they were: to write them, connect the folder of their files first (on the left).': 'Técnicas escritas. As keshins e totens ficaram como estavam: para as escrever, escolhe primeiro a pasta dos ficheiros (em «Keshins e totens»).',
  'Mod generated in mods\\{mod}: {n} move(s), {s} keshin(s)/totem(s). Switch «{name}» on in the launcher; the keshins and totems are sold in Inazuma Fantasy\'s Training Shop.': 'Mod gerado em mods\\{mod}: {n} técnica(s), {s} keshin(s)/totem(s). Liga «{name}» no launcher; as keshins e totens estão à venda na Training Shop do Inazuma Fantasy.',
});
Object.assign(ES, {
  'Connect the folder of the keshin and totem files first (on the left, under the mods folder).': 'Conecta primero la carpeta de los archivos de las keshins y tótems (a la izquierda, debajo de la carpeta mods).',
  'Keshin and totem files: connected': 'Archivos de keshins y tótems: conectados', 'Reconnect the keshin and totem files «{name}»': 'Volver a conectar los archivos de keshins y tótems «{name}»',
  'Choose the folder of the keshin and totem files…': 'Elegir la carpeta de los archivos de keshins y tótems…', 'Another folder…': 'Otra carpeta…',
  'Needed for the keshins and totems: the «pack» folder that comes with the app (the game\'s files of each keshin and totem).': 'Necesaria para las keshins y tótems: la carpeta «pack» que viene con la aplicación (los archivos del juego de cada keshin y tótem).',
  '⚠ This mod has {n} keshin(s)/totem(s): connect their files before «Generate the mod», or they will not be updated.': '⚠ Este mod tiene {n} keshin(s)/tótem(s): conecta sus archivos antes de «Generar el mod» o no se actualizarán.',
  'The folder of the keshin and totem files is not connected: your {n} keshin(s)/totem(s) will not be written (the ones written before stay as they were). Generate the mod anyway?': 'La carpeta de los archivos de keshins y tótems no está conectada: tus {n} keshin(s)/tótem(s) no se escribirán (las de antes se quedan como estaban). ¿Generar el mod igualmente?',
  'The keshin\'s ({el})': 'El de la keshin ({el})', 'the move of «{s}» (not sold: it comes with the keshin or totem)': 'la técnica de «{s}» (no se vende: viene con la keshin o el tótem)',
  'Back to the original move': 'Volver a la técnica original', 'Back to «{s}»': 'Volver a «{s}»', '{el} · from {en} · the move of «{s}»': '{el} · de {en} · la técnica de «{s}»',
  'Its move': 'Su técnica', 'Edit its move…': 'Editar la técnica…', 'Customise its move…': 'Personalizar la técnica…',
  '«{m}»: its own colours, name, element and TP/power (it comes with the keshin or totem, it is not sold).': '«{m}»: colores, nombre, elemento y PT/poder propios (viene con la keshin o el tótem, no se vende).',
  '«{m}», as in the game. Give it colours, a name, an element and TP/power of its own (it stays tied to this keshin or totem, it is not sold):': '«{m}», como en el juego. Dale colores, nombre, elemento y PT/poder propios (queda ligada a esta keshin o tótem, no se vende):',
  'Create the copy first; then its move «{m}» can get colours, a name and TP/power of its own.': 'Crea primero la copia; luego su técnica «{m}» puede tener colores, nombre y PT/poder propios.',
  'Name banner': 'Nombre en pantalla', 'Its move «{m}» takes it too.': 'Su técnica «{m}» también lo toma.',
  'The name shown when it is summoned (the colours of its element, like the moves\' names):': 'El nombre que aparece al invocarlo (con los colores de su elemento, como el nombre de las técnicas):',
  'Moves': 'Técnicas', 'Keshins & totems': 'Keshins y tótems',
  'Search the keshin or totem…': 'Buscar el keshin o el tótem…',
  'Keshin': 'Keshin', 'Totem': 'Tótem', 'Shot': 'Tiro', 'Offence': 'Ataque', 'Defence': 'Defensa', 'Keeper': 'Portero',
  'Choose on the left the keshin or totem you want in other colours.': 'Elige a la izquierda el keshin o el tótem que quieres en otros colores.',
  'Folder of the keshin and totem files…': 'Carpeta de los archivos de keshins y tótems…',
  'The copies are made from the game\'s own files of each keshin and totem (model, texture, animations, icon), in a folder of yours: one folder per keshin or totem with the game\'s common and dx11 folders inside.': 'Las copias se hacen con los archivos del propio juego de cada keshin y tótem (modelo, textura, animaciones, icono), en una carpeta tuya: una carpeta por keshin o tótem con las carpetas common y dx11 del juego dentro.',
  'Folder «{name}»: files of {n} keshins and totems.': 'Carpeta «{name}»: archivos de {n} keshins y tótems.',
  'The files of this one are not in the folder ({missing}).': 'Los archivos de este no están en la carpeta ({missing}).',
  'Choose the folder of the keshin and totem files first (above).': 'Elige primero la carpeta de los archivos de keshins y tótems (arriba).',
  'Reading the files…': 'Leyendo los archivos…',
  'Colour groups': 'Grupos de color', 'Keep': 'Mantener', 'New colour': 'Nuevo color',
  'The texture is split into its main colours: give each group a new colour or keep it. The shading stays.': 'La textura se divide en sus colores principales: da a cada grupo un color nuevo o mantenlo. Las sombras se quedan.',
  'Texture (before → after) and icon': 'Textura (antes → después) e icono',
  'Armour (Armed)': 'Armadura (Armed)', 'Also make its armour, in colours of its own': 'Hacer también su armadura, con colores propios',
  'Any player who has the keshin can wear it (with Character Reforged).': 'Cualquier jugador que tenga el keshin puede llevarla (con Character Reforged).',
  'The armour needs Character Reforged in the mods folder.': 'La armadura necesita Character Reforged en la carpeta mods.',
  'Create': 'Crear', 'New {kind}: {name}': '{kind} nuevo: {name}',
  '{kind} · copy of {name} ({code})': '{kind} · copia de {name} ({code})',
  '{price} tokens · copy of {en}': '{price} fichas · copia de {en}',
  'Your keshins and totems': 'Tus keshins y tótems',
  'A recoloured copy of {name}.': 'Una copia recoloreada de {name}.',
  'Delete «{name}»? Take it off your players in the game first.': '¿Borrar «{name}»? Quítaselo antes a tus jugadores en el juego.',
  'Making the copies of the keshins and totems ({i}/{n})…': 'Haciendo las copias de los keshins y tótems ({i}/{n})…',
  'Moves written. The keshins and totems were left as they were: to write them, connect the folder of their files first (on the left).': 'Técnicas escritas. Los keshins y tótems se quedaron como estaban: para escribirlos, elige primero la carpeta de sus archivos (en «Keshins y tótems»).',
  'Mod generated in mods\\{mod}: {n} move(s), {s} keshin(s)/totem(s). Switch «{name}» on in the launcher; the keshins and totems are sold in Inazuma Fantasy\'s Training Shop.': 'Mod generado en mods\\{mod}: {n} técnica(s), {s} keshin(s)/tótem(s). Activa «{name}» en el launcher; los keshins y tótems se venden en la Training Shop de Inazuma Fantasy.',
});

// ---------- the user's folder of files: every file by its name (a spirit's files have its code in their names)
let packRoot = null, packIndex = null, crRows = null, packSaved = null;
// the folder is remembered (IndexedDB) and reconnected with one click: the browser asks again, in the click itself
const packDb = () => new Promise((ok, no) => { const r = indexedDB.open('techcolours', 1); r.onupgradeneeded = () => r.result.createObjectStore('h'); r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error); });
const packStore = async (mode, f) => { const db = await packDb(); return new Promise((ok, no) => { const tx = db.transaction('h', mode), q = f(tx.objectStore('h')); tx.oncomplete = () => ok(q && q.result); tx.onerror = () => no(tx.error); }); };
async function packUse(h) {
  packRoot = h; $('#packwhere').textContent = T('Reading the files…');
  packIndex = await indexPacks(h); texCache.clear();
  try { await packStore('readwrite', st => st.put(h, 'packs')); } catch (e) { /* not remembered */ }
  packUi(); if (MODE === 'spirits') { renderSpiritList(); if (MODE_SPIRIT) openSpirit(MODE_SPIRIT.o, MODE_SPIRIT.edit); }
}
function packUi() {
  const b = $('#packpick'); if (!b) return;
  const n = (state.spirits || []).length;
  if (packIndex) {
    b.textContent = T('Keshin and totem files: connected'); b.className = '';
    $('#packwhere').textContent = T('Folder «{name}»: files of {n} keshins and totems.', { name: packRoot.name, n: SPIRITS.filter(x => !spiritMissing(x).length).length });
  } else {
    b.textContent = packSaved ? T('Reconnect the keshin and totem files «{name}»', { name: packSaved.name }) : T('Choose the folder of the keshin and totem files…'); b.className = 'primary';
    $('#packwhere').textContent = T('Needed for the keshins and totems: the «pack» folder that comes with the app (the game\'s files of each keshin and totem).');
  }
  $('#packother').hidden = !packSaved || !!packIndex; $('#packother').textContent = T('Another folder…');
  $('#packwarn').hidden = !!packIndex || !n; $('#packwarn').textContent = T('⚠ This mod has {n} keshin(s)/totem(s): connect their files before «Generate the mod», or they will not be updated.', { n });
}
function packFlash() { const b = $('#packbar'); if (!b) return; b.scrollIntoView({ block: 'nearest' }); b.animate([{ outline: '3px solid #f5b301' }, { outline: '3px solid transparent' }], { duration: 1200, iterations: 2 }); }
const packPick = async () => { let h; try { h = await window.showDirectoryPicker({ id: 'techcolours-packs', mode: 'read' }); } catch (e) { return; } await packUse(h); };
$('#packpick').onclick = async () => {
  if (packIndex) return packPick();
  if (packSaved) {   // the remembered folder: the permission asked in the click itself
    let ok = false; try { ok = (await packSaved.requestPermission({ mode: 'read' })) === 'granted'; } catch (e) { ok = false; }
    if (ok) return packUse(packSaved);
    packSaved = null; packUi(); return;
  }
  return packPick();
};
$('#packother').onclick = packPick;
(async () => {   // at start: the folder of last time, used at once if the browser still allows it
  try { packSaved = await packStore('readonly', st => st.get('packs')) || null; } catch (e) { packSaved = null; }
  if (packSaved) { try { if ((await packSaved.queryPermission({ mode: 'read' })) === 'granted') { await packUse(packSaved); return; } } catch (e) { packSaved = null; } }
  packUi();
})();   // crRows: Character Reforged's armour meshes by model (ka……)
async function indexPacks(dir) {
  const idx = new Map();
  const walk = async (d, path) => { for await (const [n, h] of d.entries()) {
    if (h.kind === 'directory') { if (n !== 'png' && n !== 'texturas') await walk(h, path.concat(n)); }
    else if (/\.(g4pkm|g4mg|g4md|g4pk|g4tx|objbin)$/.test(n)) { if (!idx.has(n)) idx.set(n, []); idx.get(n).push({ path: path.join('/'), h }); }
  } };
  await walk(dir, []);
  return idx;
}
const packFile = (name, where) => (packIndex && packIndex.get(name) || []).find(f => !where || where.test(f.path + '/'));
const packBytes = async f => new Uint8Array(await (await f.h.getFile()).arrayBuffer());
const spiritDir = o => o.kind === 'keshin' ? '_keshin' : '_waza';
// what a copy of the spirit needs: model, texture (in chr/, not the name banners), icon
// the model of a spirit: its own code, or the code of the model it shows (Plasma Shadow SH, k000740, shows k000720's)
const spiritModel = o => o.mdl || o.code;
const spiritIcon = o => [o.code, spiritModel(o)].map(c => ({ c, f: packFile(c + '_l.g4tx', /aura_(fs|soul)\//) })).find(x => x.f) || { c: o.code, f: null };
const spiritFiles = o => { const M = spiritModel(o); return { pkm: packFile(M + '.g4pkm'), mg: packFile(M + '.g4mg'), obj: packFile(M + '.objbin'),
  tex: packFile(M + '.g4tx', /\/chr\//), icon: spiritIcon(o).f }; };
// its name banner: the menu object that shows it (soccer10_01_<code>) and its picture in every language (telop_waza/<lang>/<code>)
const TELOP_LANGS = ['', 'de', 'en', 'es', 'fr', 'it', 'pt', 'zh_hans', 'zh_hant'];
const spiritTelop = o => { const obj = packFile(`soccer10_01_${o.code}.objbin`), tex = TELOP_LANGS.map(l => [l, packFile(o.code + '.g4tx', new RegExp(`telop_waza/${l ? l + '/' : ''}$`))]).filter(x => x[1]);
  return obj && tex.length ? { obj, tex } : null; };
// a keshin's or totem's own move (a move of state.techs with spirit = the spirit's n): { s, o }
const spiritOfMove = t => { if (!t || t.spirit == null) return null; const s = (state.spirits || []).find(x => x.n === t.spirit), o = s && SPIRITS.find(x => x.key === s.key); return s && o ? { s, o } : null; };
const spiritEl = sp => sp.s.element && sp.s.element !== sp.o.el ? sp.s.element : '';   // the copy's own element, if it changed
const moveEl = t => { const sp = spiritOfMove(t); return t.element || (sp && spiritEl(sp)) || (baseOf(t.k) || {}).el; };
// TP and power of the keshins' and totems' moves: the game uses two steps for them (one above the moves' scale)
const SPIRIT_TIERS = [[80, [120, 720]], [100, [140, 800]]];
const ELEMENT_NUM = { wind: 1, forest: 2, fire: 3, mountain: 4, void: 5 };   // AURA_CMD_INFO cell 8
const ELEMENT_SCENE = { wind: '00020', forest: '00030', fire: '00040', mountain: '00050', void: '00060' };   // the keshins' summon (ev80_) and armed (ev81_) scenes by element
const spiritMissing = o => { const f = spiritFiles(o); return Object.entries(f).filter(([, v]) => !v).map(([k]) => ({ pkm: '.g4pkm', mg: '.g4mg', obj: '.objbin', tex: '.g4tx', icon: '_l.g4tx' })[k]); };
async function loadCrRows() {
  crRows = null; if (!root) return;
  try { const f = await (await dirAt(['CharacterReforged', 'content', 'looks'])).getFileHandle('armour_clothes.toml');
    crRows = {}; for (const c of TOML.parse(await (await f.getFile()).text()).clothes || []) if (c.model) crRows[c.model] = c.rows; }
  catch (e) { crRows = null; }
}

// ---------- binary edits (same lengths everywhere: the files keep their layout)
const u16le = (d, o) => d[o] | d[o + 1] << 8, u32le = (d, o) => (d[o] | d[o + 1] << 8 | d[o + 2] << 16 | d[o + 3] << 24) >>> 0;
const put32 = (d, o, v) => { d[o] = v & 255; d[o + 1] = v >>> 8 & 255; d[o + 2] = v >>> 16 & 255; d[o + 3] = v >>> 24 & 255; };
const bytesOf = s => new TextEncoder().encode(s);
function replaceAll(d, from, to, end = d.length) {   // in place, same length
  const a = bytesOf(from), b = bytesOf(to); if (a.length !== b.length) throw new Error('codes of different length');
  for (let i = 0; i + a.length <= end; i++) { let k = 0; while (k < a.length && d[i + k] === a[k]) k++; if (k === a.length) { d.set(b, i); i += a.length - 1; } }
  return d;
}
const crcBytes = b => { let c = 0xFFFFFFFF; for (const x of b) c = CRC_TABLE[(c ^ x) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
// a G4PK pack (model .g4pkm, poses, scene animations): the names of its entries, their crc32 and their sorted order
// (Atelier Inazuma's renommer_paquet, MIT); the bones, meshes and textures inside keep their names
function renamePack(src, anc, neuf) {
  const d = new Uint8Array(src), n = u16le(d, 0x20), t = 0x40 + 8 * n;
  const zone = new TextDecoder('latin1').decode(d.subarray(t, t + 0x60 + 32 * n));
  const names = (zone.match(/[a-z0-9_]+\.g4[a-z]{2}/g) || []).slice(0, n);
  if (names.length !== n) throw new Error('unexpected pack');
  const crcs = names.map((x, k) => { if (u32le(d, t + 4 * k) !== crc32(x)) throw new Error('unexpected pack'); return crc32(x.split(anc).join(neuf)); });
  crcs.forEach((c, k) => put32(d, t + 4 * k, c));
  [...crcs.keys()].sort((a, b) => crcs[a] - crcs[b]).forEach((v, k) => { d[t + 4 * n + 2 * k] = v & 255; d[t + 4 * n + 2 * k + 1] = v >> 8; });
  return replaceAll(d, anc, neuf, Math.min(0x100, d.length));
}
// a G4TX's image names (the icon: the game finds it by them), their crc32 and sorted order
function renameTex(src, anc, neuf) {
  const d = new Uint8Array(src), hdr = u16le(d, 4), n = u16le(d, 0x20), total = u16le(d, 0x22);
  const oHash = hdr + n * 0x30, oIdx = oHash + 4 * total; let p = oIdx + total; p = Math.ceil(p / 4) * 4;
  const crcs = [];
  for (let i = 0; i < n; i++) {
    let q = p + u16le(d, p + i * 2), s = q; while (d[q]) q++;
    const name = new TextDecoder('latin1').decode(d.subarray(s, q)), nn = name.split(anc).join(neuf);
    d.set(bytesOf(nn), s); crcs.push(crc32(nn)); put32(d, oHash + 4 * i, crcs[i]);
  }
  [...crcs.keys()].sort((a, b) => crcs[a] - crcs[b]).forEach((v, k) => { d[oIdx + k] = v; });
  return d;
}

// ---------- colour groups: the texture's main colours (k-means in OKLab, the same every time for the same picture)
const srgbLin = c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4, linSrgb = c => c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
function toLab(r, g, b) {
  r = srgbLin(r / 255); g = srgbLin(g / 255); b = srgbLin(b / 255);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s];
}
function fromLab(L, a, b) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3, m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3, s = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3;
  const f = v => Math.max(0, Math.min(255, Math.round(linSrgb(Math.max(0, Math.min(1, v))) * 255)));
  return [f(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s), f(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s), f(-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s)];
}
const hexRgb = h => { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
const rgbHex = ([r, g, b]) => '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
const labDist = (p, c) => (p[0] - c[0]) ** 2 + 2 * ((p[1] - c[1]) ** 2 + (p[2] - c[2]) ** 2);   // hue differences count more
function colourGroups(img, k) {
  // the flat colours the texture is painted with: the densest colours, each far enough from the ones already taken.
  // The blends between them (soft edges, gradients) spread thin over many colours, so they are not taken as groups.
  const { data, w, h } = img, step = Math.max(1, Math.floor(Math.sqrt(w * h / 40000))), pts = [];
  for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) { const i = (y * w + x) * 4; if (data[i + 3] > 8) pts.push(toLab(data[i], data[i + 1], data[i + 2])); }
  if (!pts.length) return [];
  const bins = new Map(), Q = [0.025, 0.018, 0.018];
  for (const p of pts) { const key = p.map((v, j) => Math.round(v / Q[j])).join(','); const e = bins.get(key); if (e) { e.n++; e.s[0] += p[0]; e.s[1] += p[1]; e.s[2] += p[2]; } else bins.set(key, { n: 1, s: [...p] }); }
  // a bin's weight: its own pixels and its neighbours' (a flat colour can sit on a bin border)
  const list = [...bins.entries()].map(([key, e]) => ({ key: key.split(',').map(Number), n: e.n, c: e.s.map(v => v / e.n) }));
  const at = new Map(list.map(e => [e.key.join(','), e]));
  for (const e of list) { let m = 0; for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) { const o = at.get([e.key[0] + x, e.key[1] + y, e.key[2] + z].join(',')); if (o) m += o.n; } e.m = m; }
  list.sort((a, b) => b.m - a.m || a.c[0] - b.c[0] || a.c[1] - b.c[1] || a.c[2] - b.c[2]);
  const R = 0.06 ** 2, minN = Math.max(3, pts.length * 0.0008), near = 0.035 ** 2, cs = [];
  const refine = c => { for (let it = 0; it < 3; it++) { const s = [0, 0, 0, 0]; for (const p of pts) if (labDist(p, c) < near) { s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; s[3]++; } if (s[3]) c = [s[0] / s[3], s[1] / s[3], s[2] / s[3]]; } return c; };
  const blend = c => cs.some((a, i) => cs.some((b, j) => { if (j <= i) return false;   // on the way between two colours already taken
    const v = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], vv = labDist(v, [0, 0, 0]), t = ((c[0] - a[0]) * v[0] + 2 * ((c[1] - a[1]) * v[1] + (c[2] - a[2]) * v[2])) / vv;
    return t > 0.08 && t < 0.92 && labDist(c, [a[0] + t * v[0], a[1] + t * v[1], a[2] + t * v[2]]) < 0.03 ** 2; }));
  for (const e of list) {
    if (cs.length >= k || e.m < minN) break;
    if (cs.some(c => labDist(e.c, c) < R) || blend(e.c)) continue;
    const c = refine(e.c); if (cs.some(x => labDist(c, x) < R) || blend(c)) continue;
    cs.push(c);
  }
  const size = cs.map(() => 0);
  for (const p of pts) { let bi = 0, bd = Infinity; for (let j = 0; j < cs.length; j++) { const d = labDist(p, cs[j]); if (d < bd) { bd = d; bi = j; } } size[bi]++; }
  return cs.map((c, j) => ({ lab: c, hex: rgbHex(fromLab(...c)), share: size[j] / pts.length })).sort((a, b) => b.share - a.share);
}
// the colours chosen for an older list of groups, given to the closest groups of this one
function alignTargets(groups, t, src) {
  if (!src || !src.length) return groups.map((g, i) => (t || [])[i] || null);
  return groups.map(g => { let bi = -1, bd = 0.004; src.forEach((h, i) => { if (!t[i]) return; const d = labDist(g.lab, toLab(...hexRgb(h))); if (d < bd) { bd = d; bi = i; } }); return bi < 0 ? null : t[bi]; });
}
// the recolouring: every pixel follows its group (softly between close groups), keeping its shading
function recolourer(groups, targets) {
  const T_ = targets.map(t => t ? toLab(...hexRgb(t)) : null), cache = new Map();
  if (T_.every(t => !t)) return null;
  const G = groups.map(g => g.lab), N = G.length;
  // the colour a pixel gets in group j, its shading kept
  const inGroup = (p, j) => {
    const c = G[j], t = T_[j]; if (!t) return p;
    const cC = Math.hypot(c[1], c[2]), pC = Math.hypot(p[1], p[2]), tC = Math.hypot(t[1], t[2]);
    const l = Math.max(0, Math.min(1, p[0] + (t[0] - c[0])));
    let C, hh;
    if (cC > 0.03) { C = pC * tC / cC; hh = Math.atan2(t[2], t[1]) + (Math.atan2(p[2], p[1]) - Math.atan2(c[2], c[1])); }
    else { C = tC * Math.min(1.5, l / Math.max(0.05, t[0])) + pC; hh = Math.atan2(t[2], t[1]); }   // a grey or black group: the new colour itself at its centre
    return [l, C * Math.cos(hh), C * Math.sin(hh)];
  };
  const moved = G.map((c, j) => T_[j] ? inGroup(c, j) : c);   // where each group's centre goes
  return (r, g, b) => {
    const key = r << 16 | g << 8 | b, hit = cache.get(key); if (hit) return hit;
    const p = toLab(r, g, b), ds = G.map(c => labDist(p, c)), dm = Math.min(...ds);
    let res = null;
    // a blend of two groups (a soft edge, a gradient): it becomes the same blend of their new colours
    if (dm > 0.0012) {
      let best = dm * 0.3, bi = -1, bj = -1, bt = 0;
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const a = G[i], v = [G[j][0] - a[0], G[j][1] - a[1], G[j][2] - a[2]], vv = labDist(v, [0, 0, 0]); if (vv < 1e-6) continue;
        const t = (( p[0] - a[0]) * v[0] + 2 * ((p[1] - a[1]) * v[1] + (p[2] - a[2]) * v[2])) / vv; if (t < 0.04 || t > 0.96) continue;
        const d = labDist(p, [a[0] + t * v[0], a[1] + t * v[1], a[2] + t * v[2]]); if (d < best) { best = d; bi = i; bj = j; bt = t; }
      }
      if (bi >= 0) { const a = G[bi], A = moved[bi], B = moved[bj];
        res = [0, 1, 2].map(x => (1 - bt) * A[x] + bt * B[x] + p[x] - ((1 - bt) * a[x] + bt * G[bj][x])); res[0] = Math.max(0, Math.min(1, res[0])); }
    }
    if (!res) {
      let wsum = 0; res = [0, 0, 0];
      ds.forEach((d, j) => { const wgt = Math.exp(-(d - dm) / 0.004); if (wgt < 0.01) return; wsum += wgt; const q = inGroup(p, j); res[0] += wgt * q[0]; res[1] += wgt * q[1]; res[2] += wgt * q[2]; });
      res = res.map(x => x / wsum);
    }
    const out = fromLab(...res); if (cache.size < 400000) cache.set(key, out); return out;
  };
}
function recolourImage(img, fn) {
  const out = new Uint8ClampedArray(img.data); if (!fn) return out;
  for (let i = 0; i < out.length; i += 4) if (out[i + 3]) { const c = fn(out[i], out[i + 1], out[i + 2]); out[i] = c[0]; out[i + 1] = c[1]; out[i + 2] = c[2]; }
  return out;
}
// a texture: its main picture (<code>_10, or _20 in the armours)
async function readTexture(f) {
  const d = await packBytes(f), { ents } = G4TX.parse(d), e = ents.find(x => /_(10|20)$/.test(x.name)) || ents[0];
  return { d, e, img: G4TX.decodeEntry(d, e, 0) };
}
const smallOf = (img, max) => { const lv = Math.max(0, Math.ceil(Math.log2(Math.max(img.w, img.h) / max))); return lv; };
const texCache = new Map();
async function spiritTexture(f, max = 512) {   // a small level of the picture, for the editor
  if (texCache.has(f.path + f.h.name)) return texCache.get(f.path + f.h.name);
  const d = await packBytes(f), { ents } = G4TX.parse(d), e = ents.find(x => /_(10|20)$/.test(x.name)) || ents[0], info = G4TX.dds(d, e);
  const lv = Math.min(info.mips - 1, Math.max(0, Math.ceil(Math.log2(Math.max(info.w, info.h) / max))));
  const r = { small: G4TX.decodeEntry(d, e, lv), lvGroups: G4TX.decodeEntry(d, e, Math.min(info.mips - 1, lv)) };
  texCache.set(f.path + f.h.name, r); return r;
}
function paint(canvas, img, data) {
  canvas.width = img.w; canvas.height = img.h; const ctx = canvas.getContext('2d');
  ctx.putImageData(new ImageData(new Uint8ClampedArray(data || img.data), img.w, img.h), 0, 0);
}

// ---------- the list and the editor
let MODE_SPIRIT = null;   // { o: the game's spirit, edit: a copy of state.spirits or null }
const spiritName = o => o.n[LANG] || o.n.en;
const KINDN = k => T(k === 'keshin' ? 'Keshin' : 'Totem');
const ROLEN = o => T({ s: 'Shot', o: 'Offence', d: 'Defence', k: 'Keeper' }[o.key[2]] || 'Shot');
function renderSpiritList() {
  const q = $('#search').value.trim().toLowerCase(), list = $('#list'); list.textContent = '';
  for (const o of SPIRITS.filter(o => !q || Object.values(o.n).concat(o.code).some(x => x && String(x).toLowerCase().includes(q)))) {
    const miss = packIndex ? spiritMissing(o) : [];
    const r = document.createElement('div'); r.className = 'row' + (MODE_SPIRIT && !MODE_SPIRIT.edit && MODE_SPIRIT.o === o ? ' on' : '');
    if (miss.length) r.style.opacity = 0.45;
    r.innerHTML = `<span></span><small></small>`; r.firstChild.textContent = spiritName(o); r.lastChild.textContent = KINDN(o.kind) + ' · ' + ROLEN(o) + ' · ' + o.code;
    r.onclick = () => openSpirit(o, null); list.append(r);
  }
}
function renderSpiritChanges() {
  const box = $('#changes'); box.textContent = '';
  const mine = state.spirits || [];
  if (!mine.length) { box.innerHTML = `<span class="hint">${T('None yet.')}</span>`; return; }
  for (const s of mine) {
    const o = SPIRITS.find(x => x.key === s.key); if (!o) continue;
    const r = document.createElement('div'); r.className = 'row' + (MODE_SPIRIT && MODE_SPIRIT.edit === s ? ' on' : ''); r.style.cursor = 'pointer';
    r.innerHTML = `<span></span><small></small>`; r.firstChild.textContent = s.name; r.lastChild.textContent = T('{price} tokens · copy of {en}', { price: s.price, en: spiritName(o) });
    r.onclick = () => openSpirit(o, s); box.append(r);
  }
}
function groupRows(prefix, groups, targets) {
  return groups.map((g, i) => { const t = targets[i];
    return `<div style="display:flex;gap:10px;align-items:center"><i class="dot" style="background:${g.hex};width:22px;height:22px;border:1px solid var(--line)"></i><span class="hint" style="width:44px">${Math.round(g.share * 100)}%</span>
      <select id="${prefix}m${i}" style="width:auto"><option value="keep" ${t ? '' : 'selected'}>${T('Keep')}</option><option value="new" ${t ? 'selected' : ''}>${T('New colour')}</option></select>
      <input type="color" id="${prefix}c${i}" value="${t || g.hex}" ${t ? '' : 'hidden'}></div>`; }).join('');
}
async function openSpirit(o, edit) {
  MODE_SPIRIT = { o, edit };
  const p = edit ? JSON.parse(JSON.stringify(edit)) : { name: '', price: 30, body: { k: 5, t: [] }, armour: { on: !!o.armed, k: 4, t: [] } };
  const ed = $('#editor'), field = 'background:#0b1120;color:var(--text);border:1px solid var(--line);border-radius:8px;padding:8px 10px;font:inherit';
  ed.innerHTML = `<h3></h3><p class="hint" id="meta"></p>
    <div id="spbody"></div>`;
  ed.querySelector('h3').textContent = edit ? edit.name : T('New {kind}: {name}', { kind: KINDN(o.kind), name: spiritName(o) });
  $('#meta').textContent = T('{kind} · copy of {name} ({code})', { kind: KINDN(o.kind) + ' · ' + ROLEN(o), name: spiritName(o), code: o.code });
  const body = $('#spbody');
  if (!packIndex) { packFlash(); body.innerHTML = `<div class="status err">${T('Connect the folder of the keshin and totem files first (on the left, under the mods folder).')}</div>`; renderSpiritList(); renderSpiritChanges(); return; }
  const miss = spiritMissing(o);
  if (miss.length) { body.innerHTML = `<div class="status err">${T('The files of this one are not in the folder ({missing}).', { missing: miss.join(', ') })}</div>`; renderSpiritList(); renderSpiritChanges(); return; }
  const mv = edit && state.techs.find(t => t.spirit === edit.n);
  const f = spiritFiles(o), telF = !!spiritTelop(o), armF = o.armed && packFile(o.armed.ka + '_10.g4tx', /_armd\//), armOk = !!(armF && crRows && crRows[o.armed.ka]);
  body.innerHTML = `<div class="grid">
      <label>${T('Name in the game')}</label><input id="sname" maxlength="40" style="${field}"><span></span>
      <label>${T('Price (tokens)')}</label><input id="sprice" type="number" min="0" max="9999" value="${p.price}" style="width:110px;${field}"><span></span>
      <label>${T('Element')}</label><select id="sel" style="width:auto">${['', 'fire', 'forest', 'wind', 'mountain', 'void'].map(e => `<option value="${e}" ${(p.element || '') === e ? 'selected' : ''}>${e ? ELN(e) : T('The original\'s ({el})', { el: ELN(o.el) })}</option>`).join('')}</select><span class="hint">${o.lk ? T('Its move «{m}» takes it too.', { m: o.lnm }) : ''}</span>
      <label>${T('Name banner')}</label><span style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">${telF ? `<input type="checkbox" id="ston" ${p.telop !== false ? 'checked' : ''}><select id="sfont" style="width:auto">${TELOP_FONTS.map(([id, n], i) => `<option value="${id}">${n}${i ? '' : ' ' + T('(default)')}</option>`).join('')}${customFont ? `<option value="custom">${T('Your own font file…')} (${esc(customFont.name)})</option>` : ''}</select>` : `<span class="hint">${T('The files of this one are not in the folder ({missing}).', { missing: 'soccer10_01_' + o.code + '.objbin, telop_waza/' + o.code + '.g4tx' })}</span>`}</span><span></span>
    </div>
    ${telF ? `<div class="hint">${T('The name shown when it is summoned (the colours of its element, like the moves\' names):')}</div><canvas id="stelop" width="864" height="176" style="background:#1d2234;max-width:100%"></canvas>` : ''}
    <h3>${T('Colour groups')}</h3><div class="hint">${T('The texture is split into its main colours: give each group a new colour or keep it. The shading stays.')}</div>
    <label class="hint">${T('Colour groups')}: <select id="bk" style="width:auto">${[2, 3, 4, 5, 6, 7, 8].map(n => `<option ${n === p.body.k ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
    <div id="bgroups" style="display:flex;flex-direction:column;gap:6px"></div>
    <div class="hint">${T('Texture (before → after) and icon')}</div>
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><canvas id="btex0" style="width:260px"></canvas><span style="color:var(--dim)">→</span><canvas id="btex1" style="width:260px"></canvas><canvas id="bicon" style="width:160px;background:#0b1120"></canvas></div>
    ${o.armed ? `<h3>${T('Armour (Armed)')}</h3>${armOk ? `<label style="display:flex;gap:8px;align-items:center"><input type="checkbox" id="aon" ${p.armour.on ? 'checked' : ''}>${T('Also make its armour, in colours of its own')}</label><div class="hint">${T('Any player who has the keshin can wear it (with Character Reforged).')}</div>
      <div id="abox"><label class="hint">${T('Colour groups')}: <select id="ak" style="width:auto">${[2, 3, 4, 5, 6, 7, 8].map(n => `<option ${n === p.armour.k ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      <div id="agroups" style="display:flex;flex-direction:column;gap:6px"></div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><canvas id="atex0" style="width:260px"></canvas><span style="color:var(--dim)">→</span><canvas id="atex1" style="width:260px"></canvas></div></div>`
      : `<div class="hint">${!crRows ? T('The armour needs Character Reforged in the mods folder.') : T('The files of this one are not in the folder ({missing}).', { missing: o.armed.ka + '_10.g4tx' })}</div>`}` : ''}
    ${o.lk ? `<h3>${T('Its move')}</h3><div class="hint">${edit ? (mv ? T('«{m}»: its own colours, name, element and TP/power (it comes with the keshin or totem, it is not sold).', { m: esc(mv.name) }) : T('«{m}», as in the game. Give it colours, a name, an element and TP/power of its own (it stays tied to this keshin or totem, it is not sold):', { m: esc(o.lnm) })) : T('Create the copy first; then its move «{m}» can get colours, a name and TP/power of its own.', { m: esc(o.lnm) })}</div>
      ${edit ? `<div><button id="smove">${mv ? T('Edit its move…') : T('Customise its move…')}</button></div>` : ''}` : ''}
    <div style="display:flex;gap:10px"><button id="sapply" class="primary">${edit ? T('Save') : T('Create')}</button>${edit ? `<button id="sdrop" class="danger">${T('Delete')}</button>` : ''}</div>`;
  const telop = () => { if (!telF) return; const f = $('#sfont').value; $('#stelop').style.opacity = $('#ston').checked ? 1 : 0.35;
    document.fonts.load(`400 250px ${fontStack(f)}`).then(() => drawTelopK($('#stelop'), $('#sname').value.trim() || ' ', $('#sel').value || o.el, f)); };
  const autoName = () => LANG === 'en' ? `New ${spiritName(o)}` : LANG === 'pt' ? `${spiritName(o)} Novo` : `${spiritName(o)} Nuevo`;
  $('#sname').value = edit ? edit.name : autoName();
  if (telF) { $('#sfont').value = p.font && (p.font !== 'custom' || customFont) ? p.font : 'rum'; for (const id of ['sname', 'sel', 'sfont', 'ston']) $('#' + id).addEventListener('input', telop); $('#ston').addEventListener('change', telop); telop(); }
  const tex = await spiritTexture(f.tex), iconT = await spiritTexture(f.icon, 256);
  paint($('#btex0'), tex.small);
  // one part (body or armour): its groups, its colour choices and its preview
  const part = (pre, img, getK, targets, src, draw) => {
    let groups = [];
    const read = () => groups.map((g, i) => $(`#${pre}m${i}`).value === 'new' ? $(`#${pre}c${i}`).value : null);
    const render = () => {
      groups = colourGroups(img, getK());
      $(`#${pre}groups`).innerHTML = groupRows(pre, groups, alignTargets(groups, targets, src));
      groups.forEach((g, i) => { $(`#${pre}m${i}`).onchange = () => { $(`#${pre}c${i}`).hidden = $(`#${pre}m${i}`).value !== 'new'; update(); }; $(`#${pre}c${i}`).oninput = update; });
      update();
    };
    let tm = 0;
    const update = () => { clearTimeout(tm); tm = setTimeout(() => { const fn = recolourer(groups, read()); draw(fn); }, 60); };
    $(`#${pre}k`).onchange = () => { targets = []; src = null; render(); };
    render();
    return { read, k: getK, hexes: () => groups.map(g => g.hex) };
  };
  const bodyPart = part('b', tex.small, () => +$('#bk').value, p.body.t, p.body.s, fn => { paint($('#btex1'), tex.small, recolourImage(tex.small, fn)); paint($('#bicon'), iconT.small, recolourImage(iconT.small, fn)); });
  let armPart = null;
  if (o.armed && armOk) {
    const at = await spiritTexture(armF); paint($('#atex0'), at.small);
    armPart = part('a', at.small, () => +$('#ak').value, p.armour.t, p.armour.s, fn => paint($('#atex1'), at.small, recolourImage(at.small, fn)));
    const sync = () => { $('#abox').hidden = !$('#aon').checked; }; $('#aon').onchange = sync; sync();
  }
  $('#sapply').onclick = () => {
    const name = $('#sname').value.trim(); if (!name) { status(T('Give the move a name.'), 'err'); return; }
    const v = { name, price: Math.max(0, Math.min(9999, Math.round(+$('#sprice').value || 0))), element: $('#sel').value, telop: telF ? $('#ston').checked : true, font: telF ? $('#sfont').value : (p.font || 'rum'), body: { k: bodyPart.k(), t: bodyPart.read(), s: bodyPart.hexes() },
      armour: armPart ? { on: $('#aon').checked, k: armPart.k(), t: armPart.read(), s: armPart.hexes() } : { on: false, k: 4, t: [] } };
    state.spirits = state.spirits || [];
    if (edit) Object.assign(edit, v);
    else { state.nextSpirit = (state.nextSpirit || 0) + 1; state.spirits.push({ n: state.nextSpirit, key: o.key, ...v }); }
    renderSpiritChanges(); openSpirit(o, edit || state.spirits.at(-1)); $('#write').disabled = !root;
    status(edit ? T('Saved. Click «Generate the mod» for the game to see the changes.') : T('«{name}» created. Click «Generate the mod» when you are done.', { name }), 'ok');
  };
  if (edit && o.lk) $('#smove').onclick = () => { const b = baseOf(o.lk); if (!b) return; MODE_SPIRIT = null; open(b, mv || null, mv ? null : { s: edit, o }); };
  if (edit) $('#sdrop').onclick = () => {
    if (!confirm(T('Delete «{name}»? Take it off your players in the game first.', { name: edit.name }))) return;
    state.spirits = state.spirits.filter(x => x !== edit); state.techs = state.techs.filter(t => t.spirit !== edit.n); MODE_SPIRIT = null; $('#editor').innerHTML = `<div class="empty">${T('Deleted. Choose another move on the left.')}</div>`; renderSpiritChanges();
  };
  renderSpiritList(); renderSpiritChanges();
}

// ---------- the mod's files for the keshins and totems
// codes of the copies: the same length as the game's (k000020 -> k6BBNNN, a000020 -> a6BBNNN, ka000201 -> ka6BBNNN)
const spiritNum = s => String(600000 + state.block * 250 + s.n % 250);
const spiritCode = (s, o) => (o.kind === 'keshin' ? 'k' : 'a') + spiritNum(s);
// scenes of a spirit: every animation pack of its code in the folder (<scene>_<code>_s00_p00_c0010.g4pk)
const spiritScenes = o => { const M = spiritModel(o), out = new Map();
  const scan = (c, only) => { const re = new RegExp(`^(ev\\d\\d_\\d{5})_${c}_s\\d\\d_p\\d\\d_c\\d{4}\\.g4pk$`), got = new Map();
    for (const [n, fs] of packIndex) { const m = n.match(re); if (m && only(m[1])) { if (!got.has(m[1])) got.set(m[1], []); got.get(m[1]).push({ n, f: fs[0], from: c }); } } return got; };
  for (const [k, v] of scan(M, () => true)) out.set(k, v);
  // moves it does with another spirit's animations (the game's tag words): those animations, under its own code
  for (const c of (o.al || []).filter(c => c !== M)) for (const [k, v] of scan(c, sc => /^ev6/.test(sc) && !out.has(sc))) out.set(k, v);
  return out; };
// the [[event_env]] words other mods give the same scenes (VRFW keeps one mod's: ours carries theirs too)
async function otherEnvWords() {
  const words = {};
  for await (const [folder, h] of root.entries()) {
    if (h.kind !== 'directory' || folder === MOD) continue;
    let d; try { d = await h.getDirectoryHandle('content').then(c => c.getDirectoryHandle('techniques')); } catch (e) { continue; }
    for await (const [n, fh] of d.entries()) if (fh.kind === 'file' && n.endsWith('.toml')) {
      let doc; try { doc = TOML.parse(await (await fh.getFile()).text()); } catch (e) { continue; }
      for (const e of doc.event_env || []) { if (!e.event) continue; const w = words[e.event] = words[e.event] || { tag: {}, snd: {} };
        Object.assign(w.tag, (e.tag_words || {}).set || {}); Object.assign(w.snd, (e.snd_tag_words || {}).set || {}); }
    }
  }
  return words;
}
async function spiritBuild(progress) {
  const out = { files: {}, bins: {}, codes: new Set(), telops: new Set() };
  const mine = (state.spirits || []).map(s => ({ s, o: SPIRITS.find(x => x.key === s.key) })).filter(x => x.o);
  let chars = `schema = "VRFW.character/2"\ndefault_lang = "en"\n# the keshin and totem copies (their own model, files in assets/chr) and the armed forms of their armours\n`;
  let tech = `schema = "VRFW.technique/3"\n# keshin and totem copies: an aura command each (sold in the Training Shop), the scenes that show them\n`;
  let fx = `schema = "VRFW.effect/1"\n# the keshin of a move that shows a fixed keshin: the copy in the move's own copy\n`, anims = `schema = "VRFW.anim/2"\nowner = "match"\n`;
  let looks = `schema = "VRFW.look/2"\n# the armours of the copies: Character Reforged's meshes of the original armour for every body group, with the copy's texture\n`;
  let trans = `schema = "VRFW.transform/2"\n# the armed forms of the copies: no owner, Character Reforged's armour_wearers = "anyone" gives them to every bearer\n`;
  let rows = `schema = "VRFW.text/2"\ntable = "skill_text"\n`, shop = `schema = "VRFW.shop/2"\n\n[[edit]]\ntarget = "InazumaFantasy.training_shop"\n`;
  let nArmour = 0, nFixed = 0;
  const env = {}, addEnv = (ev, code, tagTo, sndTo) => { const e = env[ev] = env[ev] || { tag: {}, snd: {}, sndOk: false }; e.tag[code] = tagTo; if (sndTo) { e.snd[code] = sndTo; e.sndOk = true; } };
  const other = await otherEnvWords();
  let i = 0;
  for (const { s, o } of mine) {
    progress(++i, mine.length);
    const code = spiritCode(s, o), dir = spiritDir(o), f = spiritFiles(o), A = `assets/chr/${dir}/${code}`, M = spiritModel(o);
    if (spiritMissing(o).length) throw new Error(T('The files of this one are not in the folder ({missing}).', { missing: spiritMissing(o).join(', ') }) + ' — ' + spiritName(o));
    out.codes.add(code);
    // model: the entries of its packs renamed; meshes, skeleton and textures inside keep their names
    out.bins[`${A}/${code}.g4pkm`] = renamePack(await packBytes(f.pkm), M, code);
    out.bins[`${A}/${code}.g4mg`] = await packBytes(f.mg);
    const md = packFile(M + '.g4md', /\/chr\//); if (md) out.bins[`${A}/${code}.g4md`] = await packBytes(md);
    out.bins[`${A}/${code}.objbin`] = replaceAll(await packBytes(f.obj), M, code);
    const p10 = packFile(M + '_p010.g4pk', /\/chr\//);
    if (p10) { const b = await packBytes(p10); out.bins[`${A}/${code}_p010.g4pk`] = renamePack(b, M, code); out.bins[`${A}/${M}_p010.g4pk`] = b; }
    // its texture, recoloured group by group
    const tx = await readTexture(f.tex), groups = colourGroups(G4TX.decodeEntry(tx.d, tx.e, smallOf(tx.img, 512) && Math.min(G4TX.dds(tx.d, tx.e).mips - 1, smallOf(tx.img, 512))), s.body.k);
    const fn = recolourer(groups, alignTargets(groups, s.body.t, s.body.s));
    if (fn) G4TX.replaceEntry(tx.d, tx.e, recolourImage(tx.img, fn));
    out.bins[`${A}/${code}.g4tx`] = tx.d;
    // its icon: the same colours, its image names renamed (the game finds it by them)
    const ic = await readTexture(f.icon), iconDir = o.kind === 'keshin' ? 'aura_fs' : 'aura_soul';
    if (fn) G4TX.replaceEntry(ic.d, ic.e, recolourImage(ic.img, fn));
    out.bins[`assets/menu/200_icon/10_icon_chr/${iconDir}/${code}_l.g4tx`] = renameTex(ic.d, spiritIcon(o).c, code);
    // its animations in every scene, under its own code
    const el = s.element && s.element !== o.el ? s.element : '', elLine = el ? `element = "${el}"\n` : '';
    const scenes = spiritScenes(o), moved = {};
    // another element: a keshin is summoned (and armed) in that element's scene; its animations there are another spirit's of
    // the same skeleton that has them, or its own of its old scene (the cut-ins the new scene needs, renamed)
    if (el && o.kind === 'keshin') for (const pre of ['ev80', 'ev81']) {
      const S = `${pre}_${ELEMENT_SCENE[o.el]}`, T = `${pre}_${ELEMENT_SCENE[el]}`;
      const own = scenes.get(pre === 'ev80' && o.ev[0] && o.ev[0].startsWith('ev80') ? o.ev[0] : S) || [...scenes.entries()].find(([k]) => k.startsWith(pre + '_'))?.[1];
      if (scenes.has(T)) { moved[pre] = T; continue; }
      if (!own) continue;
      const Sk = own[0].n.slice(0, 10), cutOf = n => n.match(/_(c\d{4})\.g4pk$/)[1], cuts = new Set();
      for (const n of packIndex.keys()) { const m = n.match(new RegExp(`^${T}_(?:k|a)\\d{6}_s00_p00_(c\\d{4})\\.g4pk$`)); if (m) cuts.add(m[1]); }
      if (!cuts.size) own.forEach(x => cuts.add(cutOf(x.n)));
      const list = [];
      for (const c of [...cuts].sort()) {
        const al = (o.al || []).map(x => ({ n: `${T}_${x}_s00_p00_${c}.g4pk`, from: x })).find(x => packFile(x.n));
        if (al) { list.push({ n: al.n, f: packFile(al.n), from: al.from, sc: T }); continue; }
        const mine = own.find(x => cutOf(x.n) === c) || own[own.length - 1];
        list.push({ n: `${T}_${mine.from}_s00_p00_${c}.g4pk`, f: mine.f, from: mine.from, sc: Sk, src: mine.n });
      }
      scenes.delete(Sk); scenes.set(T, list); moved[pre] = T;
    }
    for (const [scene, packs] of scenes) for (const { n, f: pf, from, sc } of packs) {
      let b = await packBytes(pf); if (sc && sc !== scene) b = renamePack(renamePack(b, sc, scene), from, code); else b = renamePack(b, from, code);
      out.bins[`assets/event/${scene.slice(0, 4)}/${scene}/${n.replace('_' + from + '_', '_' + code + '_')}`] = b;
    }
    // the scenes take its own animations (and the original's sounds in the summons)
    const summonBase = new Set(o.ev.map(e => e.replace(/_\d$/, '')));
    for (const scene of scenes.keys()) {
      const evs = summonBase.has(scene) ? o.ev : SPIRIT_SPLIT.has(scene) ? [scene + '_1', scene + '_2'] : [scene], summon = /^ev8[0-3]_/.test(scene);
      for (const ev of evs) addEnv(ev, code, code, summon || SPIRIT_SND.has(ev) ? M : null);
    }
    // the model row: the game finds a spirit by its name
    chars += `\n[[character]]\nname = "sp_${state.uid}_${code}"    # ${s.name}: copy of ${o.n.en} (${o.code})\nbased_on = "${M}"\nbattle = false\n  [character.base]\n  id = ${hex32(crc32(code))}\n  name = "${code}"\n  [character.new_model]\n  id = ${hex32(crc32('mdl_' + code))}\n  from = ${hex32(crc32('mdl_' + M))}\n  [character.new_model.cells]\n  skeleton_path = "${dir}/${code}/${code}.objbin"\n`;
    // its texts
    const nameId = hex32(crc32(`${MOD}.${code}_name`)), descId = hex32(crc32(`${MOD}.${code}_desc`));
    const desc = l => (l === 'pt' ? PT : l === 'es' ? ES : {})['A recoloured copy of {name}.'] || 'A recoloured copy of {name}.';
    for (const v of [null, 11]) rows += `\n[[row]]\nid = ${nameId}\nkind = "noun"\n${v ? `variant = ${v}\n` : ''}` + LANGS.map(l => `${l} = ${tstr(s.name)}\n`).join('');
    rows += `\n[[row]]\nid = ${descId}\nkind = "text"\n` + LANGS.map(l => `${l} = ${tstr(desc(l).replace('{name}', o.n[l] || o.n.en))}\n`).join('');
    // its move: the original's, or a copy of it when the move's scene shows a fixed spirit
    let linked = '';
    const own = state.techs.find(t => t.spirit === s.n && t.key);
    if (own) linked = `, linked_skill = ${hex32(crc32(own.key))}`;   // its own move (made with the moves: its cut-in shows this copy)
    else if (o.lk && SPIRIT_FIXED.has(o.lk) && scenes.has(o.lev.replace(/_\d$/, ''))) {
      nFixed++;
      // the move's cut-in (and its failure, for the keeper moves) copied, the spirit in them swapped for the copy
      const mv = `sp_${state.uid}_${code}_move`, key = o.lk.slice(0, 3) + String(60000 + state.block * 500 + 400 + s.n % 100);
      const cuts = [['', o.lev], ...(o.lfail ? [['_fail', o.lfail]] : [])];
      cuts.forEach(([suf, from], i) => {
        const id = `${from.slice(0, 4)}_${String(50000 + state.block * 500 + 400 + (s.n % 50) * 2 + i)}`;
        anims += `\n[[event]]\nname = "${mv}${suf}"\nfrom = "${from}"\nid = "${id}"\n`;
        fx += `\n[[event_command]]\nevent = "${id}"    # ${s.name}: ${o.lnm}${suf ? ' (failure)' : ''}\nlist = "evt"\ncommand = "CMD_799A1EBA"                 # LOAD_ACTOR_RESOURCE\nargs = ["${M}_s00_p<VARIATION>", "${M}"]\nset = ["${M}_s00_p<VARIATION>", "${code}"]\n`;
      });
      tech += `\n[[technique]]\nname = "${mv}"\nkey = "${key}"\nbase = "${o.lk}"\nevent = "${MOD}.${mv}"\n${o.lfail ? `fail_event = "${MOD}.${mv}_fail"\n` : ''}${elLine}description_text = "base"\n` + LANGS.map(l => `  [technique.text.${l}]\n  name = ${tstr(o.lnm + ' (' + s.name + ')')}\n`).join('');
      linked = `, linked_skill = ${hex32(crc32(key))}`;
    } else if (o.lk && el) {
      // another element: its move too (the same cut-in, a move of its own in that element)
      const mv = `sp_${state.uid}_${code}_move`, key = o.lk.slice(0, 3) + String(60000 + state.block * 500 + 400 + s.n % 100);
      tech += `\n[[technique]]\nname = "${mv}"\nkey = "${key}"\nbase = "${o.lk}"\n${elLine}description_text = "base"\n` + LANGS.map(l => `  [technique.text.${l}]\n  name = ${tstr((o.ln || {})[l] || o.lnm)}\n`).join('');
      linked = `, linked_skill = ${hex32(crc32(key))}`;
    }
    if (el) linked += `, "#8" = ${ELEMENT_NUM[el]}${moved.ev80 ? `, event = ${hex32(crc32(moved.ev80))}` : ''}`;   // the spirit's own element (and its summon)
    // its name banner when it is summoned: the menu object of the original's under its code, the picture drawn here
    const tf = s.telop !== false && spiritTelop(o);
    if (tf) {
      out.telops.add(code);
      const font = s.font === 'custom' && !customFont ? 'rum' : (s.font || 'rum'), fam = fontStack(font);
      await document.fonts.load(`400 250px ${fam}`, s.name); await document.fonts.ready;
      const c = document.createElement('canvas'); c.width = TELOP_W; c.height = TELOP_H; drawTelop(c, s.name, el || o.el, fam, '400', 1);
      const px = c.getContext('2d').getImageData(0, 0, TELOP_W, TELOP_H).data;
      out.bins[`assets/gamedata/menu/obj/soccer10_01_${code}.objbin`] = replaceAll(await packBytes(tf.obj), o.code, code);
      const t0 = await readTexture(tf.tex[0][1]), info = G4TX.dds(t0.d, t0.e);
      let pic = t0.d;
      if (info.w === TELOP_W && info.h === TELOP_H) { G4TX.replaceEntry(t0.d, t0.e, px); pic = renameTex(t0.d, o.code, code); }
      for (const [l] of tf.tex) out.bins[`assets/menu/220_img/telop_waza/${l ? l + '/' : ''}${code}.g4tx`] = pic;
    }
    const key = `${o.key.slice(0, 3)}_${state.uid}_${code}`;
    tech += `\n# ${s.name}: copy of ${o.n.en} (${o.key})\n[[aura_command]]\nkey = "${key}"\nfrom = "${o.key}"\nmanual = true\ncells = { name_text = ${nameId}, desc_text = ${descId}, aura_chara = ${hex32(crc32(code))}${linked} }\ncharas = []\n`;
    shop += `\n  [[edit.entry]]\n  item = "${key}"    # ${s.name}\n  price = ${s.price}\n  currency = "tk_bb000001"\n`;
    // its armour (Armed): the original armour's meshes with a recoloured texture, an armed form wearing it, its transform
    if (o.armed && s.armour && s.armour.on && crRows && crRows[o.armed.ka]) {
      const af = packFile(o.armed.ka + '_10.g4tx', /_armd\//);
      if (af) {
        nArmour++;
        const ka = 'ka' + spiritNum(s), at = await readTexture(af);
        const ag = colourGroups(G4TX.decodeEntry(at.d, at.e, Math.min(G4TX.dds(at.d, at.e).mips - 1, smallOf(at.img, 512))), s.armour.k), afn = recolourer(ag, alignTargets(ag, s.armour.t, s.armour.s));
        if (afn) G4TX.replaceEntry(at.d, at.e, recolourImage(at.img, afn));
        out.bins[`assets/chr/_armd/${ka}/${ka}_10.g4tx`] = at.d; out.codes.add(ka);
        looks += `\n[[clothes]]\nmodel = "${ka}"    # ${s.name}'s armour (copy of ${o.armed.ka})\nrows = [\n` + crRows[o.armed.ka].map(r => '  [' + [r[0], `_armd/${ka}/${ka}_10.g4tx`, ...r.slice(2)].map(x => typeof x === 'string' ? tstr(x) : String(x)).join(', ') + '],\n').join('') + ']\n';
        const an = `sp_${state.uid}_${code}_armed`, card = hex32(crc32(`${MOD}.${an}_card`));
        chars += `\n[[character]]\nname = "${an}"    # the armed form of ${s.name}\nbased_on = "${o.armed.chara}"\nbattle = false\n  [character.base]\n  id = ${hex32(crc32(`${MOD}.${an}`))}\n  name = "evt_${ka}"\n  [character.new_model]\n  id = ${hex32(crc32(`${MOD}.${an}_model`))}\n  from = "${o.armed.chara}"\n  [character.new_model.cells]\n  clothes = ${hex32(crc32(ka))}\n  shoes = 0\n  gloves = 0\n  force_kit = 1\n  [[character.cards]]\n  id = ${card}\n`;
        const akey = `was_${state.uid}_${code}`;
        tech += `\n# ${s.name}'s armed form\n[[aura_command]]\nkey = "${akey}"\nfrom = "${o.armed.key}"\ncells = { name_text = ${nameId}, desc_text = ${descId}, aura_chara = ${hex32(crc32(code))}, chara_param = ${card}${el ? `, "#8" = ${ELEMENT_NUM[el]}` : ''}${moved.ev81 ? `, event = ${hex32(crc32(moved.ev81))}` : ''} }\ncharas = []\n`;
        trans += `\n[[transform]]\nname = "${akey}"    # ${s.name}\nkind = "armour"\nsource = { spirit = "${key}" }\ntechniques = { keep_spirit = true }\ntrigger = { cpu = true }\nstats = { mode = "own" }\nlook = { no_uniform = true }\naudio = { voice = "wearer" }\nui = { plate = "armour" }\ntext = { de = { tag = "Rüstung" }, en = { tag = "Armour" }, es = { tag = "Armadura" }, fr = { tag = "Armure" }, it = { tag = "Armatura" }, ja = { tag = "アームド" }, pt = { tag = "Armadura" }, zh_hans = { tag = "化身武装" }, zh_hant = { tag = "化身武裝" } }\n`;
      }
    }
  }
  const words = d => '{ ' + Object.entries(d).map(([k, v]) => `${/^[A-Za-z0-9_]+$/.test(k) ? k : tstr(k)} = ${tstr(v)}`).join(', ') + ' }';
  tech += `\n# the scenes that show them: their own animations (the other mods' words for the same scenes kept)\n`;
  for (const [ev, e] of Object.entries(env)) {
    const o2 = other[ev] || { tag: {}, snd: {} };
    tech += `\n[[event_env]]\nevent = "${ev}"\ntag_words = { set = ${words({ ...o2.tag, ...e.tag })} }\n` + (e.sndOk ? `snd_tag_words = { set = ${words({ ...o2.snd, ...e.snd })} }\n` : '');
  }
  const any = mine.length > 0;
  out.files['content/characters/technique_colours_spirits.toml'] = any ? chars : '';
  out.files['content/techniques/technique_colours_spirits.toml'] = any ? tech : '';
  out.files['content/effects/technique_colours_spirits.toml'] = nFixed ? fx : '';
  out.files['content/anims/technique_colours_spirits.toml'] = nFixed ? anims : '';
  out.files['content/looks/technique_colours_spirits.toml'] = nArmour ? looks : '';
  out.files['addons/CharacterReforged/content/transforms/technique_colours_spirits.toml'] = nArmour ? trans : '';
  out.files['text/rows/technique_colours_spirits.toml'] = any ? rows : '';
  out.files['addons/InazumaFantasy/content/shops/technique_colours_spirits.toml'] = any ? shop : '';
  return out;
}
// the copies' files of earlier runs that are not in the mod any more (their code is not used now)
async function spiritCleanup(codes, telops = new Set()) {
  const own = n => /^(k|a|ka)6\d{5}/.test(n);
  const clean = async (parts, test) => { let d; try { d = await dirAt([MOD, ...parts]); } catch (e) { return; }
    const drop = []; for await (const [n] of d.entries()) if (test(n)) drop.push(n); for (const n of drop) await d.removeEntry(n, { recursive: true }); };
  for (const dir of ['_keshin', '_waza', '_armd']) await clean(['assets', 'chr', dir], n => own(n) && !codes.has(n));
  for (const dir of ['aura_fs', 'aura_soul']) await clean(['assets', 'menu', '200_icon', '10_icon_chr', dir], n => own(n) && !codes.has(n.replace(/_l\.g4tx$/, '')));
  await clean(['assets', 'gamedata', 'menu', 'obj'], n => { const m = n.match(/^soccer10_01_((k|a)6\d{5})\.objbin$/); return m && !telops.has(m[1]); });
  for (const l of TELOP_LANGS) await clean(['assets', 'menu', '220_img', 'telop_waza', ...(l ? [l] : [])], n => own(n) && /\.g4tx$/.test(n) && !telops.has(n.slice(0, 7)));
  let ev; try { ev = await dirAt([MOD, 'assets', 'event']); } catch (e) { return; }
  for await (const [g, gh] of ev.entries()) if (gh.kind === 'directory') for await (const [sc, sh] of gh.entries()) if (sh.kind === 'directory') {
    const drop = []; for await (const [n] of sh.entries()) { const m = n.match(/_((k|a)6\d{5})_s\d\d/); if (m && !codes.has(m[1])) drop.push(n); }
    for (const n of drop) await sh.removeEntry(n);
  }
}
const SPIRIT_FILES = ['content/characters/technique_colours_spirits.toml', 'content/techniques/technique_colours_spirits.toml', 'content/effects/technique_colours_spirits.toml', 'content/anims/technique_colours_spirits.toml', 'content/looks/technique_colours_spirits.toml', 'addons/CharacterReforged/content/transforms/technique_colours_spirits.toml', 'text/rows/technique_colours_spirits.toml', 'addons/InazumaFantasy/content/shops/technique_colours_spirits.toml'];
async function writeBin(path, bytes) { const parts = path.split('/'), d = await dirAt(parts.slice(0, -1), true), f = await d.getFileHandle(parts.at(-1), { create: true }), w = await f.createWritable(); await w.write(bytes); await w.close(); }
applyLang();
