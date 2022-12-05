import inquirer from 'inquirer';
import 'colors';

const inquirerMenu = async () => {
    const menuOpt = [
        {
            type: 'list',
            name: 'option',
            message: 'Select an option',
            choices: [
                {
                    value: 1,
                    name: `${'1.'.green} Search place`
                },
                {
                    value: 2,
                    name: `${'2.'.green} History`
                },
                {
                    value: 3,
                    name: `${'3.'.green} Exit \n`
                }
            ]
        }
    ];
    
    console.clear();
    console.log('=================================='.green);
    console.log('         Show an option'.white);
    console.log('=================================='.green);

    const {option} = await inquirer.prompt(menuOpt);

    return option;
}

const pause = async () => {
    const pauseOpt = [
        {
            type: 'input',
            name: 'pause',
            message: `Press ${'ENTER'.green}: to continue:`
        }
    ];

    return await inquirer.prompt(pauseOpt);
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please type a value'
                }

                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question); 
    return desc;
}

const inquireListPlaces = async (places = []) => {
    console.clear();
    const choices = places.map((place, index) => 
        ({
            value: place.id,
            name: `${((index+1).toString() + '.').green} ${place.name}`
        }));

        choices.unshift({
            value: 0,
            name: `${'0.'.green} Cancel`           
        });

        const questions = [
            {
                type: 'list',
                name: 'id',
                message: 'Please, select a place',
                choices
            }
        ];

        const {id} = await inquirer.prompt(questions); 
        return id;
}

const inquireConfirmMenu = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question); 
    return ok;
}

const inquireCheckListMenu = async (tasks = []) => {
    console.clear();
    const choices = tasks.map((task, index) => 
        ({
            value: task.id,
            name: `${((index+1).toString() + '.').green} ${task.desc}`,
            checked: !!task.completedIn
        }));

        const questions = [
            {
                type: 'checkbox',
                name: 'ids',
                message: 'What do you want to mark as completed?',
                choices
            }
        ];

        const {ids} = await inquirer.prompt(questions); 
        return ids;
}

export {
    inquirerMenu,
    pause,
    readInput,
    inquireListPlaces,
    inquireConfirmMenu,
    inquireCheckListMenu
}