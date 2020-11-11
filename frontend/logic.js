window.addEventListener('load', (event) => {
    
    function getData(url) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    const transactions = getData('https://finance-dot-new-test-curso.ew.r.appspot.com/transactions');
    const departments = getData('https://departments-dot-new-test-curso.ew.r.appspot.com/departments');

    const parsedTransactions = JSON.parse(transactions);
    const parsedDepartments = JSON.parse(departments);

    var styledTransactions = '';
    parsedTransactions.transactions.forEach(transaction => {
        styledTransactions = styledTransactions +
            `<tr>
                <td>${transaction.id}</td>
                <td>${transaction.sender}</td>
                <td>${transaction.receiver}</td>
                <td>${transaction.amount}</td>
            </tr>`;
        console.log(styledTransactions);
    });

    const transactionsHeader = 
        `<tr>
            <th>ID</th>
            <th>SENDER</th>
            <th>RECEIVER</th>
            <th>AMOUNT</th>
        </tr>`;

    var styledDeps = '';
    parsedDepartments.departments.forEach(department => {
        styledDeps = styledDeps == '' ? department.name : styledDeps + ', ' + department.name;
    });


    document.getElementById('transactions').innerHTML = '<table>' + transactionsHeader + styledTransactions + '</table>';
    document.getElementById('departments').innerHTML = styledDeps;

});