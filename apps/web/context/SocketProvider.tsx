"use client"; // This is a client component

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  sendMessage: (message: string) => any;
  messages: string[]
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) {
    throw new Error("state is undefined");
  }
  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const[messages, setMessages] = useState<string[]>([])

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (message) => {
      console.log(message);
      if (socket) {
        socket.emit("event:message", { message: message });
      }
    },
    [socket]
  );
  const onMessageReceived = useCallback((msg: string) => {
    console.log("Message reveived from server", msg);
    const {message} = JSON.parse(msg) as {message: string}
    setMessages((prevMessages) => [...prevMessages, message])
  }, []);
  useEffect(() => {
    const _socket = io("http://localhost:8000");
    _socket.on('message', onMessageReceived)
    setSocket(_socket);
    return () => {
      _socket.disconnect();
      _socket.off('message', onMessageReceived)
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </SocketContext.Provider>
  );
};
