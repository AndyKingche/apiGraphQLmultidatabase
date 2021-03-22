'use strict'
const { RedisClient } = require('redis')
const { dataloaderUsuarios, dataloaderCategoria, dataloaderPosts, dataloaderComentarios } = require('./dataloader-redis')
const errores = require('../../errors')

module.exports = {
    Comentarios :{
        usuariosid: async({ usuariosid }) => dataloaderUsuarios.load(usuariosid),
        postsid: async ({postsid}) => dataloaderPosts.load(postsid)
    },
    Posts:{
        categoriasid: async ( {categoriasid} ) => dataloaderCategoria.load(categoriasid)
        ,
        comentarios: async ( {id} ) => dataloaderComentarios.load(id)
        ,
        usuariosid: async ( {usuariosid} ) => dataloaderUsuarios.load(usuariosid)
    }
    ,ComentariosPost:{
        usuariosid: async({usuariosid})=> dataloaderUsuarios.load(usuariosid)
        
    }
    ,PostsComentario:{
        categoriasid: async ( {categoriasid} ) => dataloaderCategoria.load(categoriasid), 
        usuariosid: async({usuariosid})=> dataloaderUsuarios.load(usuariosid)
    }

}