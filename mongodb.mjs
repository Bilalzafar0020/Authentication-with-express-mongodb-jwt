
import  {MongoClient} from  "mongodb";

// the uri string wof mongodb connection (like of firebase configration).
const uri = "mongodb+srv://bilalzafar156673:Bilalzafar123@cluster1.zuopu3z.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

     async function run() {  // here run is just a function name 
  try {
   
await client.connect();
console.log('Connected to database ');
  }
  catch {
    console.log('connection to database  failed');

    process.exit(1); // process(work doing in express.js and exit is terminating the process 
    //  it have some code in parameter  1 means some error and 0 means successful and exit()  means exit in any condition  ) 
  }
}
run().catch(console.dir);

process.on('SIGINT', async ()=>{   
// process.on is a evertlistener for various process/events occur in node.js environment 
// it  have 2 parameters one is event in above it is (signal interupt) and then call back function
console.log('Server is terminating ');

await client.close();

process.exit(0);

})


export  { client };
