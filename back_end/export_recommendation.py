import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import firebase_admin
from firebase_admin import credentials, firestore

def init_firestore(key_file):
    """Initialize Firebase Admin SDK and return Firestore client."""
    cred = credentials.Certificate(key_file)
    firebase_admin.initialize_app(cred)
    return firestore.client()

def train_model(df):
    """Train RandomForestRegressor to predict qualityRating from category and location."""
    X = df[['category', 'location']]
    y = df['qualityRating']
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)
    return model

def generate_recommendations(df, model, top_n=5):
    """Generate top-N recommended suppliers per category-location pair."""
    recs = {}
    grouped = df.groupby(['category', 'location'])

    for (cat, loc), group in grouped:
        group = group.copy()
        group['predicted_quality'] = model.predict(group[['category', 'location']])
        top_suppliers = group.sort_values('predicted_quality', ascending=False).head(top_n)

        rec_key = f"cat_{cat}_loc_{loc}"
        recs[rec_key] = [
            {'supplierId': row['supplierId'], 'predicted_quality': float(row['predicted_quality'])}
            for _, row in top_suppliers.iterrows()
        ]
    return recs

def upload_recommendations_to_firestore(db, recommendations):
    """Batch upload generated recommendations to Firestore."""
    batch = db.batch()
    for rec_key, suppliers_list in recommendations.items():
        doc_ref = db.collection('recommendations').document(rec_key)
        batch.set(doc_ref, {'suppliers': suppliers_list})
    batch.commit()
    print(f"Uploaded {len(recommendations)} recommendation documents to Firestore.")

def main():
    # Load cleaned supplier data CSV - adjust filename/path as needed
    df = pd.read_csv('suppliers_cleaned.csv')

    # Initialize Firestore client using your service account key file
    db = init_firestore('serviceAccountKey.json')

    # Train the prediction model
    model = train_model(df)

    # Generate and upload top 5 recommendations per category-location pair
    recommendations = generate_recommendations(df, model, top_n=5)
    upload_recommendations_to_firestore(db, recommendations)

if __name__ == "__main__":
    main()
