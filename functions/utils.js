const { GraphQLClient } = require('graphql-request')

const client = new GraphQLClient(process.env.HASURLA_GQL_API, {
  headers: {
    ['x-hasura-admin-secret']: process.env.HASURA_GQL_ADMIN_SECRET,
  },
})

module.exports = { client }
