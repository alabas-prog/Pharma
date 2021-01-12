let db = openDatabase('pharmaDB', '1.0', 'Pharma DataBase', 50 * 1024 * 1024);

db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS Users (username unique, password)');
});

function validate() {
    let userName = $('#userName').val();
    let pwd = md5($('#inputPassWord').val());
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Users where username = ? and password = ?', [userName, pwd], function (tx, results) {

            if (results.rows[0]) {
                if (results.rows.item(0).username == 'admin') {
                    sessionStorage.validation = 'admin'
                    location.replace('invoice.html')
                } else {
                    sessionStorage.validation = 'user'
                    location.replace('invoice.html')
                }
            } else {
                alert('worng password')
            }
        }, null);
    });
}