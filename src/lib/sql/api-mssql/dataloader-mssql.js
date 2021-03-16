'use strict'
const {mssql}=require('../../../db/sql/db')
const errores = require('../../errors')
const DataLoader = require('dataloader')
const { createContext, EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize')
let db = mssql
const context = createContext(db.sequelize2)
const { Op } = db.Sequelize

const findBy = async (model,mensaje,...values) => { 
 
    try {
        return  await model.then(res=>
            res.findAll({
                where: {id:{[Op.in]:values}}},{[EXPECTED_OPTIONS_KEY]: context} // conditions
              )
              )
    } catch (error) {
        console.log("Error al realizar el types de ", mensaje)
        errores(error)
        
    }
  }

const findComentarioPost = async(model,mensaje,...values)=>{

  try {
    return  await Promise.resolve(Array(model.then(res=>
        res.findAll({
            where: {postsid:values}},{[EXPECTED_OPTIONS_KEY]: context} // conditions
          )
          )))
} catch (error) {
    console.log("Error al realizar el types de ", mensaje)
    errores(error)
    
}
}
const loaderUsuarios = new DataLoader(values => 
  findBy(db.usuarios,"usuariosid",...values)
    );
const loaderCategorias = new DataLoader(values => 
        findBy(db.categorias,"categoriasid",...values)
          );
const loaderPosts = new DataLoader(values => 
    findBy(db.posts,"postsid",...values)
      );
const loaderComentarios = new DataLoader(values => {
 
    const comment = values.map((id)=>{
    return db.comentarios.then(res=>res.findAll({where:{postsid:id}}))
  } )
  return Promise.all(comment)
});
  
module.exports={
dataloaderUsuarios:loaderUsuarios,
dataloaderCategoria:loaderCategorias,
dataloaderPosts: loaderPosts,
dataloaderComentarios: loaderComentarios
}

// const findBy = async (...values) => { 
 
//     try {
//         return  await db.usuarios.then(res=>
//             res.findAll({
//                 where: {id:{[Op.in]:values}}} // conditions
//               )
//               )
//     } catch (error) {
//         console.log("Error al realizar el types de", mensaje)
//         errores(error)
        
//     }

    
    
//   }
//   const loaderListaDatos = new DataLoader(model => 
//   findBy(...model)
//     );