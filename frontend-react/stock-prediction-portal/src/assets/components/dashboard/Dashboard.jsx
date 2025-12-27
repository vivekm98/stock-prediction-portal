import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../../axiosinstance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
	const [ticker, setTicker] = useState("");
	const [error, setError] = useState('');
	const [plot,setPlot] = useState()
	const [ma100,setMa100] = useState()
	const [ma200,setMa200] = useState()
	const [prediction,setPrediction] = useState()
	const [mse,setMse] = useState()
	const [rmse,setRmse] = useState()
	const [r2,setR2] = useState()
  const [loading,setLoading] = useState(false)
	useEffect(() => {
		const fetchProtectedData = async () => {
			try {
				const response = await axiosInstance.get("/protected-view/");
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchProtectedData();
	}, []);
	const tickerSubmit = async (e) => {
		e.preventDefault();
    setLoading(true)
		try {
			const response = await axiosInstance.post("/predict/", {
				ticker: ticker,
			});
			console.log("data:", response.data);
			const backendRoot =import.meta.env.VITE_BACKEND_ROOT
			const plotUrl = `${backendRoot}${response.data.plot_img}`
			//Set plot
			setPlot(plotUrl)
			const ma100 = `${backendRoot}${response.data.plot_100_dma}`
			setMa100(ma100)
			const ma200 = `${backendRoot}${response.data.plot_200_dma}`
			setMa200(ma200)
			const prediction = `${backendRoot}${response.data.pltot_prediction}`
			setPrediction(prediction)
			setMse(response.data.mse)
			setRmse(response.data.rmse)
			setR2(response.data.r2)
			
			if(response.data.Error){
				setError(response.data.Error);
			}
		} catch (error) {
			console.error("error request");
      
		}finally{
      setLoading(false)
    }
	};
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6 mx-auto">
					<form onSubmit={tickerSubmit}>
						<input
							type="text"
							name="ticker"
							placeholder="Enter Stock Ticker"
							required
							className="form-control mb-3"
							onChange={(e) => setTicker(e.target.value)}
						/>
						<small>{error && <div className="text-danger mb-2 text-center">{error}</div>}</small>
            {loading ?(
              <button type='submit' className='btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin /> Please Wait...</button>
            ):(
              <button type="submit" className='btn btn-info d-block mx-auto'>	See Prediction</button>
            )}
						
						
					</form>
				</div>
				<div className="prediction mt-5">
					<div className="p-5">
						{plot &&(
							<img src={plot} style={{maxWidth:'100%'}} />
						)}
					</div>
				</div>
				<div className="prediction mt-5">
					<div className="p-5">
						{ma100 && (
							<img src={ma100} style={{maxWidth:'100%'}} />
						)}
					</div>
				</div>
				<div className="prediction mt-5">
					<div className="p-5">
						{ma200 && (
							<img src={ma200} style={{maxWidth:'100%'}} />
						)}
					</div>
				</div>
				<div className="prediction mt-5">
					<div className="p-5">
						{prediction &&(
							<img src={prediction} style={{maxWidth:'100%'}} />
						)}
					</div>
				</div>
				{prediction && (
					<div className="text-light p-3">
					<h4>Model Evaluation</h4>
					<p>Mean Squared Error (MSE): {mse} </p>
					<p>Root Mean Squared Error (RMSE): {rmse} </p>
					<p>R-Squared : {r2} </p>
				</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
