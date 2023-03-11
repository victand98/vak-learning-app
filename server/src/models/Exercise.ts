import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "./BaseModel";
import { User } from "./User";

class Exercise extends BaseModel {
  @prop({ required: true })
  public question!: string;

  @prop({ required: true })
  public totalErrors!: number;

  @prop({ required: true })
  public timeElapsed!: number;

  @prop({ required: true, ref: () => User })
  public user!: Ref<User>;
}

const ExerciseModel = getModelForClass(Exercise);

export { Exercise, ExerciseModel };
