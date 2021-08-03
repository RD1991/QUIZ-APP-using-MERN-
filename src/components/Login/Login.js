import React, { useEffect, useState } from 'react';
import { loginUsingDetails } from '../../helper/helper';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import Loader from 'react-loader-spinner';

function Login() {
	const [user, setUser] = useState([]);
	const [loading, setLoading] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const history = useHistory ();

	useEffect(() => {
		const phoneNumber = localStorage.getItem("phoneNumber");
		if ((phoneNumber != '') && (phoneNumber != null)) {
			history.push("/home");
	    }
	}, []);

	const handleLogin = async () => {
		if (phoneNumber.length > 0) {
			setLoading(true);
			await loginUsingDetails(phoneNumber).then((response) => {
				setLoading(false);
				if (response.error) {
					console.error(response.error);
					return;
				}

				if (response.user.length > 0) {
					const user = response.user[0];
					localStorage.setItem('phoneNumber', user.phoneNumber);
					localStorage.setItem('role', user.role);
					localStorage.setItem('name', user.name);
					history.push("/home");
				} else {
					alert('No user found!');
				}
				
			});
		}
	}

	return (
		<div className="home">
			<div className="login__header">
				<div className="login__title">
					<strong>
						Hey, Welcome to MedHustle
						<span role="img" aria-label="" alt="emojii">
							😎😎
						</span>
					</strong> <br/> <br/>
					Please login to continue
				</div>
			</div>
			<div className="login__body">
				{loading ? (
					<Loader type="Oval" color="#00BFFF" height={50} width={50} />
				) : (
					''
				)}
				<div className="login__wrapper">
					<input
						placeholder="Phone Number"
						onChange={(e) => {
							setPhoneNumber(e.target.value);
						}}
						value={phoneNumber}
						type="text"
					/>
					<div className="login__body__login_div">
						<button className="login__body__login" onClick={handleLogin}>Login</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
