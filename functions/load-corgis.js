const fetch = require('node-fetch')

exports.handler = async () => {
  const corgisPromise = fetch('http://no-cors-api.netlify.app/api/corgis', {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

  const photosPromise = fetch(`http://api.unsplash.com/collections/48405776/photos`, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
    }
  }).then((res) => res.json())

  const [corgis, photos] = await Promise.all([corgisPromise, photosPromise])

  const completeData = corgis.map((corgi) => {
    const photo = photos.find((p) => p.id === corgi.id)
    return {
      ...corgi,
      url: `${photo.urls.raw}&auto=format&fit=crop&w=300&h=300&q=80&crop=entropy`,
      alt: photo.alt_description,
      credit: photo.user.name,
    }
  })

  return {
    statusCode: 200,
    body: JSON.stringify(completeData)
  }
}
