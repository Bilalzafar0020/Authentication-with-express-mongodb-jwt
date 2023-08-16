
import  express from 'express';
import cors from 'cors';
import path from 'path';
import mainrouter from './Auth-api-folder/auth.mjs';
 import 'dotenv/config' // for token secret present in .env file 
 import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';// parse the cookies geting from front end 

const __dirname = path.resolve();
const app = express()
const port =  process.env.PORT || 3001;


app.use(express.json());//body parser
app.use(cors());
app.use(cookieParser());  // cookie parser



// Using the router
app.use('/Auth-api-folder', mainrouter);


//  used ['/sigup','/'] so that when user came to root or /signup the same page diaplayed ( this is because for front end urls)
 app.use(['/signup','/'], express.static(path.join(__dirname, 'public', 'signup')));

app.use('/login', express.static(path.join(__dirname, 'public', 'login')));



//////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
//   (1)  we can make function of it and use it where we want token verification( protective routes) 
//  (2) also we can make a seperate file where we use this verification and export it then 
//  use it before the routes where we want to use it 


  app.use( (req,res,next) =>{  //   jwt token verification 

    // console.log(req.cookies);
    let token = req.cookies.token;


    try {
        const  decoded = jwt.verify(token, process.env.SECRET);

         req.body.decoded = {
            email : decoded.email,
            name : decoded.name,
            id : decoded._id
         }

        next();
      } 
      catch{
        res.status(403).send('please login/signup first');
      }


  } )



//  protective route 
app.use('/post', express.static(path.join(__dirname, 'public', 'post')));


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
