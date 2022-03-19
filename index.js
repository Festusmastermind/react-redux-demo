//import redux  from 'redux' if this where react application we using the ES6 import to get redux ..
//but since its node js application ...we import via reqire..
const redux = require("redux");
const createStore = redux.createStore;

//define our action type ...
const BUY_CAKE = "BUY_CAKE";

//define our action creators which is a function that emits action(type && payload)
function buyCake() {
    return {
        type: BUY_CAKE,
        payload: "You are buying cake",
    };
}

//define the initialState of the application ...
const initialState = {
    numOfCakes: 10,
    info: '',
};

//First install npm init --yes  
// npm install redux ...before starting ..
//define the reducers that will effect the action ..
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                //returning a new state ...
                ...state, // make a copy of the initialState ..so as to retain the others properties inside ...
                numOfCakes: state.numOfCakes - 1,
                info: action.payload,
            };
        default:
            return state;
    }
};

//create and make use of createStore
const store = createStore(reducer);
console.log("initial state", store.getState()); //getState is provide by redux to get the currentState

// redux store provide subscribe() to listen to any action dispatched...
const unsubscribe = store.subscribe(() =>
    console.log("Updated State", store.getState())
);
// redux store provide a dispatch() that takes in an action ..to modify the state..(gives new state).
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
unsubscribe(); //trigger the actions dispatched ..

 