import axios from "axios";

export default class Searches {
    history = ['example 1', 'example 2', 'example 3'];

    constructor() {
        //read DB if exits
    }

    get paramsMapbox() {
        return {
            'access_token': 'pk.eyJ1IjoiZW1tYW51ZWx0YW1idXJpbmkiLCJhIjoiY2w4dGk5YnJpMDd2dzNvcTl3dmU2NGozYSJ9.r73x-TRNbpKFOYlQds4iCw',
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
