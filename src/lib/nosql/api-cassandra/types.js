'use strict'
const { dataloaderUsuarios, dataloaderComentarios, dataloaderPosts, dataloaderCategoria} = require('./dataloader-cassandra')

module.exports = {
    Comentarios :{
        usuariosid: async({ usuariosid }) =>   await dataloaderUsuarios.load(usuariosid),
        postsid: async({postsid})=> await dataloaderPosts.load(postsid)
    },ComentariosPost :{
        usuariosid: async({ usuariosid }) => await dataloaderUsuarios.load(usuariosid)
    },Posts:{
        categoriasid: async ( {categoriasid} ) => await dataloaderCategoria.load(categoriasid),
        comentarios: async ( {id} ) => await dataloaderComentarios.load(id),
        usuariosid: async ( {usuariosid} ) => await dataloaderUsuarios.load(usuariosid)
    },
    PostsComentario:{
        categoriasid: async ( {categoriasid} ) => await dataloaderCategoria.load(categoriasid),
        usuariosid: async ( {usuariosid} ) => await dataloaderUsuarios.load(usuariosid) }

}