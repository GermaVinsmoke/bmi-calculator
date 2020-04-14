export const getItem = (key) => {
	if (!localStorage) return;

	try {
		return JSON.parse(localStorage.getItem(key));
	} catch (err) {
		console.error(`Error getting item ${key} from localStorage`, err);
	}
};

export const storeItem = (key, item) => {
	if (!localStorage) return;

	try {
		return localStorage.setItem(key, JSON.stringify(item));
	} catch (err) {
		console.error(`Error storing item ${key} to localStorage`, err);
	}
};
