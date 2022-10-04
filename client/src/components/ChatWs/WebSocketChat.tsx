import { useContext, useEffect, useState } from 'react';
// import { WebsocketContext } from '../../context/WebsocketContext';

// type MessagePayload = {
//     content: string
//     msg: string
// }

const WebSocketChat = () => {

//     const socket =  useContext(WebsocketContext)
//     const [message, setMessage] = useState('')
//     const [boxMessages, setBoxMessages] = useState<MessagePayload[]>([])


//     useEffect(()=> {
//         socket.on('connect', () => { 
//             console.log('cliente conectado')
//         })

//         socket.on('disconnect', ()=> {
//             console.log('cliente desconectado')
//         })

//         socket.on('clients-updated', (data)=>{
//             console.log(data)
//         })
        
//         socket.on('onMessage', (data: MessagePayload) => {
//             // console.log('onMessage event received!')
//             setBoxMessages((prev)=> [...prev, data])
//         })

//         return () => {
//             console.log('Unregistering Events...')
//             socket.off('connect');
//             socket.off('disconnect')
//         }
//     }, [])

//     const onSubmit = () => {
//     socket.emit('newMessage', message) 
//     setMessage('')
// } 

//   return (
//  <div>
//     <div>
//         <h1>WebSocket component </h1>
//         <input placeholder='Ingresa texto' type ='text' onChange={(e)=> setMessage(e.target.value) } value = {message}></input>
//         <button onClick={onSubmit} style={{border: 'black solid 2px'}}> Boton </button>
//     </div>
//     <div> {
//         boxMessages.length === 0 ? <div>No hay mensajes no jodas</div> :
//         boxMessages.map((message, index) => <div key={index}><p>{message.content}</p></div>)
//         } 
//     </div>
//  </div>
// )
};

export default WebSocketChat