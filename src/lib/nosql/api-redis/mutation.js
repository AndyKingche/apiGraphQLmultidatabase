'use strict'
const {redisConnection,deletes,get,getId,getkeys,set,getINcomentarios} = require('../../../db/nosql/redis/db')
const errores = require('../../errors')
let redis
module.exports = {
    createUsuario: async (root,{input}) => {     
        const newUsuario = Object.assign(input)
        let id = 'user.'+_id();
        try{
           
            newUsuario.id = id
            await set(id, newUsuario)
           
        }catch(error){
            errores(error)
            console.error("Existe un error al insertar un nuevo curso ")
        }
        //console.log("es el nuevo usuario ",newUsuario)
        return newUsuario
    },editUsuario: async ( root,{id, input} ) => {
        let usuarioEdit = Object.assign(input)
        let usuario
        let usuarioUpdate = []
        try {
    
            usuario = await getId(id)
            usuario = usuario > 0 ? await set(id, usuarioEdit) : 'FALSE'  
            usuarioUpdate = usuario == 'OK' 
            ? await get(id) : null
        } catch (error) {
            console.log("Error al editar un Usuario ")
            errores(error)
        }
        return usuarioUpdate
    },deleteUsuario: async (root, {id}) =>{
        let usuario = []
        try {
            
            usuario = await getId(id)
            console.log()
            if( usuario > 0){
                usuario = await get(id)
                await deletes(id)
                return usuario
            }else{
                console.log("No existe el Id")
            }  
        } catch (error) {
            console.log("Error al eliminar un Usuario")
            errores(error)
        }
    },   
    createCategoria: async(root,{input}) => {
        const newCategoria = Object.assign(input)
        let id = 'cat.'+_id();
        try {
            
            newCategoria.id = id
            await set(id, newCategoria)
        } catch (error) {
            console.log("Error al crear una nueva Categoria")      
        }
        return newCategoria
    },editCategoria: async (root,{id,input}) => {
        const categoriaEdit = Object.assign(input)
        let categoria
        let categoriaUpdate
        try {
            
            categoria = await getId(id)
            categoria = categoria > 0 ? await set(id, categoriaEdit) : 'FALSE'  
            categoriaUpdate = categoria == 'OK' 
            ? await get(id) : null
        } catch (error) {
            console.log("Error al atuclizar una categoria")
            errores(error)
        }
        return categoriaUpdate
    },deleteCategoria: async(root, {id}) =>{
        let categoria = []
        try {
            
            categoria = await getId(id)

            if( categoria > 0){
                categoria = await get(id)
                await deletes(id)
                return categoria
            }else{
                console.log("No existe el Id")
            } 
        } catch (error) {
            console.log("Error al eliminar una categoria")
            errores(error)  
        }

    },
    createComentario: async( root,{input} ) => {
     const newComentario = Object.assign(input)
     let id = 'com.'+_id();
     let usuario
    try {
        
        usuario = await getId(newComentario.usuariosid)
            if(usuario >0 ){
               newComentario.id = id
               await set(id, newComentario)
            }else{
                return null
            }     
        }catch (error) {
            console.log("Error al crear un comentario")
            errores(error)
        }
        return newComentario
    },editComentario: async(root,{ id, input}) => {
        const comentarioEdit = Object.assign(input)
        let comentarioUpdate
        let comentario
        try {
            
            comentario = await getId(id)
            comentario = comentario > 0 ? await set(id, comentarioEdit ) : 'FALSE'

            comentarioUpdate = comentario == 'OK'
            ? await get(id) : null
            
        } catch (error) {
            console.log("Error al editar un comentario")
            errores(error)
        }
        return comentarioUpdate
    },deleteComentario : async (root,{id}) => {
        let comentario = []
        try {
           
            comentario = await getId(id)
            if( comentario > 0){
                comentario = await get(id)
                await deletes(id)
                return comentario
            }else{
                console.log("No existe el Id")
            } 
        } catch (error) {
            console.log("Error al eliminar un comentario")
            errores(error)
        }
        
    },
    createPost: async (root,{ input }) => {
        const newPost = Object.assign(input)
        let id = 'po'+_id()
        let usuario
        let comentario
        let categoria
        try {
        
        usuario = await getId(newPost.usuariosid)
        categoria = await getId(newPost.categoriasid)
            if(usuario > 0 && categoria > 0 ){
               newPost.id = id
               await set(id, newPost)
            }else{
                return null
            }
           return newPost
        } catch (error) {
            console.log("Error al crear un Post")
            errores(error)
            
        }

    },editPost: async (root, { id , input}) => {
        const postEdit = Object.assign(input)
        let post
        let postUpdate
        let usuario
        let comentario
        let categoria
         try {
            
            post = await getId(id)
            post = post > 0 ? await set(id, postEdit ) : 'FALSE'

            postUpdate = post == 'OK'
            ? await get(id) : null
                
         } catch (error) {
             console.log("Erro al editar Post")
             errores(error)
         }

         return postUpdate


    },
    deletePost : async (root, {id}) => {
        let post = [ ]
        try {
           
            post = await getId(id)
            if( post > 0){
                post = await get(id)
                await deletes(id)
                return post
            }else{
                console.log("No existe el Id")
            }
        } catch (error) {
            console.log("Error al eliminar un Post")
            errores(error)
        }

    }
}
function _id(){
    var dt = new Date().getTime();
    var uuid = '1xaxxxxxxxxxxxxxxxxx1qtxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
