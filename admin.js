if(sessionStorage.validation == 'admin'){
let db = openDatabase('pharmaDB', '1.0', 'Pharma DataBase', 50 * 1024 * 1024);

db.transaction(function (tx) {
    // tx.executeSql('DROP TABLE Invoice ');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Users (username unique, password)');
    // tx.executeSql('CREATE TABLE IF NOT EXISTS Items (name unique, quantity, picture)');
    // tx.executeSql('CREATE TABLE IF NOT EXISTS Invoice (invoiceNum, date, customerName, type, items, quantity)');
    // tx.executeSql('insert into Users values ("Admin","123")');
});

function addUser() {
    let userName = $('#addName').val();
    let pwd = md5($('#addPassword').val());
    // console.log(md5('hello world'))
    db.transaction(function (tx) {
        tx.executeSql('insert into Users values (?, ?)', [userName, pwd])
    })

    setTimeout(function(){window.location.reload()},500);
}

db.transaction(function (tx) {
    tx.executeSql(
        "SELECT * FROM Users",
        [],
        function (tx, results) {
            var html = "";
            for (var i = 0; i < results.rows.length; i++) {
                html += "<tr>";
                for (var prop in results.rows.item(i)) {
                    html += "<td>" + results.rows.item(i)[prop] + "</td>";
                }
                html += "</tr>";
            }
            document.getElementById("usersTable").innerHTML = html;
        },
        null
    );
});

function removeUser(){
    let userName = $('#addName').val();
    console.log(userName)
    confirm(`Are you sure you want to delete user = ${userName}`);
    db.transaction(function (tx) {
        tx.executeSql('delete from Users where username = ?', [userName])
        setTimeout(function(){window.location.reload()},500);
        
    })

}

function logOut(){
    sessionStorage.clear();
}

}else{
    window.location.replace("login.html")
    alert('you are not the admin!')
}

