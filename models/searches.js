import axios from "axios";

export default class Searches {
    history = ['example 1', 'example 2', 'example 3'];

    constructor() {
        //read DB if exits
    }

    async city(place = '') {
        // petition http
        console.log(place);
        try {
            const response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/M%C3%A9rida%2C%20Yucat%C3%A1n%2C%20Mexico.json?language=en&access_token=pk.eyJ1IjoiZW1tYW51ZWx0YW1idXJpbmkiLCJhIjoiY2w4dGk5YnJpMDd2dzNvcTl3dmU2NGozYSJ9.r73x-TRNbpKFOYlQds4iCw&limit=5', {headers: { "accept-encoding": null}});
            console.log(response.data);
            return [];
        } catch (error) {
            return [];
        }
    }
}
