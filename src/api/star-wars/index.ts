import axios, { AxiosResponse } from "axios";
import { OnePeople, People } from "./people";

enum Resource {
    people = 'people'
};

class StarWarsAPI  {
    _resAPI: AxiosResponse | null;
    _isInit: boolean
    constructor() {
        this._resAPI = null;
        this._isInit = false;
    }
    public init = async () => {
        this._resAPI = await axios.get(this._baseResourceURL)
            .catch(() => {
                console.error('Сервер с внешним API не доступен!');
                return null;
            });
        return this._isInit = true;
    };

    private readonly _baseResourceURL = 'https://swapi.dev/api/';
      
    private async _getResource(resource: Resource, id: string = '', queryParams: string = '') {
        if(!this._resAPI) return null;
        const res = await axios.get(`${this._baseResourceURL}${resource}/${id}${queryParams}`)
            .catch(() => {
                console.error('Ошибка в запросе!');
                return null;
            });

        return res;
    }

    private async _getResourceData(resource: Resource, id: string = '', queryParams: string = '') {
        const res: {
            data: any
        } | null = await this._getResource(resource, id, queryParams);

        if(!res) return null

        return res.data;
    }

    public people = {
        getAllData : async () =>  {
            const data = await this._getResourceData(Resource.people) as People | null;

            return data;
        },

        getData : async(id: number) => {
            const data = await this._getResourceData(Resource.people, `${id}/`) as OnePeople | null;
            
            return data;
        }
    };
};

const starWarsAPI = new StarWarsAPI();
export default starWarsAPI;