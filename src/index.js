const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

function fetchImg() {
	return fetch(imgUrl)
		.then(res => res.json())
		.then(json => json.message);
}

function fetchBreeds() {
	return fetch(breedUrl)
		.then(res => res.json())
		.then(json => json.message);
}

document.addEventListener('DOMContentLoaded', () => {	
	fetchImg().then(x => {
		x.forEach(img => {
			let list = document.createElement('div');
			list.innerHTML = `<img src="${img}" />`;
			document.querySelector('#dog-image-container').append(list);
		});
	})

	fetchBreeds().then(list => {
		let keys = Object.keys(list);
		keys.forEach(breed => {
			let list = document.createElement('li');
			list.innerHTML = `${breed}`;
			list.addEventListener('click', e => {
				list.style.color = 'red';
			})
			document.querySelector('#dog-breeds').append(list);
		});
	}).then(() => {
		const breedDrop = document.getElementById('breed-dropdown');
		let listOfDogs = document.querySelectorAll('#dog-breeds > li');

		breedDrop.addEventListener('change', (e) => {
			let filter = e.target.value;
			let filteredDogs = Array.from(listOfDogs)
			.filter(element => element.innerHTML[0] === filter);

			document.querySelector('#dog-breeds').innerHTML = "";

			filteredDogs.forEach(dog => {
				document.querySelector('#dog-breeds').append(dog);
			})
		})
	})
})
