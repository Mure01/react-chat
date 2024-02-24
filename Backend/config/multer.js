const multer = require("multer");
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },

    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      },
})

const upload = multer(
    {
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.mimetype.startsWith('image/')) {
            req.fileValidationError = 'Molim vas uploadajte sliku.';
            return cb(null, false, new Error('Molim vas uploadajte sliku.'));
        }
        cb(null, true);
    }

})

module.exports = upload;