import { QueryConfig } from "pg"
import client from "../../config/pg.config.ts"
import { User } from "../../models/user.model.ts"
import { Ok, err } from "../../utils/generalTypes.ts"
//conect posgres
export class UserManager{
    #isConnected = false
    #connectDB(){
        if(!this.#isConnected){
            try {
                client.connect()
                this.#isConnected = true
                console.log("posgres connected")
            } catch (error) {
                console.error("error connecting to postgres")

            }
        }
    }
    async getUsers():Promise<Ok<string> | err>{
        try {
            this.#connectDB()
            const content = await client.query("SELECT * FROM users")
            console.log(content.rowCount)
             const response:Ok<string> ={
                 content:JSON.stringify(content.rows)
                }
            return response

        } catch (error) {
            
            const response:err = {
                err:true,
                message:"something went wrong getting your file",
                status:500
            }
            return response

        }
        // finally{
        //     await client.end()
        // }
    }
    async getUser(id:string):Promise<Ok<string> | err>{
        try {
            this.#connectDB()
            const content = await client.query("SELECT * FROM users WHERE id ="+ id)
             const response:Ok<string> ={
                 content:JSON.stringify(content.rows[0])
                }
            return response

        } catch (error) {
            
            const response:err = {
                err:true,
                message:"something went wrong getting your file",
                status:500
            }
            return response

        }
        // finally{
        //     await client.end() 
        // }
        
    }
    async addUser(user:User):Promise<Ok<string> | err>{
        try {
            this.#connectDB()
            const query:QueryConfig = {
                text: 'INSERT INTO users(name, email, role, rate) VALUES($1, $2, $3, $4) RETURNING *',
                values: [user.name, user.email, user.role, user.rate]
            }
            const content = await client.query(query)
             const response:Ok<string> ={
                 content:JSON.stringify(content.rows[0])
                }
            return response

        } catch (error) { 
            const response:err = { 
                err:true,
                message:"something went wrong adding your file",
                status:500
            }
            return response
        }
        // finally{
        //     await client.end() 
        // }
    }
    async deleteUser(id:string):Promise<Ok<string> | err>{
        try {
            this.#connectDB()
            const query:QueryConfig = {
                text: "DELETE FROM users WHERE id = $1 RETURNING *",
                values: [id]
            }
            const content = await client.query(query)
            const response:Ok<string> ={
                 content:JSON.stringify(content.rows[0]) || "no user to delete"
            }
            return response

        } catch (error) { 
            const response:err = { 
                err:true,
                message:"something went wrong deleting your file",
                status:500
            }
            return response
        }
        // finally{
        //     await client.end() 
        // }
    }
}