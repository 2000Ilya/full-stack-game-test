const cors = require('cors')
const express = require("express");
const fs = require("fs");
const multer = require("multer");

const corsOptions = {
    origin: ['http://localhost:5174'],
    optionsSuccessStatus: 200
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions))

const upload = multer({ dest: "uploads/" });
app.post("/upload_files", upload.single('file'), uploadFiles);

function uploadFiles(req, res) {
    parseFile(req.file, res);
}

function parseFile(req, res) {
    fs.createReadStream(req.path, { encoding: "utf-8" })
        .on("data", (chunk) => {
            const rows = chunk.split("\n");
            const headers = rows[0].split("; ");
            const data = [];
            for (let i = 1; i < rows.length; i++) {
                const row = {};
                const rowItems = rows[i].split("; ");
                for (let j = 0; j < headers.length; j++) {
                    row[headers[j]] = rowItems[j];
                }
                data.push(row);
            }
            res.json(data);
        })
        .on("error", (error) => {
            console.log(error);
        });
}

app.listen(3000, () => {
    console.log(`Server started...`);
});