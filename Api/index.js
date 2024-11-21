const express = require('express')
const cors = require("cors")

const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const User = require('./models/User.js')
const Place = require('./models/Place.js')

const jwt = require('jsonwebtoken')

const cookieParser = require('cookie-parser')
const imageDownloader = require('image-downloader')

const multer = require('multer')
const fs = require("fs")
const { userInfo } = require('os')

require('dotenv').config()

const app = express()


const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = process.env.JWT_SECRET

mongoose.connect(process.env.MONGO_URL)

app.use(express.json())

app.use(express.urlencoded({ extended: false }))
app.use("/uploads", express.static(__dirname + "/uploads"))

app.use(cookieParser());

app.use(cors({
  credentials: true,
  origin: "http://localhost:5173"
}))



app.post('/register', async (req, res) => {
  const { name, email, pass } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {

    const userInfo = await User.create({
      name,
      email,
      pass: bcrypt.hashSync(pass, bcryptSalt)
    })

    res.json(userInfo)
  } catch (err) {
    res.status(422).json(err)
    console.log(err)
  }
})

app.post('/login', async (req, res) => {
  const { pass, email } = req.body;
  const userInfo = await User.findOne({ email })

  if (userInfo) {
    const passVerify = bcrypt.compareSync(pass, userInfo.pass)
    if (passVerify) {
      jwt.sign({ email: userInfo.email, id: userInfo._id }, jwtSecret, {}, (err, token) => {
        if (err) throw err
        //console.log(token)  token is the data in a connected string
        res.cookie('token', token).json(userInfo)
        console.log(token)
      })

    } else {
      res.status(422).json('Incorrect password')
    }

  } else {
    res.status(404).json("No account found with this email address")
  }

})


app.get('/profile', (req, res) => {
  const { token } = req.cookies
  console.log(token)

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userTokenInfo) => {
      if (err) throw err
      const { name, email, _id } = await User.findById(userTokenInfo.id)
      res.json({ name, email, _id });
      console.log(userTokenInfo)
    })
  } else {
    res.json(null)
  }

})



app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true)
})

app.post('/upload-link', async (req, res) => {
  const { photoLink } = req.body;
  const newName = "photo" + Date.now() + '.jpg';

  if (!photoLink) {
    return (

      res.status(400).json("Image Required")
    )
  }

  await imageDownloader.image({
    url: photoLink,
    dest: __dirname + '/uploads/' + newName,
  })
  res.json(newName)

})

const imageMiddleware = multer({ dest: "uploads" })
app.post('/uploads', imageMiddleware.array("image", 200), (req, res) => {
  const uploadFile = []
  for (let i = 0; i < req.files.length; i++) {
    console.log(req.files[i])
    const { path, originalname } = req.files[i]
    console.log(path)
    const part = originalname.split(".")
    // console.log(part)
    const ext = part[part.length - 1]
    //console.log(ext)

    const newPath = path + "." + ext

    fs.renameSync(path, newPath)
    uploadFile.push(newPath.replace("uploads\\", ""))
  }

  res.json(uploadFile)
  // res.json(req.files)

})

app.post('/places', (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    desc,
    perks,
    additionalInfo,
    checkIn,
    checkOut,
    maxGuests,
    price
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userTokenInfo) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const placeInfo = await Place.create({
      owner: userTokenInfo.id,
      title,
      address,
      addedPhotos,
      desc,
      perks,
      additionalInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    });
    res.json({ placeInfo })

  });
});

app.get('/user-places', (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, jwtSecret, {}, async (err, userTokenInfo) => {
    const { id } = userTokenInfo
    res.json(await Place.find({ owner: id }))
  })
})

app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json("Valid id required");
  }

  try {
    const place = await Place.findById(id);

    if (!place) {
      return res.status(404).json("Place not found");
    }

    res.json(place);
  } catch (error) {
    res.status(500).json("Server error");
  }
});


app.put('/places', async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    desc,
    perks,
    additionalInfo,
    checkIn,
    checkOut,
    maxGuests,
    price
  } = req.body;
  console.log(req.body)
  jwt.verify(token, jwtSecret, {}, async (err, userTokenInfo) => {
    const placeDoc = await Place.findById(id)
    if (err) throw err
    if (userTokenInfo.id === placeDoc.owner.toString()) {
      // console.log(userTokenInfo.id)
      // console.log(placeDoc.owner)
      placeDoc.set({
        title,
        address,
        addedPhotos,
        desc,
        perks,
        additionalInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
      })
      placeDoc.save()
      res.json('ok')
    }
  })

})

app.get("/places", async (req, res) => {
  res.json(await Place.find())
})

app.listen(5000)

