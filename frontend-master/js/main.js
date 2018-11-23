setTimeout(function() { 
    var splash = document.getElementById('container1');
    splash.style.display = 'none'; 
    var mainer = document.getElementById('container2');
    mainer.style.display = 'flex';
    console.log('check');
 }, 2000);

 function loging() {
     if(document.getElementById('ID').value == "springboard") {
        if(document.getElementById('PASS').value != "admin") {
            alert('비밀번호가 맞지 않습니다');
        }
        else {
            location.href = "./first.html";
        }
     }
     else {
        alert('없는 아이디입니다.');
     }
 }