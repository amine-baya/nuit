import mongoose from 'mongoose'

const fileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    image: {
        type: Array
        
      }
  
},{
    timestamps: true
})



const File = mongoose.model('File', fileSchema)

export default File