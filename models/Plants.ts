import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IPlant extends Document {
  name: string;
  description: string;
  price: number;
  image:string,
  seller:{
    type:ObjectId,
    ref:string,
    required:boolean
  }
}

const PlantSchema = new Schema<IPlant>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User", // 👈 reference to User model
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Plant || mongoose.model<IPlant>("Plant", PlantSchema);


