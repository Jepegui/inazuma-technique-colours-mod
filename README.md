# Technique Colours – recoloured special moves for Inazuma Fantasy

**English** · [Português](#português) · [Español](#español)

Technique Colours is a small app that runs in your browser, on your own PC. With it you make **new special moves** for *Inazuma Eleven: Victory Road* with the **Inazuma Fantasy** mod: copies of the game's moves with their effect in **another colour** and a **name of your own**. They are sold in Inazuma Fantasy's **Technique Shop**. The game's own moves stay as they are.

- **Any move of the base game:** shots, dribbles, blocks and saves (908 moves).
- **Colour:** pick a colour, then fine-tune saturation, brightness, lightness and how much the whites take the colour. White, grey and black take the colour out of the move.
- **Colour groups:** 534 moves have parts of 2 or 3 colours (Cross Fire's fire and ice, Gungnir's purple and blue…). Each part can take the move's colour, a colour of its own, or keep the original.
- **3D figures and other effects:** the dragons, giants and other figures of the cut-ins, and their other effects (like Lancelot's sword), take the move's colour, a colour of their own, or keep theirs.
- **Video preview:** load the move's video from the [official encyclopedia](https://zukan.inazuma.jp/en/skill/) and watch your colours on it (a guide: in the game only the move's effects change).
- **TP and power:** keep the original's, or pick a step of the game's own scale, from 50 TP / 50 power to 120 TP / 140 power.
- **Element and price:** keep the original's element or choose another one; set the price in tokens.
- **The name in the cut-in:** the app draws your name in the style of the game's banners, with the colours of the move's element, in one of 7 fonts or a font file of your own.
- **Several mods:** make more than one mod with **+ New** (each in its own folder, switched on or off on its own).
- **Languages:** English, Portuguese and Spanish.

Each new move keeps the original's animation, and its power and TP unless you pick another step. If you don't like one, just don't use it, or delete it in the app.

## Download and use

1. Go to [**Releases**](../../releases) and download `TechniqueColours-1.2.zip`.
2. **Unzip it** where you like, for example in `C:\Games`. Do **not** unzip it inside the game's `mods` folder (the app is not a mod), nor inside Program Files (see below).
3. Open **Technique Colours.bat** (it opens the app in Microsoft Edge). You can also open `technique-colours.html` in Edge or Chrome yourself.
4. Click **Choose the game's mods folder…** and choose the `mods` folder of the game you start with the mod launcher (the one with VRFW and InazumaFantasy in it).
5. Search the original move on the left, choose its colour, name and price, and click **Create move**. Repeat for as many as you like.
6. With the game closed, click **Generate the mod**. Then switch on **Technique Colours** on the launcher's Mods page. Your moves are in the Technique Shop.

The app only writes inside `mods\TechniqueColours` and the mods you make with **+ New**. Nothing leaves your computer. After generating, you can delete the app's folder: everything lives in the mod.

Before you delete a move in the app, take it off the players who learned it.

> **Program Files:** Edge and Chrome do not let a page open folders inside `Program Files`, `Program Files (x86)`, `Windows` or `AppData`. Keep the app **and the game** outside them. If the game is in Steam's default library (`C:\Program Files (x86)\Steam`), move it in Steam: right-click the game → **Properties** → **Installed Files** → **Move install folder**, to another library (for example `D:\SteamLibrary`).

### Requirements

- Windows with Microsoft Edge (it comes with Windows) or Google Chrome. The app uses the browser's File System Access API.
- Inazuma Fantasy installed with VRFW 0.3.0 or newer.
- Do not use online play or cross-save with mods.

## How it works

For each move the app writes, in VRFW's formats:

1. a recoloured copy of the move's effect object (`[[recolor]]` with `copy`, textures, materials, vertex colours and particles; grey pixels stay as they are, since many effects use grey textures as masks; a part of its own colour is a `per_texture` entry), and copies of its other effect objects and 3D figures (these with their row in the game's model table, `VRFW.character`);
2. its own cut-in(s), copied from the original's (`VRFW.anim`), that load that copy and its own name banner (`[[event_command]]`);
3. the new move (`VRFW.technique`), based on the original, with its own key, element and name (and TP and power, if you picked another step);
4. the name banner (`VRFW.telop_list`), a 1728×352 PNG drawn by the app;
5. its row in Inazuma Fantasy's Technique Shop (`VRFW.shop`).

A move's internal name and key never come back: a move made after another was deleted is never mistaken for one you already bought.

## For developers

The app is plain HTML and JavaScript, with no dependencies.

| File | What it is |
|---|---|
| `src/page.html` | The page: interface, colour preview, name banner, the mod's files |
| `src/data/techniques.json` | The moves of the base game (names, category, element, power, TP, effect object, cut-ins) |
| `src/fonts/` | The banner fonts (Rum Raisin by default, and six others to choose from; their licences and authors in `src/fonts/FONTS.txt`) |
| `src/data/texture_groups.json` | The colour groups of each move's textures (names and hues only) |
| `tools/make_techniques.py` | Rebuilds `techniques.json` from VRFW's `VRFW ids.xlsx` |
| `tools/survey_textures.js`, `tools/texture_groups.py` | Rebuild `texture_groups.json` from VRFW copies of the effects with their original textures |

To build `app/technique-colours.html`, run:

```
python build.py
```

## Credits

- **VRFW**: the framework that makes all of this possible (effect recolours, cut-in copies, name banners, new moves, shops), and the ids workbook the move list comes from.
- **Inazuma Fantasy**: the Technique Shop, and the recoloured moves (the red and blue God Hands) this app follows.
- **Rum Raisin** by Astigmatic (SIL Open Font License 1.1): the name banners' default font. The others to choose from: Lilita One, Spicy Rice, Titan One, Bangers (SIL OFL 1.1), Chewy and Luckiest Guy (Apache 2.0); see `src/fonts/FONTS.txt`.

*Inazuma Eleven* and everything from the game belong to LEVEL-5. This is a fan project, not affiliated with LEVEL-5.

## License

[GPL-3.0](LICENSE). You can fork, change and share this project. Copies and changed versions must keep the credits and the same license, and their source code must stay open. If you publish your own version, please let me know by opening an issue. The fonts keep their own licences (SIL OFL 1.1 or Apache 2.0).

---

## Português

O Technique Colours é uma app que corre no browser, no teu PC, e cria **técnicas novas** para o *Inazuma Eleven: Victory Road* com o mod **Inazuma Fantasy**: cópias das técnicas do jogo com o efeito **noutra cor** e um **nome teu**. Ficam à venda na **loja de técnicas** do Inazuma Fantasy; as do jogo ficam como estão. Podes escolher o elemento, o preço e o TP e a força (na escala do próprio jogo) e ver as cores no vídeo da técnica. Nas técnicas com partes de várias cores (534, como o fogo e o gelo da Cross Fire), cada parte pode ter a cor da técnica, uma cor própria ou manter a original; o mesmo nas figuras 3D (dragões, gigantes…) e nos outros efeitos. A app desenha o nome na animação no estilo do jogo, com 7 letras à escolha ou um ficheiro de letra teu, e podes fazer vários mods com **+ Novo**. A app está em inglês, português e espanhol.

Para usar:
1. Em [**Releases**](../../releases), descarrega o `TechniqueColours-1.2.zip` e **descomprime-o** (por exemplo em `C:\Games`; **não** dentro da pasta `mods` nem dentro de Program Files).
2. Abre o **Technique Colours.bat** e escolhe a pasta **mods** do jogo que abres com o launcher de mods.
3. Procura a técnica original, escolhe a cor, o nome e o preço e carrega em **Criar técnica**.
4. Com o jogo fechado, carrega em **Gerar o mod** e liga o **Technique Colours** no launcher.

Precisas do Inazuma Fantasy com o VRFW 0.3.0 ou mais recente, e do Edge ou do Chrome. Antes de apagar uma técnica na app, tira-a aos jogadores que a aprenderam. Não uses jogo online nem cross-save com mods.

> **Program Files:** o Edge e o Chrome não deixam uma página abrir pastas dentro de `Program Files`, `Program Files (x86)`, `Windows` ou `AppData`. Mantém a app **e o jogo** fora delas. Se o jogo estiver na biblioteca padrão do Steam, muda-o no Steam: botão direito no jogo → **Propriedades** → **Ficheiros instalados** → **Mover pasta de instalação**.

## Español

Technique Colours es una aplicación que funciona en el navegador, en tu PC, y crea **técnicas nuevas** para *Inazuma Eleven: Victory Road* con el mod **Inazuma Fantasy**: copias de las técnicas del juego con el efecto **en otro color** y un **nombre tuyo**. Se venden en la **tienda de técnicas** de Inazuma Fantasy; las del juego quedan como están. Puedes elegir el elemento, el precio y el TP y la potencia (en la escala del propio juego) y ver los colores en el vídeo de la técnica. En las técnicas con partes de varios colores (534, como el fuego y el hielo de Fuego cruzado), cada parte puede tener el color de la técnica, un color propio o mantener el original; lo mismo en las figuras 3D (dragones, gigantes…) y en los otros efectos. La aplicación dibuja el nombre en la animación con el estilo del juego, con 7 fuentes a elegir o un archivo de fuente tuyo, y puedes hacer varios mods con **+ Nuevo**. La aplicación está en inglés, portugués y español.

Para usarla:
1. En [**Releases**](../../releases), descarga `TechniqueColours-1.2.zip` y **descomprímelo** (por ejemplo en `C:\Games`; **no** dentro de la carpeta `mods` ni dentro de Program Files).
2. Abre **Technique Colours.bat** y elige la carpeta **mods** del juego que abres con el launcher de mods.
3. Busca la técnica original, elige el color, el nombre y el precio y pulsa **Crear técnica**.
4. Con el juego cerrado, pulsa **Generar el mod** y activa **Technique Colours** en el launcher.

Necesitas Inazuma Fantasy con VRFW 0.3.0 o más reciente, y Edge o Chrome. Antes de borrar una técnica en la aplicación, quítasela a los jugadores que la aprendieron. No uses el juego en línea ni cross-save con mods.

> **Program Files:** Edge y Chrome no dejan que una página abra carpetas dentro de `Program Files`, `Program Files (x86)`, `Windows` o `AppData`. Mantén la aplicación **y el juego** fuera de ellas. Si el juego está en la biblioteca predeterminada de Steam, muévelo en Steam: clic derecho en el juego → **Propiedades** → **Archivos instalados** → **Mover carpeta de instalación**.
