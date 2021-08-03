import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AddQuestion from './components/AddQuestion/AddQuestion';
import Category from './components/Category/Category';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import RootPage from './components/RootPage/RootPage';

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={RootPage} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/api/*" component={Category} />
					<Route exact path="/addquestion" component={AddQuestion} />
					<Route exact path="/register" component={Register} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
