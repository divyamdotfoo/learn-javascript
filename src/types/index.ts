export type GithubApiRes = {
  status: number;
  data: {
    name: string;
    content: string;
  };
};

type Answer = "A" | "B" | "C" | "D" | "E" | "F";
export type Question = {
  id: string;
  question: string;
  options: {
    value: Answer;
    text: string;
  }[];
  answer: Answer;
  explanation: string;
  code?: string;
};
