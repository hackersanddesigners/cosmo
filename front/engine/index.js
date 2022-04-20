const 

  // fs and path wrappers

  {
    exist,
    mkdir,
    cpdir,
    join
  } = require( './fs' ),


  // Our custom EJS render function

  {
    dist,
  } = require( './ejs' ),


  // make
  
  make = require( './make' )
  


// Make dist if it doesnt exist

const make_dist = () => {
  if ( !exist( dist ) ) {
    mkdir( dist )
  }
}


// Copy styles to dist on init 

const copy_styles = () => {
  cpdir( 
    join( __dirname, '../styles' ), 
    join( dist, 'styles' ), 
    { overwrite: true } 
  )
}


// Initialize the engine

const init = meta => {
  make.init( meta )
  make_dist()
  copy_styles()
}


module.exports = {
  init,
  make
}
