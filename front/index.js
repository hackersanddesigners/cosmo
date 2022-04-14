import config  from './config.js'
// import express from 'express'
import {
  render,
  save,
  generate
} from './engine/index.js'

const {
  title
} = config


generate( 'index', { 
  title,
  body: [
    'section',
    'section1',
    'section2',
    'section3',
    'section4',
  ]
})


// const app = express()

// app.set('view engine', 'ejs')

// app.get('/', (req, res) => {
//   res.render('index', { 
//     title
//   })
// })

// app.listen(4000, () => console.log('Example app listening on port 4000!'))
