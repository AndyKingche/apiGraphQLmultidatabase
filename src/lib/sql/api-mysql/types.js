'use strict'
const {mysql}=require('../../../db/sql/db')
const {dataloaderUsuarios,dataloaderCategoria, dataloaderPosts, dataloaderComentarios} = require('./dataloader-mysql')
const errores = require('../../errors')
const DataLoader = require('dataloader')
const { createContext, EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize')
let db = mysql
const context = createContext(db.sequelize);
const { Op } = db.Sequelize

module.exports = {
    Comentarios :{
        usuariosid:async ( {usuariosid} )=>  dataloaderUsuarios.load(usuariosid),
        postsid:async({postsid}) => dataloaderPosts.load(postsid)
    },
    Posts:{
        categoriasid: async ( {categoriasid} ) => dataloaderCategoria.load(categoriasid),
        comentarios: async (  {id} ) =>  dataloaderComentarios.load(id),
        usuariosid: async ( {usuariosid} ) => dataloaderUsuarios.load(usuariosid),
    },
    PostsComentario:{
        categoriasid: async ( {categoriasid} ) => dataloaderCategoria.load(categoriasid),
        usuariosid: async ( {usuariosid} ) => dataloaderUsuarios.load(usuariosid)
    },ComentariosPost :{
        usuariosid: async({ usuariosid }) => dataloaderUsuarios.load(usuariosid)
    }
}
