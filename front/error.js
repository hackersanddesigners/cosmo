const path = require('path')

// handles 400 error (malformed URI, eg visiting `%ff`, or putting `%` in a URI)
// ps: visiting a URI with only % chars makes Apache return a bad request error too
// with a default page response; if we would be using nginx, we could return
// a custom page response...

function error (app) {
  app.use((err, req, res, next) => {
    if (!err) return next()

    console.log('error URI =>', err)

    // TODO instead of returning a JSON response
    // we want to return the /upload template with an appropriate multer error
    // TOOD upload error messages
    if (err.name === 'MulterError') {
      if (err.code == 'LIMIT_FILE_SIZE') {
        res.status(500).send({
          message: 'Image must not be larger than 5 MB.'
        })

      } else if (err.code == 'LIMIT_UNEXPECTED_FILE') {
        res.status(500).send({
          message: 'Image format must be PNG, JPG, JPEG or GIF.'
        })

      } else {
        console.log('FILE-UPLOAD ERR =>', err)

        res.status(500).send({
          message: 'Could not upload the file.'
        })

      }

    } else {
      // TODO put error.esj in here

      // return res.status(err.statusCode).sendFile(path.resolve(__dirname, '..', 'bad-uri.html'))

    }

  })
}

module.exports = error
