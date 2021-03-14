'use strict'
const cassandra = require('cassandra-driver');     
const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'keyspace1',
    pooling:{
        maxRequestsPerConnection: 100000
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
  module.exports = {
      Model : model,
      Client:client
  }

