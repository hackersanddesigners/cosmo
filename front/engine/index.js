const {
  render,
  save,
  generate
} = require( './ejs' )


let
  header,
  footer

const init = title => {
  header = {
    title
  }
}

const make_index = articles => {
  return generate( 'index', {
    header,
    articles
  })
}

const make_upload = data => {
  return generate( 'upload', data )
}

const make_article = article => {
  return save( 
    article.slug, 
    render( 'article', { 
      header, 
      article 
    })
  )
}


module.exports = {
  init,
  make_index,
  make_upload,
  make_article
}
