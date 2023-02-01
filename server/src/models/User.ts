import { getModelForClass, prop } from "@typegoose/typegoose";

class User {
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

  @prop({ required: true })
  public sex!: string;

  @prop({ required: true })
  public course!: string;

  @prop({ required: true })
  public educationalUnit!: string;
}

const UserModel = getModelForClass(User);

export { User, UserModel };
