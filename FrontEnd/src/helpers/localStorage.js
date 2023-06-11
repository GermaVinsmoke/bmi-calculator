import axios from 'axios';

export const getDataAxios = async (key) => {
	if (key === 'lastState') {
		try {
			const response = await axios.get('http://localhost:8000/lastState');
			const lastState = [{ bmi: response.data.bmi, date: response.data.date, height: response.data.height, id: response.data.id, weight: response.data.weight }];
			return lastState;
		} catch (error) {
			console.error(`Error getting item ${key} from localStorage`, error);
			throw error; // Re-throw the error to propagate it to the caller
		}
	} else if (key === 'data') {
		try {
			const response = await axios.get('http://localhost:8000/data');
			return response.data;
		} catch (error) {
			console.error(`Error getting item ${key} from localStorage`, error);
			throw error; // Re-throw the error to propagate it to the caller
		}
	}
};

export const storeData = (key, item) => {
	if (!localStorage) return;

	try {
		return localStorage.setItem(key, JSON.stringify(item));
	} catch (err) {
		console.error(`Error storing item ${key} to localStorage`, err);
	}
};

export const storeDataAxios = async (key, item) => {
	try {
		const res = await axios.post('http://localhost:8000', item);
		console.log(res);
	} catch (error) {
		console.log(error);
	}
};