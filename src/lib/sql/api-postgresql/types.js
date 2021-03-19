'use strict'
const {dataloaderUsuarios,dataloaderCategoria, dataloaderPosts, dataloaderComentarios} = require('./dataloader-postgresql')
const {pgsql }=require('../../../db/sql/db')
const errores = require('../../errors')
const DataLoader = require('dataloader')
const { createContext, EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize')
let db = pgsql
const context = createContext(db.sequelize3)
module.exports = {
    Comentarios :{
        usuariosid:async ( {usuariosid} )=>  dataloaderUsuarios.load(usuariosid),
        postsid:async({postsid}) => dataloaderPosts.load(postsid)
    },
    Posts:{
        categoriasid: async ( {categoriasid} ) => dataloaderCategoria.load(categoriasid),
        comentarios: async ( {id} ) => dataloaderComentarios.load(id)
        ,
        usuariosid: async ( {usuariosid} ) => dataloaderUsuarios.load(usuariosid),
    },
    PostsComentario:{
        categoriasid: async ( {categoriasid} ) => await dataloaderCategoria.load(categoriasid),
        usuariosid: async ( {usuariosid} ) =>dataloaderUsuarios.load(usuariosid)
    },ComentariosPost :{
        usuariosid: async({ usuariosid }) => dataloaderUsuarios.load(usuariosid)
    }
    
}