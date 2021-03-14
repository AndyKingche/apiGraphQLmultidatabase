'use strict'
const {pgsql }=require('../../../db/sql/db')
const errores = require('../../errors')
const DataLoader = require('dataloader')
const { createContext, EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize')
let db = pgsql
const context = createContext(db.sequelize3)
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
      return await model.then(res=>
        res.findAll({where:{postsid:values}},{[EXPECTED_OPTIONS_KEY]: context}
        // conditions
          )
          ).catch(err => console.log(err))
   
              
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
const loaderComentarios = new DataLoader(values => {
  const comment = values.map((id)=>{
    return db.comentarios.then(res=>res.findAll({where:{postsid:id}}))
  } )
  return Promise.resolve(comment)
});
  
      async function idpost(id){

        return await db.comentarios.then(res=>
          res.findAll({where:{postsid:id}},{[EXPECTED_OPTIONS_KEY]: context}
          // conditions
            )
            ) 
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