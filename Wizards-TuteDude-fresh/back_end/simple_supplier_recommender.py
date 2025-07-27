import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor


def load_data(filename):
    df = pd.read_csv(filename)
    print(f"Loaded {len(df)} suppliers")
    return df


def train_model(df):
    # Features: category and location (already label encoded)
    X = df[['category', 'location']]
    y = df['qualityRating']

    # Split data into train/test sets (optional)
    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    score = model.score(X_test, y_test)
    print(f"Model R^2 score: {score:.3f}")

    return model


def recommend_best_suppliers(model, df, category=None, location=None, top_n=5):
    filtered = df
    if category is not None:
        filtered = filtered[filtered['category'] == category]
    if location is not None:
        filtered = filtered[filtered['location'] == location]

    if filtered.empty:
        print("No suppliers found for the given filters.")
        return []

    # Predict quality rating
    X_pred = filtered[['category', 'location']]
    filtered = filtered.copy()
    filtered['predicted_quality'] = model.predict(X_pred)

    # Sort by predicted quality descending and return top N
    recommended = filtered.sort_values('predicted_quality', ascending=False).head(top_n)

    return recommended[['supplierId', 'name', 'predicted_quality']]


if __name__ == "__main__":
    # Load cleaned supplier data
    df = load_data('suppliers_cleaned.csv')

    # Print unique categories and locations
    print("Categories in data:", df['category'].unique())
    print("Locations in data:", df['location'].unique())

    # Show top 20 most common category-location combinations
    print("Top 20 category-location combinations and their counts:")
    combo_counts = df.groupby(['category', 'location']).size().sort_values(ascending=False)
    print(combo_counts.head(20))

    # Train the quality rating prediction model
    model = train_model(df)

    # Examples of using valid filters (use values from printed outputs above)
    example_category = df['category'].unique()[0]  # example valid category
    example_location = df['location'].unique()[0]  # example valid location

    print(f"\nTop recommended suppliers for category={example_category}, location={example_location}:")
    recommendations = recommend_best_suppliers(model, df, category=example_category, location=example_location, top_n=5)
    print(recommendations)

    # Try recommendation with only category filter
    print(f"\nTop recommended suppliers for category={example_category}, any location:")
    recommendations = recommend_best_suppliers(model, df, category=example_category, location=None, top_n=5)
    print(recommendations)

    # Try recommendation with no filters (all suppliers)
    print("\nTop recommended suppliers without any filters:")
    recommendations = recommend_best_suppliers(model, df, category=None, location=None, top_n=5)
    print(recommendations)
