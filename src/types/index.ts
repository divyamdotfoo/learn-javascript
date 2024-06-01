export type GithubApiRes = {
  status: number;
  data: {
    name: string;
    content: string;
  };
};

export type Answer = "A" | "B" | "C" | "D" | "E" | "F";
export type Category = "all" | "unsolved" | "solved";
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
  solved?: {
    response: Answer;
  };
};

export type LocalStore = {
  [key: string]: {
    questions: {
      [key: string]: {
        id: string;
        response: Answer;
      };
    };
    category: Category;
    index: number;
  };
};

interface OutputItemSimple {
  type: "simple";
  value: string;
}

interface OutputItemError {
  type: "error";
  errorType: string;
  errorMessage: string;
}

type OutputItem = OutputItemSimple | OutputItemError;

export type OutputArray = OutputItem[];
