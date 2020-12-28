const jwt = require("../services/Token");
const moment = require("moment");
const User = require("../MongoDB/Models/Users");

function willExpiredToken(token){
    const {exp} = jwt.decodedToken(token);
    const currentDate = moment().unix();

    if(currentDate > exp){
        return true;//esto te dice que el token caduco
    }
    return false;//esto comprueba si el token caduco o no...En este caso no caduco
}

const refreshAccessToken = async (req,res) =>{
    try{
    const {refreshToken} = req.body;
    const isTokenExpired = willExpiredToken(refreshToken);
    
    if(isTokenExpired){
        res.status(404).send({message:"El refreshToken ha caducado"});
    }else{
        const {id}= jwt.decodedToken(refreshToken);
        const user=await User.findOne({_id: id});
        if(!user){
            res.status(404).send({message:"Usuario no encontrado"});
        }else{
            res.status(200).send({
                accessToken: jwt.createAccessToken(user),
                refreshToken: refreshToken,
            });
        }
    }
    }catch(err){
        res.status(500).send({message:err.message});
    }
}

module.exports = {
    refreshAccessToken,
    willExpiredToken
};