
import  express from 'express';
import cors from 'cors';
import path from 'path';
import mainrouter from './Auth-api-folder/script.mjs';


//# install locally (recommended)
// npm install dotenv --save
// before use install it 
// import 'dotenv/config' // for token secret 


const __dirname = path.resolve();

const app = express()

const port =  process.env.PORT || 3001;


app.use(express.json());
app.use(cors())



// Using the router
app.use('/Auth-api-folder', mainrouter);

//  used ['/sigup','/'] so that when user came to root or /signup the same page diaplayed ( this is because for front end urls)
 app.use(['/signup','/'], express.static(path.join(__dirname, 'public', 'signup')));

app.use('/login', express.static(path.join(__dirname, 'public', 'login')));


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
