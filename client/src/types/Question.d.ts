import { Answer } from "./Answer";
import { Base } from "./Base";

export interface Question extends Base {
  id: number;
  title: string;
}

export interface QuestionAnswers extends Base {
  id: number;
  title: string;
  answers: Omit<Answer, "question">[];
}
