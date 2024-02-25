const express = require('express')
const router = express.Router()
const fs = require('fs')
const upload = require('../config/multer')

const {registerUser,addMessage, getMessage, loginUser, getAllUsers } = require('../controllers/userController')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getAllUsers', getAllUsers)
router.post('/addMessage', addMessage)
router.get('/getMessage', getMessage)



  router.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.body)

    if(req.body.image === 'undefined')
        return res.json({ message: 'Image is required', status:false });
    const filenames = fs.readdirSync('uploads')
    return res.json({ message: 'Image uploaded successfully', status:true, filenames });
  });


module.exports = router