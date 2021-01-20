const { gql } = require('graphql-request')

const GET_BOOPS = gql`
    query GetBoops {
        boops {
            id
            count
        }
    }
`

module.exports = { GET_BOOPS }
