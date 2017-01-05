/**
 * Created by Hunter on 5/11/2016.
 */
import Server from 'socket.io';

export default function startServer(port = 8090, store) {
    const io = new Server().attach(port);
    
    console.info("Socket.io Server is listening on: ", port);
    
    // Broadcast the store state change event
    store.subscribe(() => {
        io.emit('state', store.getState().toJS());
    });
    
    // Initial broadcast the state
    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
        
        // React for action change
        socket.on('action', store.dispatch.bind(store));
    });
};