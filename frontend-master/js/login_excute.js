function excute() {
    let id = document.getElementById('ID').value;
    let pass = document.getElementById('PASS').value;
    try {
        console.log(map[id].id);
        console.log(map[id].password);
        if(map[id].password != pass) {
            alert('비밀번호가 틀렸습니다');
        } else {
            login();
        }
    } catch(e) {
        if(e.message.indexOf('id')) {
            alert('없는 아이디입니다.');
        }
    }
}

function login() {
    let id = document.getElementById('ID').value;
    let pass = document.getElementById('PASS').value;
    console.log('asddddf');
    firebase.database().ref('/fablab1/').set({
        id: map[id].id,
        password: map[id].password,
        enter: 1,
        data: {
            button: map[id].data.button,
            humidity: map[id].data.humidity,
            illumination: map[id].data.illumination,
            temperature: map[id].data.temperature,
            water: map[id].data.water
        }
    })
    console.log('1');
}