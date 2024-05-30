import { GithubApiRes } from "@/types";
import { Octokit } from "@octokit/core";
import { atob } from "buffer";
import { nanoid } from "nanoid";
import { PATHS } from "./utils";
const REGEXPS = {
  extractRawQuestionData: /######(.*?)---/gs,
  extractQuestion: /######\s+(.*?)\n\n/,
  extractOptions: /-\s*A:\s*([\s\S]*?)<details>/,
  extractAnswer: /####(?!.*#)[^:]*:\s*([^\n]+)/s,
  extractExplanation: /####(?!.*#)[^:]*:\s*(.*?)<\/p>/s,
  extractCode: /```javascript(.*?)```/s,
};

export const getMdFileContents = async (path: string) => {
  const octokit = new Octokit({
    auth: "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",
  });
  const res = (await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "lydiahallie",
      path: path,
      repo: "javascript-questions",
    }
  )) as GithubApiRes;
  return atob(res.data.content);
};

const buildRegistryForLang = (lang: string, content: string) => {
  const rawQuestionData = content.match(REGEXPS.extractRawQuestionData);
  if (!rawQuestionData) return null;
  console.log(rawQuestionData.length);
  return (
    rawQuestionData
      // .slice(0, 1)
      .map((data, i) => {
        const questionMatcher = REGEXPS.extractQuestion.exec(data);
        const optionsMatcher = data.match(REGEXPS.extractOptions);
        const answerMatcher = data.match(REGEXPS.extractAnswer);
        const explanationMatcher = REGEXPS.extractExplanation.exec(data);
        const codeMatcher = REGEXPS.extractCode.exec(data);
        if (
          !questionMatcher ||
          !optionsMatcher ||
          !answerMatcher ||
          !explanationMatcher
        ) {
          // console.log(
          //   "q\n",
          //   questionMatcher,
          //   "o\n",
          //   optionsMatcher,
          //   "a\n",
          //   answerMatcher,
          //   "e\n",
          //   explanationMatcher
          // );
          // console.log(i);
          return null;
        }

        const question = questionMatcher[1].replaceAll(/\d+\./g, "").trim();
        const options = optionsMatcher[0]
          .replace("<details>", "")
          .split("\n")
          .filter((_) => _.trim().length)
          .map((opt) => {
            const [value, text] = opt.split(":");
            return {
              value: value.replace("-", "").trim(),
              text: text.replace("\n", "").trim(),
            };
          });

        const answer = answerMatcher[1].replaceAll(":", "").trim();

        const explanation = explanationMatcher[1]
          .split("\n\n")
          .slice(1)
          .filter((_) => _.trim().length)
          .join("");

        return {
          id: nanoid(6),
          question,
          options,
          answer,
          explanation,
          code: codeMatcher ? codeMatcher[1].slice(1) : null,
        };
      })
      .filter(Boolean)
  );
};

async function test() {
  for (const path of Object.entries(PATHS)) {
    const md = await getMdFileContents(path[1]);
    const registry = buildRegistryForLang(path[0], md);
    console.log(path[0], registry ? registry.length : null);
  }
  // const md = await getMdFileContents(PATHS["chinese-china"]);
  // const registry = buildRegistryForLang("german", md);
}

test();
