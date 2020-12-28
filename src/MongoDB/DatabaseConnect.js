const mongoose=require('mongoose');
const URL="mongodb+srv://admin1:39208224@bdprueba-ulgao.gcp.mongodb.net/Permanecer?retryWrites=true&w=majority";
module.exports= ()=>{
    mongoose.set('useCreateIndex', true);
    //le agregue esta nueva instruccion para solucionar el error
    //DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
    mongoose.connect(URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log('DB conectada');
    }).catch((err)=>{
        console.error(err);
    });
}