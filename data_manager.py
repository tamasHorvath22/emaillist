import connection


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


@connection.connection_handler
def get_sorted_emails(cursor, orderBy, direction):
    cursor.execute("""
                    SELECT * FROM email_list
                    ORDER BY {} {}
                    """.format(orderBy, direction))
    return cursor.fetchall()


@connection.connection_handler
def get_email_data(cursor, id):
    cursor.execute("""
                    SELECT * FROM email_list
                    WHERE id = %(id)s
                    """, {"id": id})
    return cursor.fetchone()


@connection.connection_handler
def delete_email_by_id(cursor, email_data):
    cursor.execute("""
                    DELETE FROM email_list
                    WHERE id = %(email_id)s
                    """, email_data)


@connection.connection_handler
def update_email(cursor, updated_email):
    cursor.execute("""
                    UPDATE email_list
                    SET first_name = %(first_name)s, last_name = %(last_name)s, email = %(email)s, phone = %(phone)s
                    WHERE id = %(id)s
                    """, updated_email)


@connection.connection_handler
def get_data_to_write_to_file(cursor):
    cursor.execute("""
                    SELECT last_name, first_name, email, phone FROM email_list
                    """)
    return cursor.fetchall()
