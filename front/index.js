const config  = require( './config' )
const api     = require( './api' )
const engine  = require( './engine' )
const express = require( 'express' )

const {
  render,
  save,
  generate
} = require( './engine' )

const {
  title,
  api_url,
  port
} = config




const init = async () => {

  
  engine.init( title )
  api.init( api_url )

  
  // on init, make index
  
  try {
    const articles = await api.articles.get_all()
    console.log(articles)
    engine.make_index( articles )

  } catch ( error ) {
    throw error
  }
  
  
  
  
  
  // listen for strapi hooks
  
  const app = express()
  
  app
  .use( express.json() )
  .use( express.static( 'dist' ) )
  
  app.post('/', (req, res) => {
  
    const 
      model   = req.body.model,
      type    = req.body.event.split('.').pop(),
      data    = req.body.entry
  
    console.log(type, model)
  
    switch( model ) {
  
      case 'article':
        engine.make_article( data )
        break
  
      default:
  
    }
  
    res.send('OK')
  
  })
  
  app.listen(port || 3000, () => {
    console.log(`Listening on port ${ port || 3000} !`)
  })

}  

init()

// exports to be used somewhere else?

module.exports = {
  api,
  engine
}
