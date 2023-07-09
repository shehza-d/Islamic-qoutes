// https://expressjs.com/en/resources/middleware/serve-static.html
import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;
const imagesFolder = path.join(
  new URL("./static/images", import.meta.url).pathname,
  "./"
);
// const imgPath = "/static/images/picture3.png";
// const __dirname = path.resolve();

app.get("/", (req, res) => {
  // Read the image files from the folder
  fs.readdir(imagesFolder, (err, files) => {
    if (err) {
      // If there was an error reading the folder, send a 500 Internal Server Error response
      res.status(500).send("Internal Server Error");
      return;
    }
    const randomNo = Math.floor(Math.random() * files.length);
    const fileName = files[randomNo];
    const filePath = path.join(imagesFolder, fileName);

    // Read the image file from the filesystem
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // If there was an error reading the file, send a 404 Not Found response
        res.status(404).send("Not Found");
        return;
      }

      // Otherwise, send the image file data in the response
    //   res.writeHead(200, {
    //     "Content-Type": "image/jpeg",
    //     "Cache-Control": "cache",
    //     Pragma: "no-cache",
    //     Expires: "0",
    //   });
      res.end(data);
    });
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// import { readdir } from "fs";
// Read the image file from the filesystem
// readdir(__dirname, (err, files) => {
//   console.log("files", files);
//   var fileName = files[Math.floor(Math.random() * files.length)];
//   console.log("fileName", fileName);
// });

// /static/images/picture3.png
// app.use(express.static('/static/images/picture3.png'))
// app.get("/", express.static('/static/images/picture3.png'));
