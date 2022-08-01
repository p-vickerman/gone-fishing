const prompt = require('prompt-sync')({sigint:true});


console.log('Howdy Yall, Lets get us some fish!');


let fishAdj = ['Large', 'Small', 'Great', 'Elusive', 'Peppered', 'Salty', 'Common', 'Spotted', 'Teeny', 'Striped', 'Majestic', 'Ghostly','Stinky', 'Elusive'];

let fishColor = ['Golden', 'Blue', 'Yellow', 'Brown', 'White', 'Purple', 'Red', 'Black', 'Tan', 'Orange', 'Green', 'Pink', 'Gray', 'Copper', 'Silver'];
let fishSpecies = ['Doubloon', 'Trout', 'Tuna', 'Salmon', 'Bass', 'Carp', 'Cod', 'Flounder', 'Snapper', 'Grouper', 'Haddock', 'Halibut', 'Herring', 'Mackerel', 'Tilapia', 'Walleye'];
let timeOfDay = 360;
let totalFish = 0;
let totalWeight = 0;
let totalValue = 0;
let fish = {
    name: '', 
    weight: 0,
    value: 0
};
let userDecision = ``;
let autoRelease = false;
let arrayOfFish = [];
let useTool = false;
let dollarPerPound = 0;
let toolToAutoReleaseFish = false;
let hours = 0;
let minutes = 0;
let minutesString = ``;
let time = 0;
function startOfGame(){
    console.log(``);
    console.log(`==========================================`);
    console.log(``);
    console.log(`You've gone fishing! Try to maximize the value of your caught fish.`);
    console.log(`You can fish for six hours (till 12:00pm) and can catch at most 10 lbs of fish.`);
    console.log(``);
    console.log(`In these waters lurks the elusive Golden Doubloon. This is the most prized fish.`);
    console.log(`If you catch the Golden Doubloon you will recieve high honors & a high reward!`)
    console.log(``);
    console.log(`There is a 1 in 10 chance that you will catch the prized Golden Doubloon!`);
    console.log(`Good luck!`);
    console.log(``);
    console.log(`==========================================`);
    tuneValuePerPound();
    setTool();
    return checkWeight();
}
function tuneValuePerPound(){
    console.log(``);
    console.log(`Today is your lucky day! We have an automatic fish release tool that you can use.`);
    console.log(`The tool will automatically release low value fish.`);
    console.log(``);
    console.log('Would you like to use it? Enter [y] or [n]')
    let answer = prompt(`> `).toLowerCase();
    if (answer === `y`){
        return useTool = true;
    } else if (answer === 'n'){
        return useTool = false;
    } else {
        console.log(`Invalid entry. Please try again`)
        return tuneValuePerPound();
    }
}
function setTool(){
    if (useTool === true){
        console.log(``)
        console.log(`The average market value for the average fish is $5.00/lb`);
        console.log(`The maximum value you can set on the tool is $10.00/lb`);
        console.log(``)
        console.log(`With this tool you can set a minimum dollar per pound criteria for automatically releasing fish.`);
        console.log(`If the minimum value per pound criteria is not met we will automatically release the low value fish.`)
        console.log(``)
        console.log(`What is the minimum dollar value per pound would you like to set the tool for?`)
        let answer = Number(prompt(`> `))
        if (Number(answer) >= 0.01 && Number(answer) <= 10){
            console.log(``);
            console.log(`Awesome! Minimum dollar per pound criteria is set to $${answer.toFixed(2)}`);
            return dollarPerPound = answer;
        } else{
            console.log(`Invalid Entry. Please try again`);
            setTool();
        }
    } else {
        return;
    }
    
}
function checkFishValuePerPound(){
    if (useTool === true){
        let currentDollarPerWeight = fish.value/fish.weight
        if (currentDollarPerWeight > dollarPerPound){
            console.log(`This fish has great value per pound. You should keep it.`);
            console.log(``);
            return toolToAutoReleaseFish = false;
        } else {
            console.log(`This fish does not meet our value per pound criteria. We automatically released it.`)
            console.log(``);
            return toolToAutoReleaseFish = true;
        }
    } else {
        return;
    }
}
function getTimeOfDay(){
    let time = timeOfDay/60;
    hours = Math.floor(time);
    minutes = Math.ceil((time%1)*60);
    minutesString = ``;
    if (minutes >= 10){
        minutesString = minutes;
    } else {
        minutesString = `0${minutes}`;
    }
    return;
}
function displayCatchOfTheDay(){
    console.log(`You caught ${totalFish} fish:`)
        for (let i = 0; i < arrayOfFish.length; i++){
            console.log(`* ${arrayOfFish[i].name}, ${arrayOfFish[i].weight.toFixed(2)} lbs, $${arrayOfFish[i].value.toFixed(2)}`);
        }
    console.log(``);
    console.log(`Total weight: ${totalWeight.toFixed(2)} lbs`);
    console.log(`Total value: $${totalValue.toFixed(2)}`);
    console.log(``);
    return;
}
function checkTime(){
    getTimeOfDay();
    if (timeOfDay >= 720){
        console.log(`The time is ${hours}:${minutesString}pm. Times up!`);
        console.log(``);
        displayCatchOfTheDay();
        return;
    } else{
        return topOfTheHour();
    }
}
function checkWeight(){
    if (totalWeight >= 10){
        console.log(`Congratulations! You have reached your maximum fish weight allowance.`)
        console.log(`Time to return to shore`)
        displayCatchOfTheDay();
        return;
    } else {
        return checkTime();
    }
}
function topOfTheHour(){
    console.log(``);
    console.log(`The time is ${hours}:${minutesString}am. So far you've caught:`)
    console.log(``);
    console.log(`${totalFish} fish, ${totalWeight.toFixed(2)} lbs, $${totalValue.toFixed(2)}`);
    console.log(``);
    randomFish()
    catchFish();
    checkFishValuePerPound();
    checkTotalFishWeight();
    userAction();
    addTime();
    console.log(``);
    console.log(`==========================================`);
    return checkWeight();
}
function fishName(){
    let fishName1 = fishAdj[Math.floor(Math.random()*fishAdj.length)];
    let fishName2 = fishColor[Math.floor(Math.random()*fishColor.length)];
    let fishName3 = fishSpecies[Math.floor(Math.random()*fishSpecies.length)];
    let currentFishName = `${fishName1} ${fishName2} ${fishName3}`;
    return currentFishName;
}
function fishWeight(){
    let currentFishWeight = Math.random()*5;
    if (currentFishWeight < 1.24){
        currentFishWeight += 1.24
    }
    return Number(currentFishWeight.toFixed(2));
}
function fishValue(){
    let currentFishValue = Math.random()*100;
    return Number(currentFishValue.toFixed(2));
}
function randomFish(){
    let rand = Math.floor(Math.random()*10);
    if (rand === 7){
        console.log(`Congratulations!`)
        console.log(`You are bestowed with High Honors!`);
        console.log(`Your reward will be great!`);
        console.log(`You will be a Millionaire!`);
        console.log(``);
        if (arrayOfFish.length > 0){
            console.log(`You crew has released all previously caugh fish to make way for your precious prize.`);
            console.log(``);
            arrayOfFish = [];
            totalWeight = 0;
            totalFish = 0;
            totalValue = 0;
        }
        fish = {
            name: `Golden Doubloon`,
            weight: 10,
            value: 1000000
        }
    } else {
        fish = {
            name: fishName(),
            weight: fishWeight(),
            value: fishValue()
        }
    }
    return fish;
}
function catchFish(){
    console.log(`You caught a '${fish.name}' weighing ${fish.weight.toFixed(2)} lbs and valued at $${fish.value.toFixed(2)}`);
    return;
}
function checkTotalFishWeight(){
    let potenttialTotalFishWeight = Number(totalWeight) + Number(fish.weight);
    if (potenttialTotalFishWeight > 10){
        return autoRelease = true;
    } else {
        return autoRelease = false;
    }
}
function userAction(){
    if (toolToAutoReleaseFish === true){
        console.log('Fish released.');
        return prompt(`Press [enter] to continue.`);
    } else 
    if (autoRelease === true){
        console.log(`This fish would put you over 10 lbs, so you release it.`);
        return prompt(`Press [enter] to continue.`);
    } else {
        console.log(`Your action: [c]atch or [r]elease?`);
        userDecision = prompt(`> `).toLocaleLowerCase();
        if (userDecision === 'c'){
            totalFish += 1;
            totalWeight += Number(fish.weight);
            totalValue += Number(fish.value);
            arrayOfFish.push(fish);
            console.log(``);
            return console.log(`You chose to keep the fish.`);
        } else if (userDecision === 'r'){
            return console.log(`You chose to release the fish.`);
        } else {
            console.log(`Invalid entry. Try again.`)
            return userAction();
        }   
    }  
}
function getAddTime(){
    time = Math.floor(Math.random()*60);
    time += 15;
    return time;
}
function addTime(){
    getAddTime();
    timeOfDay += time;
    return timeOfDay;
}
startOfGame();