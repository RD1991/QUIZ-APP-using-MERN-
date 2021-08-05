// api-quiz-endpoints.herokuapp.com

export const getAllCategory = () => {
	return fetch(`http://localhost:5050/api/allCategory`, {
		method: 'GET',
	})
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

export const getAllQuestionByCategory = (categoryId) => {
	return fetch(`http://localhost:5050/api/get/${categoryId}`)
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

export const getCategoryById = (categoryId) => {
	return fetch(
		`http://localhost:5050/api/category/${categoryId}`,
	)
		.then((response) => response.json())
		.catch((error) => console.error(error));
};

export const addQuestion = (question) => {
	return fetch(
		`http://localhost:5050/api/add/5f4a5663751a87977cda2fc3`,
		{
			method: 'POST',
			body: question,
		},
	)
		.then((docs) => {
			return docs.json();
		})
		.catch((error) => console.log(error));
};

export const addCategory = (category) => {
	return fetch(
		`http://localhost:5050/api/addCategory`,
		{
			method: 'POST',
			body: category,
		},
	)
		.then((docs) => {
			return docs.json();
		})
		.catch((error) => console.log(error));
};

export const loginUsingDetails = (phoneNumber) => {
	return fetch(
		`http://localhost:5050/api/user/${phoneNumber}`,
	)
		.then((response) => {
			return response.json();
		})
		.catch((error) => console.log(error));
};

export const registerUsingDetails = (data) => {
	return fetch(
			`http://localhost:5050/api/registerUser`,
			{
				method: 'POST',
				headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json'
			    },
				body: JSON.stringify(data),
			},
		)
		.then((docs) => {
			return docs.json();
		})
		.catch((error) => console.log(error));
}