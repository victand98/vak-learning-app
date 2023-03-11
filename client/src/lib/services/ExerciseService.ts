import { Exercise, NewExercise } from "@/types";
import { Session } from "next-auth";
import { request } from "../helpers";

export class ExerciseService {
  static save = (exercise: NewExercise, session: Session) =>
    request.post<Exercise>("/api/exercise", exercise, { params: { session } });
}
