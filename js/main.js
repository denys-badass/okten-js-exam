'use strict';

// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html,
// котра має детальну інфорацію про об'єкт на який клікнули
const usersURL = new URL('https://jsonplaceholder.typicode.com/users');
const detailsURL = new URL('./user-details.html', location.href);
const usersWrapper = document.getElementById('user-wrapper');

const detailsButtonCreator = (id) => {
    detailsURL.searchParams.set('userId', id);
    const detailsButton = document.createElement('a');
    detailsButton.className = 'details-btn btn btn-success';
    detailsButton.innerText = 'Details';
    detailsButton.target = '_blank';
    detailsButton.href = detailsURL.href;
    
    return detailsButton;
}

const userDivCreator = (id, name) => {
    const userDiv = document.createElement('div');
    userDiv.className = 'user-div col-5 p-3';
    const userId = document.createElement('h4');
    const userName = document.createElement('p');
    const detailsButton = detailsButtonCreator(id);
    
    userId.innerText = `User #${id}`;
    userName.innerText = name;
    userDiv.append(userId, userName, detailsButton);
    
    return userDiv;
}

fetch(usersURL)
    .then(response => response.json())
    .then((users) => {
        for (const {id, name} of users) {
            usersWrapper.appendChild(userDivCreator(id, name));
        }
    });
