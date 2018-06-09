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
