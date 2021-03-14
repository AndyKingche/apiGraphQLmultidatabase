'use strict'
const { Sequelize } = require('sequelize')
const model = require('./model')
const errores = require('../../lib/errors')

const { //aqui ubicamos las variables que se creo en el archivo donde se puso las variables de entorno
  DB_USER,
  DB_PASSWD,
  DB_HOST,
  DB_NAME,
  DB_DBMS,
  DB_PORT,
  DBsql_USER,
  DBsql_PASSWD,
  DBsql_HOST,
  DBsql_NAME,
  DBsql_DBMS,
  DBsql_PORT,
  DBpg_USER,
  DBpg_PASSWD,
  DBpg_HOST,
  DBpg_NAME,
  DBpg_DBMS,
  DBpg_PORT,
  }=process.env
 let sequelize = new Sequelize(`${DB_NAME}`,`${DB_USER}`,`${DB_PASSWD}`,{
    host:`${DB_HOST}`,
    dialect:`${DB_DBMS}`,
    port:`${DB_PORT}`,
    define: {},
    dialectOptions: {
      options: {
        requestTimeout: 60000000
      }
    },
    pool: {
      max: 10,
      min: 0,
      idle: 100000,
      require:1000000
    },
    logging:false
  })
  let sequelize2 = new Sequelize(`${DBsql_NAME}`,`${DBsql_USER}`,`${DBsql_PASSWD}`,{
    host:`${DBsql_HOST}`,
    dialect:`${DBsql_DBMS}`,
    port:`${DBsql_PORT}`,
    define: {},
    dialectOptions: {
      options: {
        requestTimeout: 90000000
      }
    },
    pool: {
      max: 10,
      min: 0,
      idle: 100000,
      require:1000000
    },
    logging:false
  })
  let sequelize3 = new Sequelize(`${DBpg_NAME}`,`${DBpg_USER}`,`${DBpg_PASSWD}`,{
    host:`${DBpg_HOST}`,
    dialect:`${DBpg_DBMS}`,
    port:`${DBpg_PORT}`,
    define: {},
    dialectOptions: {
      options: {
        requestTimeout: 60000000
      }
    },
    pool: {
      max: 10,
      min: 0,
      idle: 100000,
      require:1000000
    },
    logging:false
  })
  const models={
    usuarios: model.Usuario(sequelize),
    comentarios:model.Comentario(sequelize),
    categorias:model.Categoria(sequelize),
    posts:model.Post(sequelize)
  }
  const models2={
    usuarios: model.Usuario(sequelize3),
    comentarios:model.Comentario(sequelize3),
    categorias:model.Categoria(sequelize3),
    posts:model.Post(sequelize3)
  }
  const models3={
    usuarios: model.Usuario(sequelize2),
    comentarios:model.Comentario(sequelize2),
    categorias:model.Categoria(sequelize2),
    posts:model.Post(sequelize2)
  }
function connectDB(){
  try {
      
           sequelize.authenticate();
            
            
            Object.keys(models).forEach(modelName => {
              if ('associate' in models[modelName]) {
                models[modelName].associate(models)
              }
            })
            
            console.log('La conexion se ha establecido con exito',sequelize.options.dialect);
            models.sequelize = sequelize
            models.Sequelize = Sequelize      
            return models
          } catch (error) {
              
            console.error('Imposible conectar con la base de datos:');
            errores(error)
          }
}
function connectDBmssql(){
  try {
      
           sequelize2.authenticate();
        
            
            Object.keys(models2).forEach(modelName => {
              if ('associate' in models2[modelName]) {
                models2[modelName].associate(models2)
              }
            })
            
            console.log('La conexion se ha establecido con exito',sequelize2.options.dialect);
            models2.sequelize2 = sequelize2
            models2.Sequelize = Sequelize    
            return models
          } catch (error) {
              
            console.error('Imposible conectar con la base de datos:');
            errores(error)
          }

}
function connectDBpg(){

  try {
      
           sequelize3.authenticate();
        
            
            Object.keys(models3).forEach(modelName => {
              if ('associate' in models3[modelName]) {
                models3[modelName].associate(models3)
              }
            })
            
            console.log('La conexion se ha establecido con exito',sequelize3.options.dialect);
            models3.sequelize3 = sequelize3
            models3.Sequelize = Sequelize    
            return models
          } catch (error) {
              
            console.error('Imposible conectar con la base de datos:');
            errores(error)
          }
 }

 connectDB()
 connectDBmssql()
 connectDBpg()


module.exports = {
  mysql: models,
  mssql:models2,
  pgsql:models3
}
  
//   connectDB:()=>{
//     try {
      
//        sequelize.authenticate();
//         const models={
//           usuarios: model.Usuario(sequelize),
//           comentarios:model.Comentario(sequelize),
//           categorias:model.Categoria(sequelize),
//           posts:model.Post(sequelize)
//         }
        
//         Object.keys(models).forEach(modelName => {
//           if ('associate' in models[modelName]) {
//             models[modelName].associate(models)
//           }
//         })
        
//         console.log('La conexion se ha establecido con exito',sequelize.options.dialect);
//         models.sequelize = sequelize
//         models.Sequelize = Sequelize      
//         return models
//       } catch (error) {
          
//         console.error('Imposible conectar con la base de datos:');
//         errores(error)
//       }
//   },
//   connectDBmssql:()=>{
//     try {
      
//        sequelize2.authenticate();
    
//         const models={
//           usuarios: model.Usuario(sequelize2),
//           comentarios:model.Comentario(sequelize2),
//           categorias:model.Categoria(sequelize2),
//           posts:model.Post(sequelize2)
//         }
//         Object.keys(models).forEach(modelName => {
//           if ('associate' in models[modelName]) {
//             models[modelName].associate(models)
//           }
//         })
        
//         console.log('La conexion se ha establecido con exito',sequelize2.options.dialect);
//         models.sequelize2 = sequelize2
//         models.Sequelize = Sequelize    
//         return models
//       } catch (error) {
          
//         console.error('Imposible conectar con la base de datos:');
//         errores(error)
//       }
//   },
//   connectDBpg:()=>{
//     try {
      
//        sequelize3.authenticate();
    
//         const models={
//           usuarios: model.Usuario(sequelize3),
//           comentarios:model.Comentario(sequelize3),
//           categorias:model.Categoria(sequelize3),
//           posts:model.Post(sequelize3)
//         }
//         Object.keys(models).forEach(modelName => {
//           if ('associate' in models[modelName]) {
//             models[modelName].associate(models)
//           }
//         })
        
//         console.log('La conexion se ha establecido con exito',sequelize3.options.dialect);
//         models.sequelize3 = sequelize3
//         models.Sequelize = Sequelize    
//         return models
//       } catch (error) {
          
//         console.error('Imposible conectar con la base de datos:');
//         errores(error)
//       }
//   }
  
// }