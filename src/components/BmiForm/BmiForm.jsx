import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App/App.css';

const initialValues = {
	weight: '',
	height: '',
	date: '',
}

const restrictKeyList = ['-', '+'];

const BmiForm = ({ change }) => {
	const [state, setState] = useState(initialValues);

	const handleChange = e => {
		let { value, name } = e.target;
		if (value > 999) {
			value = 999;
		}
		const date = new Date().toLocaleString().split(',')[0];
		setState({
			...state,
			[name]: value,
			date
		});
	};

	const filterInput = (e, restrictKeyList) => {
		let isValidInput = restrictKeyList.some((key) => e.key === key);
		if (isValidInput) e.preventDefault();
	};

	const handleSubmit = () => {
		change(state);
		setState(initialValues);
	};

	return (
		<>
			<div className="row">
				<div className="col m6 s12">
					<label htmlFor="weight">Weight (in kg)</label>
					<input
						id="number1"
						name="weight"
						type="number"
						max={999}
						min={1}
						placeholder="50"
						value={state.weight}
						onChange={(e) => handleChange(e)}
						onKeyDown={(e) => filterInput(e, restrictKeyList)}
					/>
				</div>

				<div className="col m6 s12">
					<label htmlFor="height">Height (in cm)</label>
					<input
						id="height"
						name="height"
						type="number"
						min="1"
						max="999"
						placeholder="176"
						value={state.height}
						onChange={handleChange}
						onKeyDown={(e) => filterInput(e, restrictKeyList)}
					/>
				</div>
			</div>
			<div className="center">
				<button
					id="bmi-btn"
					className="calculate-btn"
					type="button"
					disabled={state.weight === '' || state.height === ''}
					onClick={handleSubmit}
				>
					Calculate BMI
				</button>
			</div>
		</>
	);
};

BmiForm.propTypes = {
	change: PropTypes.func.isRequired,
};

export default BmiForm;
