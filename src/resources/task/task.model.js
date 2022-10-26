import mongoose, {Schema} from 'mongoose'

const taskSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    listId:{
        type: Schema.Types.ObjectId,
        ref: 'list',
        required: true
    }
  },
  { timestamps: true }
)

export const Task = mongoose.model('task', taskSchema)
