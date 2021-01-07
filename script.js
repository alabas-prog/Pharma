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

            if (results.rows[0]) {
                console.log('correct password')
                
                function accessHome(){
                    location.replace('index.html')
                };

                accessHome();
                
            }
            else {
                alert('worng password')
            }
         }, null); 
    });
}
// ***********************Admin page*********************

function addUser(){
    let userName = $('#addName').val();
    let pwd = $('#addPassword').val();

    console.log(userName)
    console.log(pwd)

    db.transaction(function (tx) {
        tx.executeSql('insert into Users values (?, ?)',[userName, pwd])
    })

    window.location.reload();
}

db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM Users",
      [],
      function (tx, results) {
        var html = "<table class='table'> <thead class='thead-light'> <tr><th scope='col'>UserName</th><th scope='col'>Password</th></tr></thead><tbody>";
        for (var i = 0; i < results.rows.length; i++) {
          html += "<tr>";
          for (var prop in results.rows.item(i)) {
            html += "<td>" + results.rows.item(i)[prop] + "</td>";
          }
          html += "</tr>";
        }
        html += "</tbody></table>";
        document.getElementById("usersTable").innerHTML = html;
      },
      null
    );
  });

