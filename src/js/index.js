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
    username.classList.add(colorClassInput.value);
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

(function (exports) {
    function urlsToAbsolute(nodeList) {
        if (!nodeList.length) {
            return [];
        }
        var attrName = "href";
        if (
            nodeList[0].__proto__ === HTMLImageElement.prototype ||
            nodeList[0].__proto__ === HTMLScriptElement.prototype
        ) {
            attrName = "src";
        }
        nodeList = [].map.call(nodeList, function (el, i) {
            var attr = el.getAttribute(attrName);
            if (!attr) {
                return;
            }
            var absURL = /^(https?|data):/i.test(attr);
            if (absURL) {
                return el;
            } else {
                return el;
            }
        });
        return nodeList;
    }

    function screenshotPage() {
        html2canvas(innerMessageBox, {
            onrendered: function (canvas) {
                canvas.toBlob(function (blob) {
                    saveAs(blob, "myScreenshot.png");
                });
            },
        });
    }

    function addOnPageLoad_() {
        window.addEventListener("DOMContentLoaded", function (e) {
            var scrollX = document.documentElement.dataset.scrollX || 0;
            var scrollY = document.documentElement.dataset.scrollY || 0;
            window.scrollTo(scrollX, scrollY);
        });
    }

    function generate() {
        screenshotPage();
    }
    exports.screenshotPage = screenshotPage;
    exports.generate = generate;
})(window);