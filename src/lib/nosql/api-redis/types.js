'use strict'
const { RedisClient } = require('redis')
const redisConnection = require('../../../db/nosql/redis/db')
const errores = require('../../errors')
let redis
module.exports = {
    Comentarios :{
        usuariosid: async({ usuariosid }) => {
            let usuario
            try {  
                console.log("user ", usuariosid)
                redis = new redisConnection()
                usuario = await redis.getId(usuariosid)
                if(usuario > 0){
                    usuario = await redis.get(usuariosid)
                    usuario = Array(usuario)
                    return usuario
                }else{
                    null
                }
            } catch (error) {
                console.log("Error en el resolver de los comentarios")
                errores(error)
            }
         
        }
    },
    Posts:{
        categoriasid: async ( {categoriasid} ) => {
            let categoria
            console.log("categprias, ", categoriasid)
            try {
                redis = new redisConnection()
                categoria = await redis.get(categoriasid)
                categoria = Array(categoria)
                console.log("categoria", categoria)
            } catch (error) {
                console.log("Error en el resolver de Posts categorias")
            }

            return categoria
        },
        comentarioid: async ( {comentarioid} ) =>{
            let comentario = []
            try {       
                redis = new redisConnection()
                comentario.push(await redis.get(comentarioid))
                console.log("este es el comentario", comentario)
            } catch (error) {
                console.log("Error en el resolver de Posts Comentario ")
                errores(error)
            }
            return comentario
        },
        usuariosid: async ( {usuariosid} ) => {
            let usuario = []
            try {
                redis = new redisConnection()
                usuario.push(await redis.get(usuariosid))
                console.log("usuario", usuario)
            } catch (error) {
                console.log("Error en el resolver de Posts Usuario ")
                errores(error)
            }

            return usuario

        }
    },
    PostEtiquetas: {
        idetiqueta: async ({idetiqueta}) => {
            let etiqueta
            try {

                redis = new RedisClient()
                etiqueta.push(await redis.get(idetiqueta))
                console.log("etiqueta ",etiqueta)
            } catch (error) {
                console.log("Error en el resolver PostEtiquetas id etiquetas")
                errores (error)
                
            }
            return etiqueta
        },
        idpost: async({idpost}) => {
            let post = []
            try {
                redis = new RedisClient()
                post.push(await redis.get(idpost))
                console.log("post ", post)
            } catch (error) {
                console.log("Error en el resolver Postetiquetas id post")
                errores(error)
            }
            return post
        }
    }

}