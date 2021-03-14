const { makeExecutableSchema } = require('graphql-tools')
const { graphqlHTTP } = require('express-graphql')
const { readFile, readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./resolvers')

const typeDefs = readFileSync(
    join(
        __dirname,'schema.graphql'),'utf-8')
const schema = makeExecutableSchema({typeDefs,resolvers})

const mongodbconexion = graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  })

  module.exports = mongodbconexion