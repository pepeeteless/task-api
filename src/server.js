//const http = require('http') //CommonJS => Require // Velho!
import http from "node:http" //ESmodule // mais atual!
import { json } from "./middlewares/json.js"
import { routes } from "./routes.js"

const PORT = 4000

//Query Params : URL Stateful  => Filtros, Paginação, não são Obrigatórios! http://localhost:3333/users?name=pepe&idade=10
//Route Params : Identificação de recurso =>  GET/POST/DELETE/PUT... http://localhost3333:/users/986598f-de987f6-fe897e-ewfuyg
//Request Body : Envio de informações de um fomulário (HTTPs) => Não fica na URL, geralmente em JSON  

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(PORT)


