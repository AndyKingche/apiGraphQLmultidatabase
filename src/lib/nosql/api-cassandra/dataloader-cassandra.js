const {Client} = require('../../../db/nosql/cassandra/db')
const DataLoader = require('dataloader')
let db = Client

const loaderCategorias = new DataLoader(keys=>{
    const query = 'Select * from categorias where id = ?'
    const categorias = keys.map(id => {
        return db.execute(query,[id]).then(res => {return res})
    })
    return Promise.all(categorias)
});

const loaderComentarios = new DataLoader(keys=>{
  
    const query = 'Select * from comentarios where id = ?'
    const comentarios = keys.map(id => {
        return db.execute(query,[id]).then(res => {return res})
    })
    return Promise.all(comentarios)
        
    });

const loaderPosts = new DataLoader(keys=>{
    const query = 'Select * from posts where id = ?'
    const posts = keys.map(id => {
        return db.execute(query,[id]).then(res => {return res})
    })
    return Promise.all(posts)
}
);

const loaderUsuarios = new DataLoader(keys =>{
    const query = 'Select * from usuarios where id = ?'
    const usuarios = keys.map((id)=>{
    return db.execute(query,[id]).then(res => {return res})
   
})
return Promise.all(usuarios)
})

module.exports={
dataloaderUsuarios:loaderUsuarios,
dataloaderCategoria:loaderCategorias,
dataloaderPosts: loaderPosts,
dataloaderComentarios: loaderComentarios
}

