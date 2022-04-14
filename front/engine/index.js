import ejs  from 'ejs'
import fs   from 'fs'
import path from 'path'
import url  from 'url'


// utils

const 
  exist = fs.existsSync,
  mkdir = fs.mkdirSync,
  read  = fs.readFileSync,
  write = fs.writeFileSync,
  join  = path.join,
  dir   = path.dirname,
  file  = url.fileURLToPath


// defaults

const 
  __filename = file( import.meta.url ),
  __dirname  = dir( __filename ),
  root       = join( __dirname, '../views' ),
  dist       = join( __dirname, '../dist' ),
  options    = { root }


// get ejs template 

const get_template = template => {
  return read( `${ root }/${ template }.ejs`, 'utf8' )
}


// render html from ejs template and data

const render = ( template, data ) => {
  return ejs.render(
    get_template( template ),
    data,
    options,
  )
}


// save html as file to dist directory

const save = ( filename, data ) => {
  if ( !exist( dist ) ) mkdir( dist )
  return write( 
    `${ dist }/${ filename }.html` , 
    data 
  )
}


// render html and save to dist

const generate = ( page, data ) => {
  const 
    html = render( page, data ),
    file = save( page, html )
  return file
}


export {
  get_template,
  render,
  save,
  generate
}
