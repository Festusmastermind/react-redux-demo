//import redux  from 'redux' if this where react application we using the ES6 import to get redux ..
//but since its node js application ...we import via reqire..
const redux = require("redux");
const createStore = redux.createStore;  //redux provides the createStore function that accepts the rootReducer to mgt app State..
const combineReducers = redux.combineReducers;  //redux provides combineReducers function that accepts multipe reducers and combine into one.

//define our action type ...
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

//define our action creators which is a function that emits action(type && payload)
function buyCake() {
    return {
        type: BUY_CAKE,
        payload: "You are buying cake",
    };
}

function buyIceCream(){
    return {
        type: BUY_ICECREAM,
        payload: "You are buying IcreCream"
    }
}
//having multiple reducers mgt..
//define the initialState of the application ...
const initialCakeState = {
    numOfCakes: 10,
};
const initialCreamState = { 
    numOfIceCreams: 20, 
}
//define the reducers that will effect the action .. cakeReducer
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                //returning a new state ...
                ...state, // make a copy of the initialState ..so as to retain the others properties inside ...
                numOfCakes: state.numOfCakes - 1,
            };
        default:
            return state;
    }
};
//define ..iceCreamReducer 
const iceCreamReducer = (state = initialCreamState, action) => {
    switch(action.type){
        case BUY_ICECREAM:
            return {
                ...state, 
                numOfIceCreams: state.numOfIceCreams - 1,
            }
        default: return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
});

//create and make use of createStore
const store = createStore(rootReducer);
console.log("initial state", store.getState()); //getState is provide by redux to get the currentState

// redux store provide subscribe() to listen to any action dispatched...
const unsubscribe = store.subscribe(() =>
    console.log("Updated State", store.getState())
);
// redux store provide a dispatch() that takes in an action ..to modify the state..(gives new state).
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe(); //trigger the actions dispatched ..

 