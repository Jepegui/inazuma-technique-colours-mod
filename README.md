# Technique Colours – recoloured special moves for Inazuma Fantasy

**English** · [Português](#português) · [Español](#español)

Technique Colours is a small app that runs in your browser, on your own PC. With it you make **new special moves** for *Inazuma Eleven: Victory Road* with the **Inazuma Fantasy** mod: copies of the game's moves with their effect in **another colour** and a **name of your own**. They are sold in Inazuma Fantasy's **Technique Shop**. Since 2.0 it also makes **recoloured keshins and totems**, sold in the **Training Shop**. The game's own moves, keshins and totems stay as they are.

- **Any move of the base game:** shots, dribbles, blocks and saves (908 moves).
- **Colour:** pick a colour, then fine-tune saturation, brightness, lightness and how much the whites take the colour. White, grey and black take the colour out of the move. **Keep warm colours** leaves the gold, yellow, orange and red parts (golden glows, sparks) as they are.
- **Colour groups:** 534 moves have parts of 2 or 3 colours (Cross Fire's fire and ice, Gungnir's purple and blue…). Each part can take the move's colour, a colour of its own, or keep the original.
- **3D figures and other effects:** the dragons, giants and other figures of the cut-ins, and their other effects (like Lancelot's sword), take the move's colour, a colour of their own, or keep theirs.
- **Video preview:** load the move's video from the [official encyclopedia](https://zukan.inazuma.jp/en/skill/) and watch your colours on it (a guide: in the game only the move's effects change).
- **Shot trail:** a copied shot gets the game's trail of its element (the glow around the flying ball) in the move's colour, in a colour of its own, or the normal one.
- **TP and power:** keep the original's, or pick a step of the game's own scale, from 50 TP / 50 power to 120 TP / 140 power.
- **Element and price:** keep the original's element or choose another one; set the price in tokens.
- **The name in the cut-in:** the app draws your name in the style of the game's banners, with the colours of the move's element, in one of 7 fonts or a font file of your own.
- **Keshins and totems:** recoloured copies of the game's 156 keshins and totems (shot, offence, defence and keeper ones), see [below](#keshins-and-totems).
- **Several mods:** make more than one mod with **+ New** (each in its own folder, switched on or off on its own).
- **Languages:** English, Portuguese and Spanish.

Each new move keeps the original's animation, and its power and TP unless you pick another step. If you don't like one, just don't use it, or delete it in the app.

## Keshins and totems

In the **Keshins & totems** tab you make a copy of a keshin or totem in colours of your own:

- **Colour groups:** the app splits its texture into the colours it is painted with (2 to 8 groups); each group keeps its colour or takes a new one, and the shading stays. A preview shows the texture and the icon before and after.
- **Name, price and element:** another element also changes the scene it is summoned in (and its Armed scene), as in the game.
- **The name when it is summoned:** drawn like the moves' names, in the colours of its element and the font you choose.
- **Armed armour:** in colours of its own. With **Character Reforged**, any player who has the keshin can wear it.
- **Its move:** **Customise its move…** opens the move editor for the keshin's move (colours, name, element, TP and power). The copy of the keshin appears in the whole cut-in, and the move comes with the keshin (it is not sold).

The copies are sold in Inazuma Fantasy's **Training Shop**.

**The `pack` folder.** A copy is made from the game's own files of that keshin or totem: its model, texture, animations, icon and name banner (and its Armed armour). They come in the zip, in the **`pack`** folder (one folder per keshin or totem, with the game's `common` and `dx11` folders inside). Connect it with **Choose the folder of the keshin and totem files…**, under the mods folder; the app remembers it. Only the files of the keshins and totems you make are copied into your mod.

## Download and use

1. Go to [**Releases**](../../releases) and download `TechniqueColours-2.0.zip`.
2. **Unzip it** where you like, for example in `C:\Games`. Do **not** unzip it inside the game's `mods` folder (the app is not a mod), nor inside Program Files (see below).
3. Open **Technique Colours.bat** (it opens the app in Microsoft Edge). You can also open `technique-colours.html` in Edge or Chrome yourself.
4. Click **Choose the game's mods folder…** and choose the `mods` folder of the game you start with the mod launcher (the one with VRFW and InazumaFantasy in it).
5. Search the original move on the left, choose its colour, name and price, and click **Create move**. Repeat for as many as you like.
6. For keshins and totems: click **Choose the folder of the keshin and totem files…** and choose the `pack` folder that came in the zip, open the **Keshins & totems** tab, choose one, its colours, name and price, and click **Create**.
7. With the game closed, click **Generate the mod**. Then switch on **Technique Colours** on the launcher's Mods page. Your moves are in the Technique Shop, your keshins and totems in the Training Shop.

The app only writes inside `mods\TechniqueColours` and the mods you make with **+ New**. Nothing leaves your computer. After generating, you can delete the app's folder: everything lives in the mod.

Before you delete a move in the app, take it off the players who learned it.

> **Program Files:** Edge and Chrome do not let a page open folders inside `Program Files`, `Program Files (x86)`, `Windows` or `AppData`. Keep the app **and the game** outside them. If the game is in Steam's default library (`C:\Program Files (x86)\Steam`), move it in Steam: right-click the game → **Properties** → **Installed Files** → **Move install folder**, to another library (for example `D:\SteamLibrary`).

### Requirements

- Windows with Microsoft Edge (it comes with Windows) or Google Chrome. The app uses the browser's File System Access API.
- Inazuma Fantasy installed with VRFW 0.3.0 or newer.
- For the keshins' Armed armour: Character Reforged.
- Do not use online play or cross-save with mods.

## How it works

For each move the app writes, in VRFW's formats:

1. a recoloured copy of the move's effect object (`[[recolor]]` with `copy`, textures, materials, vertex colours and particles; grey pixels stay as they are, since many effects use grey textures as masks; a part of its own colour is a `per_texture` entry), and copies of its other effect objects and 3D figures (these with their row in the game's model table, `VRFW.character`);
2. its own cut-in(s), copied from the original's (`VRFW.anim`), that load that copy and its own name banner (`[[event_command]]`);
3. the new move (`VRFW.technique`), based on the original, with its own key, element and name (and TP and power, if you picked another step);
4. the name banner (`VRFW.telop_list`), a 1728×352 PNG drawn by the app;
5. its row in Inazuma Fantasy's Technique Shop (`VRFW.shop`);
6. its shot trail (shots): a recoloured copy of the game's trail of its element and a `[[shot_aura]]` rule for its key.

For each keshin or totem, it writes copies of its files under a code of the mod's own (the method of Atelier Inazuma: only the entry names of the packs change; the texture is recoloured and re-encoded to BC7), its model row (`VRFW.character`), an aura command sold in the Training Shop, the tag words of the scenes it appears in (`[[event_env]]`), its Armed form (`VRFW.look`, `VRFW.character`, Character Reforged's `VRFW.transform`) and, if you customise it, its move, whose copied cut-in keeps the keshin (`assigned`).

The whole mod is checked before anything is written: one wrong line and nothing is written.

A move's internal name and key never come back: a move made after another was deleted is never mistaken for one you already bought.

## For developers

The app is plain HTML and JavaScript, with no dependencies.

| File | What it is |
|---|---|
| `src/page.html` | The page: interface, colour preview, name banner, the mod's files |
| `src/data/techniques.json` | The moves of the base game (names, category, element, power, TP, effect object, cut-ins) |
| `src/fonts/` | The banner fonts (Rum Raisin by default, and six others to choose from; their licences and authors in `src/fonts/FONTS.txt`) |
| `src/data/texture_groups.json` | The colour groups of each move's textures (names and hues only) |
| `src/spirits.js` | The Keshins & totems tab: colour groups, copies of the files, the mod's files for them |
| `src/lib/codec.js` | BC7 and G4TX (the game's textures), from Custom Kits |
| `src/data/spirits.json`, `src/data/split_scenes.json` | The game's keshins and totems (keys, codes, scenes, linked move, armour), and the move scenes with a success and a failure event |
| `tools/make_spirits.py` | Rebuilds them from `VRFW ids.xlsx` and the aura, model and tag-word tables VRFW builds in its cache |
| `tools/make_techniques.py` | Rebuilds `techniques.json` from VRFW's `VRFW ids.xlsx` |
| `tools/survey_textures.js`, `tools/texture_groups.py` | Rebuild `texture_groups.json` from VRFW copies of the effects with their original textures |

To build `app/technique-colours.html`, run:

```
python build.py
```

## Credits

- **VRFW**: the framework that makes all of this possible (effect recolours, cut-in copies, name banners, new moves, shops), and the ids workbook the move list comes from.
- **Inazuma Fantasy**: the Technique Shop, and the recoloured moves (the red and blue God Hands) this app follows.
- **Atelier Inazuma** by muku (MIT): the method of copying a keshin's files (pack and icon renaming, ported in `src/spirits.js`) and the cfgbin reader used by `tools/make_spirits.py`; see `src/lib/LICENSE-AtelierInazuma.txt`.
- **Character Reforged**: armours for any player, and the `assigned` option of its group summons that keeps a keshin in a copied cut-in.
- **Rum Raisin** by Astigmatic (SIL Open Font License 1.1): the name banners' default font. The others to choose from: Lilita One, Spicy Rice, Titan One, Bangers (SIL OFL 1.1), Chewy and Luckiest Guy (Apache 2.0); see `src/fonts/FONTS.txt`.

*Inazuma Eleven* and everything from the game belong to LEVEL-5. This is a fan project, not affiliated with LEVEL-5.

## License

[GPL-3.0](LICENSE). You can fork, change and share this project. Copies and changed versions must keep the credits and the same license, and their source code must stay open. If you publish your own version, please let me know by opening an issue. The fonts keep their own licences (SIL OFL 1.1 or Apache 2.0), and the parts from Atelier Inazuma the MIT License.

---

## Português

O Technique Colours é uma app que corre no browser, no teu PC, e cria **técnicas novas** para o *Inazuma Eleven: Victory Road* com o mod **Inazuma Fantasy**: cópias das técnicas do jogo com o efeito **noutra cor** e um **nome teu**. Ficam à venda na **loja de técnicas** do Inazuma Fantasy; as do jogo ficam como estão. Podes escolher o elemento, o preço e o TP e a força (na escala do próprio jogo) e ver as cores no vídeo da técnica. Nas técnicas com partes de várias cores (534, como o fogo e o gelo da Cross Fire), cada parte pode ter a cor da técnica, uma cor própria ou manter a original; o mesmo nas figuras 3D (dragões, gigantes…) e nos outros efeitos. A app desenha o nome na animação no estilo do jogo, com 7 letras à escolha ou um ficheiro de letra teu, e podes fazer vários mods com **+ Novo**. Nos remates, a cópia também fica com o rasto da bola recolorido. A app está em inglês, português e espanhol.

**Keshins e totens (novo na 2.0):** no separador **Keshins & totems** fazes cópias das 156 keshins e totens do jogo com cores tuas (a textura é dividida nas suas cores e cada uma muda ou fica), nome, preço, elemento (muda também a cena de invocação), o nome no ecrã ao invocar e a armadura do Armed com cores próprias (com o Character Reforged, qualquer jogador a pode usar). Em **Personalizar a técnica…** a técnica da keshin também ganha cores, nome, elemento e TP/força próprios, com a cópia da keshin na animação. Ficam à venda na **Training Shop**. As cópias são feitas a partir dos ficheiros do jogo de cada keshin ou totem (modelo, textura, animações, ícone), que vêm no zip, na pasta **`pack`**: liga-a em **Escolher a pasta dos ficheiros das keshins e totens…** (a app lembra-se dela).

Para usar:
1. Em [**Releases**](../../releases), descarrega o `TechniqueColours-2.0.zip` e **descomprime-o** (por exemplo em `C:\Games`; **não** dentro da pasta `mods` nem dentro de Program Files).
2. Abre o **Technique Colours.bat** e escolhe a pasta **mods** do jogo que abres com o launcher de mods.
3. Procura a técnica original, escolhe a cor, o nome e o preço e carrega em **Criar técnica**.
4. Para keshins e totens: em **Escolher a pasta dos ficheiros das keshins e totens…** escolhe a pasta `pack` que vem no zip, abre o separador **Keshins & totems**, escolhe uma, as cores, o nome e o preço e carrega em **Criar**.
5. Com o jogo fechado, carrega em **Gerar o mod** e liga o **Technique Colours** no launcher.

Precisas do Inazuma Fantasy com o VRFW 0.3.0 ou mais recente, e do Edge ou do Chrome (e do Character Reforged para as armaduras). Antes de apagar uma técnica na app, tira-a aos jogadores que a aprenderam. Não uses jogo online nem cross-save com mods.

> **Program Files:** o Edge e o Chrome não deixam uma página abrir pastas dentro de `Program Files`, `Program Files (x86)`, `Windows` ou `AppData`. Mantém a app **e o jogo** fora delas. Se o jogo estiver na biblioteca padrão do Steam, muda-o no Steam: botão direito no jogo → **Propriedades** → **Ficheiros instalados** → **Mover pasta de instalação**.

## Español

Technique Colours es una aplicación que funciona en el navegador, en tu PC, y crea **técnicas nuevas** para *Inazuma Eleven: Victory Road* con el mod **Inazuma Fantasy**: copias de las técnicas del juego con el efecto **en otro color** y un **nombre tuyo**. Se venden en la **tienda de técnicas** de Inazuma Fantasy; las del juego quedan como están. Puedes elegir el elemento, el precio y el TP y la potencia (en la escala del propio juego) y ver los colores en el vídeo de la técnica. En las técnicas con partes de varios colores (534, como el fuego y el hielo de Fuego cruzado), cada parte puede tener el color de la técnica, un color propio o mantener el original; lo mismo en las figuras 3D (dragones, gigantes…) y en los otros efectos. La aplicación dibuja el nombre en la animación con el estilo del juego, con 7 fuentes a elegir o un archivo de fuente tuyo, y puedes hacer varios mods con **+ Nuevo**. En los tiros, la copia también tiene la estela del balón recoloreada. La aplicación está en inglés, portugués y español.

**Keshins y tótems (nuevo en 2.0):** en la pestaña **Keshins & totems** haces copias de las 156 keshins y tótems del juego con colores tuyos (la textura se divide en sus colores y cada uno cambia o se queda), nombre, precio, elemento (cambia también la escena de invocación), el nombre en pantalla al invocar y la armadura del Armed con colores propios (con Character Reforged, cualquier jugador puede llevarla). En **Personalizar la técnica…** la técnica de la keshin también tiene colores, nombre, elemento y PT/potencia propios, con la copia de la keshin en la animación. Se venden en la **Training Shop**. Las copias se hacen a partir de los archivos del juego de cada keshin o tótem (modelo, textura, animaciones, icono), que vienen en el zip, en la carpeta **`pack`**: conéctala en **Elegir la carpeta de los archivos de keshins y tótems…** (la aplicación la recuerda).

Para usarla:
1. En [**Releases**](../../releases), descarga `TechniqueColours-2.0.zip` y **descomprímelo** (por ejemplo en `C:\Games`; **no** dentro de la carpeta `mods` ni dentro de Program Files).
2. Abre **Technique Colours.bat** y elige la carpeta **mods** del juego que abres con el launcher de mods.
3. Busca la técnica original, elige el color, el nombre y el precio y pulsa **Crear técnica**.
4. Para keshins y tótems: en **Elegir la carpeta de los archivos de keshins y tótems…** elige la carpeta `pack` que viene en el zip, abre la pestaña **Keshins & totems**, elige una, los colores, el nombre y el precio y pulsa **Crear**.
5. Con el juego cerrado, pulsa **Generar el mod** y activa **Technique Colours** en el launcher.

Necesitas Inazuma Fantasy con VRFW 0.3.0 o más reciente, y Edge o Chrome (y Character Reforged para las armaduras). Antes de borrar una técnica en la aplicación, quítasela a los jugadores que la aprendieron. No uses el juego en línea ni cross-save con mods.

> **Program Files:** Edge y Chrome no dejan que una página abra carpetas dentro de `Program Files`, `Program Files (x86)`, `Windows` o `AppData`. Mantén la aplicación **y el juego** fuera de ellas. Si el juego está en la biblioteca predeterminada de Steam, muévelo en Steam: clic derecho en el juego → **Propiedades** → **Archivos instalados** → **Mover carpeta de instalación**.
