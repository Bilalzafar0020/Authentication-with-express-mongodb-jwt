
import  express from 'express';
import cors from 'cors';
import path from 'path';
import mainrouter from './Auth-api-folder/script.mjs';

const __dirname = path.resolve();

const app = express()

const port = 3001


app.use(express.json());
app.use(cors())



// Using the router
app.use('/Auth-api-folder', mainrouter);


// authentication 
// app.use((req, res, next) => { // JWT
//     let token = "valid"
//     if (token === "valid") {
//         next();
//     } else {
//         res.send({ message: "invalid token" })
//     }
// })

app.use('/', express.static(path.join(__dirname, 'public')))


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
