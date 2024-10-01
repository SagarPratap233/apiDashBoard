import mongoose, { Schema, Types, Document} from "mongoose";


interface Icollection extends Document{
    name : string,
    apis : Types.ObjectId[];
}

const collectionSchema: Schema  = new Schema({
  name: { type: String, required: true },
  apis: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CurlCommand',
      required: true,
    },
  ],
})

export const collection = mongoose.model<Icollection>('collection', collectionSchema);


