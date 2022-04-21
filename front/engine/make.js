const 

  // fs and path wrappers

  {
    lsdir,
    lstat,
    exist,
  } = require( './fs' ),


  // Our custom EJS render function

  {
    dist,
    render,
    save 
  } = require( './ejs' ),


  // sanitize api responses

  sanitize = require( './sanitize' )


let
  header,
  footer


// render html/json and save to dist

const generate = ({ route, template, data }) => {
  template = template ?? route
  data = {
    header,
    ...data,
    footer
  }
  const 
    page  = render( template, data ),
    files = save( route, page )
  return files
}


// Get children directories of a directory

get_children = parent => {
  return (
    exist( `${ dist }/${ parent }` ) &&
    lsdir( `${ dist }/${ parent }` )
    .filter( dir => (
      lstat( `${ dist }/${ parent }/${ dir }` )
      .isDirectory()
    ) ) || null
  ) 
}


module.exports = {


  init : meta => {
    header = meta
    footer = meta
  },

  index : articles => {
    return generate({
      route : null,
      data  : { articles }
    })
  },


  upload : form => {
    return generate({ 
      route : 'upload',
      data  : { form }  
    })
  },


  about : about => {
    about = sanitize.about( about )
    return generate({
      route : 'about',
      data  : { about }  
    })
  },


  article : article => {
    article = sanitize.article( article )
    const 
      updated  = article.updatedAt.replace(/[^a-z0-9]/gi, '-'),
      parent   = article.slug,
      child    = `${ parent }/${ updated }`,
      siblings = get_children( parent )
    generate({
      route : child,
      template : 'article',
      data  : { article }  
    })
    article.siblings = siblings
    return generate({
      route : parent,
      template : 'article',
      data  : { article }  
    })
  }


}
