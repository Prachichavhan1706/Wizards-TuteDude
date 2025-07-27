import firebase_admin
from firebase_admin import credentials, firestore
import json

def main():
    key_file = 'serviceAccountKey.json'  # Make sure this matches your file name
    cred = credentials.Certificate(key_file)
    firebase_admin.initialize_app(cred)

    db = firestore.client()

    collection_name = 'suppliers'  # Change here if you want to export 'qualityChecks' or others

    print(f"Exporting collection: {collection_name}")

    docs = db.collection(collection_name).stream()

    data = {}
    for doc in docs:
        data[doc.id] = doc.to_dict()

    with open(f"{collection_name}.json", 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

    print(f"Export complete! Saved file: {collection_name}.json")

if __name__ == "__main__":
    main()
