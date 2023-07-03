const { combineReducers } = require("redux");
const { reducerSetSearch } = require("./reducer");

const reducers = combineReducers({
    searchedWord: reducerSetSearch,
})
export default reducers;