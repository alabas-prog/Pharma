let db = openDatabase('pharmaDB', '1.0', 'Pharma DataBase', 50 * 1024 * 1024);

db.transaction(function (tx) {
    //tx.executeSql('DROP TABLE Invoice ');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Users (username unique, password)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Items (name unique, quantity, picture)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Invoice (invoiceNum, date, customerName, type, items, quantity)');
    // tx.executeSql('insert into Users values ("Admin","123")');
});

function validate() {
    let userName = $('#userName').val();
    let pwd = $('#inputPassWord').val();
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Users where username = ? and password = ?', [userName, pwd], function (tx, results) {

            if (results.rows[0]) {
                console.log('correct password')

                function accessHome() {
                    location.replace('index.html')
                };

                accessHome();

            } else {
                alert('worng password')
            }
        }, null);
    });
}
// ***********************Admin page*********************

function addUser() {
    let userName = $('#addName').val();
    let pwd = $('#addPassword').val();

    db.transaction(function (tx) {
        tx.executeSql('insert into Users values (?, ?)', [userName, pwd])
    })

    window.location.reload();
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

// ******************Index page*****************************  
var video = document.querySelector("#videoElement");
var canvas = document.querySelector("#showscreenshot");

function openCamera() {

    // var video = document.querySelector("#videoElement");

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (error) {
                console.log("Something went wrong!");
            });
    }
}

function stopCamera(e) {

    var stream = video.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stop();
    }

    video.srcObject = null;
}

function takescreenshot() {
    // var video = document.querySelector("#videoElement");
    // var canvas = document.querySelector("#showscreenshot");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
};

function savePhoto() {

    let imgBase64 = canvas.toDataURL("Base64");
    let itemName = $('#itemName').val();
    let qty = $('#itemQuantity').val();

    if (itemName && qty && imgBase64) {
        db.transaction(function (tx) {
            tx.executeSql('insert into Items values (?, ?, ?)', [itemName, qty, imgBase64]);
            window.location.reload();
        });
    } else {
        alert('insert photo and its information')
    }

}

function addItem() {

    let itemName = $('#itemName').val();
    let qty = $('#itemQuantity').val();

    if (itemName && qty) {
        db.transaction(function (tx) {

            // tx.executeSql('drop table Items');
            tx.executeSql('insert into Items (name, quantity) values (?, ?)', [itemName, qty])
            window.location.reload();
        })
    } else {
        alert('insert all fields')
    }

}

db.transaction(function (tx) {
    tx.executeSql(
        "SELECT name, quantity FROM Items order by rowid desc",
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
            document.getElementById("items").innerHTML = html;
        },
        null
    );
});

// *********************Invoice**************************
date = new Date().toDateString() + ' ' + new Date().toLocaleTimeString();
console.log(date)

function addInvoiceItem() {
    let type = $('#type').val();
    let customerName = $('#customerName').val();
    let itemName = $('#itemName').val();
    let qty = $('#qty').val();

    $('#invoiceTable').append("<tr><td>" + itemName + "</td><td>" + qty + "</td></tr>")

    $('#itemName').val('');
    $('#qty').val('');
}

function saveInvoice() {

    db.transaction(function (tx) {
        tx.executeSql('select max(invoiceNum)a from Invoice',[],
        function (tx, results) {
            console.log("*********")
            
            var invoiceNum = 1;
            var row = results.rows[0]//Error in object

            console.log(row['a'])
            console.log("#########")

            if(results.rows.item(0)['a'] == null){
                invoiceNum = 1;
            }else{
                invoiceNum = parseInt(results.rows[0][0])+1;
            }

            console.log("invoiceNum")
            console.log(invoiceNum)
            

            $('#invoiceTable tr').each(function () {
                // date, customerName, type, items, quantity
                let sql = 'insert into Invoice (invoiceNum, date,customerName, type,items,quantity) values ("' +
                invoiceNum + '","' +
                date + '","' +
                    $('#customerName').val() + '","' +
                    $('#type').val() + '"'
                    $(this).find('td').each(function () {
                        sql += ',"' + $(this).html() + '"'
                    });
                    sql += ')\n'
                    console.log(sql)
                    db.transaction(function (tx) {
                    tx.executeSql(sql);
                });
            });
        },function(){
            console.log("error")
            var invoiceNum = 1;            
            $('#invoiceTable tr').each(function () {
                let sql = 'insert into Invoice (invoiceNum, date,customerName, type,items,quantity) values ("' +
                invoiceNum + '","' +
                date + '","' +
                    $('#customerName').val() + '","' +
                    $('#type').val() + '"'
                    $(this).find('td').each(function () {
                        sql += ',"' + $(this).html() + '"'
                    });
                    sql += ')\n'
                    console.log(sql)
                    db.transaction(function (tx) {
                    tx.executeSql(sql);
                });
            });
        }) 
    });

        
}