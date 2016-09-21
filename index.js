const express = require('express')
const app = express()
const multer  = require('multer')
const upload = multer({ dest: 'public/tmp/' })
const fs = require('fs')

app.use(express.static('public/'))
app.use(express.static('../dist/'))

app.get('/', (req, res) => {
  res.sendFile('public/index.html')
})

app.post('/upload', upload.array('gallery[]'), (req, res) => {
	let gallery = []
	req.files.map(image => {
		gallery.push({ 'url': `http://localhost:3000/tmp/${image.filename}` })
	})
	res.json(gallery)
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
