const express=require('express');//importo modulo de express
const app=express();//aplico express a app
const morgan=require('morgan');//importo morgan para tener un control en las apis, mas que nada para tener un informe en mi consola de mi servidor
const bodyparser=require('body-parser');//
const dotenv=require("dotenv");
const bd=require('./MongoDB/DatabaseConnect');// importo el modulo de la base de datos(la conexion)
const RutasUsers=require('./Routes/Users-Routes');
const AuthRoutes = require("./Routes/auth-Routes");
const PORT=4000;//establezco como constante el puerto

//Configuracion para leer archivos env
dotenv.config();

//Configuraciones del servidor
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());//esto es para que el servidor admita archivos en formato json

//Conexion base de datos
bd();//importe la conexion con la base de datos


//establezco un get para la ruta
app.use("/api/auth",AuthRoutes);
app.use('/api/users',RutasUsers);//no podia acceder a las rutas porque el parametro que le puse estaba incorrecto
//antes estaba "api/users", pero despues lo coloque asi y ahi funciono "/api/users"
//establezco que la app escuche o este conectada al puerto
app.listen(PORT,()=>{
    console.log(`Se conecto en el puerto: ${PORT}`);
})