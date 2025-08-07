import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib

class LiveableAreaModel:
    def __init__(self):
        self.model = LogisticRegression(random_state=42)
        self.label_encoder = LabelEncoder()
        self.scaler = StandardScaler()
        self.df = None
    def preprocess_data(self, df):
        self.df = df.copy() 
        df['Sum'] = df['Commercial'] + df['Entertainment'] + df['Educational/Research'] + df['Hospital/Clinic']
        df['Suburb_encoder'] = self.label_encoder.fit_transform(df['Suburb'])
        df['Livable_area'] = df['Sum'].apply(lambda x: 'Job-rich' if x > 150 else 'Normal')
        return df

    def train(self):
        # Load and preprocess data
        self.df = pd.read_csv('data/liveablearea.csv')
        df = self.preprocess_data(self.df)

        # Prepare features and target
        X = df[['Suburb_encoder']]
        y = df['Livable_area']

        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Scale the features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)

        # Train the model
        self.model.fit(X_train_scaled, y_train)

        # Save the model and scaler
        joblib.dump(self.model, 'liveable_area_model.pkl')
        joblib.dump(self.scaler, 'scaler.pkl')
        joblib.dump(self.label_encoder, 'label_encoder.pkl')
        joblib.dump(self.df, 'original_data.pkl')
        # Evaluate the model
        y_pred = self.model.predict(X_test_scaled)
        accuracy = accuracy_score(y_test, y_pred)
        report = classification_report(y_test, y_pred)

        print(f"Model trained. Accuracy: {accuracy}")
        print("Classification Report:")
        print(report)

    def predict(self, suburb):
        # Load the model and preprocessing objects
        model = joblib.load('liveable_area_model.pkl')
        scaler = joblib.load('scaler.pkl')
        label_encoder = joblib.load('label_encoder.pkl')
        original_df = joblib.load('original_data.pkl')
        if suburb not in original_df['Suburb'].values:
            return None  # Return None if suburb is not found
        # Preprocess the input
        suburb_encoded = label_encoder.transform([suburb])
        suburb_scaled = scaler.transform([[suburb_encoded[0]]])

        # Make prediction
        prediction = model.predict(suburb_scaled)
        return prediction[0]

# Example usage
if __name__ == "__main__":
    model = LiveableAreaModel()
    model.train()
    
  