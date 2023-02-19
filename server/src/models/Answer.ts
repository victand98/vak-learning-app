import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "./BaseModel";
import { Question } from "./Question";

enum LearningTypes {
  visual = "visual",
  auditory = "auditiva",
  kinesthetic = "kinestésica",
}

class Answer extends BaseModel {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true, enum: Object.values(LearningTypes) })
  public learningType!: LearningTypes;

  @prop({ ref: () => Question, type: () => Number, required: true })
  public question!: Ref<Question, number>;
}

const AnswerModel = getModelForClass(Answer);

export { Answer, AnswerModel, LearningTypes };
