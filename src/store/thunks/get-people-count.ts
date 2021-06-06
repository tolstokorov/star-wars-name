import { ThunkAction } from "redux-thunk";
import { State } from "../reducers/people";
import peopleCount, { PeopleCountAction } from "../actions/people-count";
import starWarsAPI from "../../api/star-wars";
import { People } from "../../api/star-wars/people";

const getPeopleCount = (): ThunkAction<Promise<People | null>, State, unknown, PeopleCountAction> =>
    async (dispatch) => {
        const res = await starWarsAPI.people.getAllData();

        if(res) dispatch(peopleCount(res.count));

        return res;
    };

type GetPeopleCountThunk = typeof getPeopleCount;
type GetPeopleCount = () => ReturnType<ReturnType<GetPeopleCountThunk>>;

export type {
    GetPeopleCountThunk,
    GetPeopleCount,
};
export default getPeopleCount;