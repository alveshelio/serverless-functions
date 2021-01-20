const { GraphQLClient } = require('graphql-request')

console.warn('HASURLA_GQL_API', process.env.HASURLA_GQL_API)
console.warn('HASURLA_GQL_ADMIN_SECRET', process.env.HASURA_GQL_ADMIN_SECRET)

const client = new GraphQLClient(process.env.HASURLA_GQL_API, {
  headers: {
    ['x-hasura-admin-secret']: process.env.HASURA_GQL_ADMIN_SECRET,
  },
})

module.exports = { client }
