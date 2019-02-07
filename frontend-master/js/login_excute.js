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
    firebase.database().ref('/'+id+'/').update({
        enter: map[id].enter+1,
    })
    if(map[id].enter > 1) {
        location.href = './product.html#'+id;
    } else {
        location.href = './first.html#'+id;
    }
}