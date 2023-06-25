import download from 'image-downloader';
import 'firebase/storage';
import admin from 'firebase-admin';
import UUID from 'uuidv4';
import dotenv from 'dotenv';
import path from 'path';
import Project from '../models/projectModel.js';
import Article from '../models/articleModel.js';

dotenv.config();

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: process.env.STORAGE_BUCKET
// });

// var bucket = admin.storage().bucket();


// async function uploadFile(filename) {
  
//   const metadata = {
//     metadata: {
//       // This line is very important. It's to create a download token.
//       firebaseStorageDownloadTokens: uuid
//     },
//     contentType: 'image/png',
//     cacheControl: 'public, max-age=31536000',
//   };

//   // Uploads a local file to the bucket
//   // var filename = path.join(__dirname,'../','photo.png')
//   console.log(filename)

// console.log("about to upload");
//   await bucket.upload(filename, {
//       // Support for HTTP requests made with `Accept-Encoding: gzip`
//       destination: `${new Date().toISOString()}.png`,
//       gzip: true,
//       metadata: metadata,
//     })

//     .then((data) => {

//       let file = data[0];

//       const firebase_url = Promise.resolve("https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid)


//       firebase_url.then((val) => {
//        console.log("returned firebase url")
//         return res.json(val)
//       })

//     })

//     .catch(err => console.log("error is ",err))

// }



const downloadImage = async (req, res) => {
  const { user,url_object, articleName,projectName,genre } = req.body;

  console.log("req body ",req.body);
  try {
    const htmlStrings = [];

    // Loop through each object in the `url_object` array
    for (let i = 0; i < url_object.length; i++) {
      const para = url_object[i];

      // Process the paragraph
      if (para.paragraph) {
        htmlStrings.push(`<br/><p>${para.paragraph}</p>`);
      }

      // Process the image
      if (para.img) {
        const filename = `${articleName}-${i}-${new Date()}.png`;
        const destPath = `../../uploads/${filename}`;

        await download.image({ url: para.img, dest: destPath });
        // console.log("Saved to", destPath);

        htmlStrings.push(`<img src="https://text-image-backend.onrender.com/photos/${filename}" alt="Image ${i + 1}">`);
      }
    }

    // Generate the final HTML string by joining all the HTML strings
    const htmlString = htmlStrings.join("");

    // Return the HTML string in the response
    // console.log(htmlString);

    try {
      
    const article = new Article({
      user,
      articleTitle:articleName,
      articleBody:htmlString,
      genre
    })
    const createdarticle = await article.save()
    
    console.log("saved article is ",createdarticle)

    const projectExists = await Project.findOne({name:projectName})

    if (projectExists) {
      const project_art = projectExists.articles
      projectExists.articles = [...project_art,createdarticle._id ]
      
      await projectExists.save()
      
    }
    else{
      const project = new Project({
        user,
        articles: [createdarticle._id], // Add the created article ID to the articles array
        name: projectName,
      });
      const createdproject = await project.save();
  
      console.log("saved project is ",createdproject)
    }



    return res.send(htmlString);
  } catch (error) {
      console.log("error is ",error)
    }
    
    return res.send(htmlString);
  } catch (error) {
    return res.json(error);
  }
};



  
  export{
    downloadImage
  }
  