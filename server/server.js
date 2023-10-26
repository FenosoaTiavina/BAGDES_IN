const express = require('express');
const cors = require('cors');
const fs = require("fs");
const { rmSync } = require("fs");
const { existsSync } = require("fs");
const app = express();
const port = 3001;


const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

app.use(express.json())

// Serve uploaded files statically
app.use('/public/Photos', express.static('/public/Photos'));

// Create an endpoint for file uploads
app.post('/upload', (req, res) => {
    const photo = req.body.photo;
    const name = photo.split('/').slice(-1)[0]

    const newPath = `/public/Photos/${name}`
    if (existsSync(newPath)) {
        console.log('file exist');
        rmSync(newPath)
    }
    fs.copyFile(photo, `${process.cwd()}${newPath}`, (err) => {
        if (err) {
            console.error('Error copying the file:', err);
            res.status(500).json({ message: "Error while copying file" });

        } else {
            res.status(200).json({ path: newPath, name: name });
        }
    })

});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});