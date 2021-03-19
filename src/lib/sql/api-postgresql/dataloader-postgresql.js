'use strict'
const {pgsql }=require('../../../db/sql/db')
const errores = require('../../errors')
const DataLoader = require('dataloader')
const { QueryTypes } = require('sequelize');
const { createContext, EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize')
let db = pgsql
const context = createContext(db.sequelize3)
const { Op } = db.Sequelize

const loaderCategorias = new DataLoader(async(categoryIds)=>{
  //console.log(categoryIds)
  try {
   const categoryObj = categoryIds.reduce((prev,userId)=>{
     prev[userId] = [];
     return prev
   }, {})
   const promises = []
   const size = 50000
   let tempUserIds
   for(let i = 0 ; i< categoryIds.length; i = i+size){
      tempUserIds = categoryIds.slice(i, i+size)
      //console.log(tempUserIds)
     promises.push( await  db.sequelize3.query("SELECT * FROM categorias Where id IN (:id)",{
      mapToModel: true, // pass true here if you have any mapped fields
      nest: true,
      replacements: { id:tempUserIds}
    }))
   }
   
   const promisesResult = await Promise.all(promises)
   promisesResult.forEach((tempCategorias)=>{
     
     tempCategorias.forEach((categorias)=>{
       categoryObj[categorias.id].push(categorias)
     })
   });

   const result = categoryIds.map((categoryId)=>categoryObj[categoryId])
   return result ? result : []
  }catch(err){

  }
});
 
 const loaderComentarios = new DataLoader(async(postIds)=>{
  try {
   const postsObj = postIds.reduce((prev,userId)=>{
     prev[userId] = [];
     return prev
   }, {})
   const promises = []
   const size = 50000
   let tempUserIds
   for(let i = 0 ; i< postIds.length; i = i+size){
      tempUserIds = postIds.slice(i, i+size)
     promises.push( await  db.sequelize3.query("SELECT * FROM comentarios Where postsid IN (:id)",{
      mapToModel: true, // pass true here if you have any mapped fields
      nest: true,
      replacements: { id:tempUserIds}
    }))
   
   
    }
   const promisesResult = await Promise.all(promises)
   promisesResult.forEach((tempComentarios)=>{
     tempComentarios.forEach((comentarios)=>{
       postsObj[comentarios.postsid].push(comentarios)
     })
   });

   const result = postIds.map((postId)=> postsObj[postId])
   return result ? result : []
  }catch(err){

  }
})
       
 const loaderPosts = new DataLoader(async(postsIds)=>{
  try {
   const PostObj = postsIds.reduce((prev,userId)=>{
     prev[userId] = [];
     return prev
   }, {})
   const promises = []
   const size = 50000
   let tempUserIds
   for(let i = 0 ; i< postsIds.length; i = i+size){
      tempUserIds = postsIds.slice(i, i+size)
     promises.push( await  db.sequelize3.query("SELECT * FROM posts Where id IN (:id)",{
      mapToModel: true, // pass true here if you have any mapped fields
      nest: true,
      replacements: { id:tempUserIds}
    }))
   
    }
   const promisesResult = await Promise.all(promises)
   promisesResult.forEach((tempPosts)=>{
     
     tempPosts.forEach((posts)=>{
       PostObj[posts.id].push(posts)
     })
   })

   const result = postsIds.map((postId)=> PostObj[postId])
   return result ? result : []

  } catch (error) {
    console.log(error)
  }

});
 
 const loaderUsuarios = new DataLoader(async(userIds)=>{
  try {
   const userPostObj = userIds.reduce((prev,userId)=>{
     prev[userId] = [];
     return prev
   }, {})
   const promises = []
   const size = 50000
   let tempUserIds
   for(let i = 0 ; i< userIds.length; i = i+size){
      tempUserIds = userIds.slice(i, i+size)
     promises.push( await  db.sequelize3.query("SELECT * FROM usuarios Where id IN (:id)",{
      mapToModel: true, // pass true here if you have any mapped fields
      nest: true,
      replacements: { id:tempUserIds}
    }))
   
    }
   const promisesResult = await Promise.all(promises)
   promisesResult.forEach((tempUsuarios)=>{
     
     tempUsuarios.forEach((usuarios)=>{
       userPostObj[usuarios.id].push(usuarios)
     })
   });

   const result = userIds.map((userId)=> userPostObj[userId])
   return result ? result : []

  } catch (error) {
    console.log(error)
  }

}
 
);
 const loaderUsuariosComentarios = new DataLoader(async(userIds)=>{
   try {
    const userPostObj = userIds.reduce((prev,userId)=>{
      prev[userId] = [];
      return prev
    }, {})
    const promises = []
    const size = 50000
    let tempUserIds
    for(let i = 0 ; i< userIds.length; i = i+size){
       tempUserIds = userIds.slice(i, i+size)
      promises.push( await  db.sequelize3.query("SELECT * FROM comentarios Where usuariosid IN (:id)",{
        mapToModel: true, // pass true here if you have any mapped fields
        nest: true,
        replacements: { id:tempUserIds}
      }))
    
    }
    const promisesResult = await Promise.all(promises)
    promisesResult.forEach((tempComentarios)=>{
      
      tempComentarios.forEach((comentarios)=>{
        userPostObj[comentarios.usuariosid].push(comentarios)
      })
    })

    const result = userIds.map((userId)=> userPostObj[userId])
    return result ? result : []

   } catch (error) {
     console.log(error)
   }

 });





module.exports={
dataloaderUsuarios:loaderUsuarios,
dataloaderCategoria:loaderCategorias,
dataloaderPosts: loaderPosts,
dataloaderComentarios: loaderComentarios
}

