'use strict'
const redisConnection = require('../../../db/nosql/redis/db')
const errores = require('../../errors')
let redis
module.exports = {
    createUsuario: async (root,{input}) => {     
        const newUsuario = Object.assign(input)
        let id = 'andresarray.'+_id();
        try{
            redis = new redisConnection()
            newUsuario.id = id
            await redis.set(id, newUsuario)
           
        }catch(error){
            errores(error)
            console.error("Existe un error al insertar un nuevo curso ")
        }
        console.log("es el nuevo usuario ",newUsuario)
        return newUsuario
    },editUsuario: async ( root,{id, input} ) => {
        let usuarioEdit = Object.assign(input)
        let usuario
        let usuarioUpdate = []
        try {
            redis = new redisConnection() 
            usuario = await redis.getId(id)
            usuario = usuario > 0 ? await redis.set(id, usuarioEdit) : 'FALSE'  
            usuarioUpdate = usuario == 'OK' 
            ? await redis.get(id) : null
        } catch (error) {
            console.log("Error al editar un Usuario ")
            errores(error)
        }
        return usuarioUpdate
    },deleteUsuario: async (root, {id}) =>{
        let usuario = []
        try {
            redis = new redisConnection()
            usuario = await redis.getId(id)
            console.log()
            if( usuario > 0){
                usuario = await redis.get(id)
                await redis.delete(id)
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
            redis = new redisConnection()
            newCategoria.id = id
            await redis.set(id, newCategoria)
        } catch (error) {
            console.log("Error al crear una nueva Categoria")      
        }
        return newCategoria
    },editCategoria: async (root,{id,input}) => {
        const categoriaEdit = Object.assign(input)
        let categoria
        let categoriaUpdate
        try {
            redis = new redisConnection()
            categoria = await redis.getId(id)
            categoria = categoria > 0 ? await redis.set(id, categoriaEdit) : 'FALSE'  
            categoriaUpdate = categoria == 'OK' 
            ? await redis.get(id) : null
        } catch (error) {
            console.log("Error al atuclizar una categoria")
            errores(error)
        }
        return categoriaUpdate
    },deleteCategoria: async(root, {id}) =>{
        let categoria = []
        try {
            redis = new redisConnection()
            categoria = await redis.getId(id)

            if( categoria > 0){
                categoria = await redis.get(id)
                await redis.delete(id)
                return categoria
            }else{
                console.log("No existe el Id")
            } 
        } catch (error) {
            console.log("Error al eliminar una categoria")
            errores(error)  
        }

    },
    createEtiqueta: async(root,{input}) => {
        const newEtiqueta = Object.assign(input)
        let id = 'eti.'+_id();
        try {
            redis = new redisConnection()
            newEtiqueta.id = id
            await redis.set(id, newEtiqueta)
        } catch (error) {
            console.log("Error al crear un nueva Etiqueta")
            errores(error)
        }
        return newEtiqueta
    },editEtiqueta: async(root, { id, input }) => {
        const etiquetaEdit = Object.assign(input)
        let etiqueta
        let etiquetaUpdate
        try {
            redis = new redisConnection()
            etiqueta = await redis.getId(id)
            etiqueta = etiqueta > 0 ? await redis.set(id, etiquetaEdit) : 'FALSE'  
            etiquetaUpdate = etiqueta == 'OK' 
            ? await redis.get(id) : null
        } catch (error) {
            console.log("Error al editar una Etiqueta")
            errores(error)
        }
        return etiquetaUpdate
    },deleteEtiqueta: async (root,{id}) => {
        let etiqueta = []
        try {
            redis = new redisConnection()
            etiqueta = await redis.getId(id)

            if( etiqueta > 0){
                etiqueta = await redis.get(id)
                await redis.delete(id)
                return etiqueta
            }else{
                console.log("No existe el Id")
            }
        } catch (error) {
            console.log("Error al eliminar una etiqueta")
            errores(error)
            
        }
    },
    createComentario: async( root,{input} ) => {
     const newComentario = Object.assign(input)
     let id = 'com.'+_id();
     let usuario
    try {
        redis = new redisConnection()
        usuario = await redis.getId(newComentario.usuariosid)
            if(usuario >0 ){
               newComentario.id = id
               await redis.set(id, newComentario)
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
            redis = new redisConnection()
            comentario = await redis.getId(id)
            comentario = comentario > 0 ? await redis.set(id, comentarioEdit ) : 'FALSE'

            comentarioUpdate = comentario == 'OK'
            ? await redis.get(id) : null
            
        } catch (error) {
            console.log("Error al editar un comentario")
            errores(error)
        }
        return comentarioUpdate
    },deleteComentario : async (root,{id}) => {
        let comentario = []
        try {
            redis = new redisConnection()
            comentario = await redis.getId(id)
            if( comentario > 0){
                comentario = await redis.get(id)
                await redis.delete(id)
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
        redis = new redisConnection()
        usuario = await redis.getId(newPost.usuariosid)
        comentario = await redis.getId(newPost.comentarioid)
        categoria = await redis.getId(newPost.categoriasid)
            if(usuario > 0 && comentario > 0 && categoria > 0 ){
               newPost.id = id
               await redis.set(id, newPost)
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
            redis = new redisConnection()
            post = await redis.getId(id)
            post = post > 0 ? await redis.set(id, postEdit ) : 'FALSE'

            postUpdate = post == 'OK'
            ? await redis.get(id) : null
                
         } catch (error) {
             console.log("Erro al editar Post")
             errores(error)
         }

         return postUpdate


    },
    deletePost : async (root, {id}) => {
        let post = [ ]
        try {
            redis = new redisConnection()
            post = await redis.getId(id)
            if( post > 0){
                post = await redis.get(id)
                await redis.delete(id)
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
