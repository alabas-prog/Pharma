if(sessionStorage.validation == 'admin' || sessionStorage.validation == 'user'){
let db = openDatabase('pharmaDB', '1.0', 'Pharma DataBase', 50 * 1024 * 1024);

db.transaction(function (tx) {
    // tx.executeSql('DROP TABLE Invoice ');
    // tx.executeSql('CREATE TABLE IF NOT EXISTS Users (username unique, password)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Items (name unique, quantity, picture)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Invoice (invoiceNum, date, customerName, type, items, quantity)');
    // tx.executeSql('insert into Users values ("Admin","123")');
});

date = new Date().toDateString() + ' ' + new Date().toLocaleTimeString();

db.transaction(function (tx) {
    tx.executeSql(
        "SELECT name FROM Items ORDER BY name",
        [],
        function (tx, results) {
            var html = "";
            for (var i = 0; i < results.rows.length; i++) {
                for (var prop in results.rows.item(i)) {
                    html += "<option value = '" + results.rows.item(i)[prop] + "'></option>";
                }
            }
            document.getElementById("invoiceItems").innerHTML = html;
        },
        null
    );
});

function addInvoiceItem() {
    let type = $('#type').val();
    let customerName = $('#customerName').val();
    let itemName = $('#itemsChoice').val();
    let inputQuantity = $('#qty').val();

    if (customerName && type && itemName && inputQuantity) {
        if (type == 'buy') {
            $('#invoiceTable').append("<tr><td>" + itemName + "</td><td>" + inputQuantity + "</td></tr>")
            console.log(itemName, type)
            $('#itemsChoice').val('');
            $('#qty').val('');

            $('#customerName').attr("disabled", true); 
            $('#type').attr("disabled", true); 
            
        } else if (type = 'sell') {
            db.transaction(function (tx) {
                tx.executeSql('select quantity from items where name = ?', [itemName], function (tx, results) {

                    currentQuantity = results.rows.item(0).quantity

                    if (currentQuantity > 0 && currentQuantity >= inputQuantity) {
                        $('#invoiceTable').append("<tr><td>" + itemName + "</td><td>" + inputQuantity + "</td></tr>")
                        $('#itemsChoice').val('');
                        $('#qty').val('');

                        $('#customerName').attr("disabled", true); 
                        $('#type').attr("disabled", true); 
                    } else {
                        alert(`not enough quantity\ncurren quantity = ${currentQuantity}`)
                    }

                })
            })
        }
    } else {
        alert('please insert all fields correctly')
    }
}

    function saveInvoice() {
        let type = $('#type').val();
        let customerName = $('#customerName').val();
        if (customerName && type) {
            db.transaction(function (tx) {
                tx.executeSql('select invoiceNum from Invoice order by invoiceNum desc', [],
                    function (tx, results) {
                        console.log(results) //test
                        var invoiceNum;

                        if (results.rows.length == 0 ) {
                            invoiceNum = 1;
                            console.log(invoiceNum);//test
                        } else {
                            var row = results.rows.item(0).invoiceNum
                            invoiceNum = parseInt(row) + 1;
                            console.log('invoiceNum = ' + invoiceNum) //test
                        }

                        // console.log("invoiceNum") test
                        console.log(invoiceNum) //  test


                        $('#invoiceTable tr').each(function () {

                            let sql = 'insert into Invoice (invoiceNum, date, customerName, type, items,quantity) values ("' +
                                invoiceNum + '","' +
                                date + '","' +
                                customerName + '","' +
                                type + '"'
                            $(this).find('td').each(function () {
                                sql += ',"' + $(this).html() + '"'
                            });
                            sql += ')'
                            // console.log(sql) test
                            db.transaction(function (tx) {
                                tx.executeSql(sql);
                            });
                        });
                    });

                    $('#invoiceTable tr').each(function() {
                        let arr = []
                        let i = 0
                      $( this ).find('td').each(function() {
                        arr[i] = $(this).html() 
                        i++;
                    });
                    // console.log(arr) test
                    db.transaction(function (tx) {
                        let plusOrMinus = (type == 'buy') ? '+' : "-"
                        tx.executeSql('update Items set quantity = quantity ' + plusOrMinus + ' ? where name = ?', [arr[1], arr[0]])
                    });
                });
                    alert('invoice added');
                    setTimeout(function(){window.location.reload()},500);
                    
                });
        } else {
            alert('insert all fields')
        }
    }
    
    function logOut(){
        sessionStorage.clear();
    }
}else {
    window.location.replace("login.html")
    alert('you are not a user!')
}