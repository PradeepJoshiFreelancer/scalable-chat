import { Server } from "socket.io";
import Radis from "ioredis";

const pub = new Radis({
  host: "redis-390285-pradeepjoshifreelancer-e416.a.aivencloud.com",
  port: 13210,
  username: "default",
  password: "AVNS_6taWLM_828yHueycs2F",
});
const sub = new Radis({
  host: "redis-390285-pradeepjoshifreelancer-e416.a.aivencloud.com",
  port: 13210,
  username: "default",
  password: "AVNS_6taWLM_828yHueycs2F",
});

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init Socket Server");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGES");
  }
  public initListner() {
    console.log("Init socket listners...");

    const io = this._io;
    io.on("connect", (socket) => {
      console.log(`New Socket Connected ${socket.id}`);
      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New message received", message);
        // publish message to radis
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });
    sub.on('message', (channel, message) => {
      if(channel === "MESSAGES"){
        console.log("Message received, now emitting", message);        
        io.emit("message", message)
      }
    })
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
