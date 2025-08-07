from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from MaximumPrice import MaximumPrice
import pandas as pd
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
import numpy as np
from LiveableAreaModel import LiveableAreaModel
from SuburbModel import SuburbModel

# Initialize FastAPI app and model
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # URL of React application
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the polynomial price model
price_model = MaximumPrice()
liveable_model = LiveableAreaModel()

suburb_model = SuburbModel()

suburb_model.train()

@app.get("/")
async def root():
    return {"message": "Welcome to the House Price Prediction API"}

@app.get("/maximumprice/predict/{distance}")
async def predict_price(distance: float):
    price = price_model.predict(distance)
    return {"predicted_price": round(price, 2)}



@app.get("/maximumprice/curve-data")
async def get_curve_data():
    # Load the dataset
    df = pd.read_csv('data/maximumprice.csv')

    size = 1
    # grouping distances with the interval of 1 into one group and take the highest price
    df["group"] = np.floor(df["Distance"]/size) * size
    groupmax = df.groupby("group")['Price'].max().reset_index()

    #training the model
    X_distance_group = groupmax['group'].values.reshape(-1,1)
    y_price = groupmax['Price']

    poly = PolynomialFeatures(degree=2, include_bias=False)
    X_poly = poly.fit_transform(X_distance_group)

    reg = LinearRegression()
    reg.fit(X_poly, y_price)

    X_vals = np.linspace(X_distance_group.min(),X_distance_group.max(),100).reshape(-1,1)
    X_vals_poly = poly.transform(X_vals)
    y_vals = reg.predict(X_vals_poly)

    # Prepare response data
    curve_data = [{"Distance": x[0], "Price": y} for x, y in zip(X_vals, y_vals)]
    max_price_data = [{"Distance": x[0], "Price": y} for x, y in zip(X_distance_group, y_price)]

    return {"curve_data": curve_data, "max_price_data": max_price_data}



@app.get("/liveablearea/predict/{suburb}")
async def predict_liveable_area(suburb: str):
    prediction = liveable_model.predict(suburb)
    if prediction is None: 
        prediction = "unknown"
    
    

    return {"predicted_liveable_area": prediction}
    



@app.get("/suburbmodel/predict/{landSize}/{price}")
async def predict_suburbs(landSize: int, price: int):
    # get dataframe of relevant suburbs
    suburbList = suburb_model.predict(landSize, price)
    # reformat to JSON dictionary
    suburbList = suburbList.to_dict(orient="records")
    # Get cluster centers, user input point and scaled data points for the Kmeans graph
    cluster_centers = suburb_model.model.cluster_centers_.tolist()
    scaled_input = suburb_model.scaled_input.tolist()
    data_points = suburb_model.trainingData.tolist()

    return {
        "predicted_suburbs": suburbList,
        "cluster_centers": cluster_centers,
        "scaled_input": scaled_input,
        "data_points": data_points
    }


