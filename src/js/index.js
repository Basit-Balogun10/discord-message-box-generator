const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

const messageBox = document.getElementById("message-box");
const innerMessageBox = document.getElementById("inner-message-box");
const messageBoxForm = document.getElementById("message-box-form");
const screenshotSaver = document.getElementById("screenshot-saver");
const usernameInput = document.getElementById("username-input");
const dateTimeInput = document.getElementById("date-time-input");
const colorClassInput = document.getElementById("color-class-input");
const floatingMessage = document.getElementById("floating-message");
const profilePicture = document.getElementById("profile-picture");
const username = document.getElementById("username");
const dateTime = document.getElementById("date-time");
const message = document.getElementById("message");

// Change the icons inside the theme-button based on previous settings
if (
    localStorage.getItem("dmbg-theme") === "dark" ||
    (!("dmbg-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
    themeToggleLightIcon.classList.remove("hidden");
} else {
    themeToggleDarkIcon.classList.remove("hidden");
}

const generateBox = (event) => {
    event.preventDefault();
    messageBox.classList.remove("hidden");
    screenshotSaver.classList.remove("hidden");
    messageBox.classList.add("flex");
    username.classList = "";

    const profilePictureFile = document.getElementById("profile-picture-input")
        .files[0];
    reader = new FileReader();
    reader.addEventListener(
        "load",
        () => {
            console.log(reader.result);
            profilePicture.src = reader.result;
        },
        false
    );
    profilePictureFile && reader.readAsDataURL(profilePictureFile);

    username.innerText = usernameInput.value;
    colorClassInput.value ? username.classList.add(colorClassInput.value) : username.classList.add('text-white');
    dateTime.innerText = dateTimeInput.value;
    message.innerHTML = floatingMessage.value;
};

messageBoxForm.onsubmit = generateBox;

const themeToggleBtn = document.getElementById("theme-toggle");

const toggleThemeMode = () => {
    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle("hidden");
    themeToggleLightIcon.classList.toggle("hidden");

    // if set via local storage previously
    if (localStorage.getItem("dmbg-theme")) {
        if (localStorage.getItem("dmbg-theme") === "light") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("dmbg-theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("dmbg-theme", "light");
        }

        // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("dmbg-theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("dmbg-theme", "dark");
        }
    }
};

themeToggleBtn.addEventListener("click", toggleThemeMode);

const screenshotMessageBox = () => {
    html2canvas(innerMessageBox, {
        onrendered: function (canvas) {
            canvas.toBlob(function (blob) {
                saveAs(blob, `${floatingMessage.value.substring(0, 20)}_${usernameInput.value}_${dateTimeInput.value}_${colorClassInput.value ? colorClassInput.value : 'text-white'}.png`);
            });
        },
    });
}

screenshotSaver.onclick = screenshotMessageBox;