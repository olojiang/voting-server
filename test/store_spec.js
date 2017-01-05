/**
 * Created by Hunter on 5/11/2016.
 */
import {expect} from 'chai';
import {Map} from 'immutable';
import {fromJS} from 'immutable';

import makeStore from '../src/store';

describe("store", () => {
    it("is store configured with correct reducer", () => {
        const store = makeStore();
        
        // Check initial state
        expect(store.getState()).to.equal(Map());
        
        // Dispatch action
        store.dispatch({
            type: "SET_ENTRIES",
            entries: ['Trainspotting', '28 Days Later']
        });
        
        // Match the reduce result of state change
        expect(store.getState()).to.equal(fromJS({
            entries: ['Trainspotting', '28 Days Later']
        }));
    });
});