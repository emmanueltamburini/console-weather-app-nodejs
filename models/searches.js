import axios from "axios";

export default class Searches {
    history = ['example 1', 'example 2', 'example 3'];

    constructor() {
        //read DB if exits
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPEN_WEATHER_KEY,
            'units': 'metric',
            'language': 'en'
        };
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'en'
        };
    }

    get headers() {
        return {
            'accept-encoding': null
        };
    }

    async getCitiesByPlace(place = '') {
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
            params: this.paramsMapbox,
            headers: this.headers
        });

        try {
            const response = await instance.get();
            return response.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }));
        } catch (error) {
            return [];
        }
    }

    async getWeatherByLatAndLon(lat = '', lon = '') {
        const instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: this.paramsOpenWeather,
            headers: this.headers
        });

        try {
            const response = await instance.get('/', {params: {lat, lon}});
            return {
                desc: response.data.weather[0].description,
                min: response.data.main.temp_min,
                max: response.data.main.temp_max,
                temp: response.data.main.temp,
            }
        } catch (error) {
            return [];
        }
    }
}
