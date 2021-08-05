import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addCategory, getAllCategory } from '../../helper/helper';
import './AddCategory.css';
import Loader from 'react-loader-spinner';
import { SketchPicker } from 'react-color';

function AddCategory() {
	const [loading, setLoading] = useState(false);
	const [allCategory, setAllCategory] = useState([]);
	const [userLoggedIn, setUserLoggedIn] = useState(true);
	const [loggedInUserRole, setLoggedInUserRole] = useState('');
	const history = useHistory();

	const [result, setResult] = useState({
		error: '',
		message: '',
	});

	const [input, setInput] = useState({
		category: '',
		newCategoryName: '',
		image: '',
		categoryBackgroundColor: ''
	});
	
	useEffect(() => {
		const phoneNumber = localStorage.getItem("phoneNumber");
	    if ((phoneNumber == '') || (phoneNumber == null)) {
			history.push("/");
	    }

	  	const loggedInUserRole = localStorage.getItem("role");
	  	setLoggedInUserRole(loggedInUserRole);
	  	if (loggedInUserRole != 'admin') {
			history.push("/home");
	    }

  		preloadAllCategories();	
	}, []);
	

	const preloadAllCategories = async () => {
		setLoading(true);
		await getAllCategory().then((response) => {
			setLoading(false);
			if (response.error) {
				console.error(response.error);
				return;
			}

			setInput({ ...input, category: response.categories[0]._id });
			setAllCategory(response.categories);
		});
	};

	const handleButtonAddCategory = () => {
		if (input.newCategoryName.length <= 0) {
			alert('Please enter a category name');
			return;
		}

		var categoryAlreadyPresent = false;
		for (const [index, category] of Object.entries(allCategory)) {
			if (category.name === input.newCategoryName) {
				categoryAlreadyPresent = true;
				break;
			}
		}

		if (categoryAlreadyPresent) {
			alert('Category name already present, please choose different name!');
			return;
		}

		if ((input.image == '') || (input.image == null)) {
			alert('Please choose image');
			return;
		}

		if ((input.categoryBackgroundColor == '') || (input.categoryBackgroundColor.hex == '')) {
			alert('Please choose color code');
			return;
		}

		setLoading(true);

		var formData = new FormData();
		formData.append('name', input.newCategoryName);
		formData.append('bgColor', input.categoryBackgroundColor.hex);
		formData.append('logo', input.image);
		
		setTimeout(function () {
	        addCategoryToDB(formData);
	    }, 2000);
	};

	const handleBackButton = () => {
		history.go(-1);
	}

	const showImage = () => {
		if (('image' in input) && (input.image != '')) {
			return URL.createObjectURL(input.image);
		}
	}

	const addCategoryToDB = async (formData) => {
		await addCategory(formData)
			.then((response) => {
				setLoading(false);
				if (response.error) {
					setResult({ ...result, error: response.error });
					return;
				}
				setResult({ ...result, message: response.message });
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	};

	return (
		<div className="addcategory">
			{loading ? (
				<Loader style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(16, 16, 16, 0.5)', justifyContent: 'center',
  alignItems: 'center' }} type="Oval" color="#00BFFF" height={50} width={50} />
			) : (
				''
			)}
			<div className="addcategory_container">
				<div className="addcategory_message">
					{result.message ? (
						<div className="addcategory_sucess">{result.message}</div>
					) : (
						''
					)}
					{result.error ? (
						<div className="addcategory_error">{result.error}</div>
					) : (
						''
					)}
				</div>
				<div className="addcategory_back_div"> 
					<button className="addcategory_back" onClick={handleBackButton}> Home </button>
				</div>
				<div className="addcategory_header">
					<div className="addcategory_title">Add New Category</div>
				</div>
				<div className="addcategory_form">
					<div className="form_category">
						<label htmlFor="categories">Check existing categories here...</label>
						<select
							onChange={(e) => {
								setInput({ ...input, category: e.target.value });
							}}
							id="categories"
						>
							{allCategory.map((category) => (
								<option key={category._id} value={category._id}>
									{category.name}
								</option>
							))}
						</select>
					</div>

					<div className="form_question">
						<div className="form_image">
							<label htmlFor="image">
								Select image for category
							</label>
							<input type="file" 
								id="categoryImage" 
								accept='image/*' 
								name="filename" 
								onChange={(e) => {
									setInput({ ...input, image: e.target.files[0] });
							}}/>

							<img className="addcategory_image" src={ showImage() } />
						</div>
						<div className="form_option">
							<input
								type="text"
								value={input.newCategoryName}
								onChange={(e) => {
									setInput({ ...input, newCategoryName: e.target.value });
								}}
								placeholder="Enter category name"
							/>
						</div>
						<div className="form__explaination">
							<label htmlFor="explaination">Select background color</label>
							<SketchPicker 
								color={ input.categoryBackgroundColor }
        						onChangeComplete={(colorCode) => {
        							setInput({ ...input, categoryBackgroundColor: colorCode })
        						}}
        					/>
						</div>
						<div className="form_button">
							<button onClick={handleButtonAddCategory}>Add Category</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddCategory;
