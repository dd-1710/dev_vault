import mongoose from "mongoose";

const snippetsSchema = new mongoose.Schema({
    title: {type:String,required:true,unique:true},
    language: {type:String,required:true},
    code: {type:String,required:true},
    desc: {type:String},
    tags: [{type:String}],
    createdBy: {type:String},
    createdDate: {type:Date,required:true,default:Date.now},
    userId: {type: mongoose.Schema.Types.ObjectId,ref: 'Users', required: true}
})

export default mongoose.model('Snippets',snippetsSchema)