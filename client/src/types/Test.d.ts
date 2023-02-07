import { Base } from "./Base";
import { LearningTypes } from "./Enums";

export interface Test extends Base {
  learningType: LearningTypes;
  user: string;
  completed: boolean;
  answers: ResultAnswer[];
}

export interface ResultAnswer {
  question: Question;
  answer: Answer;
}
