const jwt=require("jwt-simple");
const moment=require("moment");
const JWT_SECRET="StringCUALQUIERA1234512"

const createAccessToken= function(user){
    
    const payload={
        id:user._id,
        name:user.name,
        lastname:user.lastname,
        email:user.email,
        role:user.role,
        createToken: moment().unix(),
        exp:moment().add(3,"hours").unix()
    }

    return jwt.encode(payload, JWT_SECRET);
};

const createRefreshToken= function(user){
    const payload={
        id:user._id,
        exp:moment().add(20,"days").unix()
    }

    return jwt.encode(payload, JWT_SECRET);
};

const decodedToken= function(token){
    return jwt.decode(token,JWT_SECRET,true);
};

module.exports={createRefreshToken,decodedToken,createAccessToken};