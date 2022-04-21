module.exports = {

  api_url: 'http://localhost:1337/api',
  api_upload_url: 'http://localhost:1337',

  port: 3000,

  title: 'Cosmogrammatics',

  routes: [
    {
      path: '/',
      name: 'Cosmogrammatics',
    },
    {
      path: '/about',
      name: 'About',
    },
    {
      path: '/upload',
      name: 'Upload'
    }
  ],

  footer: {
    message: 'Footer message.'
  },

  md: {
    silent      : true,
    breaks      : true,
    // html        : true,
    // linkify     : true,
    // typographer : true,
    // emoji       : true,
  }



}
