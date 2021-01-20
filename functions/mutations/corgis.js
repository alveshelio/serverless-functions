const { gql } = require('graphql-request')

const INSERT_OR_UPDATE_CORGIS = gql`
    mutation InsertOrUpdateBoops($corgis: [boops_insert_input!]!) {
        boops: insert_boops(objects: $corgis, on_conflict: {constraint: boops_pkey, update_columns: id}) {
            returning {
                id
                count
            }
        }
    }
`

const UPDATE_BOOPS_COUNT = gql`
    mutation UpdateBoopsCount($id: String!) {
        updated: update_boops_by_pk(pk_columns: {id: $id}, _inc: {count: 1}) {
            id
            count
        }
    }
`

module.exports = { INSERT_OR_UPDATE_CORGIS, UPDATE_BOOPS_COUNT }
