const {get,getINcomentarios} = require('../../../db/nosql/redis/db')
const errores = require('../../errors')
const DataLoader = require('dataloader')

const loaderCategorias = new DataLoader(async(categoryIds)=>{
    try {
     const categoryObj = categoryIds.reduce((prev,userId)=>{
       prev[userId] = [];
       return prev
     }, {})
    categoryIds.map(id => {
        categoryObj[id].push(get(id))
    })
    const result = categoryIds.map((categoryId)=> categoryObj[categoryId])
    //console.log("", result)
     return result ? result : []
    }catch(err){
  
    }
  });
   
   const loaderComentarios = new DataLoader(async(postIds)=>{    
     
    try {

  let promises = []
   const size = 50000
   let tempUserIds
   for(let i = 0 ; i< postIds.length; i = i+size)
   {
    tempUserIds = postIds.slice(i, i+size)
    
    promises = await getINcomentarios(tempUserIds)
  }
  

    //const promisesResult = await Promise.all(promises)
    
   return await Promise.all(promises)

 
    }catch(err){
  
    }
  });
         
   const loaderPosts = new DataLoader(async(postsIds)=>{
    try {
     const PostObj = postsIds.reduce((prev,userId)=>{
       prev[userId] = [];
       return prev
     }, {})

     postsIds.map(id => {
        PostObj[id].push(get(id))
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
              userIds.map(id => {
                  userPostObj[id].push(get(id))
     })
      const result = userIds.map((userId)=> userPostObj[userId])
      return result ? result : []
      } catch (error) {
          
      }
 
        
   }
   
  );

  
   module.exports={
   dataloaderUsuarios:loaderUsuarios,
   dataloaderCategoria:loaderCategorias,
   dataloaderPosts: loaderPosts,
   dataloaderComentarios: loaderComentarios
   }