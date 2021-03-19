'use strict'
const { dataloaderUsuarios, dataloaderPosts, dataloaderCategoria,dataloaderComentarios,dataloaderUsuariosComentarios } = require('./dataloader-mongodb')
module.exports = {
    Comentarios :{
        usuariosid: async({ usuariosid }) => 
        await dataloaderUsuarios.load(usuariosid),
        postsid:async({postsid})=> await dataloaderPosts.load(postsid)
     }
    ,ComentariosPost :{
        usuariosid: async({ usuariosid }) => await dataloaderUsuarios.load(usuariosid)
    },
    Posts:{
        categoriasid: async ( {categoriasid} ) => await dataloaderCategoria.load(categoriasid),
        usuariosid: async ( {usuariosid} ) => await dataloaderUsuarios.load(usuariosid),
        comentarios: async ({_id}) => await dataloaderComentarios.load(_id)
    },
    PostsComentario:{
        categoriasid: async ( {categoriasid} ) => await dataloaderCategoria.load(categoriasid),
        usuariosid: async ( {usuariosid} ) => await dataloaderUsuarios.load(usuariosid)
    },
    UsuariosComentarios:{
        comentarios: async({_id})=> await dataloaderUsuariosComentarios.load(_id),
        
    }
    ,ComentariosUsuarios:{
        postsid:async({postsid})=> await dataloaderPosts.load(postsid)
    }
}