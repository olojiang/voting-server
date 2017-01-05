/**
 * Created by Hunter on 5/11/2016.
 */
import makeStore from './src/store'
import startServer from './src/server';

export const store = makeStore();

// Startup the socket.io server to operate with store
startServer(8090, store);

// Initialize the store
store.dispatch({
    type: "SET_ENTRIES",
    entries: require('./entries.json')
});

store.dispatch({
    type: "NEXT"
});
