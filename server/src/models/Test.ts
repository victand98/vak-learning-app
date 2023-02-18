import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Answer, LearningTypes } from "./Answer";
import { BaseModel } from "./BaseModel";
import { Question } from "./Question";
import { User } from "./User";

class Test extends BaseModel {
  @prop({ default: "Sin definir" })
  public learningType?: LearningTypes;

  @prop({ ref: () => User, required: true, unique: true })
  public user!: Ref<User>;

  @prop({ default: false })
  public completed?: boolean;

  @prop({ required: true, type: () => [ResultAnswer], default: [] })
  public answers!: ResultAnswer[];
}

class ResultAnswer {
  @prop({ ref: () => Question, type: () => Number, required: true })
  public question!: Ref<Question, number>;

  @prop({ ref: () => Answer, required: true })
  public answer!: Ref<Answer>;
}

const TestModel = getModelForClass(Test);

export { Test, TestModel, ResultAnswer };
