const menu = document.getElementById("mobileMenu");
const closebtn = document.getElementById("closeMobileMenu");
const openbtn = document.getElementById("openMenuBtn");
const navLinks = document.getElementsByClassName("mobile-nav-link");

const ACTIVE_CLASS = "mobile-menu_active";

closebtn.onclick = () => closeMenu();
openbtn.onclick = () => openMenu();

Array.from(navLinks).forEach(link => {
  link.onclick = () => {
    closeMenu();
  }
})

function closeMenu() {
  menu.classList.remove(ACTIVE_CLASS);
  overflow("auto");
}

function openMenu() {
  menu.classList.add(ACTIVE_CLASS)
    overflow("hidden");
}

function overflow(value) {
  document.body.style.overflow = value;
}