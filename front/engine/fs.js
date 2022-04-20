const 
  path = require( 'path' ),
  fs   = require( 'fs' ),
  fse  = require('fs-extra')
  
module.exports = {
  exist : fs.existsSync,
  mkdir : fs.mkdirSync,
  lsdir : fs.readdirSync,
  lstat : fs.lstatSync,
  cpdir : fse.copySync,
  read  : fs.readFileSync,
  write : fs.writeFileSync,
  join  : path.join
}
