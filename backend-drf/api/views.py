from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockSerializer
from rest_framework import status
from rest_framework.response import Response
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import os
from django.conf import settings
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error,r2_score
# Create your views here.

class StockPredictionView(APIView):
    def post(self,request):
        serializer = StockSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']
            now = datetime.now()
            start = datetime(now.year-10,now.month,now.day)
            end = now
            df = yf.download(ticker,start,end)
            if df.empty:
                return Response({'Error':'No data found for the given ticker','status':status.HTTP_404_NOT_FOUND})
            df = df.reset_index()
            #Generate Plot
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label="Closing Price")
            plt.title(f"closing price of {ticker}")
            plt.xlabel("days")
            plt.ylabel("Close Price")
            plt.legend()
            # save plot
            plot_img_path = f'{ticker}_plot.png'
            plot_img = save_plot(plot_img_path)
            # 100 Days Moving AVG
            ma100 = df.Close.rolling(100).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label="Closing Price")
            plt.plot(ma100,'r',label = '100 Days Moving AVG')
            plt.title(f"closing price of {ticker}")
            plt.xlabel("days")
            plt.ylabel("Close Price")
            plt.legend()
            plot_img_path = f'{ticker}_100_dma.png'
            plot_100_dma = save_plot(plot_img_path)

            # 200 dAYS moving AVG
            ma200 = df.Close.rolling(200).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label="closing Price")
            plt.plot(ma200,'g',label='200 Day moving AVG')
            plt.plot(ma100,'r',label='100 Day moving AVG')
            plt.title(f"200 days closing price {ticker}")
            plt.xlabel("days")
            plt.ylabel("Close Price")
            plt.legend()
            plot_img_path = f'{ticker}_200_dma.png'
            pltot_200_dma = save_plot(plot_img_path)

            # Split data Training and testing
            data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)])
            data_testing = pd.DataFrame(df.Close[int(len(df)*0.7):int(len(df))])

            #Scaling down data between 0 and 1
            scaler = MinMaxScaler(feature_range=(0,1))
            #Load Model
            model = load_model('stock_prediction_model.keras')
            # Prepare test data
            past_100_days = data_training.tail(100)
            final_df = pd.concat([past_100_days,data_testing],ignore_index=True)
            input_data = scaler.fit_transform(final_df)
            x_test = []
            y_test = []
            for i in range(100,input_data.shape[0]):
                x_test.append(input_data[i-100:i])
                y_test.append(input_data[i,0])
            
            #Convert to NumPy Array
            x_test,y_test = np.array(x_test),np.array(y_test)
            # Making Prediction 
            y_predicted = model.predict(x_test)

            # revert scaled price to origional
            y_predicted =scaler.inverse_transform(y_predicted.reshape(-1,1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1,1)).flatten()

            #Plot the Final Prediction
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(y_test,'b',label="origional Price")
            plt.plot(y_predicted,'r',label='Predicted Price')
            plt.title(f"Final Prediction {ticker}")
            plt.xlabel("days")
            plt.ylabel("Price")
            plt.legend()
            plot_img_path = f'{ticker}_final_prediction.png'
            pltot_prediction = save_plot(plot_img_path)
            # Model Evaluation
            # Mean Square Error (MSE)
            mse = mean_squared_error(y_test,y_predicted)
            # Root mean square error
            rmse = np.sqrt(mse)
            # R-squared
            r2 = r2_score(y_test,y_predicted)

            return Response({'status':'success',
                             'plot_img':plot_img,
                             'plot_100_dma':plot_100_dma,
                             'plot_200_dma':pltot_200_dma,
                             'pltot_prediction':pltot_prediction,
                             'mse':mse,
                             'rmse':rmse,
                             'r2':r2
                             })
