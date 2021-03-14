'use strict'
const {Client,Model} = require('../../../db/nosql/cassandra/db')
const errores = require('../../errors')
let db = Client
let editar = Model
module.exports = {
    createUsuario: async(root,{input})=>{
        const newUsuario = Object.assign(input)
        try{
            newUsuario.id = _id()
            const params = [newUsuario.id,newUsuario.nombre,newUsuario.email,newUsuario.nickname,newUsuario.login,
                newUsuario.password,newUsuario.genero]
            const query = 'INSERT INTO usuarios (id,nombre,email,nickname,login,password,genero) VALUES (?,?,?,?,?,?,?)'
            await db.execute(query,params,{prepare:true})


        }catch(error){
            console.log("Error al crear un nuevo Usuario")
            errores(error)
        }
       return newUsuario;
    },editUsuario: async ( root,{id,input} ) => {
        let usuario 
        let usuarioeditado
        const usuarioEdit = Object.assign(input)

        try {
            const query = 'Select * from usuarios where id = ?'
        
            usuario = await db.execute(query,[id]).then(res=> {return res} )
            if(usuario.rows[0]){
                usuarioEdit.id=id
                await editar.Usuarios.update(usuarioEdit,{where:{id:id}})
                usuarioeditado = await editar.Usuarios.find({id},{})
                return usuarioeditado.first()    
            }else{
                console.log("No existe el id")
                return null
            }         
        } catch (error) {
            console.log("Error al editar un Usuario ")
            errores(error)
        }
        
    },deleteUsuario: async (root, {id}) =>{
        let usuario
        try {
            const query = 'Select * from usuarios where id = ?'
            usuario = await db.execute(query,[id]).then(res=> {return res} )
            if(usuario.rows[0]){
                await editar.Usuarios.remove({id})
                return usuario.rows[0]
            }else{
                return null
            }
            
        } catch (error) {
            console.log("Error al eliminar un Usuario")
            errores(error)
        }
    },
    createCategoria: async(root,{input}) => {
        const newCategoria = Object.assign(input)     
        try {     
            newCategoria.id = _id()
            const params = [newCategoria.id,newCategoria.nombre_categoria]
            const query = 'INSERT INTO categorias (id,nombre_categorias) VALUES (?,?)'
            await db.execute(query,params,{prepare:true})

        } catch (error) {
            console.log("Error al crear una nueva Categoria")
            errores(error)
        }
        return newCategoria
    },editCategoria: async (root,{id,input}) => {
        let categoria 
        let categoriaeditado
        const categoriaEdit = Object.assign(input)

        try {
            const query = 'Select * from categorias where id = ?'
        
            categoria = await db.execute(query,[id]).then(res=> {return res} )
            if(categoria.rows[0]){
                categoriaEdit.id=id
                await editar.Categorias.update(categoriaEdit,{where:{id:id}})
                categoriaeditado = await editar.Usuarios.find({id},{})
                return categoriaeditado.first()    
            }else{
                console.log("No existe el id")
                return null
            }         
        } catch (error) {
            console.log("Error al editar un Usuario ")
            errores(error)
        }
        
    },deleteCategoria: async(root, {id}) =>{
        let categoria
        try {
            const query = 'Select * from categorias where id = ?'
            categoria = await db.execute(query,[id]).then(res=> {return res} )
            if(categoria.rows[0]){
                await editar.Categorias.remove({id})
                return categoria.rows[0]
            }else{
                return null
            }
            
        } catch (error) {
            console.log("Error al eliminar un Usuario")
            errores(error)
        }

    },
    
    createComentario: async( root,{input} ) => {
        const newComentario = Object.assign(input)
        let usuario    
        let post   
        try {
            const queryUsuario = 'Select * from usuarios where id = ?'
            const queryPost = 'Select * from posts where id = ?'
            usuario =  await db.execute(queryUsuario,[newComentario.usuariosid]).then(res=> {return res} )
            post = await db.execute(queryPost,[newComentario.postsid]).then(res=> {return res} )
            if (usuario.rows[0] && post.rows[0]) {
                
                newComentario.id = _id()
            const params = [newComentario.id,newComentario.contenido,newComentario.usuariosid,newComentario.postsid]
            const query = 'INSERT INTO comentarios (id,contenido,usuariosid,postsid) VALUES (?,?,?,?)'
            await db.execute(query,params,{prepare:true})      
            
                return newComentario
            } else {
                console.log("entre por que no hay")
                return null
            }
           
        } catch (error) {
            console.log("Error al crear un comentario")
            errores(error)
        }
       
    },editComentario: async(root,{ id, input}) => {
        
        let comentario 
        let comentarioeditado
        const comentarioEdit = Object.assign(input)

        try {
            const query = 'Select * from comentarios where id = ?'
        
            comentario = await db.execute(query,[id]).then(res=> {return res} )
            if(comentario.rows[0]){
                comentarioEdit.id=id
                await editar.Comentarios.update(comentarioEdit,{where:{id:id}})
                comentarioeditado = await editar.Usuarios.find({id},{})
                return comentarioeditado.first()    
            }else{
                console.log("No existe el id")
                return null
            }         
        } catch (error) {
            console.log("Error al editar un Usuario ")
            errores(error)
        }

    },deleteComentario : async (root,{id}) => {
        let comentarios
        try {
            const query = 'Select * from comentarioss where id = ?'
            comentarios = await db.execute(query,[id]).then(res=> {return res} )
            if(comentarios.rows[0]){
                await editar.Comentarios.remove({id})
                return comentarios.rows[0]
            }else{
                return null
            }
            
        } catch (error) {
            console.log("Error al eliminar un Usuario")
            errores(error)
        }
        
    },
    createPost: async (root,{ input }) => {
        const newPost = Object.assign(input)
        let usuario
        let categoria
        let post
        try {
            const queryUsuario = 'Select * from usuarios where id = ?'
            const queryCategoria = 'Select * from categorias where id = ?'
            usuario =  await db.execute(queryUsuario,[newPost.usuariosid]).then(res=> {return res} )
            categoria = await db.execute(queryCategoria,[newPost.categoriasid]).then(res=> {return res} )

            if (usuario.rows[0] && categoria.rows[0]) {
                
                newPost.id = _id()
                const params = [newPost.id,newPost.titulo,newPost.contenido,newPost.fecha_publicacion,newPost.estado,newPost.keywords,newPost.usuariosid,newPost.categoriasid]
                const query = 'INSERT INTO posts (id,titulo,contenido,fecha_publicacion,estado,keywords,usuariosid,categoriasid) VALUES (?,?,?,?,?,?,?,?)'
                await db.execute(query,params,{prepare:true})      
                    return newPost
               
            } else {
                console.log("entre por que no hay")
                return null
            }

        }catch(err){
            console.log("Error al crear un Post")
            errores(err)
        }
    },editPost: async (root, { id , input}) => {
        
        let post 
        let posteditado
        const postEdit = Object.assign(input)

        try {
            const query = 'Select * from posts where id = ?'
        
            post = await db.execute(query,[id]).then(res=> {return res} )
            if(post.rows[0]){
                postEdit.id=id
                await editar.Posts.update(postEdit,{where:{id:id}})
                posteditado = await editar.Usuarios.find({id},{})
                return posteditado.first()    
            }else{
                console.log("No existe el id")
                return null
            }         
        } catch (error) {
            console.log("Error al editar un Usuario ")
            errores(error)
        }

    },
    deletePost : async (root, {id}) => {
        let post
        try {
            const query = 'Select * from posts where id = ?'
            post = await db.execute(query,[id]).then(res=> {return res} )
            if(post.rows[0]){
                await editar.Posts.remove({id})
                return post.rows[0]
            }else{
                return null
            }
            
        } catch (error) {
            console.log("Error al eliminar un Usuario")
            errores(error)
        }
    }
}
function _id(){
    var dt = new Date().getTime();
    var uuid = '1xaxxxxxxxxxxxxxxxxx1qtxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}