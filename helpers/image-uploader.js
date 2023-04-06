const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, new Data().getTime() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null, true);
    } else {
        cb(new Error('Unsupported files'), false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize:1024*1024*10
    },
    fileFilter: fileFilter
})
console.log(storage.filename);
console.log('****************');

console.log(storage);
console.log('-----------------');
console.log(storage.destination);
module.exports = {
    upload: upload

}