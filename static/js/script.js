dom = {
    _allEmail: "",

    init: function () {
        dom.getAllEmails()
    },

    getAllEmails: function() {
        fetch('/get-all-emails')
            .then(response => response.json())
            .then(function(result) {
                dom._allEmail = result;
                dom.displayEmails();
        });
    },

    displayEmails: function() {
        let tableBody = document.getElementById("tableBody");
        for(let row = 0; row < dom._allEmail.length; row ++) {
            let tableRow = document.createElement("tr");
            let columns = ["last_name", "first_name", "email", "phone"];
            for(let elem = 0; elem < columns.length; elem++) {
                let tableData = document.createElement("td");
                let tempItem = document.createTextNode(dom._allEmail[row][columns[elem]]);
                tableData.appendChild(tempItem);
                tableRow.appendChild(tableData);
            }
            tableBody.appendChild(tableRow);
        }
    }
};

dom.init();