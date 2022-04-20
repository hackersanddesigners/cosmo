const path = require('path')
const multer = require('multer')
const slugify = require('slugify')
const sanitize = require('sanitize-filename')


// -- file-upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // set custom dest by calling the {path} passed in `req.body`
    cb(null, path.resolve('./uploads'))
  },
  filename: (req, file, cb) => {
    const fn_split = file.originalname.split('.')
    const file_name = slugify(fn_split.slice(0, -1).join('-'))
    const file_ext = fn_split.slice(-1)[0]
    const fn = sanitize(file_name + '.' + file_ext)

    cb(null, fn)
  }
})

// <https://github.com/expressjs/multer/issues/659#issuecomment-568921323>
const fileFilter = (req, file, cb) => {
  const ext = file.originalname.split('.').pop().toLowerCase()
  const extAllowed = ['docx', 'png', 'jpg', 'jpeg', 'gif']
  const mimeAllowed = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                       'image/png', 'image/jpg', 'image/jpeg', 'image/gif']

  if (extAllowed.includes(ext) && mimeAllowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // if validation failed then generate error
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file), false);
  }
};

// init multer
let upload = multer({
  storage: storage,
  fileFilter: fileFilter, 
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  }
})

let fileUpload = upload

module.exports = fileUpload
