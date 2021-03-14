'use strict'
const {mysql}=require('../../../db/sql/db')
const errores = require('../../errors')
const DataLoader = require('dataloader')
const { createContext, EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize')
const { type } = require('dataloader-sequelize/lib/helper')
let db = mysql
const context = createContext(db.sequelize)
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

const findComentarioPost = async(mensaje,...values)=>{


  try {
    //console.log(await db.comentarios.then(res=>res.findAll({where:{postsid:values}})))
    
      return await db.comentarios.then(res=>res.findAll({where:{postsid:values}}))
    
    } catch (error) {
        console.log("Error al realizar el types de ", mensaje)
        errores(JSON.stringify(error))
        
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
const loaderComentarios = new DataLoader((values) =>{
 
  const comment = values.map((id)=>{
    return db.comentarios.then(res=>res.findAll({where:{postsid:id}}))
  } )
  return Promise.resolve(comment)
 
});


const idpost = async(...id)=>{

console.log(id)
const comentarios = db.comentarios.then(res=>
    res.findAll({where:{postsid:id}},{[EXPECTED_OPTIONS_KEY]: context}
    // conditions
      )
      )
      
      return comentarios
}
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