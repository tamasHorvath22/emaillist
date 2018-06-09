dom = {
    _allEmail: "",
    _orderDirection: "",

    init: function () {
        dom.getAllEmails();
        dom.sortEmails();
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
        tableBody.innerText = "";
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
    },

    sortEmails: function() {
        let sortButtons = document.getElementsByClassName("tableHeaders");
        for(button of sortButtons) {
            button.style.cursor = "pointer";
            let orderBy = button.dataset.name;
                button.addEventListener('click', function () {
                    dom._allEmail = "";
                    if (dom._orderDirection === "" || dom._orderDirection === "DESC") {
                        dom._orderDirection = "ASC";
                    } else if (dom._orderDirection === "ASC") {
                        dom._orderDirection = "DESC"
                    }
                    let jsonURL = '/order/' + orderBy + '/' + dom._orderDirection;
                    fetch(jsonURL)
                    .then(response => response.json())
                    .then(function(result) {
                        dom._allEmail = result;
                        dom.displayEmails();
                    });
                })
        }
    }
};

dom.init();