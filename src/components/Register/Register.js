import React, { useEffect, useState } from 'react';
import { registerUsingDetails } from '../../helper/helper';
import { Link, useHistory } from 'react-router-dom';
import './Register.css';
import Loader from 'react-loader-spinner';

function Register() {
	const [user, setUser] = useState([]);
	const [loading, setLoading] = useState(false);
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const [loggedInUserRole, setLoggedInUserRole] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [role, setRole] = useState('');
	const history = useHistory();

	useEffect(() => {
		if ((name.length > 0) || (email.length > 0) || (phoneNumber.length > 0) || (role.length > 0)) {
			return; 
		}

		const localPhoneNumber = localStorage.getItem("phoneNumber");
		if ((localPhoneNumber == '') || (localPhoneNumber == null)) {
			history.push("/");
	    }

	  	const loggedInUserRole = localStorage.getItem("role");
	  	setLoggedInUserRole(loggedInUserRole);

	  	if (loggedInUserRole != 'admin') {
	  		history.push("/home");
	  	}

	}, []);
	
	const validateEmail = (email) => {
	    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}

	const handleRegister = async () => {
		if ((name.length <= 0) || (email.length <= 0) || (phoneNumber.length <= 0) || (role.length <= 0)) {
			alert("Please enter all the details!");
			return;
		}

		if (!validateEmail(email)) {
			alert("Please enter valid email!");	
			return;
		}

		if ((role != "admin") && (role != "user")) {
			alert("Please choose role as `admin` or `user`!");		
			return;
		}

		setLoading(true);
		var data = {};
		data['name'] = name;
		data['email'] = email;
		data['phoneNumber'] = phoneNumber;
		data['role'] = role;
		
		await registerUsingDetails(data).then((response) => {
			setLoading(false);
			if (response.error) {
				console.error(response.error);
				alert('Please provide accurate information! ');
			} else {
				alert('User addded!');
				setName('');
				setEmail('');
				setPhoneNumber('');
				setRole('');
			}
		});
	}

	const handleBackButton = () => {
		history.go(-1);
	}

	return (
		<div className="home">
			<div className="register__header">
				<div className="register_back_div"> 
					<button className="register_back" onClick={handleBackButton}> Home </button>
				</div>
				<div className="register__title">
					<strong>
						Hey Admin, Welcome to MedHustle
						<span role="img" aria-label="" alt="emojii">
							😎😎
						</span>
					</strong> <br/> <br/>
					Enter all the details... 
				</div>
				<div className="register_back_div"> 
				</div>
			</div>
			<div className="register__body">
				{loading ? (
					<Loader type="Oval" color="#00BFFF" height={50} width={50} />
				) : (
					''
				)}
				<div className="register__wrapper">
					<input
						placeholder="Name"
						onChange={(e) => {
							setName(e.target.value);
						}}
						value={name}
						type="text"
					/>
					<input
						placeholder="Email"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						value={email}
						type="text"
					/>
					<input
						placeholder="Phone Number"
						onChange={(e) => {
							setPhoneNumber(e.target.value);
						}}
						value={phoneNumber}
						type="text"
					/>
					<input
						placeholder="Role"
						onChange={(e) => {
							setRole(e.target.value);
						}}
						value={role}
						type="text"
					/>
					<div className="register__body__register_div">
						<button className="register__body__register" onClick={handleRegister}>Register</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register;
