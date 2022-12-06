import fs from "fs";
import axios from "axios";

export default class Searches {
    history = [];
    dbPath = './db/database.json'

    constructor() {
        this.readData();
    }

    get formatHistory() {
        return this.history.map(place => {
            const elements = place.split(" ");

            for (let i = 0; i < elements.length; i++) {
                elements[i] = elements[i][0].toUpperCase() + elements[i].substr(1);
            }

            return elements.join(" ");
        });
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

    addToHistory(place = '') {
        if(!this.history.includes(place.toLowerCase())) {
            this.history.unshift(place.toLowerCase());
        }

        this.history = this.history.splice(0, 5);
        this.saveData();
    }

    saveData() {
        const payload = {
            history: this.history
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readData() {
        if (fs.existsSync(this.dbPath)){
            const payload = JSON.parse(fs.readFileSync(this.dbPath, {encoding: 'utf-8'})); 
            this.history = payload.history;
        }
    }
}
