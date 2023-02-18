import { Base } from "./Base";
import { LearningTypes } from "./Enums";

export interface Answer extends Base {
  title: string;
  learningType: LearningTypes;
  question: number;
}
