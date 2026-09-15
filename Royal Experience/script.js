/*=================================
        ROYAL EXPERIENCE
=================================*/

// فتح الباب

const enterBtn = document.getElementById("enter");
const loading = document.getElementById("loading");
const leftDoor = document.querySelector(".left-door");
const rightDoor = document.querySelector(".right-door");
const website = document.getElementById("website");

if (enterBtn) {

enterBtn.addEventListener("click", () => {

leftDoor.style.transform = "translateX(-100%)";

rightDoor.style.transform = "translateX(100%)";

setTimeout(() => {

loading.style.display = "none";

website.style.display = "block";

website.style.opacity = "0";

setTimeout(() => {

website.style.transition = "1.2s";

website.style.opacity = "1";

},100);

},1800);

});

}

/*=============================
     Sticky Navbar
=============================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY>80){

navbar.style.background="rgba(0,0,0,.95)";

navbar.style.transition=".4s";

}

else{

navbar.style.background="rgba(0,0,0,.35)";

}

});

/*=============================
      Scroll Animation
=============================*/

const sections=document.querySelectorAll("section");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{threshold:.2});

sections.forEach(section=>{

section.classList.add("hidden");

observer.observe(section);

});

/*=============================
      Active Navbar
=============================*/

const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop-150;

const sectionHeight=section.clientHeight;

if(pageYOffset>=sectionTop){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/*=============================
      Button Hover Effect
=============================*/

const buttons=document.querySelectorAll(".btn,.about-btn,.reserve-btn");

buttons.forEach(button=>{

button.addEventListener("mouseenter",()=>{

button.style.transform="translateY(-5px)";

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translateY(0px)";

});

});

/*=============================
      Gallery Hover
=============================*/

const gallery=document.querySelectorAll(".gallery-item img");

gallery.forEach(img=>{

img.addEventListener("mouseenter",()=>{

img.style.filter="brightness(1.1)";

});

img.addEventListener("mouseleave",()=>{

img.style.filter="brightness(1)";

});

});

/*=============================
      Reservation
=============================*/

const form=document.querySelector("form");

if(form){

form.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Thank You!\n\nYour reservation has been received successfully.");

form.reset();

});

}
