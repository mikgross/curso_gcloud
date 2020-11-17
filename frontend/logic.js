window.addEventListener('load', (event) => {
    
    var user = null;
    var fireConfig = {
        apiKey: "AIzaSyAt03rshfNV_v5CwfY6hiaALx-GeJ1d1iI",
        authDomain: "clase-16-11-2020-295816.firebaseapp.com",
        databaseURL: "https://clase-16-11-2020-295816.firebaseio.com",
        projectId: "clase-16-11-2020-295816",
        storageBucket: "clase-16-11-2020-295816.appspot.com",
        messagingSenderId: "950526179723",
        appId: "1:950526179723:web:2fd4c733be75ce664fd78e"
    }

    firebase.initializeApp(fireConfig);

    function getData(url) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    function formFinanceData() {
        const transactions = getData('https://finance-dot-clase-12-11-2020.ew.r.appspot.com/transactions');
        const parsedData = JSON.parse(transactions);
        var styledTransactions = '';
        const transactionsHeader = 
            `<tr>
                <th>ID</th>
                <th>SENDER</th>
                <th>RECEIVER</th>
                <th>AMOUNT</th>
            </tr>`;
        parsedData.transactions.forEach(transaction => {
            styledTransactions = styledTransactions +
                `<tr>
                    <td>${transaction.id}</td>
                    <td>${transaction.sender}</td>
                    <td>${transaction.receiver}</td>
                    <td>${transaction.amount}</td>
                </tr>`;
        });
        document.getElementById('transactions').innerHTML = '<table>' + transactionsHeader + styledTransactions + '</table>';
    }

    function formDepartmentData() {
        const departments = getData('https://departments-dot-clase-12-11-2020.ew.r.appspot.com/departments');
        const parsedDepartments = JSON.parse(departments);

        var styledDeps = '';
        parsedDepartments.departments.forEach(department => {
            styledDeps = styledDeps == '' ? department.name : styledDeps + ', ' + department.name;
        });
        document.getElementById('departments').innerHTML = styledDeps;
    }

    function goRoute(route) {
        if (route == 'departments') {
            // formDepartmentData();
            document.getElementById('authRoute').style.display = 'none';
            document.getElementById('transactionRoute').style.display = 'none';
            document.getElementById('departmentsRoute').style.display = 'block';
        } else if (route == 'transactions') {
            // formFinanceData();
            document.getElementById('authRoute').style.display = 'none';
            document.getElementById('transactionRoute').style.display = 'block';
            document.getElementById('departmentsRoute').style.display = 'none';   
        }
    }

    function setUID() { document.getElementById('userUID').innerText = user.user.uid; }

    document.getElementById('signInButton').addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const result = await firebase.auth().signInWithEmailAndPassword(email, password);
        user = result.user;
        setUID();
        goRoute('finance');
    });

    document.getElementById('registerButton').addEventListener('click', async () => {
        const email = document.getElementById('emailReg').value;
        const password = document.getElementById('passwordReg').value;
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
        user = result;
        console.log(user);
        setUID();
        goRoute('finance');
    });

    document.getElementById('toDepartments').addEventListener('click', () => {
        goRoute('departments');
    });

    document.getElementById('toFinance').addEventListener('click', () => {
        goRoute('transactions');
    });

    document.getElementById('clickHttpFunctions').addEventListener('click', () => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('POST', 'https://us-central1-clase-16-11-2020-295816.cloudfunctions.net/writeDB', true);
        xmlHttp.setRequestHeader('Content-type', 'application/json');

        xmlHttp.onreadystatechange = function () {
            const response = xmlHttp.responseText;
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                console.log(response);
            }
        }
        xmlHttp.send();
    });

    document.getElementById('clickOnCallFunctions').addEventListener('click', () => {
        const func = firebase.functions().httpsCallable('writeDbSdk');
        func({data: 'some stuff'}).then(function (result) {
            console.log(result);
        });
    });

});