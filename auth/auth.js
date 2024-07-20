import bcrypt from 'bcrypt'


import pool from '../database/databaseConnection.js'

class auth{
    static async signup(  password){
        let hasPassword =  await bcrypt.hash(password,10)
        return hasPassword

    }
    static async login(email,password){
        try {
            const res = await pool.query('SELECT PASSWORD FROM student.demo WHERE email = $1', [email])
       
        const newPass = await bcrypt.compare(password,res.rows[0].password )
        console.log(res.rows[0])
      console.log(res.rows[0].password)
      return newPass
            
        } catch (error) {
            console.log(error)
            
        }
      
        
        
    }

    static async printData(){
        try {
            let print ={
                text:`SELECT * FROM STUDENT.DEMO`,
            }
            let result = await pool.query(print)
            return result.rows
            
        } catch (error) {
            console.log(error)
        }
        
    }
   static async  updateData( email){
    try {
        let updataItem = {
            
            text:`SELECT email FROM STUDENT.DEMO WHERE id=$1`,
            value:[1]
        }
        let upResult = await pool.query(updataItem)
        console.log(upResult.rows)
        

    } catch (error) {
        
    }

}


}
export default auth