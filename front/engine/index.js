// modules

const 
  ejs  = require( 'ejs'  ),
  fs   = require( 'fs'   ),
  path = require( 'path' )


// utils

const 
  exist = fs.existsSync,
  mkdir = fs.mkdirSync,
  read  = fs.readFileSync,
  write = fs.writeFileSync,
  join  = path.join


// defaults

const 
  views      = join( __dirname, '../views' ),
  comps      = join( __dirname, '../components' ),
  dist       = join( __dirname, '../dist' ),
  options    = { 
    views : [ views, comps ]
  }


// custom loader

ejs.fileLoader = template => {
  return read( template, 'utf8' ).trim()
}


// get ejs template 

const get_template = template => {
  return read( `${ views }/${ template }.ejs`, 'utf8' )
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

const save = ( slug, data ) => {
  if ( !exist( dist ) ) {
    mkdir( dist )
  }
  if ( slug == 'index' ) {
    return write( `${ dist }/${ slug }.html`, data )
  } else {
    const dir_path = `${ dist }/${ slug }`
    if ( !exist( dir_path ) ) {
      mkdir( dir_path )
    }
    return write( `${ dir_path }/index.html` , data )
  }
}


// render html and save to dist

const generate = ( page, data ) => {
  const 
    html = render( page, data ),
    file = save( page, html )
  return file
}


module.exports = {
  get_template,
  render,
  save,
  generate
}
