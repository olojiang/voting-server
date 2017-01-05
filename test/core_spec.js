/**
 * Created by Hunter on 5/6/2016.
 */
import {List} from 'immutable';
import {Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe("application logic", () => {
    describe("setEntries", () => {
        it("add entries into state", () => {
            const state = Map();
            const entries = List.of('Trainspotting', '28 Days Later');
            
            const nextState = setEntries(state, entries);
            
            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Later')
            }));
        });
    });
    
    describe("next", () => {
        it("take next 2 entries under vote", () => {
            const state = Map({
                entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
            });
            
            const nextState = next(state);
            
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List.of('Sunshine')
            }));
        });
        
        it("put the winner of current pair back to entries", () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 5
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            });
            
            const nextState = next(state);
            
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', '28 Days Later')
            }));
        });
        
        it("put both tied pair back to entries", () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 3
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            });
            
            const nextState = next(state);
            
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
            }));
        });
        
        it("mark winner, if there is only entries left", () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 4
                    })
                }),
                entries: List.of()
            });
            
            const nextState = next(state);
            
            expect(nextState).to.equal(Map({
                winner: '28 Days Later'
            }));
        });
    });
    
    describe("vote", () => {
        it("create a tally for the voted entry", () => {
            const state = Map({
                pair: List.of('Trainspotting', '28 Days Later')
            });
            
            const nextState = vote(state, 'Trainspotting');
            
            expect(nextState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 1
                })
            }));
        });
        
        it("update a tally for the voted entry", () => {
            const state = Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 3,
                    '28 Days Later': 4
                })
            });
            
            const nextState = vote(state, '28 Days Later');
            
            expect(nextState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 3,
                    '28 Days Later': 5
                })
            }));
        });
    });
});