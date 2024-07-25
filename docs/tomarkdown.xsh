# use: nix-shell -p xonsh -p pandoc -p markdownlint-cli -p asciidoc
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
        # 1) read ascii doc and split it in frontmatter and content        
        front_matter = match.group(1).strip()
        rest_of_content = match.group(2).strip()
        # 2) write the content to temp file
        Path(base+"tmp").write_text(rest_of_content)
        
        # 3) convert from asciidoc to plain xml, then pipe it to pandoc 
        #    for markdown.
        #out=$(asciidoctor -b docbook -o - @(base)tmp | pandoc -f docbook -t markdown -o - -)
        out=$(asciidoc -b docbook -o - @(base)tmp  | pandoc --quiet -f docbook -t markdown_strict -o - -)
        
        # 4) write all the output to a markdown temp file
        tmp_md =Path(base+"_tmp.md")
        tmp_md.write_text(out)
        
        # 5) Pass all with markdown lint with fix flag on 
        $(markdownlint -f @(base)_tmp.md)
        markdown = tmp_md.read_text()
        
        # 6) Add front matter before content and save final file
        Path(base+"md").write_text(f"---\n{front_matter}\n---\n{markdown}")
        tmp_md.unlink()
        
        # 7) Cleanup
        rm -v @(base)tmp
        mv -v @(base)adoc @(base)orig
        


