"use strict";var anchors=[].slice.call(document.querySelectorAll('a[href*="#"]')),animationTime=7e3,framesCount=1200;anchors.forEach(function(o){o.addEventListener("click",function(e){e.preventDefault();var t=document.querySelector(o.getAttribute("href")).getBoundingClientRect().top+window.pageYOffset,n=setInterval(function(){var e=t/framesCount;e>window.pageYOffset-t&&window.innerHeight+window.pageYOffset<document.body.offsetHeight?window.scrollBy(0,e):(window.scrollTo(0,t),clearInterval(n))},animationTime/framesCount)})}),document.addEventListener("DOMContentLoaded",function(){var t=document.querySelector(".page"),n=document.querySelector(".subscription-form"),e=document.querySelectorAll('.button[data-action="open-modal"]');document.querySelector('.button[data-action="submit-form"]');function o(e){e.preventDefault(),t.classList.add("show-modal"),window.addEventListener("keydown",a)}function r(){t.classList.remove(".show-modal"),window.removeEventListener("keydown",a)}function a(e){"Escape"===e.code&&r()}e.forEach(function(e){e.addEventListener("click",o)}),n.addEventListener("submit",function(e){if("BUTTON"!==e.target.nodeName)return;t.preventDefault(),r(),n.reset(),console.log(e);var t})});