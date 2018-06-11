import data_manager
import csv


def fill_csv_file():
    data = data_manager.get_data_to_write_to_file()
    filename = "data/download/data.csv"
    with open(filename, "w") as file:
        fieldnames = ['name', 'email', 'phone']
        file_writer = csv.DictWriter(file, fieldnames=fieldnames)
        file_writer.writerows(data)
