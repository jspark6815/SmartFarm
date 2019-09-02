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

var mylittlefarm = firebase.database().ref('/'+localStorage.id+'/');
mylittlefarm.on('child_added', (data) => {
    map[data.key] = data.val()
    console.log(map);
    excute();
    document.getElementById('nick').innerText = map.nick;
    console.log(map.nick);
})
mylittlefarm.on('child_changed', (data) => {
    map[data.key] = data.val()
    console.log(map);
    excute();
    document.getElementById('nick').innerText = map.nick;
    console.log(map.nick);
})