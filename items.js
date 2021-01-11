if(sessionStorage.validation == 'admin' || sessionStorage.validation == 'user'){
let db = openDatabase('pharmaDB', '1.0', 'Pharma DataBase', 50 * 1024 * 1024);

db.transaction(function (tx) {
    // tx.executeSql('DROP TABLE Invoice ');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Users (username unique, password)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Items (name unique, quantity, picture)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Invoice (invoiceNum, date, customerName, type, items, quantity)');
    // tx.executeSql('insert into Users values ("Admin","123")');
});

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

function logOut(){
    sessionStorage.clear();
}
} else {
    window.location.replace("login.html")
    alert('you are not a user!')
}