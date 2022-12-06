import * as dotenv from 'dotenv' 
import 'colors';
import { inquireListPlaces, inquirerMenu, pause, readInput } from "./helpers/inquirer.js"
import Searches from "./models/searches.js";

dotenv.config()

const main = async () => {

    const searches = new Searches();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Show message
                const searchedPlace = await readInput('Select a place: ');

                // Search places
                const places = await searches.getCitiesByPlace(searchedPlace);

                // Select places
                const selectedIdPlace = await inquireListPlaces(places);
                if (selectedIdPlace === 0) continue;

                const selectedPlace = places.find(l => l.id === selectedIdPlace);

                //Save info
                searches.addToHistory(selectedPlace.name);

                // Weather
                const weather = await searches.getWeatherByLatAndLon(selectedPlace.lat, selectedPlace.lng);


                // Show results
                console.log('\nCity information\n'.green);
                console.log('City: ', selectedPlace.name.green);
                console.log('Lat: ', selectedPlace.lat);
                console.log('Lng: ', selectedPlace.lng);
                console.log('Temperature: ', weather.temp);
                console.log('Minimum: ', weather.min);
                console.log('Maximum: ', weather.max);
                console.log('How is the weather: ', weather.desc.green);

                break;

            case 2:
                searches.formatHistory.forEach((place, index) => {
                    console.log(`${((index+1).toString() + '.').green} ${place}`)
                })
            
                break;
        }

        console.log();

        if(opt !== 3) await pause();
        
    } while (opt !== 3);

}

main();