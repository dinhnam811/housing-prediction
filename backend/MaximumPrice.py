import pandas as pd
import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression

class MaximumPrice:
    def __init__(self):
        # Load the dataset and prepare the model
        self.df = pd.read_csv('data/maximumprice.csv')
        self.model = None
        self.poly = None
        self.prepare_model()

    def prepare_model(self):
        # Grouping distances and fitting the polynomial regression model
        size = 1
        self.df["group"] = np.floor(self.df["Distance"] / size) * size
        groupmax = self.df.groupby("group")['Price'].max().reset_index()

        X_distance_group = groupmax['group'].values.reshape(-1, 1)
        y_price = groupmax['Price']

        # Create polynomial features and fit the model
        self.poly = PolynomialFeatures(degree=2, include_bias=False)
        X_poly = self.poly.fit_transform(X_distance_group)

        self.model = LinearRegression()
        self.model.fit(X_poly, y_price)

    def predict(self, distance):
        # Prepare input for prediction
        distance_poly = self.poly.transform([[distance]])
        predicted_price = self.model.predict(distance_poly)
        return predicted_price[0]