/**
 * Created by Hunter on 5/6/2016.
 */
"use strict";

import {expect} from 'chai';

import {List} from 'immutable';
import {Map} from 'immutable';

describe("immutability", () => {
    describe("A number", () => {
        function increment(currentState) {
            return currentState + 1;
        }
        
        it("is immutable", () => {
            let state = 42;
            let nextState = increment(state);
            
            expect(state).to.equal(42);
            expect(nextState).to.equal(43);
        });
    });
    
    describe("A list", () => {
        function addMovie(currentState, movie) {
            return currentState.push(movie);
        }
        
        it("is immutable", () => {
            let state = List.of('Trainspotting', '28 Days Later');
            let nextState = addMovie(state, "Sunshine");
            
            expect(nextState).to.equal(List.of('Trainspotting', '28 Days Later', 'Sunshine'));
            expect(state).to.equal(List.of('Trainspotting', '28 Days Later'));
        });
    });
    
    describe("A tree", () => {
        function addMovie(currentState, movie) {
            // return currentState.set(
            //     'movies',
            //     currentState.get('movies').push(movie)
            // );
            
            /*
             * Update is immuatable function for map to update sub object, helper
             */
            return currentState.update('movies', movies => movies.push(movie));
        }
        
        it("is immutable", () => {
            let state = new Map({
                movies: List.of('Trainspotting', '28 Days Later')
            });
            
            let nextState = addMovie(state, 'Sunshine');
            
            expect(nextState).to.equal(new Map({
                movies: List.of('Trainspotting', '28 Days Later', 'Sunshine')
            }));
            
            expect(state).to.equal(new Map({
                movies: List.of('Trainspotting', '28 Days Later')
            }));
        });
    });
});