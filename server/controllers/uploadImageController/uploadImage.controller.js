
async function uploadImageController(req,res) {
    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded' });
    }
    const filePath = `http://localhost:3000/uploads/${req.file.filename}`;
    res.json({ location: filePath });
}

export {
    uploadImageController
}