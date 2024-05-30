import fs from "fs/promises";

async function main() {
  const data = JSON.parse(await fs.readFile("pretty.json"));
  fs.writeFile(
    "langs.json",
    JSON.stringify(
      Object.fromEntries(
        data.map((d) => [
          d.code,
          d.lang ? Object.values(d.lang).map((_) => _.toLowerCase()) : [],
        ])
      )
    )
  );
}

main();
