/**
 * Created by Hunter on 5/6/2016.
 */
import {expect} from 'chai';
import {Map} from 'immutable';
import {List} from 'immutable';
import {fromJS} from 'immutable';

import reducer from '../src/reducer';

describe("reducer", () => {
    it("has an initial state", () => {
        const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
        
        const nextState = reducer(undefined, action);
        
        expect(nextState).to.equal(fromJS({
            entries: ['Trainspotting']
        }));
    });
    
    it("handles SET_ENTRIES", () => {
        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
        
        const nextState = reducer(initialState, action);
        
        expect(nextState).to.equal(fromJS({
            entries: ['Trainspotting']
        }));
    });
    
    it("handles NEXT", () => {
        const initialState = Map({
            entries: List.of('Trainspotting', '28 Days Later')
        });
        const action = {type: 'NEXT'};
        
        const nextState = reducer(initialState, action);
        
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        }));
    });
    
    it("handles VOTE", () => {
        const initialState = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {
                    'Trainspotting': 3,
                    '28 Days Later': 2
                }
            },
            entries: []
        });
        
        const action = {type: 'VOTE', entry: 'Trainspotting'};
        const nextState = reducer(initialState, action);
        
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {
                    'Trainspotting': 4,
                    '28 Days Later': 2
                }
            },
            entries: []
        }));
    });
    
    it("it can be reduced", () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Trainspotting'},
            {type: 'VOTE', entry: '28 Days Later'},
            {type: 'VOTE', entry: 'Trainspotting'},
            {type: 'NEXT'}
        ];
        
        const finalState = actions.reduce(reducer, Map());
        expect(finalState).to.equal(fromJS(
            {
                winner: "Trainspotting"
            }
        ));
    });
});