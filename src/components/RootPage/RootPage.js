import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './RootPage.css';

function RootPage() {
	const history = useHistory ();

	useState(() => {
		localStorage.removeItem("phoneNumber");
		localStorage.removeItem("role");
		localStorage.removeItem("name");
	});

	const handleLogin = () => {
		history.push("/login");
	}

	return (
		<div className="home">
			<div className="root_page__header">
				<div className="root_page__title">
					<strong>
						Hey, Welcome to MedHustle
						<span role="img" aria-label="" alt="emojii">
							😎😎
						</span>
					</strong> <br/> <br/>
					“The dream is free, the hustle is sold separately”
					<br/> <br/>
					MedHustler Ignite now , Launch later

					<br/> <br/>
					Neet PG clinical based teaching
				</div>
			</div>
			<div className="root_page__body__root_page_div">
				<button className="root_page__body__root_page" onClick={handleLogin}>Login To Begin</button>
			</div>
		</div>
	);
}

export default RootPage;
