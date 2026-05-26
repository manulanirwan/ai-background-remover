const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');

const app = express();
const upload = multer();

// Enable CORS for your Blogger URL
app.use(cors({ origin: '*' })); 

app.post('/remove-bg', upload.single('image'), async (req, res) => {
    if (!req.file) return res.status(400).send('No image uploaded');

    try {
        const response = await axios.post('https://api.remove.bg/v1.0/removebg', 
            req.file.buffer, {
            headers: {
                'X-Api-Key': process.env.REMOVE_BG_API_KEY,
                'Content-Type': 'application/octet-stream'
            },
            responseType: 'arraybuffer'
        });

        res.set('Content-Type', 'image/png');
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing image');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
