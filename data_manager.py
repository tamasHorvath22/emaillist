import connection
import util


@connection.connection_handler
def get_user_data(cursor, login_data):
    cursor.execute("""
                    SELECT * FROM users
                    WHERE username = %(username)s
                    """, login_data)
    return cursor.fetchone()


@connection.connection_handler
def is_token_in_database(cursor, token):
    cursor.execute("""
                    SELECT * FROM token
                    WHERE token = %(token)s
                    """, {"token": token})
    if cursor.fetchone():
        return True
    else:
        return False


@connection.connection_handler
def add_new_user_to_database(cursor, new_user):
    cursor.execute("""
                    INSERT INTO users (username, password)
                    VALUES (%(username)s, %(password)s);
                    """, new_user)


@connection.connection_handler
def get_all_emails(cursor):
    cursor.execute("""
                    SELECT * FROM public.email_list
                    """)
    cucc = cursor.fetchall()
    return cucc


@connection.connection_handler
def save_new_email(cursor, new_email):
    cursor.execute("""
                    INSERT INTO email_list (first_name, last_name, email, phone)
                    VALUES (%(first_name)s, %(last_name)s, %(email)s, %(phone)s);
                    """, new_email)
