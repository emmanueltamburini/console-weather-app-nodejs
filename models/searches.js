import axios from "axios";

export default class Searches {
    history = ['example 1', 'example 2', 'example 3'];

    constructor() {
        //read DB if exits
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'en'
        };
    }

    get headersMapbox() {
        return {
            'accept-encoding': null
        };
    }

    async city(place = '') {
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
            params: this.paramsMapbox,
            headers: this.headersMapbox
        });

        // petition http
        console.log(place);
        try {
            const response = await instance.get();
            console.log(response.data);
            return [];
        } catch (error) {
            return [];
        }
    }
}
