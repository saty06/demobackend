import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import pool from "./database/databaseConnection.js";
import { error } from "console";
import auth from "./auth/auth.js";
import { ChildProcess } from "child_process";

const app = express();
// middle ware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors())
const port = process.env.PORT;
async function connection() {
  await pool.connect();
}
connection()
  .then(() => console.log("connection data base successful"))
  .catch(() => console.log(error));
 

  app.get('/test', (req, res)=>{
    res.json("helo")
  })

async function signupData(){
    let userData = {
        email: "prakash06072000@gmail.com",
        password: "1234"
      };
    
      try {
        const { email, password } = userData;
        if (!email || !password) {
          console.error("Email and password are required");
          return;
        } else {
          let userPassword = await auth.signup(password); // Assuming this hashes the password
          const text = "INSERT INTO student.demo(email, password) VALUES($1, $2) RETURNING *";
          const values = [email, userPassword];
    
          const result = await pool.query(text, values);
          console.log(result.rows[0]);
        }
      } catch (error) {
        console.error("Error during signup:", error);
      }
}

 async function loginData(){
    let userData = {
        email: "satya06072000@gmail.com",
        password: "1234"
      };
      try {
        const{email, password} = userData
        let dicryptPassword = await auth.login(email,password)
        console.log(dicryptPassword)

      } catch (error) {
        console.log(error)
        
      }
 }
async function printData(){
    try {
        let result = await auth.printData()
        console.log(result)
        
    } catch (error) {
        console.log(error)
        
    }
}
 async function upData(){
    let userData = {
        email: "satya06072000@gmail.com",
        password: "1234"
      };

   try {
    const{email, password} = userData
    await auth.updateData(email, password)
   
   } catch (error) {
    console.log(error)
    
   }




 }

upData().then(()=>console.log("responce")).catch((error)=>console.log(error))


app.listen(port, () => {
  console.log(`connection port ${port}`);
});
