'use strict'
const queries = require('./queries')
const mutation = require('./mutation')
const types = require('./types')

module.exports ={
    Query: queries,
    Mutation: mutation,
    ...types
}