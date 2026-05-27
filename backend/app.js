const express = require('express');
const multer = require('multer');
const path = require("path");
const cookieParser = require('cookie-parser');

const cors = require('cors');
const app = express();
const connectDB = require('./database/database-config')

require('dotenv').config();
app.use(cors({
  origin: process.env.FRONTENDURL,
  credentials: true
}));
app.use(cookieParser());

app.use(express.json())
const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});


const upload = multer({ storage });


app.post(
  "/upload",
  upload.single("image"),
  (req, res) => {

    res.json({

      imageUrl:
        `http://localhost:3000/uploads/${req.file.filename}`
    });
  }
);


app.use(
  "/uploads",
  express.static("uploads")
);

const router = require('./routes')


app.use('/api', router)


connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log('db is connect')

    console.log('server is running')
  })

})
