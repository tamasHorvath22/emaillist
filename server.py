from flask import Flask, render_template, request, url_for, redirect, session
import data_manager
import hash
import os


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
                return redirect(url_for('index', admin_name=session["username"]))
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