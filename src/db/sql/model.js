'use strict'
const { DataTypes } = require("sequelize");

module.exports ={
    Usuario: async(db) =>{
            let User = db.define("usuarios", {  
                nombre: DataTypes.TEXT,
                email:  DataTypes.TEXT,
                nickname: DataTypes.TEXT,
                login: DataTypes.TEXT,
                password:DataTypes.TEXT,
                genero:DataTypes.TEXT
              },{
                timestamps: false
            })
            return User     
        },
        Categoria: async(db)=>{
            let Category = db.define("categorias",{
                nombre_categoria:DataTypes.TEXT
            },{
                timestamps: false
            })
            return Category
        }
        // ,Etiqueta:async(db)=>{
        //     let Tags = db.define("etiquetas",{
        //         nombre_etiqueta:DataTypes.TEXT
        //     },{
        //         timestamps: false
        //     })
        //     return Tags
        // }
        ,
        Comentario:async(db)=>{
            let Comment = db.define("comentarios",{
                contenido:DataTypes.TEXT,
                usuariosid: {
                    type: DataTypes.INTEGER,
                    foreignKey: true,                 
                  },
                postsid:{
                    type: DataTypes.INTEGER,
                    foreignKey: true,  
                }
            },{
                timestamps: false
            })
            
            return Comment

        },
        Post: async (db) => {
            let Post = db.define("posts",{
                categoriasid: {
                    type: DataTypes.INTEGER,
                    foreignKey: true
                  },usuariosid: {
                    type: DataTypes.INTEGER,
                    foreignKey: true
                  },
                  titulo: DataTypes.TEXT,
                  fecha_publicacion: DataTypes.DATE,
                  contenido:DataTypes.TEXT,
                  keywords: DataTypes.TEXT,
                  estado: DataTypes.BOOLEAN

            },{
                timestamps: false
            })

            return Post

        }
        // ,PostEtiqueta: async (db) => {
        //     let PostEtiqueta = db.define("posts_etiquetas",{
        //         idetiqueta:{
        //             type: DataTypes.INTEGER,
        //             foreignKey: true
        //         },
        //         idpost:{
        //             type: DataTypes.INTEGER,
        //             foreignKey: true
        //         }
        //     },{ timestamps: false })

        //     return PostEtiqueta
        // } 

} 



