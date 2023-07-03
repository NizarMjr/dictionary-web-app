const { createStore } = require("redux");
const { default: reducers } = require(".");

const store = createStore(reducers, {});
export default store;