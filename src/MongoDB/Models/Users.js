const mongoose=require('mongoose');//necesario importar mongoose
const {Schema}=mongoose;//extraigo schema de mongoose
//aca armo el modelo de la base de datos
const UserSchema=new Schema({

    name:{type:String},
    lastname:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:['admin','master','estudiante'],default:'estudiante'},
    timestamp:{type:Date,default:Date.now}
});

const model=mongoose.model('User', UserSchema);

module.exports=model;