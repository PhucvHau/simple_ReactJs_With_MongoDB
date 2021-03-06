// action types
const API_CALL_REQUEST = "API_CALL_REQUEST";
const GET_USER = "GET_USER";
const API_CALL_REQUEST_USER = "API_CALL_REQUEST_USER";
const API_CALL_SUCCESS = "API_CALL_SUCCESS";
const API_CALL_FAILURE = "API_CALL_FAILURE";

// reducer with initial state
const initialState = {
  fetching: false,
  data: [],
  user:[],
  error: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };
    case GET_USER:
        return { ...state, fetching: true, error: null };
    case API_CALL_SUCCESS:
      return { ...state, fetching: false, data: action.data };
    case API_CALL_REQUEST_USER:
      return { ...state, fetching: false, user: action.data };
    case API_CALL_FAILURE:
      return { ...state, fetching: false, data: null, error: action.error };
    default:
      return state;
  }
}