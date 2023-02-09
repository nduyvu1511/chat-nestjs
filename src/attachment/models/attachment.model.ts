import { Attachment, AttachmentTypeEnum } from '@attachment/types'
import { Document, Schema } from 'mongoose'

const AttachmentSchema = new Schema<Attachment>(
  {
    url: { type: String, required: true, trim: true },
    thumbnail_url: { type: String },
    type: {
      type: String,
      enum: AttachmentTypeEnum,
      trim: true,
      lowercase: true,
      required: true,
    },
    public_id: { type: String, required: false },
    asset_id: { type: String, required: false },
    created_at: {
      type: Schema.Types.Date,
      default: Date.now,
    },
    updated_at: {
      type: Schema.Types.Date,
      default: Date.now,
    },
  },
  {
    collection: 'Attachments',
    timestamps: true,
  }
)

export { AttachmentSchema }
export interface AttachmentDocument extends Document, Omit<Attachment, '_id'> {}
