const {Client,Model,getINcomentarios} = require('../../../db/nosql/cassandra/db')
const DataLoader = require('dataloader');
const model = require('../../../db/sql/model');
const { query } = require('express');
let db = Client
let consultas = Model

const loaderCategorias = new DataLoader(async(categoryIds)=>{
    const query = 'Select * from categorias where id IN ? ALLOW FILTERING'
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
          promises.push( db.execute(query,[tempUserIds]).then(res => {return res}))
        }
     
        const promisesResult = await Promise.all(promises)
      
        promisesResult.forEach((tempCategorias)=>{
        
          tempCategorias.rows.forEach((categorias)=>{
            

            categoryObj[categorias.id].push(categorias)
          })
        });
     
        const result = categoryIds.map((categoryId)=> categoryObj[categoryId])
        return Promise.all(result) 
       }catch(err){
     
       }
});
const loaderComentarios = new DataLoader(
    
async(postIds)=>{
    try {
    const query = 'Select * from comentarios where postsid = ? ALLOW FILTERING'
      const post = postIds.map(id=>{
          return db.execute(query,[id]).then(res => res)
      })
      return Promise.all(post)
       
          }catch(err){
        console.log(err)
          }
  
    
  }
    );

const loaderPosts = new DataLoader(async(postsIds)=>{
    try {
        const post = postsIds.map(id=>{
            return consultas.Posts.find({id})
        })

        return Promise.all(post)
    } catch (error) {
        console.log(error)
    }
    
});

const loaderUsuarios = new DataLoader(
    async(userIds)=>{
        try {
           const user = userIds.map(id=>{
               return consultas.Usuarios.find({id})
           })

           return Promise.all(user)
      
      }catch(err){
          console.log(err)
      }
}
    )


module.exports={
dataloaderUsuarios:loaderUsuarios,
dataloaderCategoria:loaderCategorias,
dataloaderPosts: loaderPosts,
dataloaderComentarios: loaderComentarios
}

