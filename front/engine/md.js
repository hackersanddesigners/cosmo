const marked = require( 'marked' )
const config = require( '../config' )

marked.setOptions( config.md )

const 

  md  = marked.parse,
  mdi = marked.parseInline


module.exports = {
  md,
  mdi
}
