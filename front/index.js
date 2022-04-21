const api     = require( './api' )
const engine  = require( './engine' )
const express = require( 'express' )
const { 
  body,
  validationResult, 
  header 
} = require('express-validator')
const fileUpload = require('./views/comps/file-upload')
const reload = require('reload')


const {
  title,
  routes,
  footer,
  api_url,
  port
} = require( './config' )




const init = async () => {

  
  api.init( api_url )
  engine.init({ 
    header: { title, routes },
    footer 
  })

  
  // on init, make index
  
  try {

    const articles = await api.articles.get_all()
    engine.make.index( articles )

    for ( const article of articles ) {
      engine.make.article( article )
    }

    const form = { title: 'Upload' }
    engine.make.upload( form )

    const about = await api.about.get()
    engine.make.about( about )

  } catch ( error ) {
    throw error
  }
  
  
  
  
  
  // listen for strapi hooks
  
  const app = express()
  
  app
  .use( express.json() )
  .use( express.static( 'dist' ) )
  
  app.post('/', async (req, res) => {
  
    const 
      model   = req.body.model,
      type    = req.body.event.split('.').pop(),
      data    = req.body.entry
  
    console.log(type, model)
  
    switch( model ) {
  
      case 'article':
        engine.make.article( data )
        const articles = await api.articles.get_all()
        engine.make.index( articles )
        break

      case 'about':
        engine.make.about( data )
        break
  
      default:
  
    }
  
    res.send('OK')
  
  })
  
  // upload page
  // <2022-04-20> for now it seems sensible, given the setup
  // to render this HTML dynamically through express
  // as everything in /dist is based on data coming from strapi?
  // alternatively: we could build this page as part of the build process...

  app.post('/upload',
    body('title').trim().isLength({min: 1}).escape().withMessage('Contribution title cannot be empty'),
    fileUpload.single('file'), 
    (req, res) => {

      const errors = validationResult(req)
      console.log('errors =>', errors)

      if (!errors.isEmpty()) {

      // TODO display upload page with errors
      // next to each field

      const form = {
        title: 'Uploaded!',
      }

      res.render( 'upload', form )

    } else {
      // TODO
      // - write uploaded file to disk
      // - parse file appropriately and
      //   send json object to strapi

      const form = {
        title: 'Uploaded!',
      }

      res.render( 'upload', form )
    }

  })

  app.listen( port || 3000, () => {
    console.log(`Listening on port ${ port || 3000 } !`)
  })
  if ( process.env.NODE_ENV == 'development' ) {
    reload(app)
  }
}

init()

// exports to be used somewhere else?

module.exports = {
  api,
  engine
}
