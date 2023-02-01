import { getModelForClass, prop } from "@typegoose/typegoose";
import { BaseModel } from "./BaseModel";

enum Genders {
  female = "female",
  male = "male",
  other = "other",
}

class User extends BaseModel {
  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ default: true })
  public status?: boolean;

  @prop({ required: true, enum: Object.values(Genders) })
  public gender!: Genders;

  @prop({ required: true })
  public course!: string;

  @prop({ required: true })
  public educationalUnit!: string;
}

const UserModel = getModelForClass(User);

export { User, UserModel, Genders };
