import { ThunkAction } from "redux-thunk";
import starWarsAPI from "../../api/star-wars";
import { OnePeople } from "../../api/star-wars/people";
import name, { NameAction } from "../actions/name";
import { State } from "../reducers/people";

const getOnePeopleName = (id: number): ThunkAction<Promise<OnePeople | null>, State, unknown, NameAction> =>
    async (dispatch) => {
        const res = await starWarsAPI.people.getData(id);

        if(!res) dispatch(name('Error'));
        else dispatch(name(res.name));

        return res;
    };
type GetOnePeopleNameThunk = typeof getOnePeopleName;
type GetOnePeopleName = (id: number) => ReturnType<ReturnType<GetOnePeopleNameThunk>>;

export type {
    GetOnePeopleNameThunk,
    GetOnePeopleName,
};
export default getOnePeopleName;