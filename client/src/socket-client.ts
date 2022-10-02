import { Manager, Socket } from "socket.io-client"

export const connectToServer = ( token: string )=> {
    const manager = new Manager('http://localhost:3001/socket.io/socket.io.js', {
        extraHeaders:{
            hola: 'mundo',
            authentication: token
        }
    })
    
    const socket = manager.socket('/');

    addListeners( socket );
}

const addListeners = ( socket: Socket ) => {

    const serverStatusLabel = document.querySelector('#server-status')!;

    socket.on('connect', ()=> {
        // serverStatusLabel.innerHTML = 'connected'
    })
    
    socket.on('disconnect', ()=> {
        // serverStatusLabel.innerHTML = 'disconnect'
    })
    socket.on('clients-updated', (clients: string[])=> {
       console.log({clients})
    })

    socket.on('message-from-server', (payload: { fullname: string, message: string})=> {
        console.log(payload)
    })
}
