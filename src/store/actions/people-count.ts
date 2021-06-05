import { StateCount } from "../reducers/people";

const COUNT = 'COUNT';

type PeopleCountAction = {
    type: typeof COUNT,
    payload: StateCount
};

const peopleCount = (count: StateCount): PeopleCountAction => ({
    type: COUNT,
    payload: count
});
// type PeopleCountActionCreator = (count: StateCount) => void;

export type {
    PeopleCountAction,
};
export {
    COUNT
};
export default peopleCount;