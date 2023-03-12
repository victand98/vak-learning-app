import { Exercise, NewExercise } from "@/types";
import { Session } from "next-auth";
import { request } from "../helpers";

export class ExerciseService {
  static allByUser = (session: Session) =>
    request.get<Exercise[]>("/api/exercise/user", { params: { session } });
  static save = (exercise: NewExercise, session: Session) =>
    request.post<Exercise>("/api/exercise", exercise, { params: { session } });
}
