import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, HydratedDocument } from 'mongoose';
import { MatchStatus } from '../../common/enum';

@Schema({ timestamps: true })
export class Match {
  @Prop({ required: true, trim: true })
  homeTeam: string;

  @Prop({ required: true, trim: true })
  awayTeam: string;

  @Prop({ required: true, trim: true })
  competition: string;

  @Prop({ required: true })
  kickoffTime: Date;

  @Prop({ min: 0 })
  pricePerSeat: number;

  @Prop({ min: 1 })
  totalSeats: number;

  // The counter the atomic booking operation decrements. Starts equal to
  // totalSeats and only ever moves through the atomic findOneAndUpdate/updateOne
  // guard designed earlier — never edited directly outside that operation.
  @Prop({ required: true, min: 0 })
  availableSeats: number;

  @Prop({ type: String, enum: MatchStatus, default: MatchStatus.DRAFT })
  status: MatchStatus;

  @Prop()
  externalFixtureId?: string;

  // REFERENCING, not embedding — see the design note below.
  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy?: Types.ObjectId;
}

export const MatchSchema = SchemaFactory.createForClass(Match);

export type MatchDocument = HydratedDocument<Match & Document>;
