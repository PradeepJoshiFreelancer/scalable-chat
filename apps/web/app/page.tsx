"use client";
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";
export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  return (
    <div>
      <div>
        <input
          className={classes["chat-input"]}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Message..."
        />
        <button
          className={classes["button"]}
          onClick={(e) => {
            sendMessage(message);
          }}
        >
          Send
        </button>
      </div>
      <div>
        <ul>
          {messages.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
