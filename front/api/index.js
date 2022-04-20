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
          // pagination: {
          //   page: page,
          //   pageSize: 20,
          // },
          fields: '*',
          // populate: '*',
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

  }


module.exports = {
  
  init,
  articles

}
