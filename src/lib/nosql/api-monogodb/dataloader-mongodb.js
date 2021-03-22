const {mongodb,modelo} = require('../../../db/nosql/mongodb/db')
const DataLoader = require('dataloader')
let db = mongodb

 const loaderCategorias = new DataLoader(async(categoryIds)=>{
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
     promises.push( await modelo.category.then(categorias => categorias.find({_id:{$in:tempUserIds}}).toArray()))
   }
   const promisesResult = await Promise.all(promises)
   promisesResult.forEach((tempCategorias)=>{
     tempCategorias.forEach((categorias)=>{
       categoryObj[categorias._id].push(categorias)
     })
   });

   const result = categoryIds.map((categoryId)=> categoryObj[categoryId])
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
     promises.push( await modelo.comentarios.then(posts => posts.find({postsid:{$in:tempUserIds}}).toArray()))
   }
   console.log(promises)
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
     promises.push( await modelo.posts.then(posts => posts.find({_id:{$in:tempUserIds}}).toArray()))
   }
   const promisesResult = await Promise.all(promises)
   promisesResult.forEach((tempPosts)=>{
     
     tempPosts.forEach((posts)=>{
       PostObj[posts._id].push(posts)
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
     promises.push( await modelo.user.then(usuarios => usuarios.find({_id:{$in:tempUserIds}}).toArray()))
   }
   const promisesResult = await Promise.all(promises)
   promisesResult.forEach((tempUsuarios)=>{
     
     tempUsuarios.forEach((usuarios)=>{
       userPostObj[usuarios._id].push(usuarios)
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
      promises.push( await modelo.comentarios.then(comentarios => comentarios.find({usuariosid:{$in:tempUserIds}}).toArray()))
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
 dataloaderComentarios: loaderComentarios,
 dataloaderUsuariosComentarios: loaderUsuariosComentarios
 }
 