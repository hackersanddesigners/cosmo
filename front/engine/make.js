const 

  // fs and path wrappers

  {
    lsdir,
    lstat,
  } = require( './fs' ),


  // Our custom EJS render function

  {
    dist,
    render,
    save 
  } = require( './ejs' ),


  // Markdown rendering

  {
    md,
    mdi 
  } = require( './md' )


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
    about.text = md( about.text )
    return generate({
      route : 'about',
      data  : { about }  
    })
  },


  article : article => {
    const 
      updated  = article.updatedAt.replace(/[^a-z0-9]/gi, '-'),
      parent   = article.slug,
      child    = `${ parent }/${ updated }`
    console.log(child)
    generate({
      route : child,
      template : 'article',
      data  : { article }  
    })
    article.siblings = lsdir( `${ dist }/${ parent }` )
      .filter(dir => lstat( `${dist}/${parent}/${dir}` ).isDirectory())
    return generate({
      route : parent,
      template : 'article',
      data  : { article }  
    })
  }


}
