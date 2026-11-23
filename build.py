"""Builds app/technique-colours.html from src/: the page, the move list and the banner fonts in one file."""
import base64, pathlib
here = pathlib.Path(__file__).parent
page = (here / 'src' / 'page.html').read_text(encoding='utf-8')
page = page.replace('<!--TOMLLIB-->', '<script>\n' + (here / 'src' / 'lib' / 'toml.min.js').read_text(encoding='utf-8') + '\n</script>')
page = page.replace('<!--CODEC-->', '<script>\n' + (here / 'src' / 'lib' / 'codec.js').read_text(encoding='utf-8') + '\n</script>')
spirits = (here / 'src' / 'spirits.js').read_text(encoding='utf-8').replace('/*SPIRITS*/[]', (here / 'src' / 'data' / 'spirits.json').read_text(encoding='utf-8').strip()).replace('/*SPLIT*/[]', (here / 'src' / 'data' / 'split_scenes.json').read_text(encoding='utf-8').strip())
page = page.replace('<!--SPIRITS-->', '<script>\n' + spirits + '\n</script>')
page = page.replace('/*GROUPS*/{}', (here / 'src' / 'data' / 'texture_groups.json').read_text(encoding='utf-8').strip())
page = page.replace('/*TECHS*/[]', (here / 'src' / 'data' / 'techniques.json').read_text(encoding='utf-8').strip())
for f in sorted((here / 'src' / 'fonts').glob('*-Regular.woff2')):   # the banner fonts: /*FONT:RumRaisin*/ …
    page = page.replace(f'/*FONT:{f.stem[:-8]}*/', base64.b64encode(f.read_bytes()).decode())
assert '/*FONT' not in page, 'a font is missing in src/fonts'
(here / 'app' / 'technique-colours.html').write_text(page, encoding='utf-8', newline='\n')
print('app/technique-colours.html', len(page) // 1024, 'KB')
