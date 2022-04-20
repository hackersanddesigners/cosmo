const axios         = require( 'axios' )
const { stringify } = require( 'qs' )

axios
.interceptors
.request
.use( config => {
  config.paramsSerializer = params => {
    return stringify( params, { encode: false } )
  }
  return config 
})


const 

  init = api_url => {
    axios.defaults.baseURL = api_url
  },

  articles = {

    get_all() {
      console.info( `API: Fetching articles.` )
      return new Promise( ( resolve, reject ) => {
        axios
        .get( `articles`, { params: { 
          sort: 'publishedAt:desc',
          fields: '*',
          populate: '*',
        } } )
        .then( result => {
          resolve( result.data.data )
        } )
        .catch( error => {
          console.error( `API:`, error ) 
          reject( error )
        } )
      } ) 
    }

  },

  about = {
 
    get() {
      console.info( `API: Fetching about.` )
      return new Promise( ( resolve, reject ) => {
        axios
        .get( `about` )
        .then( result => {
          resolve( result.data.data )
        } )
        .catch( error => {
          console.error( `API:`, error ) 
          reject( error )
        } )
      } ) 
    }

  }


module.exports = {
  
  init,
  articles,
  about

}
