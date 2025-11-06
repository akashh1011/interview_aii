import mongoose , {Schema} from "mongoose";
const questionSchema = new Schema({
  userID:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  topic:{
    type:String,
    required:true
  },

  difficulty:{
    type:String,
    enum:["easy","medium","hard"],
    required:true,
    
  },

  questions:[
    {
      question:{type:String, required:true},
      answer:{type:String}
    }
  ]
},{timestamps:true})

export const Question = mongoose.model("Question", questionSchema)