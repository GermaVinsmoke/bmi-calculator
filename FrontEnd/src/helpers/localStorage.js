import axios from 'axios';

export const getData = (key) => {
	if (!localStorage) return;
	if (key === 'lastState') {
		let lastState = [];
		axios.get('http://localhost:8000/lastState').then(response => {
			lastState.push({bmi: response.data.bmi, date: response.data.date, height: response.data.height, id: response.data.id, weight: response.data.weight });
		});
		return lastState;
	} else if (key === 'data') {
		let data = [];
		axios.get('http://localhost:8000/data').then(response => {
			data.push(response.data);
		});
		console.log(data);
		return data;
		// try {
		// 	return JSON.parse(localStorage.getItem(key));
		// } catch (err) {
		// 	console.error(`Error getting item ${key} from localStorage`, err);
		// }
	};
}

export const storeData = async (key, item) => {
	if (!localStorage) return;

	try {
		const res = await axios.post('http://localhost:8000', item);
		console.log(res);
		return localStorage.setItem(key, JSON.stringify(item));
	} catch (err) {
		console.error(`Error storing item ${key} to localStorage`, err);
	}
};
