'use strict'
const {Client,Model} = require('../../../db/nosql/cassandra/db')
const errores = require('../../errors')
let db = Client
module.exports ={
    getUsuarios:async(root,{limit}) => {
        limit = limit !=null ? limit : 0
        let  usuarios= []
        try{          
        
        const query = 'Select * from usuarios'
        const options = { prepare: true , fetchSize: limit};
        usuarios = await db.execute(query,{},options).then(res=> {return res} )
        
            return usuarios
        
        }catch(error){
            console.log("Error al realizar GetUsuarios")
            errores(error);
        }
        
    },
    getUsuario: async(root,{id})=>{
        let usuario
        try {   
              
            const query = 'Select * from usuarios where id = ?'
        
        usuario = await db.execute(query,[id]).then(res=> {return res} )
        return usuario.rows[0]
        } catch (error) {
            console.log("Error al realizar GetUsuario por id")
            errores(error)         
        }
    },
    getCategorias: async(root,{limit}) => {
        limit = limit !=null ? limit : 0
        
        try{
        const query = 'Select * from categorias'
        const options = { prepare: true , fetchSize: limit};  
        return await db.execute(query,{},options).then(res=> {return res} )

        }catch(error){
            console.log("Error al realizar Get Categorias")
            errores(error)           
        }
    },
    getCategoria: async(root,{id})=>{
        let categoria
        try{
        const query = 'Select * from categorias where id = ?'
        categoria = await db.execute(query,[id]).then(res=> {return res} )
        return categoria.rows[0]
        }catch(error){
            console.log("Error al realizar Get Categoria por id")
            errores(error)
        }
    },
    getComentarios: async(root,{limit}) => {
        limit = limit !=null ? limit : 0
        let comentarios = []

        try {
        const query = 'Select * from comentarios'
        const options = { prepare: true , fetchSize: limit};
        comentarios = await db.execute(query,{},options).then(res=> {return res} )
        
           return comentarios
        } catch (error) {
            console.log("Error al realizar el Get Comentarios")
            errores(error)
        }
    },
    getComentario: async(root, {id}) => {
        let comentario
        try {
            
        const query = 'Select * from comentarios id = ?'
        comentario = await db.execute(query,[id]).then(res=> {return res} )
        return comentario.rows[0]

        } catch (error) {
            console.log("Error al realizar Get Comentario por id")
            errores(error)
            
        }
    },
    getPosts: async(root,{limit}) => {
        limit = limit !=null ? limit : 0
        let posts = []
        try {
        const query = 'Select * from posts'
        const options = { prepare: true , fetchSize: limit};
        posts = await db.execute(query,{},options).then(res=> {return res} )
            return posts
        } catch (error) {
            console.log("Error al realizar Get Posts")
            errores(error)
            
        }

    },
    getPost: async (root,{id}) => {
        console.log("id", id)
        let post 
        try {
            const query = 'Select * from posts id = ?'
        
        post = await db.execute(query,[id]).then(res=> {return res} )     
            return post.rows[0]
        } catch (error) {
            console.log("Error al realizar get Post por id")
            errores(error)
            
        }
    
    }

}