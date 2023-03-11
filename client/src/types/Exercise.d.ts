import { Base } from "./Base";

export interface Exercise extends Base {
  question: string;
  totalErrors: number;
  timeElapsed: number;
  user: string;
}

export type NewExercise = Pick<
  Exercise,
  "question" | "totalErrors" | "timeElapsed" | "user"
>;
