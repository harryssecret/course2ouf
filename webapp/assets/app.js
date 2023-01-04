/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import "./styles/app.css";

// start the Stimulus application
import "./bootstrap";

const toggleButton = document.getElementById("drawer-toggle");
const hiddenDrawerCheckbox = document.getElementById("my-drawer");
let checkboxChecked = hiddenDrawerCheckbox.getAttribute("checked");

toggleButton.addEventListener("click", function (e) {
  if (checkboxChecked) {
    hiddenDrawerCheckbox.checked = true;
  } else {
    hiddenDrawerCheckbox.setAttribute("checked", "true");
    checkboxChecked = true;
  }
});
