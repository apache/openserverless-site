# use: nix-shell -p xonsh -p pandoc 
# then run with: xonsh tomarkdown.xsh

from pathlib import Path
import re

adocs=$(find . -name _index.adoc).splitlines()

for adoc in adocs:
    print(adoc)
    base = adoc[:-4]
    body = Path(base+"adoc").read_text()
    pattern = re.compile(r'^---\s*\n(.*?)\n---\s*\n(.*)', re.DOTALL)
    match = pattern.match(body)
    if match: 
        front_matter = match.group(1).strip()
        rest_of_content = match.group(2).strip()
        Path(base+"tmp").write_text(rest_of_content)
        out=$(asciidoctor -b docbook -o - @(base)tmp | pandoc -f docbook -t markdown -o - -)
        Path(base+"md").write_text(f"---\n{front_matter}\n---\n{out}")
        rm -v @(base)tmp
        mv -v @(base)adoc @(base)orig



