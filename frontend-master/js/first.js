var config = {
    apiKey: "AIzaSyCAZtF65iUe_CdH0m_DZ-Kmmnmhsi9KBRE",
    authDomain: "mylittlefarm-mk1.firebaseapp.com",
    databaseURL: "https://mylittlefarm-mk1.firebaseio.com",
    projectId: "mylittlefarm-mk1",
    storageBucket: "mylittlefarm-mk1.appspot.com",
    messagingSenderId: "94643931923"
};
firebase.initializeApp(config);

var database = firebase.database();

map = {};
let privateCode = firebase.database().ref('/');
let productCode;
privateCode.on('child_added', (data) => {
    if(data.key == 'code') {
        productCode = data.val()
        console.log(productCode);
    }
})
privateCode.on('child_changed', (data) => {
    productCode = data.val()
    console.log(productCode);
})
var mylittlefarm = firebase.database().ref('/'+location.hash.slice(1));
mylittlefarm.on('child_added', (data) => {
    map[data.key] = data.val()
    console.log(map);
})
mylittlefarm.on('child_changed', (data) => {
    map[data.key] = data.val()
    console.log(map);
})

function first_conf() {
    var code = document.getElementById('code').value;
    if(code == productCode)
    {
        document.getElementById('submit').style.display = "none";
        document.getElementById('basil_content').style.display = "flex";
        document.getElementById('nickname').style.display = "flex";
    }
    else {
        if(code == '') {
            alert("제품 코드를 입력하세요!");
        }
        else {
            alert("알맞은 코드가 아닙니다ㅜㅜ")
        }
    }
}
function second_conf() {
    let nickname = document.getElementById('nick_name').value;
    firebase.database().ref('/'+location.hash.slice(1)).update({
        nick: nickname
    })
    location.href = "./product.html#"+map.id;
}
alert('환영합니다. ' + location.hash.slice(1) + '님');