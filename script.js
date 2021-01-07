let db = openDatabase('pharmaDB', '1.0', 'Pharma DataBase', 2 * 1024 * 1024); 
          
db.transaction(function (tx) {  
tx.executeSql('CREATE TABLE IF NOT EXISTS Users (username unique, password)');
tx.executeSql('insert into Users values ("Admin","123")');
tx.executeSql('CREATE TABLE IF NOT EXISTS Items (name unique, quantity, picture)');
tx.executeSql('CREATE TABLE IF NOT EXISTS Invoice (date, customerName, type, items, quantity)');
});

function validate(){
    let userName = $('#userName').val();
    let pwd = $('#inputPassWord').val();
    db.transaction( function (tx){
         tx.executeSql('SELECT * FROM Users where username = ? and password = ?', [userName, pwd], function (tx, results) { 
            let user =results.rows[0];
                
            if (user) {
                console.log('correct password')
                // location.href("http://www.google.com")
                function accessAdmin(){
                    location.replace('admin.html')
                };
                accessAdmin();
                
            }
            else {
                console.log('worng password')
            }
         }, null); 
    });
}

