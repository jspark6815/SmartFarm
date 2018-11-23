function excute() {
    document.getElementById('humidity').innerHTML = map.humidity;
    document.getElementById('temperature').innerHTML = map.temperature;
    document.getElementById('illumination').innerHTML = map.illumination;
    
    //temperature setting
    if(map.temperature > 25) {
        document.getElementById('temperature_stat').innerHTML = "너무 높음";
    }
    else if(map.temperature <= 25 & map.temperature >= 20) {
        document.getElementById('temperature_stat').innerHTML = "적정";
    }
    else if(map.temperature < 20) {
        document.getElementById('temperature_stat').innerHTML = "너무 낮음";
    }

    //humidity setting
    if(map.humidity > 70) {
        document.getElementById('humidity_stat').innerHTML = "너무 높음";
    }
    else if(map.humidity <= 70 & map.humidity >= 40) {
        document.getElementById('humidity_stat').innerHTML = "적정";
    }
    else if(map.humidity < 40) {
        document.getElementById('humidity_stat').innerHTML = "너무 낮음";
    }

    //illumination setting
    if(map.illumination > 70) {
        document.getElementById('illumination_stat').innerHTML = "너무 높음";
    }
    else if(map.illumination <= 70 & map.illumination >= 50) {
        document.getElementById('illumination_stat').innerHTML = "적정";
    }
    else if(map.illumination < 50) {
        document.getElementById('illumination_stat').innerHTML = "너무 낮음";
    }
}
function dd() {
    write();
    console.log("button : " + map.button);
}
function write() {
    firebase.database().ref('/data/').set({
        button: 1,
        humidity: map.humidity,
        illumination: map.illumination,
        temperature: map.temperature,
        water: map.water
    })
}