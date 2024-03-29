import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({required:false})
  phone: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
