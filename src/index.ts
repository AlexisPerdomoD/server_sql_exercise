
// {
//     "compilerOptions": {
//       "esModuleInterop": true,
//       "allowSyntheticDefaultImports": true
//     }
//   }
//   "esModuleInterop": true:
//   Esta opción permite la interoperabilidad entre módulos de estilo ECMAScript (ES) y CommonJS en TypeScript. Cuando esta opción está habilitada, TypeScript permite importar módulos CommonJS de la misma manera que importarías módulos de estilo ES.

//   "allowSyntheticDefaultImports": true:
// Esta opción permite que TypeScript interprete los módulos que no exportan un valor predeterminado (default) como si lo hicieran. En otros palabras, habilita la sintaxis de import para módulos que no exportan explícitamente un valor predeterminado.

import  http, { IncomingMessage, ServerResponse } from 'http'
import userRoutes from './routes/users.route';


const httpServer = http.createServer((request:IncomingMessage, response:ServerResponse) =>{
    userRoutes(request, response)
})

const PORT = 8080
httpServer.listen(PORT, ()=> console.log("conected to port: "+ PORT))