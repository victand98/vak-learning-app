import { Base } from "./Base";

export interface QuestionAnswers extends Base {
  title: string;
  answers: Answer[];
}

export interface Answer extends Base {
  title: string;
  learningType: string;
}
