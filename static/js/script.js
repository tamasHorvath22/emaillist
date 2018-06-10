dom = {
    _allEmail: "",
    _emailsTiDisplay: "",
    _orderDirection: "",
    _searchedEmails: [],
    _columns: ["last_name", "first_name", "email", "phone"],

    init: function () {
        dom.getAllEmails();
        dom.sortEmails();
        dom.search();
    },

    getAllEmails: function() {
        fetch('/get-all-emails')
            .then(response => response.json())
            .then(function(result) {
                dom._emailsTiDisplay = result;
                dom._allEmail = result;
                dom.displayEmails();
        });
    },

    displayEmails: function() {
        let tableBody = document.getElementById("tableBody");
        tableBody.innerText = "";
        for(let row = 0; row < dom._emailsTiDisplay.length; row ++) {
            let id = dom._emailsTiDisplay[row]["id"];
            let tableRow = document.createElement("tr");
            let columns = ["last_name", "first_name", "email", "phone"];
            for(let elem = 0; elem < columns.length; elem++) {
                let tableData = document.createElement("td");
                let tempItem = document.createTextNode(dom._emailsTiDisplay[row][columns[elem]]);
                tableData.appendChild(tempItem);
                tableRow.appendChild(tableData);
            }
            let buttonTag = document.createElement("button");
            buttonTag.innerText = "edit";
            let anchorTag = document.createElement("a");
            anchorTag.setAttribute("href", "/edit/" + id);
            anchorTag.appendChild(buttonTag);
            tableRow.appendChild(anchorTag);
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
    },

    search: function() {
        let input = document.getElementById("search");
        input.addEventListener('keyup', function() {
            let searchInfo = input.value.toLowerCase();
            if(searchInfo === "") {
                dom._emailsTiDisplay = dom._allEmail;
                dom.displayEmails();
            }
            for(let i = 0; i < dom._allEmail.length; i++) {
                for(let column of dom._columns) {
                    if(dom._allEmail[i][column].toLowerCase().includes(searchInfo)) {
                        dom._searchedEmails.push(dom._allEmail[i]);
                        break;
                    }
                }
            }
            dom._allEmail = dom._searchedEmails;
            dom.displayEmails();
        })

    }
};

dom.init();