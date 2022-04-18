const messageBox = document.getElementById("message-box");
const messageBoxForm = document.getElementById("message-box-form");
const usernameInput = document.getElementById("username-input");
const dateTimeInput = document.getElementById("date-time-input");
const floatingMessage = document.getElementById("floating-message");
const profilePicture = document.getElementById("profile-picture");
const username = document.getElementById("username");
const dateTime = document.getElementById("date-time");
const message = document.getElementById("message");

const generateBox = (event) => {
    event.preventDefault();
    messageBox.classList.remove("hidden");
    messageBox.classList.add("md:flex");

    const profilePictureFile = document.getElementById("profile-picture-input").files[0];
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
    dateTime.innerText = dateTimeInput.value;
    message.innerText = floatingMessage.value;
};

messageBoxForm.onsubmit = generateBox;
