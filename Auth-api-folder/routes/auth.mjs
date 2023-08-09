

import express from 'express';

import { ObjectId } from 'mongodb';

const id = new ObjectId ; //  unique id for documents 

const router = express.Router();


import {client} from '../../mongodb.mjs';

const myDB = client.db("Database");
const myColl = myDB.collection("practice");

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////  post http method

router.post('/signup', async (req, res, next) => {
    try {
      const { name, fatherName, gmail, country } = req.body;
  
      if (!name || !fatherName || !gmail || !country) {
        res.status(403).send('All inputs are required' );  //  { message : 'All inputs are required'  use object in statues so that more message can be send
        return;
      }
  
      const newPost  = {
        name,
        fatherName,
        gmail,
        country
      } 
      

      const databaseInsertion  = await myColl.insertOne(newPost);
 console.log(databaseInsertion);
 console.log('console ID ',databaseInsertion.insertedId);

//   here is the code for adding  many documents  

/*
      const newPost  = [
       { name,
        fatherName,
        gmail,
        country },
        { name,
          fatherName,
          gmail,
          country },
          { name,
            fatherName,
            gmail,
            country },
    
            { name,
              fatherName,
              gmail,
              country },
      ]
        

      and also like that in the insertMany parameter 
  const databaseInsertion  = await myColl.insertMany([
    {
    name,
    fatherName,
    gmail,
    country
   },
    {
    name,
    fatherName,
    gmail,
    country
   },

    {
    name,
    fatherName,
    gmail,
    country
   }
  ]);


      const databaseInsertion  = await myColl.insertMany(newPost);
 console.log(databaseInsertion);
 console.log('console ID ',databaseInsertion.insertedIds);


*/

    }
      catch (error) {
        console.error('Error adding post:', error);
        res.status(500).send('An error occurred while adding the post ');
      }
    });



///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// get  http method













export default router;


