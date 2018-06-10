dom = {
    _allEmail: "",
    _emailsToDisplay: "",
    _orderDirection: "",
    _idToDelete: "",
    _searchedEmails: [],
    _columns: ["last_name", "first_name", "email", "phone"],

    init: function () {
        dom.getAllEmails();
        dom.sortEmails();
        dom.search();
        dom.deleteEmail();
    },

    getAllEmails: function() {
        fetch('/get-all-emails')
            .then(response => response.json())
            .then(function(result) {
                dom._emailsToDisplay = result;
                dom._allEmail = result;
                dom.displayEmails();
                dom.modify();
        });
    },

    displayEmails: function() {
        let tableBody = document.getElementById("tableBody");
        tableBody.innerText = "";
        for(let row = 0; row < dom._emailsToDisplay.length; row ++) {
            let id = dom._emailsToDisplay[row]["id"];
            let tableRow = document.createElement("tr");
            let columns = ["last_name", "first_name", "email", "phone"];
            for(let elem = 0; elem < columns.length; elem++) {
                let tableData = document.createElement("td");
                let tempItem = document.createTextNode(dom._emailsToDisplay[row][columns[elem]]);
                tableData.appendChild(tempItem);
                tableRow.appendChild(tableData);
            }

            let modifyButtonTag = document.createElement("button");
            modifyButtonTag.innerText = "szerkesztés";
            let modifyAnchorTag = document.createElement("a");
            modifyAnchorTag.setAttribute("href", "/edit/" + id);
            modifyAnchorTag.appendChild(modifyButtonTag);
            tableRow.appendChild(modifyAnchorTag);

            let deleteButtonTag = document.createElement("button");
            deleteButtonTag.setAttribute("data-toggle", "modal");
            deleteButtonTag.setAttribute("data-target", "#delete-modal");
            deleteButtonTag.setAttribute("class", "deleteButtons");
            deleteButtonTag.setAttribute("data-id", id);
            deleteButtonTag.innerText = "törlés";
            tableRow.appendChild(deleteButtonTag);

            tableBody.appendChild(tableRow);
        }
        dom.findIdToDeleteEmail();
        dom.modify();
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
                        dom._emailsToDisplay = result;
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
                dom._emailsToDisplay = dom._allEmail;
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
        })

    },

    findIdToDeleteEmail: function() {
        let deleteButtons = document.getElementsByClassName("deleteButtons");
        for(buttonToDelete of deleteButtons) {
            buttonToDelete.addEventListener('click', function() {
                dom._idToDelete = buttonToDelete.dataset.id;
            })
        }
    },

    deleteEmail: function() {
        let deleteConfirmButton = document.getElementById("confirm_delete_button");
        deleteConfirmButton.addEventListener('click', function() {
            $.post('/delete/' + dom._idToDelete, {
                id: dom._idToDelete
            });
            dom.getAllEmails();
        });
    },

    modify: function() {
        let modifyButton = document.getElementById("confirm_modify");
        modifyButton.addEventListener('click', function() {
            let id = document.getElementById("id_edit").value;
            let first_name = document.getElementById("first_name_edit").value;
            let last_name = document.getElementById("last_name_edit").value;
            let email = document.getElementById("email_edit").value;
            let phone = document.getElementById("phone_edit").value;
            $.post('/save-edited', {
                id: id,
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone: phone
            })
        })
    }
};

dom.init();