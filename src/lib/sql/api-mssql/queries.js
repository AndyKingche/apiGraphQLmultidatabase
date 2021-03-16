'use strict'
const {mssql} = require('../../../db/sql/db')
const errores = require('../../errors')
const hrtime = require ('perf_hooks').performance.now
const { createContext, EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize')
let db = mssql
const context = createContext(db.sequelize2);
const { Op } = db.Sequelize
module.exports ={
    getUsuarios:async(root,{limit, nombre}) => {
       // let startTime =  hrtime (); 
        let usuarios= []
        try{        
            if(nombre){
                usuarios = await db.usuarios.then(res=>
                res.findAll({
                    limit: limit,
                    offset: 0,
                    where: {nombre:{[Op.like]:`%${nombre}%`} }},
                  ));
            }else{
                usuarios = await db.usuarios.then(res=>res.findAll({
                    limit: limit,
                    offset:0,
                    where:{}
                }))
            }
            
            context.prime(usuarios)   
           // let endtime = hrtime();
            //console.log("numero de datos: ",limit," este es el tiempo de respuesta:", (endtime - startTime))    
            return  usuarios
        }catch(error){
            errores(error);
            console.log("Error al realizar GetUsuarios")
        }
        
    },
    getUsuario:async(root,{id}) => {
        let usuario = []
        try{
            usuario = await  db.sequelize.query("SELECT * FROM usuarios Where id=:id",{
                mapToModel: true, // pass true here if you have any mapped fields
                nest: true,
                replacements: { id:id }
              })
            usuario = usuario != null ? usuario : []
            return usuario[0]
        }catch(error){
            console.log("error al realizar getUsuario por id")
            errores(error)
        }
    },
    getCategorias: async(root,{limit}) => {
        let categorias=[]
        try{
            categorias = await db.categorias.findAll({
                limit: limit,
                offset: 0,
                where: { }}, // conditions
                )
                context.prime(categorias)
            return categorias
        }catch(error){
            console.log("Error al realizar Get Categorias")
            errores(error)
            
        }
    },
    getCategoria: async(root,{id})=>{
        let categoria

        try{
            categoria = await  db.sequelize.query("SELECT * FROM categorias Where id=:id",{
                mapToModel: true, // pass true here if you have any mapped fields
                nest: true,
                replacements: { id:id }
              })
            categoria = categoria != null ? categoria : []
            return categoria[0]
        }catch(error){
            console.log("Error al realizar Get Categoria por id")
            errores(error)
        }
    },
    getComentarios: async(root,{limit}) => {
        //let startTime =  hrtime (); 
        let comentarios = []
        try {
             comentarios = await db.comentarios.then(res => res.findAll({
                limit:limit,
                offset:0,
                where:{}
            }))
            //let endtime = hrtime();
            //console.log("numero de datos,", (endtime - startTime)) 
            context.prime(comentarios)   
            return comentarios
        } catch (error) {
            console.log("Error al realizar el Get Comentarios")
            errores(error)
        }
    },
    getComentario: async(root, {id}) => {
        let comentario
        try {
            
            comentario = await  db.sequelize2.query("SELECT * FROM comentarios Where id=:id",{
                mapToModel: true, // pass true here if you have any mapped fields
                nest: true,
                replacements: { id:id }
              })
            comentario = comentario != null ? comentario : []
            
            return comentario[0]
        } catch (error) {
            console.log("Error al realizar Get Comentario por id")
            errores(error)
            
        }
    },
    getPosts: async(root,{limit}) => {
        
        //let startTime =  hrtime ();  
        let posts = []
        try {
            posts = await db.posts.then(res => res.findAll({
                limit: limit,
                offset:0,
                where:{}
            }))
                //let endtime = hrtime();
            //console.log("numero de datos,", (endtime - startTime))    
            context.prime(posts)
            return posts
            
        } catch (error) {
            console.log("Error al realizar Get Posts")
            errores(error)
            
        }

    },
    getPost: async (root,{id}) => {
        let post 
        try {
            
            post = await  db.sequelize2.query("SELECT * FROM posts Where id=:id",{
                mapToModel: true, // pass true here if you have any mapped fields
                nest: true,
                replacements: { id:id }
              })
            post = post != null ? post : []
            
            return post[0]
        } catch (error) {
            console.log("Error al realizar get Post por id")
            errores(error)
            
        }
    }
    
}
