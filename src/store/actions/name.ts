import { StateName } from "../reducers/people";

const NAME = 'NAME';

type NameAction = {
    type: typeof NAME
    payload: StateName
};

const name = (name: StateName): NameAction => ({
    type: NAME,
    payload: name
});
type Name = typeof name; 

export type {
    NameAction,
    Name,
};
export {
    NAME
};
export default name;