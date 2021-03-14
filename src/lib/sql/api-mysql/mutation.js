'use strict'
const {mysql}=require('../../../db/sql/db')
const errores = require('../../errors')
let db = mysql
module.exports = {
    createUsuario: async(root,{input})=>{
        const newUsuario = Object.assign(input)
        try{
            newUsuario.created_at=fechaHoy()
            let usuario = await crearModelo(db.usuarios,newUsuario)   
            newUsuario.id = usuario.id
        }catch(error){
            console.log("Error al crear un nuevo Usuario")
            errores(error)
        }
        return newUsuario;

    },editUsuario: async ( root,{id,input} ) => {
        const usuarioEdit = Object.assign(input)
        let usuario 
        try { 
            usuario = await encontrarModelo(db.usuarios,id)
            if(usuario){
                usuarioEdit.updated_at=fechaHoy()
                usuario = await actualizarModelo(db.usuarios,usuarioEdit,id)
                usuario = await encontrarModelo(db.usuarios,id)
            }else{
                console.log("no existe el Usuario")
                return null
            }
            
        } catch (error) {
            console.log("Error al editar un Usuario ")
            errores(error)
        }
        return usuario
    },deleteUsuario: async (root, {id}) =>{
        let usuario
        try {      
            usuario = await encontrarModelo(db.usuarios,id)
            if(usuario){
                await usuario.destroy({where:{
                    id:id
                }})
                return usuario
            }else{
                console.log("No existe el usuario")
               
            }
            
        } catch (error) {
            console.log("Error al eliminar un Usuario")
            errores(error)
        }
    },
    createCategoria: async(root,{input}) => {
        const newCategoria = Object.assign(input)
        try {
            newCategoria.created_at=fechaHoy()
            let categoria = await crearModelo(db.categorias,newCategoria)
            newCategoria.id = categoria.id
        } catch (error) {
            console.log("Error al crear una nueva Categoria")      
        }
        return newCategoria
    },editCategoria: async (root,{id,input}) => {
        const categoriaEdit = Object.assign(input)
        let categoria
        try {
            categoria = await encontrarModelo(db.categorias, id)
            if(categoria){
                categoria = await actualizarModelo(db.categorias,categoriaEdit,id)
                categoria = await encontrarModelo(db.categorias,id)
                return categoria
            }else{
                return null
            }
            
        } catch (error) {
            console.log("Error al atuclizar una categoria")
            errores(error)
        }

    },deleteCategoria: async(root, {id}) =>{
        let categoria
        
        try {
            categoria = await encontrarModelo(db.categorias,id)
             if(categoria){
                 await categoria.destroy({where:{id:id}})
                 return categoria
             }else{
                console.log("No existe la categoria")
             }     
        } catch (error) {
            console.log("Error al eliminar una categoria")
            errores(error)
            
        }

    },
    createComentario: async( root,{input} ) => {
        const newComentario = Object.assign(input)
        let comentario
        let usuarioId
        let postId
        
        try {
            usuarioId = await encontrarModelo(db.usuarios,input.usuariosid)
            postId = await encontrarModelo(db.posts,input.postsid)

            if(usuarioId != null&&postId !=null){
               comentario = await crearModelo(db.comentarios,newComentario)
               newComentario.id = comentario.id
            }else{
                console.log("No existe el id o no existe el post")
                return null
            }
           
        } catch (error) {
            console.log("Error al crear un comentario")
            errores(error)
        }
        return newComentario
    },editComentario: async(root,{ id, input}) => {
        const comentarioEdit = Object.assign(input)
        let comentario
        
        try {
            comentario = await encontrarModelo(db.comentarios,id)
            if(comentario){
                comentario = await actualizarModelo(db.comentarios,comentarioEdit,id)
                comentario = await encontrarModelo(db.comentarios,id)
                return comentario
            }else{
                return []
            }
        } catch (error) {
            console.log("Error al editar un comentario")
            errores(error)
        }

    },deleteComentario : async (root,{id}) => {
        let comentario
        try {
            comentario = await encontrarModelo(db.comentarios,id)

            if( comentario){
                await comentario.destroy({where:{id:id}})
                return comentario
            }else{
               console.log("No existe el comentario")
            }
        } catch (error) {
            console.log("Error al eliminar un comentario")
            errores(error)
        }
        
    },
    createPost: async (root,{ input }) => {
        const newPost = Object.assign(input)
        let post
        let categoriasid
        let usuariosid
        try {
            categoriasid = await encontrarModelo(db.categorias,newPost.categoriasid)
            usuariosid = await encontrarModelo(db.usuarios,newPost.usuariosid)
            if(usuariosid!=null && categoriasid!=null){
                newPost.created_at = fechaHoy();
                post = await crearModelo(db.posts,newPost)
                newPost.id = post.id
            }else{
                console.log("No existe el usuario o no existe la categoria")
            }
   
        } catch (error) {
            console.log("Error al crear un Post")
            errores(error)
            
        }
        return newPost

    },editPost: async (root, { id , input}) => {
        const postEdit = Object.assign(input) 
        let post
         try {
            categoriasid = await encontrarModelo(db.categorias,postEdit.categoriasid) != null ? await encontrarModelo(db.categorias,postEdit.categoriasid)  : []
             post = await encontrarModelo(db.posts,id)
             if(post){
                 post = await actualizarModelo(db.posts,postEdit,id)
                 post = await encontrarModelo(db.posts,id)
                 return post
             }else{
                 console.log("No existe el post")
                 return null
             }           
         } catch (error) {
             console.log("Erro al editar Post")
             errores(error)
         }
    },
    deletePost : async (root, {id}) => {
        let post
        try {
            post = await encontrarModelo(db.posts,id)
            if(post){
                await post.destroy({where:{id:id}})
                return post
            }else{
                return null
            }     
        } catch (error) {
            console.log("Error al eliminar un Post")
            errores(error)
        }

    }
}
async function encontrarModelo(modelo,id){
    let model
    if(id){

        model = await new Promise((resolve, reject)=>{
            resolve(modelo)
        }).then(res => res.findOne({where:{id:id}}))

    }else{
        return null
    }

    return model
}
async function crearModelo(modelo,input){
    let model = await new Promise((resolve,reject)=>{
        resolve(modelo)
    }).then(res => res.create(input)).catch(err =>{console.log(err)})
    return model
}
async function actualizarModelo(modelo,input,id){
    let model = await new Promise((resolve,reject)=>{
        resolve(modelo)
    }).then(res => res.update(input,{where:{id:id}})).catch(err =>{console.log(err)})
    return model
}
async function fechaHoy(){
    let fecha = new Date()
    fecha =fecha.getFullYear()+"-"+fecha.getMonth()+"-"+fecha.getFullYear()
    return fecha
}