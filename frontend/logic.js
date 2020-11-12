window.addEventListener('load', (event) => {
    
    var user = null;

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
            formDepartmentData();
            document.getElementById('authRoute').style.display = 'none';
            document.getElementById('transactionRoute').style.display = 'none';
            document.getElementById('departmentsRoute').style.display = 'block';
        } else if (route == 'transactions') {
            formFinanceData();
            document.getElementById('authRoute').style.display = 'none';
            document.getElementById('transactionRoute').style.display = 'block';
            document.getElementById('departmentsRoute').style.display = 'none';   
        }
    }

    function setUID() { document.getElementById('userUID').innerText = user.user.uid; }

    document.getElementById('signInButton').addEventListener('click', () => {

        document.getElementById('messageDisplay').innerHTML = '';

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('POST', 'https://auth-dot-clase-12-11-2020.ew.r.appspot.com/user-signin', true);

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        xmlHttp.setRequestHeader('Content-type', 'application/json');

        xmlHttp.onreadystatechange = function () {
            const response = JSON.parse(xmlHttp.responseText);
            if (response.message == 'error occured') {
                document.getElementById('messageDisplay').innerHTML = response.error.message;
            }
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                user = response.user;
                setUID();
                goRoute('transactions');
            }
        }

        const data = JSON.stringify({"email": email, "password": password});
        xmlHttp.send(data);
    });

    document.getElementById('registerButton').addEventListener('click', () => {

        document.getElementById('messageDisplay').innerHTML = '';

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('POST', 'https://auth-dot-clase-12-11-2020.ew.r.appspot.com/create-user', true);

        const email = document.getElementById('emailReg').value;
        const password = document.getElementById('passwordReg').value;

        xmlHttp.setRequestHeader('Content-type', 'application/json');

        xmlHttp.onreadystatechange = function () {
            const response = JSON.parse(xmlHttp.responseText);
            if (response.message == 'error occured') {
                document.getElementById('messageDisplay').innerHTML = response.error.message;
            }
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                user = response.user;
                setUID();
                goRoute('departments');
            }
        }

        const data = JSON.stringify({"email": email, "password": password});
        xmlHttp.send(data);
    });

    document.getElementById('toDepartments').addEventListener('click', () => {
        goRoute('departments');
    });

    document.getElementById('toFinance').addEventListener('click', () => {
        goRoute('transactions');
    });

});