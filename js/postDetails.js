'use strict';

// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост,
// вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
const postId = new URLSearchParams(location.search).get('postId');

const endPointUrl = new URL('https://jsonplaceholder.typicode.com');
const postUrl = new URL(`posts/${postId}`, endPointUrl);
const userUrl = new URL('users', endPointUrl);
const commentsUrl = new URL(`${postId}/comments`, postUrl);

const commentCreator = (name, email, body) => {
    const commentHeader = document.createElement('div');
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    const commentTitle = document.createElement('h4');
    const senderEmail = document.createElement('p');
    commentTitle.innerText = name;
    senderEmail.innerHTML = `by <a href="mailto:${email}" target="_blank">${email}</a>`;
    commentHeader.append(commentTitle, senderEmail);
    const commentBody = document.createElement('p');
    commentBody.innerText = body;
    commentDiv.append(commentHeader, commentBody);
    
    return commentDiv;
}

async function postDetailsCreator() {
    const {id, body, title, userId} = await fetch(postUrl).then(res => res.json()).then(post => post);
    const {username} = await fetch(`${userUrl}/${userId}`).then(res => res.json()).then(user => user);
    const comments = await fetch(commentsUrl).then(res => res.json()).then(comments => comments);
    
    document.getElementById('post-id-hash').innerText = `Post #${id}`;
    document.getElementById('post-header').innerText = title;
    document.getElementById('post-body').innerText = body;
    document.getElementById('user-posted').innerHTML = `posted by <strong>${username}</strong>`;
    document.getElementById('comments').innerText = 'Comments:';
    
    for (const {name, body, email} of comments) {
        document.getElementById('comments-wrapper').appendChild(commentCreator(name, email, body));
    }
}

postDetailsCreator();