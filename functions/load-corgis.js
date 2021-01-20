const fetch = require('node-fetch')

const { client } = require('./utils')
const { INSERT_OR_UPDATE_CORGIS } = require('./mutations/corgis')

exports.handler = async () => {
  const corgis = await fetch('http://no-cors-api.netlify.app/api/corgis', {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

  const photosPromise = fetch(`http://api.unsplash.com/collections/48405776/photos`, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
    }
  }).then((res) => res.json())

  const dataPromise = await client.request(INSERT_OR_UPDATE_CORGIS, {
    corgis: corgis.map((c) => ({ id: c.id, count: 0 }))
  })

  const [photos, hasuraData] = await Promise.all([photosPromise, dataPromise])

  const completeData = corgis.map((corgi) => {
    const photo = photos.find((p) => p.id === corgi.id)
    const boopsData =  hasuraData.boops.returning.find((b) => b.id === corgi.id)
    const boops = boopsData.count
    return {
      ...corgi,
      url: `${photo.urls.raw}&auto=format&fit=crop&w=300&h=300&q=80&crop=entropy`,
      alt: photo.alt_description,
      credit: photo.user.name,
      boops,
    }
  })
  console.warn('completeData', completeData)

  return {
    statusCode: 200,
    body: JSON.stringify(completeData)
  }
}
