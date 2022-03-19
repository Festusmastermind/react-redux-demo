//import the libaries needed...
const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default  //this defines or tells the system about your async actions creators
const axios = require('axios')

const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware



//define the initialState...
const initialState = {
    loading: false,
    users: [],
    error: "",
};

//define the action types ..
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

//define the actionCreators
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST,
    };
};

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users,
    };
};

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error,
    };
};

//define the reducers
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false, 
                users: action.payload,
                error: ''
            };
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                users:[],
                error: action.payload,
            };
        default: 
            return state
    }
};

//define actionCreators 
//thunk middleware allows to write action creators as function that returns function objects...
//this function can be used for async actions (i.e. not pure) and have side effects ....(useEffect effects)
const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUsersRequest()) //invoke this action first ....
        axios.get('https://jsonplaceholder.typicode.com/users') 
        .then(response => {
            //the response.data is the users array of object coming back ...
            const users = response.data.map(user=>user.id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error => {
            //error.message is the error description...
            dispatch(fetchUsersFailure(error.message));
        })
    }
}

//create a store ...
const store = createStore(reducer, applyMiddleware(thunkMiddleware))

//subscribe to store 
store.subscribe(()=> {console.log(store.getState())})
store.dispatch(fetchUsers())


