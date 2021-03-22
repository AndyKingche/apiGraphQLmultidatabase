'use strict'
const {redisConnection,deletes,get,getId,getkeys,set,getINcomentarios}  = require('../../../db/nosql/redis/db')
const errores = require('../../errors')

module.exports = {
    getUsuarios: async(root,{limit})=>{
        limit = limit != null ? limit : 0
        let usuarios = []
        let usuariosaux = [] 
        let usuariosKey
        try {
        usuariosKey = await getkeys('user.*')
        await usuariosKey.map(element => {
            usuarios.push(get(element))        
        });

        if(limit == 0 || limit> usuarios.length){
            return usuarios
        }else{

            for(let i=0; i< limit; i++){
                usuariosaux[i] = usuarios[i]
            }
            return usuariosaux
        }
        
        } catch (error) {
            console.log("error el realizar el get usuarios")
            errores(error)
        }
       
    },
    getUsuario: async(root,{id})=> {
        let usuario
        try {
            usuario = await get(id)
        } catch (error) {
            console.log("Error al realizar getUsuaario")
            errores(error)
        } 
        return usuario
    },
    getCategorias: async(root,{limit}) => {
        limit = limit !=null ? limit : 0
        let categorias = []
        let categoriasaux = []
        let categoriasKey

        try {
            categoriasKey = await getkeys('cat*')

            await categoriasKey.map(element => {
                categorias.push(get(element))
            })

            if(limit == 0 || limit> categorias.length){
                return categorias
            }else{
    
                for(let i=0; i< limit; i++){
                    categoriasaux[i] = categorias[i]
                }
                return categoriasaux
            }
            
        } catch (error) {
            console.log("Error al realizar get categoria")
            errores(error)
        }

        return categorias
    },
    getCategoria: async(root, {id})=>{
        let categoria
        try {
            
            categoria = await get(id)
            
            
        } catch (error) {
            console.log("Error al realizar GetCategoria")
        }
        return categoria
    
    },
    getComentarios: async(root,{limit})=> {
        let comentarios = []
        let comentariosaux = []
        let comentariosKey
        limit = limit != null ? limit : 0
        try {
           
            comentariosKey = await getkeys('com*')
            await comentariosKey.map(element => {
                comentarios.push(get(element))
            })
            console.log(comentarios.length)
            if(limit == 0 || limit > comentarios.length){
                return comentarios
            }else{
    
                for(let i=0; i< limit; i++){
                    comentariosaux[i] = comentarios[i]
                }
                return comentariosaux
            }
            
        } catch (error) {
            console.log("Error al realizar get Comentarios")
            errores(error)
        }
        
        
    },
    getComentario:async(root,{id})=>
    {
        let comentario
        try {
            
            comentario = await get(id)
            
        } catch (error) {
            console.log("Error al realizar get comentario")
        }
        return comentario
    },
    getPosts:async(root,{limit})=>{
        let posts = []
        let postsaux = []
        limit = limit!=null ? limit : 0
        let postskey
        try {
            
            postskey = await getkeys('po*')
            postskey.map(element =>{
                posts.push(get(element))
            })

            if(limit == 0 || limit> posts.length){
                return posts
            }else{
    
                for(let i=0; i< limit; i++){
                    postsaux[i] = posts[i]
                }
                return postsaux
            }
           
        
            
        } catch (error) {
            console.log("Error al realizar")
            errores(error)
        }

    },
    getPost:async(root,{id})=>{
        let post
        try {
            post = await get(id)
        } catch (error) {
            console.log("Error al realizar get Post")
            errores(error)
        }

        return post
    }

}