import data_manager
import csv


def fill_csv_file():
    data = data_manager.get_data_to_write_to_file()
    filename = "data/download/data.csv"
    header = ["Last name", "First name", "Email", "Phone number"]
    with open(filename, "w") as file:
        fieldnames = ['last_name', 'first_name', 'email', 'phone']
        file_writer = csv.writer(file)
        file_writer.writerow(header)
        
        file_writer = csv.DictWriter(file, fieldnames=fieldnames)
        file_writer.writerows(data)
