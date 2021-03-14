'use strict'
const redisConnection = require('../../../db/nosql/redis/db')
const errores = require('../../errors')
let redis
module.exports = {
    getUsuarios: async()=>{
        let usuarios = []
        let usuariosKey
        try {
        redis = new redisConnection()
        usuariosKey = await redis.getkeys('andres*')
        await usuariosKey.map(element => {
            usuarios.push(redis.get(element))        
        });
        } catch (error) {
            console.log("error el realizar el get usuarios")
            errores(error)
        }
        return usuarios   
    },
    getUsuario: async(root,{id})=> {
        let usuario
        try {
            redis = new redisConnection()
            usuario = await redis.get(id)
            console.log("usuarios", usuario)
        } catch (error) {
            console.log("Error al realizar getUsuaario")
            errores(error)
        } 
        return usuario
    },
    getCategorias: async() => {
        let categorias = []
        let categoriasKey

        try {
            redis = new redisConnection()
            categoriasKey = await redis.getkeys('cat*')

            await categoriasKey.map(element => {
                categorias.push(redis.get(element))
            })
            
        } catch (error) {
            console.log("Error al realizar get categoria")
            errores(error)
        }

        return categorias
    },
    getCategoria: async(root, {id})=>{
        let categoria
        try {
            redis = new redisConnection()
            categoria = await redis.get(id)
            console.log("categorias", categoria)
            
        } catch (error) {
            console.log("Error al realizar GetCategoria")
        }
        return categoria
    },
    getEtiquetas: async() =>{
        let etiquetas = []
        let etiquetasKey
        try {
            redis = new redisConnection()
            etiquetasKey = await redis.getkeys('eti*')
            
            await etiquetasKey.map(element => {
                etiquetas.push(redis.get(element))
            })
            
        } catch (error) {
            console.log("Error al realizar get Etiquetas")
            errores(error)
        }
        return etiquetas
    },
    getEtiqueta:async(root,{id})=>{
        let etiqueta
        try {
            redis = new redisConnection()
            etiqueta = await redis.get(id)
            console.log("Etiqueta", etiqueta)
        } catch (error) {
            console.log("Error al realizar get Etiqueta")
            errores(error)
        }

        return etiqueta
    },
    getComentarios: async()=> {
        let comentarios = []
        let comentariosKey

        try {
            redis = new redisConnection()
            comentariosKey = await redis.getkeys('com*')
            await comentariosKey.map(element => {
                comentarios.push(redis.get(element))
                console.log("comentarios ", comentarios)
            })
            
        } catch (error) {
            console.log("Error al realizar get Comentarios")
            errores(error)
        }
        
        return comentarios
    },
    getComentario:async(root,{id})=>
    {
        let comentario
        try {
            redis = new redisConnection()
            comentario = await redis.get(id)
            console.log("comentario", comentario)
        } catch (error) {
            console.log("Error al realizar get comentario")
        }
        return comentario
    },
    getPosts:async()=>{
        let posts = []
        let postskey
        try {
            redis = new redisConnection()
            postskey = await redis.getkeys('po*')
            postskey.map(element =>{
                posts.push(redis.get(element))
            })
            
        } catch (error) {
            console.log("Error al realizar")
            errores(error)
        }

        return posts
    },
    getPost:async(root,{id})=>{
        let post
        try {
            redis = new redisConnection()
            post = await redis.get(id)
            console.log("Post ", post)
        } catch (error) {
            console.log("Error al realizar get Post")
            errores(error)
        }

        return post
    }

}