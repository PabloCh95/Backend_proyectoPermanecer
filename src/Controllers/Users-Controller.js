const bcrypt = require("bcrypt");
const Users=require('../MongoDB/Models/Users');
const jwtFunction = require('../Services/Token');

const login= async(req,res)=>{
    try{
        const {email,password} = req.body
        const user= await Users.findOne({email});
        if(user){

            const OK= bcrypt.compare(password,user.password);
            if(OK){
                const accessToken= jwtFunction.createAccessToken(user);
                const refreshToken= jwtFunction.createRefreshToken(user);
                res.status(200).send({user,accessToken,refreshToken});
            }else{
                res.status(404).send({message:"Contraseña Incorrecta"});
            }
        }else{
            res.status(404).send({message:"Usuario No Encontrado"});
        }

    }catch(e){
        res.status(500).send({status:'ERROR', message: e.message});
    }
};

const create = async(req,res)=>{
    try{
        const {name,lastname,email,password,repeatPassword, role} = req.body;

        if(!password || !repeatPassword){
            req.status(404).send({message:"los campos tienen que tener contenido"});
        }else if(password!==repeatPassword){
            res.status(404).send({message:"El Password y RepeatPassword tienen que coincidir"});
        }else{
            const hash=await bcrypt.hash(password,15);

            await Users.create({
               name,
               lastname,
               email,
               role,
               password:hash 
            })
            //const user= await Users.findOne({email});
            //tengo que devolver el usuario creado
            res.status(200).send({message: "registro exitoso" });
        }

    }catch(error){
        if(error.code && error.code == 11000){
            res.status(400).send({status:'DUPLICATED_VALUES', message: "El usuario ya existe"});
        return;
        }//ESTE MANEJO DE ERROR ES PARA LA DUPLICIDAD DE CUENTAS, SI ES QUE INTENTAN CREAR UNA CUENTA PARECIDA (CON EL MISMO EMAIL O USERNAME)
    //  console.log('error createuser', error);
      res.status(500).send({status:"ERROR", message: error.message});
    };
};
const mostrar = async(req,res)=>{
    res.send('mostrar');
}
module.exports={create,login,mostrar};