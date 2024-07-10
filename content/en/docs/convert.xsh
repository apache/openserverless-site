from pathlib import Path
adoc=$(find . -name *.adoc).splitlines()
adocs=$(find docs | grep .adoc).splitlines()

for adoc in adocs:
#adoc = adocs[0]
    name = adoc.split("/")[-2]
    text = Path(adoc).read_text()
    if not text.startswith("---"):
        print(adoc)
        text = f"---\ntitle: {name}\n---\n{text}"
        Path(adoc).write_text(text)

