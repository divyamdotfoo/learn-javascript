import { GithubApiRes, Question } from "@/types";
import { Octokit } from "@octokit/core";
import { atob } from "buffer";
import { nanoid } from "nanoid";
const REGEXPS = {
  extractRawQuestionData: /######(.*?)---/gs,
  extractQuestion: /######\s+(.*?)\n\n/,
  extractOptions: /-\s*A:\s*([\s\S]*?)<details>/,
  extractAnswer: /####(?!.*#)[^:]*:\s*([^\n]+)/s,
  extractExplanation: /####(?!.*#)[^:]*:\s*(.*?)<\/p>/s,
  extractCode: /```javascript(.*?)```/s,
};

const getMdFileContents = async (path: string) => {
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

export const buildRegistryForLang = async (
  path: string
): Promise<Question[]> => {
  const content = await getMdFileContents(path);
  const rawQuestionData = content.match(REGEXPS.extractRawQuestionData);
  if (!rawQuestionData) {
    console.log("invalid path", path);
    throw new Error("invalid data");
  }
  console.log(path, rawQuestionData.length);
  return rawQuestionData
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
    .filter(Boolean) as Question[];
};
