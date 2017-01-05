/**
 * Created by Hunter on 5/6/2016.
 */

import {List} from 'immutable';
import {Map} from 'immutable';

function getWinner(voteMap) {
    if (!voteMap) {
        return [];
    }
    
    const [a, b] = voteMap.get('pair'); // Get 2 keys
    
    const aVote = voteMap.getIn(
        ['tally', a], // By Keys
        0             // Default value
    );
    
    const bVote = voteMap.getIn(
        ['tally', b], // By Keys
        0             // Default value
    );
    
    if (aVote > bVote) {
        return [a];
    } else if (bVote > aVote) {
        return [b];
    } else {
        return [a, b];
    }
}

export function setEntries(currentState, entries) {
    return currentState.set('entries', List(entries));
}

export function next(currentState) {
    const entries = currentState.get('entries');
    
    const newEntries = entries
        .concat(getWinner(currentState.get('vote')));
    
    if (newEntries.size === 1) {
        // Change existing because, we can prove that the current state field
        return currentState
            .remove('vote')
            .remove('entries')
            .set('winner', newEntries.first());
    }
    
    return currentState.merge({
        entries: newEntries.skip(2),
        vote: Map({
            pair: newEntries.take(2)
        })
    });
}

export function vote(currentState, entry) {
    return currentState.updateIn(
        ['tally', entry],   // Find entry by key
        0,                          // Default, value
        tally => tally + 1          // Change, value
    );
}

export const INIT_STATE = Map();