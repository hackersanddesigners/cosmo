const

  {
    api_upload_url 
  } = require( '../config' ),


 // Markdown rendering

  {
    md,
    mdi 
  } = require( './md' )

const

  about = about => {
    about.text = md( about.text )
    return about
  }

  article = article => {
    for ( const section of article.body ) {
      section.type = section.__component.replace('content-types.', '')

      switch ( section.type ) {

        case 'text':
          section.source = md(section.source)
          break

        case 'image':
          const
            { file }    = section,
            { formats } = file,
            image = formats['large']
              || formats['medium']
              || formats['small']
              || formats['small']
          section.source = `${ api_upload_url }${ image.url }`
          section.alternativeText = file.alternativeText
          section.caption = file.caption
          break

        case 'video':
        case 'audio':
          if (section.link) {
            section.source = section.link
            section.name = section.link.split('/').pop()
          } else if ( section.file ) {
            section.source = `${ api_upload_url }${ section.file.url }`
            section.name = section.file.name
          } else if ( section.iframe ) {
            section.source = section.iframe
          } else {
            section.source = null
          }
          break
        default:
      }
    }
    return article
  }

module.exports = {
  article,
  about
}
