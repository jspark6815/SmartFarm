function excute() {
    let humidity = parseInt(map.data.humidity / 10.1);
    let temperature = parseInt(map.data.temperature);
    let illumination = parseInt(map.data.illumination);
    console.log('origin temperature: '+map.data.temperature);
    console.log('temperature: '+temperature);
    document.getElementById('humidity').innerHTML = humidity;
    document.getElementById('temperature').innerHTML = temperature;
    document.getElementById('illumination').innerHTML = illumination;
    //temperature setting
    if(temperature > 30) {
        document.getElementById('temperature_stat').innerText = "더워요ㅠ";
    }
    else if(temperature < 20) {
        document.getElementById('temperature_stat').innerText = "추워요ㅠ";
    }
    else {
        document.getElementById('temperature_stat').innerText = "좋아요!";
    }

    //humidity setting
    if(humidity > 85) {
        document.getElementById('humidity_stat').innerHTML = "습해요ㅠ";
    }
    else if(humidity < 30) {
        document.getElementById('humidity_stat').innerHTML = "건조해요ㅠ";
    }
    else {
        document.getElementById('humidity_stat').innerHTML = "좋아요!";
    }

    //illumination setting
    console.log('origin illumination: '+map.data.illumination);
    console.log('illumination: '+illumination);
    if(illumination > 800) {
        document.getElementById('illumination_stat').innerHTML = "강해요ㅠ";
    }
    else if(illumination < 100) {
        document.getElementById('illumination_stat').innerHTML = "약해요ㅠ";
    }
    else {
        document.getElementById('illumination_stat').innerHTML = "좋아요!";
    }
}
function dd() {
    write();
    console.log("button : " + map.data.button);
}
function write() {
    firebase.database().ref('/'+location.hash.slice(1)+'/data/').update({
        button: 1
    })
}