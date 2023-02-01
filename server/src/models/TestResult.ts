import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Answer, LearningTypes } from "./Answer";
import { BaseModel } from "./BaseModel";
import { Question } from "./Question";
import { User } from "./User";

class TestResult extends BaseModel {
  @prop({ required: true, default: "Sin definir" })
  public learningType!: LearningTypes;

  @prop({ ref: () => User, required: true })
  public user!: Ref<User>;

  @prop({ required: true, type: () => [ResultAnswer] })
  public answers!: ResultAnswer[];
}

class ResultAnswer {
  @prop({ ref: () => Question, type: () => Number, required: true })
  public question!: Ref<Question, number>;

  @prop({ ref: () => Answer, required: true })
  public answer!: Ref<Answer>;
}

const TestResultModel = getModelForClass(TestResult);

export { TestResult, TestResultModel, ResultAnswer };
