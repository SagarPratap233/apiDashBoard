import mongoose, { Document, Model, Schema, Types } from 'mongoose'
import { CurlCommand } from './curlCommand'

interface ApiResultFormat extends Document {
  collectionId: Types.ObjectId
  api: Types.ObjectId
  url: string
  latency: number
  status: number
  success: boolean
  timeStamp: Date
}

const ApiResultSchema: Schema = new Schema({
  collectionId: { type: Types.ObjectId, ref: 'collection', required: true },
  api: { type: Types.ObjectId, ref: 'CurlCommand', required: true },
  url: { type: String, required: true },
  latency: { type: Number, required: true },
  status: { type: Number, required: true },
  success: { type: Boolean, required: true },
  timeStamp: { type: Date, default: Date.now, required: true },
})

export const ApiResult = mongoose.model<ApiResultFormat>(
  'ApiResult',
  ApiResultSchema
)
