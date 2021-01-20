const { client } = require('./utils')
const { UPDATE_BOOPS_COUNT } = require('./mutations/corgis')

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body)

  const data = await client.request(UPDATE_BOOPS_COUNT, {
    id
  })

  return {
    statusCode: 200,
    body: JSON.stringify(data.updated.count)
  }
}
