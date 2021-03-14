'use strict'
require('dotenv').config();
const express = require('express')
const cors = require('cors');
const sqlconexion = require('./lib/sql/api-mssql/sqlconexion')
const mysqlconexion = require('./lib//sql/api-mysql/mysqlconexion')
const postgresqlconexion = require('./lib/sql/api-postgresql/postgresqlconexion')
const mongodbconexion = require('./lib/nosql/api-monogodb/monogodbconexion')
const redisconexion = require('./lib/nosql/api-redis/redisconexion')
const cassandraconexion = require('./lib/nosql/api-cassandra/cassandraconexion')
const app = express()
const port = process.env.port || 4000
    app.use(cors())
    app.use('/api/mysql',mysqlconexion)
    app.use('/api/mssql', sqlconexion)
    app.use('/api/pg',postgresqlconexion)
    app.use('/api/mongodb',mongodbconexion)
    app.use('/api/redis',redisconexion)
    app.use('/api/cassandra',cassandraconexion)
    app.listen(port,()=>{ 
               console.log(`EL SERVIDOR SE ESTA EJECUTANDO EN : http://localhost:${port}/api/mysql`)    
               console.log(`EL SERVIDOR SE ESTA EJECUTANDO EN : http://localhost:${port}/api/mssql`)
               console.log(`EL SERVIDOR SE ESTA EJECUTANDO EN : http://localhost:${port}/api/pg`)
               console.log(`EL SERVIDOR SE ESTA EJECUTANDO EN : http://localhost:${port}/api/mongodb`)
               console.log(`EL SERVIDOR SE ESTA EJECUTANDO EN : http://localhost:${port}/api/redis`)
               console.log(`EL SERVIDOR SE ESTA EJECUTANDO EN : http://localhost:${port}/api/cassandra`)

            })
      
    

