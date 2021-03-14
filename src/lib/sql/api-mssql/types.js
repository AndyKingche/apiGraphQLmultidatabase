'use strict'
const {mssql} = require('../../../db/sql/db')
const {dataloaderUsuarios,dataloaderCategoria, dataloaderPosts, dataloaderComentarios} = require('./dataloader-mssql')
const errores = require('../../errors')
const DataLoader = require('dataloader')
const { createContext, EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize')

let db = mssql
const context = createContext(db.sequelize2)
module.exports = {
    Comentarios :{
        usuariosid:async ( {usuariosid} )=>  Array(dataloaderUsuarios.load(usuariosid)),
        postsid:async({postsid}) => Array(dataloaderPosts.load(postsid))
    },
    Posts:{
        categoriasid: async ( {categoriasid} ) => Array(dataloaderCategoria.load(categoriasid)),
        comentarios: async ( {id} ) => dataloaderComentarios.load(id),  
        usuariosid: async ( {usuariosid} ) => Array(dataloaderUsuarios.load(usuariosid)),
    },
    PostsComentario:{
        categoriasid: async ( {categoriasid} ) => Array(dataloaderCategoria.load(categoriasid)),
        usuariosid: async ( {usuariosid} ) =>Array(dataloaderUsuarios.load(usuariosid))
    },ComentariosPost :{
        usuariosid: async({ usuariosid }) => Array(dataloaderUsuarios.load(usuariosid))
    }
}