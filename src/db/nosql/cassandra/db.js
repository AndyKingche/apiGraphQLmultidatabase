'use strict'
const cassandra = require('cassandra-driver');     
const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'keyspace1',
    pooling:{
        maxRequestsPerConnection: 1000000
    }
  });
  const Mapper = cassandra.mapping.Mapper;

  const mapper = new Mapper(client,{
      models : { 'Usuarios':{ tables:['usuarios']},
      'Comentarios': {tables:['comentarios']},
      'Categorias': {tables:['categorias']},
      'Posts':{tables:['posts']}
    
    }
  })
const model = {
    Usuarios: mapper.forModel('Usuarios'),
    Comentarios: mapper.forModel('Comentarios'),
    Categorias: mapper.forModel('Categorias'),
    Posts: mapper.forModel('Posts')
}
async function getComentarios(){
  let numero = await client.execute('Select count(*) from comentarios').then(res => res.rows[0].count.low)
  let comentarios = (await model.Comentarios.findAll({},{fetchSize:numero})).toArray()
  return comentarios
}

let comentarios = getComentarios()
async function getINcomentarios(Ids){
  try {
      let x = Ids.map(async(id) =>{ 
          
          return await comentarios.then(
              res=> res.filter(comment=>
                  comment.postsid == id
              ))
      }
      )
      return x
      
  } catch (error) {
      console.log(error)
  }

       
}

  module.exports = {
      Model : model,
      Client:client,
     getINcomentarios:getINcomentarios

  }

