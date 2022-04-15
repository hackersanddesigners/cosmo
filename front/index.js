const config  = require( './config' )
const express = require( 'express' )

const {
  render,
  save,
  generate
} = require( './engine/index.js' )

const {
  title,
  api_url
} = config





const make_index = articles => {
  return generate( 'index', {
    title,
    articles
  })
}


const make_article = article => {
  return save( 
    article.slug, 
    render( 'article', article )
  )
}



// on init, make index

// const articles = fectch( api_url / articles )
const articles = [
  { slug: 'article-1' },
  { slug: 'article-2' },
  { slug: 'article-3' },
  { slug: 'article-4' },
  { slug: 'article-5' },
]

make_index( articles )




// listen for strapi hooks

const app = express()

app.use(express.json())

app.post('/', (req, res) => {

  const 
    model   = req.body.model,
    type    = req.body.event.split('.').pop(),
    data    = req.body.entry

  console.log(type, model)

  switch( model ) {

    case 'article':
      make_article( data )
      break

    default:

  }

  res.send('OK')
  
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))


// exports to be used somewhere else?

module.exports = {
  make_index,
  make_article
}
