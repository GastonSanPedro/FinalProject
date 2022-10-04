import { Manager, Socket } from "socket.io-client"

export const connectToServer = ( email: string )=> {
    const manager = new Manager('http://localhost:3001/socket.io/socket.io.js', {
        extraHeaders: {
            email: email
        }
    })
    const socket = manager.socket('/');
    addListeners( socket );
 }

const addListeners = ( socket: Socket ) => {
    socket.on('connect', ()=> {
        console.log("cliente conectado")
    })
}
//     socket.on('disconnect', ()=> {
//         // serverStatusLabel.innerHTML = 'disconnect'
//     })
    
//     socket.on('clients-updated', (clients: string[])=> {
//        console.log({clients})
//     })

//     socket.on('message-from-server', (payload: { fullname: string, message: string})=> {
//         console.log(payload)
//     })

