from flask import Flask, render_template, request, url_for, redirect, session, jsonify, send_file, Response
import data_manager
import hash
import login_module
import file_handler


app = Flask(__name__)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        login_data = request.form.to_dict()
        user_data_from_database = data_manager.get_user_data(login_data)
        if user_data_from_database:
            is_correct_password = hash.verify_password(login_data["password"], user_data_from_database["password"])
            if is_correct_password:
                session["username"] = login_data["username"]
                session["user_id"] = user_data_from_database["id"]
                return redirect(url_for('index'))
        return render_template('login.html', failed_login=True)
    return render_template('login.html')


@app.route('/registration/<token>')
def registration(token):
    is_token_in_database = data_manager.is_token_in_database(token)
    if is_token_in_database:
        return render_template('registration.html', token=token)
    else:
        return redirect(url_for('login'))


@app.route('/submit-registration', methods=['POST'])
def submit_registration():
    if request.method == 'POST':
        new_registration = request.form.to_dict()
        if new_registration["password_confirm"] == new_registration["password"]:
            hashed_password = hash.hash_password(new_registration["password"])
            new_registration["password"] = hashed_password
            data_manager.add_new_user_to_database(new_registration)
            #data_manager.delete_token(new_registration["token"])
            return redirect(url_for('login'))
        else:
            return redirect(url_for('registration', token=new_registration['token']))
    else:
        return redirect(url_for('login'))


@app.route('/index')
@login_module.login_required
def index():
    return render_template('index.html')


@app.route('/get-all-emails')
def get_all_emails():
    data = data_manager.get_all_emails()
    return jsonify(data)


@app.route('/add-new-email', methods=['GET', 'POST'])
@login_module.login_required
def add_new_email():
    if request.method == 'POST':
        new_email = request.form.to_dict()
        data_manager.save_new_email(new_email)
        return redirect(url_for('index'))
    else:
        return render_template('add_new_email.html')


@app.route('/order/<order_by>/<direction>')
def order(order_by, direction):
    return jsonify(data_manager.get_sorted_emails(order_by, direction))


@app.route('/edit/<id>')
def edit(id):
    email_data = data_manager.get_email_data(id)
    return render_template('edit.html',
                           email_data=email_data)


@app.route('/save-edited', methods=['POST'])
def save_edited():
    edited_data = request.form.to_dict()
    data_manager.update_email(edited_data)
    return redirect(url_for('index'))


@app.route('/delete', methods=['POST'])
def delete():
    email_data = request.form.to_dict()
    data_manager.delete_email(email_data)
    return redirect(url_for('index'))


# @app.route('/download')
# def download():
#     file_handler.fill_csv_file()
#     # return send_file('data/download/data.csv', mimetype="text/csv")
#     return Response(
#         "ttttttttttttttttttttttv",
#         mimetype="text/csv",
#         headers={"Content-disposition":
#                      "attachment; filename=cucc.csv"})


@app.route('/download-data-file')
def download_file():
    file_handler.fill_csv_file()
    return send_file('data/download/data.csv',
                     mimetype='text/csv',
                     attachment_filename='data.csv',
                     as_attachment=True)


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
    app.run(
        debug=True,
        port=5000
    )
