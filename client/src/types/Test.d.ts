import { Answer } from "./Answer";
import { Base } from "./Base";
import { LearningTypes } from "./Enums";

export interface Test extends Base {
  learningType: LearningTypes;
  user: string;
  completed: boolean;
  answers: ResultAnswer[];
}

export interface ResultAnswer {
  question: number;
  answer: string;
}

export type TestFormValues = { [key: string]: string };

export type NewTest = Pick<Test, "learningType" | "answers">;
