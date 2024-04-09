import { IncomingMessage, ServerResponse} from "http"
import { UserManager } from "../dao/user/userMannager"
import { getRequestBody } from "../utils/services"
import { User } from "../models/user.model"
const um = new UserManager()

export const getUsersController = async(response:ServerResponse):Promise<void> =>{
    const users = await um.getUsers()
            if("content" in users){
                response.writeHead(200,
                    {
                        'Content-Length':
                            Buffer.byteLength(users.content),
                        'Content-Type':
                            'application/json'
                    });
                response.end(users.content)
                return 
            }

            response.writeHead(users.status,{
                'Content-Length':Buffer.byteLength(users.message),
                'Content-Type':'text/plain'
                })
            response.end(users.message)
}
export const getUserController = async(request:IncomingMessage, response:ServerResponse):Promise<void> =>{
    if(!request.url)throw new Error("not url")
    const id = new URL(request.url, `http://${request.headers.host}`).searchParams.get("id")
    if(typeof id !== "string") {
        response.writeHead(400,{
            'Content-Length':Buffer.byteLength("invalid id"),
            'Content-Type':'text/plain'
            })
        response.end("invalid id")
        return 
    }

    const user = await um.getUser(id)
            if("content" in user){
                response.writeHead(200,
                    {
                        'Content-Length':
                            Buffer.byteLength(user.content),
                        'Content-Type':
                            'application/json'
                    });
                response.end(user.content)
                return 
            }
            response.writeHead(user.status,{
                'Content-Length':Buffer.byteLength(user.message),
                'Content-Type':'text/plain'
                })
            response.end(user.message)
}
export const addUserController = async(request:IncomingMessage, response:ServerResponse):Promise<void> =>{

    const data:string = await getRequestBody(request) 
    const newUserTemplate:User | false = JSON.parse(data)
    if(!newUserTemplate) {
        response.writeHead(400,{
            'Content-Length':Buffer.byteLength("invalid user"),
            'Content-Type':'text/plain'
            })
        response.end("invalid user")
        return 
    }
    const newUser = await um.addUser(newUserTemplate)

    if("content" in newUser){
        response.writeHead(200,
            {
                'Content-Length':
                    Buffer.byteLength(newUser.content),
                'Content-Type':
                    'application/json'
            });
        response.end(newUser.content)
        return 
    }

    response.writeHead(newUser.status,{
        'Content-Length':Buffer.byteLength(newUser.message),
        'Content-Type':'text/plain'
        })
    response.end(newUser.message)
}
export const deleteUserController = async(request:IncomingMessage, response:ServerResponse):Promise<void> =>{
    if(!request.url)throw new Error("not url")
    const id = new URL(request.url, `http://${request.headers.host}`).searchParams.get("id")
    if(typeof id !== "string") {
        response.writeHead(400,{
            'Content-Length':Buffer.byteLength("invalid id"),
            'Content-Type':'text/plain'
            })
        response.end("invalid id")
        return 
    }
    const deletedUser = await um.deleteUser(id)

    if("content" in deletedUser){
        response.writeHead(200,
            {
                'Content-Length':
                    Buffer.byteLength(deletedUser.content),
                'Content-Type':
                    'application/json'
            });
        response.end(deletedUser.content)
        return 
    }

    response.writeHead(deletedUser.status,{
        'Content-Length':Buffer.byteLength(deletedUser.message),
        'Content-Type':'text/plain'
        })
    response.end(deletedUser.message)
}