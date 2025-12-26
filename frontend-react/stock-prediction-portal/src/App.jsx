import { useState } from "react";
import "./assets/css/style.css";
import Header from "./assets/components/Header";
import Main from "./assets/components/Main";
import Footer from "./assets/components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./assets/components/Register";
import Login from "./assets/components/Login";
import AuthProvider from "./assets/components/AuthProvider";
import Dashboard from "./assets/components/dashboard/Dashboard";
import PrivateRoute from "./assets/components/PrivateRoute";
import PublicRoute from "./assets/components/PublicRoute";
function App() {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
						<Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
						<Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
					</Routes>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		
		</>
	);
}

export default App;
