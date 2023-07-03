import { Types } from "./Types";

const searchWord = 'English';

export const reducerSetSearch = (state = searchWord, { type, payload }) => {
    switch (type) {
        case Types.SET_SEARCH: {
            state = payload;
            return state;
        }
        default: return state;
    }
}