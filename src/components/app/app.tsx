import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import starWarsAPI from "../../api/star-wars";
import { RootState } from "../../store";
import init, { Init } from "../../store/actions/is-init";
import name, { Name } from "../../store/actions/name";
import { StateCount, StateEmptyStr, StateName } from "../../store/reducers/people";
import getOnePeopleName, { GetOnePeopleName, GetOnePeopleNameThunk } from "../../store/thunk/get-one-people-name";
import getPeopleCount, { GetPeopleCount, GetPeopleCountThunk } from "../../store/thunk/get-people-count";



type InputValue = number | '';
type OwnAppProps = {
    startInputValue: InputValue
};

type AppState = {
    personName: StateName
    peopleCount: StateCount
    emptyStr: StateEmptyStr
    isInit: boolean
};

type AppActions = {
    name: Name
    init: Init
};

type AppThunk = {
    getOnePeopleName: GetOnePeopleNameThunk
    getPeopleCount: GetPeopleCountThunk
};

type AppBoundInDispatchThunk = {
    getOnePeopleName: GetOnePeopleName
    getPeopleCount: GetPeopleCount
}; 

type AppProps = OwnAppProps & AppState & AppActions & AppBoundInDispatchThunk;



const App = ({
    startInputValue,

    personName,
    peopleCount,
    emptyStr,
    isInit,

    name,
    init,
    getOnePeopleName,
    getPeopleCount,
 }: AppProps): JSX.Element => {

    const [inputValue, setInputValue] = useState<InputValue>(startInputValue);
    const [isNameLoading, setIsNameLoading] = useState(true);
    const [isPeopleCountLoading, setIsPeopleCountLoading] = useState(true);
    const [wrong, setWrong] = useState<string | null>(null);

    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const str = e.currentTarget.value;
        
        setWrong(null);

        if(str === '') {
            setInputValue(str);
            name(emptyStr);
            return;
        }

        if(+str !== 17 && +str > 0 && peopleCount && +str <= peopleCount)
            setInputValue(+str);
        else setWrong(str);
    };

    
    useEffect(() => {
        !isInit && starWarsAPI.init()
            .then(() => {
                init()
            });

        isInit && getPeopleCount()
            .then(() => {
                setIsPeopleCountLoading(false);
            });
    }, [isInit]);

    useEffect(() => {
        if(isInit) {
            if(inputValue === '') name(emptyStr);
            else getOnePeopleName(inputValue)
                            .then(() => {
                                setIsNameLoading(false);
                            });
        };
    }, [isInit, inputValue]);

    return (
        <div>
            { isPeopleCountLoading && 'loading...' }
            { 
                !isPeopleCountLoading && 
                <>
                    <small>Работа с внешним API</small>
                    <h1><mark>{ isNameLoading ? 'loading...' : (personName || '\u00A0') }</mark></h1>
                    <label>
                        Хотите получить имя персонажа?<br />
                        Введите его ID<br />
                        <br />
                        <small>Поддерживаемые ID: от 1 до { peopleCount } </small><br />
                        <small>(и не включая 17) </small><br />
                        <br />
                        <input type="text"
                        min={ peopleCount ? 1 : 0 }
                        max={ peopleCount || 1 }
                        value={ inputValue || '' }
                        onChange={ onInput }/>
                    </label><br />
                    <small>{ wrong && `${wrong} - wrong!` }</small>
                </>
            }
        </div>
    );
};

const mapStateToProps = (state: RootState): AppState => {
    return {
        personName: state.people.name,
        peopleCount: state.people.peopleCount,
        emptyStr: state.people.emptyStr,
        isInit: state.people.isInit,
    };
};

const actions: AppActions & AppThunk = {
    name,
    init,
    getOnePeopleName,
    getPeopleCount,
};

export default connect(mapStateToProps, actions)(App);