'use strict';

// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання,
// при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.
const userId = new URLSearchParams(location.search).get('userId');
const userURL = `https://jsonplaceholder.typicode.com/users/${userId}`;
const postsURL = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;
const postDetailsURL = new URL('./post-details.html', location.href);

const userAddressFiller = (address) => {
    document.getElementById('address-title').innerText = 'Address';
    const city = document.createElement('p');
    const street = document.createElement('p');
    const location = document.createElement('p');
    city.innerText = address.city;
    street.innerText = `${address.zipcode} - ${address.street} str. ${address.suite}`;
    location.innerText = `lat: ${address.geo.lat}, long: ${address.geo.lng}`;
    
    document.getElementById('address').append(city, street, location);
}
const userCompanyFiller = (company) => {
    document.getElementById('company-title').innerText = 'Company';
    const name = document.createElement('h5');
    const catchPhrase = document.createElement('p');
    const bs = document.createElement('p');
    name.innerText = company.name;
    catchPhrase.innerText = company.catchPhrase;
    bs.innerText = company.bs;
    
    document.getElementById('company').append(name, catchPhrase, bs);
}
const userContactsFiller = (contacts) => {
    document.getElementById('contacts-title').innerText = 'Contacts';
    const website = document.createElement('p');
    const email = document.createElement('p');
    const phone = document.createElement('p');
    website.innerHTML = `<i>website:</i> ${contacts.website}`;
    email.innerHTML = `<i>email:</i> ${contacts.email}`;
    phone.innerHTML = `<i>phone:</i> ${contacts.phone}`;
    
    document.getElementById('contacts').append(website, email, phone);
}
const collapseBtnCreator = () => {
    const btn = document.createElement('button');
    btn.className = 'collapse-btn';
    btn.innerHTML = `Post of current user`;
    
    return btn;
}

const collapseBtn = collapseBtnCreator();
const postsDiv = document.getElementById('posts');

const postDetailsBtnCreator = (id) => {
    postDetailsURL.searchParams.set('postId', id);
    const postDetailsBtn = document.createElement('a');
    postDetailsBtn.className = 'details-btn btn btn-success';
    postDetailsBtn.innerText = 'Details';
    postDetailsBtn.target = '_blank';
    postDetailsBtn.href = postDetailsURL.href;
    
    return postDetailsBtn;
}
const postTitleCreator = (id, title) => {
    const postTitleWrap = document.createElement('div');
    const postTitle = document.createElement('h5');
    postTitleWrap.className = 'post-title';
    postTitle.innerText = title;
    postTitleWrap.append(postTitle, postDetailsBtnCreator(id));
    
    return postTitleWrap;
}
collapseBtn.addEventListener('click', (e) => {
    collapseBtn.classList.toggle('collapsed');
    postsDiv.classList.toggle('show');
})

async function userDetailsCreator() {
    const {
        id,
        name,
        username,
        address,
        company,
        website,
        email,
        phone
    } = await fetch(userURL).then(res => res.json()).then(user => user);
    const posts = await fetch(postsURL).then(res => res.json()).then(posts => posts);
    console.log(posts);
    
    document.getElementById('user-id-hash').innerText = `#${id}`;
    document.getElementById('user-title').innerText = `${name} aka "${username}"`;
    userAddressFiller(address);
    userCompanyFiller(company);
    userContactsFiller({website, email, phone});
    document.getElementById('btn-wrapper').appendChild(collapseBtn);
    
    for (const {title, id} of posts) {
        postsDiv.appendChild(postTitleCreator(id, title));
    }
}

userDetailsCreator();
