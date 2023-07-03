import { Types } from "./Types"
export const setSearch = (payload) => {
    return {
        type: Types.SET_SEARCH,
        payload: payload,
    }
}