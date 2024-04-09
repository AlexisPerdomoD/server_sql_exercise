import { IncomingMessage } from "http"

export const getRequestBody = (request:IncomingMessage):Promise<string> => {
    return new Promise((resolve, reject) => {
        let body:string = ""
        request.on('data', chunk => body += chunk.toString() )
        request.on('end', () => resolve(body))
        request.on('error', (error) => reject(error))
    })
}