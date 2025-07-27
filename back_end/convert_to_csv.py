import json
import csv

def json_to_csv(json_file, csv_file):
    # Load the JSON data
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # data is expected to be a dictionary of {doc_id: doc_fields}
    # Convert this into a list of dictionaries with one extra field for the doc ID
    records = []
    for doc_id, fields in data.items():
        record = {'supplierId': doc_id}
        record.update(fields)
        records.append(record)

    # Get all unique fieldnames for CSV header (in case some fields are missing in some records)
    fieldnames = set()
    for record in records:
        fieldnames.update(record.keys())
    fieldnames = list(fieldnames)

    # Write to CSV
    with open(csv_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(records)

    print(f"Conversion complete: '{json_file}' to '{csv_file}'")

if __name__ == "__main__":
    json_to_csv('suppliers.json', 'suppliers.csv')
