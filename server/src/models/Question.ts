import { getModelForClass, prop } from "@typegoose/typegoose";
import { BaseModel } from "./BaseModel";

class Question extends BaseModel {
  @prop()
  public _id!: number;

  @prop({ required: true })
  public title!: string;
}

const QuestionModel = getModelForClass(Question);

export { Question, QuestionModel };
