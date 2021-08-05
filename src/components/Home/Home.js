import React, { useEffect, useState } from 'react';
import { getAllCategory } from '../../helper/helper';
import { Link, useHistory } from 'react-router-dom';
import './Home.css';
import Loader from 'react-loader-spinner';

function Home() {
	const [allCategory, setAllCategory] = useState([]);
	const [rawAllCategory, setRawAllCategory] = useState([]);
	const [loading, setLoading] = useState(true);
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const [loggedInUserRole, setLoggedInUserRole] = useState('');
	const [name, setName] = useState('');
	const history = useHistory ();

	useEffect(() => {
		const phoneNumber = localStorage.getItem("phoneNumber");
		if ((phoneNumber == '') || (phoneNumber == null)) {
			history.push("/");
		}

	  	const loggedInUserRole = localStorage.getItem("role");
	  	setLoggedInUserRole(loggedInUserRole);

	  	const name = localStorage.getItem("name");
	  	if ((name == null) || (name == '')) {
	  		setName(" ");
	  	} else {
	  		setName(name);
	  	}

		preloadAllCategory();
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("phoneNumber");
		localStorage.removeItem("role");
		localStorage.removeItem("name");
		history.push("/");
	}

	const preloadAllCategory = async () => {
		await getAllCategory()
			.then((response) => {
				setAllCategory(response.categories);
				setRawAllCategory(response.categories);
				setLoading(false);
			})
			.catch((error) => console.error(error));
	};

	const handleAddCategory = () => {
		history.push('/addcategory');
	}

	const handleAddQeustion = () => {
		history.push('/addquestion');
	}

	const handleRegister = () => {
		history.push('/register');
	}

	const handleSearchEventWithValue = async (searchValue) => {
		if ((searchValue == '') && (searchValue.length == 0)) {
			setAllCategory(rawAllCategory);
		} else {
			let newCategoryResults = [];
			for (const [index, category] of Object.entries(allCategory)) {
				if (category.name.includes(searchValue)) {
					newCategoryResults.push(category);
				}
			}

			await setAllCategory(newCategoryResults);
		}
	}

	const showBottomMenu = () => {
		if (loggedInUserRole == 'admin') {
			return (
				<div className="home__body__admin_div">
					<button className="home__body__admin" onClick={handleAddCategory}>Add Category</button>
					<button className="home__body__admin" onClick={handleAddQeustion}>Add Question</button>
					<button className="home__body__admin" onClick={handleRegister}>Register</button>
				</div>
			)
		} else {
			return '';
		}
	}

	return (
		<div className="home">
			<div className="home__header">
				<div className="home__body__logout_div">
				</div>
				<div className="home__title">
					<strong>
						Hey {name.slice(0, name.indexOf(' '))}
						<span role="img" aria-label="" alt="emojii">
							😎😎
						</span>
					</strong>{' '}
					Let's test your Knowledge
				</div>
				<div>
					<div className="home__body__logout_div">
						<button className="home__body__logout" onClick={handleLogout}>Logout</button>
					</div>
				</div>
			</div>
			<div className="home_search_div">
				<input 
					className="home_search" 
					type="text" 
					placeholder="Search.." 
					onChange={(e) => {
						handleSearchEventWithValue(e.target.value);
					}}/>
			</div>
			<div className="home__body">
				{loading ? (
					<Loader type="Oval" color="#00BFFF" height={50} width={50} />
				) : (
					''
				)}
				{allCategory.map((category) => (
					<Link
						key={category._id}
						className="home__body_block"
						style={{ backgroundColor: category.bgColor }}
						// onClick={() => handleClick(category)}
						to={'/api/' + category._id}
					>
						<div className="home__body_block_img">
							<img src={"http://localhost:5050/" + category.logo} alt={category.name} />
						</div>
						<div className="home__body_block_title_wrapper">
							<div className="home__body_block_title">{category.name}</div>
						</div>
					</Link>
				))}
			</div>
			{showBottomMenu()}
		</div>
	);
}

export default Home;
