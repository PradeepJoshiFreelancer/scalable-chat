import http from "http";
import SocketService from "./services/socket";
function init() {
  const httpServer = http.createServer();
  const socketService = new SocketService()

  const PORT = process.env.PORT ? process.env.PORT : 8000;
  socketService.io.attach(httpServer)
  socketService.initListner()

  httpServer.listen(PORT, ()=>{
    console.log(`httpServer Started, Listening at port: ${PORT}`);    
  })
}

init()
