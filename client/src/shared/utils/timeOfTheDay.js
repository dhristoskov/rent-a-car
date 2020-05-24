const timeOfDay = () => {

    const date = new Date();
    const hours = date.getHours();
    let time;
    if(hours > 5 && hours < 12){
        time = "Good Morning";
    }else if(hours >= 12 && hours <= 17){
        time = "Hello";
    } else{
        time = "Good Evening";
    }

    return time
}

export default timeOfDay;