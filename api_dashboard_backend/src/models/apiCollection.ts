import mongoose, { Schema, Types, Document } from 'mongoose'

interface IApiInterval {
  api: Types.ObjectId // Reference to the CurlCommand (API)
  interval: string // Polling interval for this API
}

interface ICollection extends Document {
  name: string
  apis: IApiInterval[] // Array of API-interval pairs
}

const collectionSchema: Schema<ICollection> = new Schema({
  name: { type: String, required: true },
  apis: [
    {
      api: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CurlCommand',
        required: true,
      }, // API reference
      interval: { type: String, required: true }, // Polling interval
    },
  ],
})

export const collection = mongoose.model<ICollection>(
  'Collection',
  collectionSchema
)
