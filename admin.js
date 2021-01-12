if (sessionStorage.validation == 'admin') {
    let db = openDatabase('pharmaDB', '1.0', 'Pharma DataBase', 50 * 1024 * 1024);

    let adminPwd = md5('admin');
    db.transaction(function (tx) {
        // tx.executeSql('DROP TABLE Users ');
        tx.executeSql('CREATE TABLE IF NOT EXISTS Users (username unique, password)');
        tx.executeSql('select * from Users', [], function (tx, results) {
            if (results.rows.length == 0) {
                tx.executeSql('insert into Users values ("admin",?)', [adminPwd]);
            }
        });
    });

    function addUser() {
        let userName = $('#addName').val();
        let pwd = md5($('#addPassword').val());
        let pwd2 = md5($('#addPassword2').val());
        console.log(pwd2)
        if (userName && (pwd == pwd2)){
            db.transaction(function (tx) {
                tx.executeSql('insert into Users values (?, ?)', [userName, pwd])
            });
    
            setTimeout(function () {
                window.location.reload();
            }, 500);
        } else {
            alert('Insert all feilds correctly')
        }
        
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

    function removeUser() {
        let userName = $('#addName').val();
        confirm(`Are you sure you want to delete user = ${userName}`);
        db.transaction(function (tx) {
            tx.executeSql('delete from Users where username = ?', [userName])
            setTimeout(function () {
                window.location.reload();
            }, 500);

        })

    }

    function logOut() {
        sessionStorage.clear();
    }

} else {
    window.location.replace("login.html");
    alert('you are not the admin!');
}