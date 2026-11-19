"""Builds app/technique-colours.html from src/: the page, the move list and the banner font in one file."""
import base64, pathlib
here = pathlib.Path(__file__).parent
page = (here / 'src' / 'page.html').read_text(encoding='utf-8')
page = page.replace('/*TECHS*/[]', (here / 'src' / 'data' / 'techniques.json').read_text(encoding='utf-8').strip())
page = page.replace('/*FONT*/', base64.b64encode((here / 'src' / 'fonts' / 'RumRaisin-Regular.woff2').read_bytes()).decode())
(here / 'app' / 'technique-colours.html').write_text(page, encoding='utf-8', newline='\n')
print('app/technique-colours.html', len(page) // 1024, 'KB')
