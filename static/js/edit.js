dom = {

    init: function() {
        dom.modify();
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
            });
            window.location.replace("/index");
        });
    }
};

dom.init();