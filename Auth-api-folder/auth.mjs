

import express from 'express';

import { ObjectId } from 'mongodb';

import {  stringToHash,  varifyHash, validateHash  } from "bcrypt-inzi";  // increption for password

import jwt  from  'jsonwebtoken';

const id = new ObjectId ; //  unique id for documents 

const router = express.Router();


import {client} from '../mongodb.mjs';

const myDB = client.db("Database");
const myColl = myDB.collection("collection1");

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////    signup api 

router.post('/signup', async (req, res, next) => {

       if( !req.body?.name || !req.body?.email || !req.body?.password){

        res.status(403).send('required parameters missing');
        return
       }


         req.body.email = req.body.email.toLowerCase();


       try{
 
       let user = await myColl.findOne( { email : req.body.email });           

        if(!user){  //  user not  exist 

 let { name , email , password} = req.body;

/////////////////////////////////////////////         stringTOHash ( increption)
            let hasedPassword = await stringToHash(password);


         

       let data = {
        name,
        email,
        hasedPassword,
        createdOn: new Date()
       }

          let insertingData = await myColl.insertOne( data)

           console.log('inserted :', insertingData);
             console.log( ' id of data' , id);
             
        res.status(200).send('Signup successfull')

        }
       else{ //  user already exist
          res.status(403).send('User already exist with this email ');
       }       

       }

    catch(e){
        res.status(500).send('please try again');
    }


     });



///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
///////////////////////   login api 

router.post('/login', async (req,res,next)=>{

    if(  !req.body?.email || !req.body?.password){
      res.status(403).send('required parameters missing');

      return
    }

           req.body.email = req.body.email.toLowerCase();


try{

    let user = await myColl.findOne( {email : req.body.email} );

      if( !user){   // user is not present 
             
           res.status(401).send('email or password is incorrect');
            return;
      }     
         else{    // user is found 
              

/////////////////////////////////////////////  varifyHash(user now given password, signup time password)
            let varifingHash = varifyHash(req.body.password, user.password);


             if(varifingHash){

 ////////////////////////////////////////////////////////////////////           
////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
// jwt token making payload => parameter => payload(in a object), secure key(to decode it later )
//  ,{ extra options like expiry date etc} 



      const  token = jwt.sign({ 
          email : req.body.email,
          name : user.name,
          id : user._id
       }, process.env.SECRET);// ,{ expiresIn: '1h' } in option we can provide expiry date of this token




  
 ////////////////////////////////////////////////////////////////////           
////////////////////////////////////////////////////////////////////
// to store token in a cookie(becuase of it's httponly and secure thinks ) res.cookie is a 
//  express method(present in express website ) . yes we can also save it in a database also      



     res.cookie('token',token ,{
         httpOnly : true,
         secure : true
          // expires: new Date(dateAfter2MinInMili)
      } )

                res.status(200).send('login successfull');
             }
             else{
                res.status(401).send('email or password is incorrect');
             }

         }

    }
catch (e){
   res.status(500).send('please try again');
}

}  )



///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////    logout api 

router.post('/logout', (req,res,next) =>{

res.clearCookie('token');

res.status(200).send('Logout successfully');
})



export default router;
