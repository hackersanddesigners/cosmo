const 
  
  // fs and path wrappers

  {
    exist,
    mkdir,
    read,
    write,
    join
  } = require( './fs' ),


  // Official EJS library

  ejs = require( 'ejs' ),

  
  // Directories with EJS templates in them

  views = join( __dirname, '../views' ),
  pages = join( __dirname, '../views/pages' ),
  comps = join( __dirname, '../views/comps' ),


  // Dist directory 

  dist = join( __dirname, '../dist' )


// Custom loader

ejs.fileLoader = template => {
  return read( template, 'utf8' ).trim()
}


// Get ejs template 

const get_template = template => {
  template = template ?? 'index'
  return read( `${ pages }/${ template }.ejs`, 'utf8' )
}


// Render html and json from ejs template and data

const render = ( template, data ) => {
  return {
    html: ejs.render(
      get_template( template ),
      data,
      { views : [ views, pages, comps ] },
    ),
    json: JSON.stringify( 
      data, 
      null, 
      2 
    )
  }
}


// Save html and json files to the appropriate dirs

const save = ( slug, { json, html } ) => {
  slug = slug ?? ''
  let path = dist
  const dirs = slug.split('/')
  for ( const dir of dirs ) {
    path += `/${ dir }`
    if ( !exist( path ) ) {
      mkdir( path )
    }
  }
  write( `${ path }/index.json`, json )
  write( `${ path }/index.html`, html )
}

module.exports = { 
  dist,
  render,
  save
}
