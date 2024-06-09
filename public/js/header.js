const sidenav = document.getElementById("mySidenav");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const background = document.getElementById("bg-black");


openBtn.onclick = openNav;
closeBtn.onclick = closeNav;
background.onclick = closeNav;

/* Set the width of the side navigation to 250px */
function openNav() {
    sidenav.classList.add("active");
    background.classList.remove("collapse");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    sidenav.classList.remove("active");
    background.classList.add("collapse");
}