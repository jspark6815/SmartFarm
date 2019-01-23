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
    firebase.database().ref('/'+id+'/').set({
        id: map[id].id,
        password: map[id].password,
        enter: map[id].enter+1,
        data: {
            button: map[id].data.button,
            humidity: map[id].data.humidity,
            illumination: map[id].data.illumination,
            temperature: map[id].data.temperature,
            water: map[id].data.water
        }
    })
    if(map[id].enter > 1) {
        location.href = './product.html';
    } else {
        location.href = './first.html';
    }
}