import React, { useEffect, useState } from 'react';
import io, { Socket } from "socket.io-client"

const Chat = () => {
    const [socket, setSocket]= useState<Socket>()
    const [messages, setMessages] = useState<string[]>([])
    const [value, setValue] = useState('')

    const send= (value:string) =>{
      socket?.emit('message', value)
    }

    useEffect(()=>{
      const newSocket = io('http://localhost:3001')
      setSocket(newSocket)
    },[setSocket])

  
    const messagesListener = (message:string) =>{
      setMessages([...messages, message])
    }

    useEffect(()=>{
      socket?.on('message', messagesListener)
      return ()=> {
        socket?.off('message', messagesListener)
      }
    },[messagesListener])

  return (
    <div>
      <input onChange={(e)=>setValue(e.target.value)} type="text" placeholder='Type your message...' value={value} />
      <button onClick={()=>send(value)}>Send</button>
      <div>
        {messages && messages.map((message, index)=> <div key={index}>{message}</div>)}
      </div>
    </div>
  )
}

export default Chat;