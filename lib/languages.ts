import fs from "fs";
import path from "path";
import locales from "lib/locales";
import { Algorithm } from "./models";
import { Repositories } from "./repositories";

export function getLanguages() {
  return Object.keys(Repositories).flatMap((language) =>
    locales.map((locale) => ({
      params: {
        language,
      },
      locale,
    }))
  );
}

export async function getLanguage(language: string) {
  const languages: { [language: string]: string[] } = JSON.parse(
    (await fs.promises.readFile(path.join("tmp", "languages.json"))).toString()
  );
  const algorithms: Algorithm[] = await Promise.all(
    languages[language].map(async (algorithmName) =>
      JSON.parse(
        (
          await fs.promises.readFile(
            path.join("tmp", "algorithms-min", `${algorithmName}.json`)
          )
        ).toString()
      )
    )
  );
  return {
    name: language,
    algorithms,
  };
}
