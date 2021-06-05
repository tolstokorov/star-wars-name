import { INIT, InitAction } from "../actions/is-init";
import { NAME, NameAction } from "../actions/name";
import { COUNT, PeopleCountAction } from "../actions/people-count";

type StateName = string | null;
type StateCount = number | null;
const EMPTY = 'Empty';
type StateEmptyStr = typeof EMPTY;
type State = {
    name: StateName
    peopleCount: StateCount,
    emptyStr: StateEmptyStr
    isInit: boolean
};

type ActionsList = NameAction | PeopleCountAction | InitAction;
const initialState: State = {
    name: null,
    peopleCount: null,
    emptyStr: EMPTY,
    isInit: false
};
const people = (state: State = initialState, action: ActionsList ): State => {
    switch(action.type) {
        case NAME:
            return {
                ...state,
                name: action.payload
            };
        case COUNT:
            return {
                ...state,
                peopleCount: action.payload
            };
        case INIT:
            return {
                ...state,
                isInit: true
            };
        default:
            return state;
    }
};

export type {
    StateName,
    StateCount,
    StateEmptyStr,
    State,
};
export default people;