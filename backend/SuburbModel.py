import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
import joblib

class SuburbModel:
    def __init__(self):
        # Import data
        self.df = pd.read_csv('data/suburbmodel.csv')

        # Remove outliers in 'Landsize' column
        landSizeMean = self.df['Landsize'].mean()
        landSizeSD = self.df['Landsize'].std()
        self.df['Z_Score'] = (self.df['Landsize'] - landSizeMean) / landSizeSD
        threshold_z = 2
        self.df = self.df[np.abs(self.df['Z_Score']) < threshold_z]
        self.df.drop(columns='Z_Score', inplace=True)  # Drop the Z-score column

        # Get data frame of desired features
        self.featureData = self.df[['Price', 'Landsize', 'Suburb']].copy()

        # Standardize our data for model use
        self.scaler = StandardScaler()
        self.trainingData = self.scaler.fit_transform(self.featureData[['Price', 'Landsize']])

        # Create K-Means Model from data
        self.model = KMeans(n_clusters=8, random_state=42)
        
        
    def train(self):
        self.model.fit(self.trainingData)  # Train the model

        # Save the trained model
        joblib.dump(self.model, 'cluster_model.pkl')
        

    def predict(self, landsize, price):
        # Load model and scale the user input
        model = joblib.load('cluster_model.pkl')
        self.scaled_input = self.scaler.transform([[price, landsize]])
        # predict what cluster the input values are part of
        cluster = model.predict(self.scaled_input)
        
        #find suburbs that exist in same cluster as user input point
        self.featureData['Cluster'] = self.model.predict(self.trainingData)
        matching_suburbs = self.featureData[self.featureData['Cluster'] == cluster[0]]
        
        # Count the frequency of each suburb in the matching data for sorting result order
        suburb_count = matching_suburbs['Suburb'].value_counts().reset_index()
        suburb_count.columns = ['Suburb', 'Frequency'] 
        
        # Sort suburbs by frequency in descending order
        sorted_suburbs = suburb_count.sort_values(by='Frequency', ascending=False)

        # Return first 20 sorted suburb results
        return sorted_suburbs.iloc[:20]
    
if __name__ == "__main__":
    model = SuburbModel()
    model.train()