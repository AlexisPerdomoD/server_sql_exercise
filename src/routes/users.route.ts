import { IncomingMessage, ServerResponse } from "http";
import { addUserController, deleteUserController, getUserController, getUsersController } from "../controllers/user.controller";


async function userRoutes(request:IncomingMessage, response:ServerResponse) {
    if(!request.url)throw new Error("not url")
    switch (true) {
        case request.method === "GET" && request.url === "/api/user":
            return getUsersController(response)
        case request.method === "GET" && request.url.includes("/api/user/?id="):
            return getUserController(request, response)
        case request.method === "DELETE" && request.url.includes("/api/user/?id="):
            return deleteUserController(request, response)
        case request.method === "POST" && request.url.includes("/api/user"):
            return addUserController(request, response)
        default:
            response.writeHead(404)
            return response.end("not found")
    }
}

export default userRoutes