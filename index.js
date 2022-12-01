import { inquirerMenu, pause, readInput } from "./helpers/inquirer.js"
import Searches from "./models/searches.js";
import 'colors';


const main = async () => {

    const searches = new Searches();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Show message
                const place = await readInput('Select a place: ');
                console.log(place);

                // Search places

                // Select places

                // Weather

                // Show results

                console.log('\nCity information\n'.green);
                console.log('City: ', );
                console.log('Lat: ', );
                console.log('Lng: ', );
                console.log('Temperature: ', );
                console.log('Minimum: ', );
                console.log('Maximum: ', );

                break;

            case 2:
            
                break;
        }

        console.log();

        if(opt !== 3) await pause();
        
    } while (opt !== 3);

}

main();