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