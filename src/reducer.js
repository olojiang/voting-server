/**
 * Created by Hunter on 5/6/2016.
 */
/*
 * Reducer is take state AND action
 * - Generate new state
 */

import {setEntries, next, vote, INIT_STATE} from './core';

export default function reducer(state = INIT_STATE, action) {
    // Figure out function to call and call it.
    
    switch (action.type) {
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'NEXT':
            return next(state);
        case 'VOTE':
            return state.update('vote', // Key
                voteState => // Value
                    vote(voteState, action.entry)); // Handle value, and return new value
    }
    
    return state;
}