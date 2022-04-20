const config  = require( './config' )
const api     = require( './api' )
const engine  = require( './engine' )
const express = require( 'express' )
const { body,validationResult } = require('express-validator')
const fileUpload = require('./components/file-upload')


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

// upload page
// <2022-04-20> for now it seems sensible, given the setup
// to render this HTML dynamically through express
// as everything in /dist is based on data coming from strapi?
// alternatively: we could build this page as part of the build process...

app.get('/upload', (req, res) => {
  const data = {
    title: 'Upload',
    form: {
      title: {
        type: 'text',
        name: 'title',
        label: 'Title',
        value: '',
        placeholder: 'Type the title of your contribution'
      },
      file: {
        type: 'file',
        name: 'file',
        label: 'Upload file',
        value: '',
        accept: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      },
      send: {
        type: 'submit',
        value: 'Upload'
      }
    }
  }

  res.render('upload', data)
})

app.post('/upload',
         body('title').trim().isLength({min: 1}).escape().withMessage('Contribution title cannot be empty'),

         fileUpload.single('file')
         , (req, res) => {

  const errors = validationResult(req)
  console.log('errors =>', errors)

  if (!errors.isEmpty()) {
    // TODO display upload page with errors
    // next to each field

    const data = {
      title: 'Uploaded!',
      form: {
        title: {
          type: 'text',
          name: 'title',
          label: 'Title',
          value: '',
          placeholder: 'Type the title of your contribution'
        },
        file: {
          type: 'file',
          name: 'file',
          label: 'Upload file',
          value: '',
          accept: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        },
        send: {
          type: 'submit',
          value: 'Upload'
        }
      }
    }

    res.render('upload', data)

  } else {
    // TODO
    // - write uploaded file to disk
    // - parse file appropriately and
    //   send json object to strapi

    res.render('upload', {title: 'Uploaded!'})
  }

})


app.listen(3000, () => console.log('Example app listening on port 3000!'))

init()

// exports to be used somewhere else?

module.exports = {
  api,
  engine
}
