import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addQuestion, getAllCategory } from '../../helper/helper';
import './AddQuestion.css';
import Loader from 'react-loader-spinner';

function AddQuestion() {
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
		question: '',
		image: '',
		options: [],
		ans: 1,
		explaination: '',
	});
	const [optionValue, setOptionValue] = useState({
		option0: '',
		option1: '',
		option2: '',
		option3: '',
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

	const handleButtonAddQuestion = () => {
		setLoading(true);
		let tempArr = [];
		tempArr.push(optionValue.option0);
		tempArr.push(optionValue.option1);
		tempArr.push(optionValue.option2);
		tempArr.push(optionValue.option3);

		let formData = new FormData();
		formData.append('category', input.category);
		formData.append('question', input.question);
		formData.append('image', input.image);
		for (var i = 0; i < tempArr.length; i++) {
		    formData.append('options[]', tempArr[i]);
		}
		formData.append('ans', input.ans);
		formData.append('explaination', input.explaination);

		setTimeout(function () {
	        addQuestionToDB(formData);
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

	const addQuestionToDB = async (formData) => {
		await addQuestion(formData)
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
		<div className="addques">
			{loading ? (
				<Loader style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(16, 16, 16, 0.5)', justifyContent: 'center',
  alignItems: 'center' }} type="Oval" color="#00BFFF" height={50} width={50} />
			) : (
				''
			)}
			<div className="addques_container">
				<div className="addques_message">
					{result.message ? (
						<div className="addques_sucess">{result.message}</div>
					) : (
						''
					)}
					{result.error ? (
						<div className="addques_error">{result.error}</div>
					) : (
						''
					)}
				</div>
				<div className="addques_back_div"> 
					<button className="addques_back" onClick={handleBackButton}> Home </button>
				</div>
				<div className="addques_header">
					<div className="addques_title">Contribute Question 🖊🖊</div>
				</div>
				<div className="addques_form">
					<div className="form_category">
						<label htmlFor="categories">Select the Category</label>
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
						<label htmlFor="question">Question</label>
						<textarea
							id="question"
							onChange={(e) => {
								setInput({ ...input, question: e.target.value });
							}}
							value={input.question}
						/>
						<div className="form_image">
							<label htmlFor="image">
								If question Contains any Image (<i>Optional</i>)
							</label>
							<input type="file" 
								id="questionImage" 
								accept='image/*' 
								name="filename" 
								onChange={(e) => {
									setInput({ ...input, image: e.target.files[0] });
							}}/>

							<img className="addques_image" src={ showImage() } />
						</div>
						<div className="form_option">
							<input
								type="text"
								value={optionValue.option0}
								onChange={(e) => {
									setOptionValue({ ...optionValue, option0: e.target.value });
								}}
								placeholder="Enter option 1"
							/>
							<input
								type="text"
								value={optionValue.option1}
								onChange={(e) => {
									setOptionValue({ ...optionValue, option1: e.target.value });
								}}
								placeholder="Enter option 2"
							/>
							<input
								type="text"
								value={optionValue.option2}
								onChange={(e) => {
									setOptionValue({ ...optionValue, option2: e.target.value });
								}}
								placeholder="Enter option 3"
							/>
							<input
								type="text"
								value={optionValue.option3}
								onChange={(e) => {
									setOptionValue({ ...optionValue, option3: e.target.value });
								}}
								placeholder="Enter option 4"
							/>
						</div>
						<div className="form_ans">
							<label htmlFor="ans">Enter the Option Number</label>
							<input
								id="ans"
								type="number"
								min="1"
								max="4"
								placeholder="Enter the Option Number"
								value={input.ans}
								onChange={(e) => {
									setInput({ ...input, ans: e.target.value });
								}}
							/>
						</div>
						<div className="form__explaination">
							<label htmlFor="explaination">Enter the explaination</label>
							<textarea
								onChange={(e) => {
									setInput({ ...input, explaination: e.target.value });
								}}
								value={input.explaination}
								id="explaination"
							/>
						</div>
						<div className="form_button">
							<button onClick={handleButtonAddQuestion}>Add Question</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddQuestion;
