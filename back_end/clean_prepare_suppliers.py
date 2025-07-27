import pandas as pd
from sklearn.preprocessing import LabelEncoder, MinMaxScaler

def clean_and_prepare(csv_input, csv_output):
    # Load CSV
    df = pd.read_csv(csv_input)

    # Display basic info
    print("Initial data shape:", df.shape)
    print("Columns:", df.columns.tolist())

    # Fill missing values or drop rows with critical missing data
    df = df.dropna(subset=['name', 'category', 'qualityRating', 'location'])  # adjust as needed

    # Label encode categorical features
    label_encoders = {}
    for col in ['category', 'location']:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders[col] = le
        print(f"Encoded {col} into {len(le.classes_)} classes: {list(le.classes_)}")

    # Normalize qualityRating between 0 and 1
    scaler = MinMaxScaler()
    df['qualityRating'] = scaler.fit_transform(df[['qualityRating']])

    # Save cleaned CSV
    df.to_csv(csv_output, index=False)
    print(f"Cleaned data saved to {csv_output}")

if __name__ == "__main__":
    clean_and_prepare('suppliers.csv', 'suppliers_cleaned.csv')

