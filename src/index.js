import $ from "jquery";
window.jQuery = $;
window.$ = $;
import './scss/style.scss';
import './index.html';
import './politic.html';

import imgPng from './img/javascript.png';
import imgJpg from './img/2f7edb2f4c7bfacb00826.jpg';
import big from './img/JSBig.png';
// import './jquery-plugins/fm.revealator.jquery.min.css';
// import './jquery-plugins/fm.revealator.jquery.min';
// import './jquery-plugins/jquery.gmap.min';
// import './jquery-plugins/jquery.spincrement.min';
// import './jquery-plugins/loadingoverlay.min';


const mess = "World";
console.log(`Hello, ${mess}`);
const container = document.querySelector('.container');
const btn = document.getElementById('click');
btn.addEventListener('click', (e) => {
    btn.textContent = mess;
});
const imgContainer =document.createElement('div');
imgContainer.innerHTML = `
        <img src="${imgJpg}" width="400">
        <img src="${imgPng}" width="400">
        <img src="${big}" width="400">
`;
container.append(imgContainer);
$('h1').fadeOut(3000);