const generateRandomNumber = () => {
    const ll = document.getElementById("ll").value;
    const ul = document.getElementById("ul").value;
    const rand = document.getElementById("rand");
    let interval = setInterval(() => {
        console.log(rand.innerText)
        rand.innerText = getNumber(Number(ll), Number(ul));
    }, 1);
    setTimeout(() => {
        clearInterval(interval);
    }, 100);
    interval();
    setTimeout();
}
const getNumber = (x, y) => {
    if (!x) x = 0;
    if (!y) y = 100;
    return Math.floor(Math.random() * (y - x + 1)) + x;
}
const generateRandomPassword = () => {
    let password = "";
    do {
        password = getPassword();
        console.log(password)
        toChange.innerText = password;
    } while (!isValid(password));
}
const isValid = (str) => {
    let hasUpper = false, hasLower = false, hasDigit = false, hasSpecial = false;

    for (let i = 0; i < str.length; i++) {
        let now = str[i];
        if (!hasUpper && isUpper(now)) {
            hasUpper = true;
            continue;
        }
        if (!hasLower && isLower(now)) {
            hasLower = true;
            continue;
        }
        if (!hasDigit && isDigit(now)) {
            hasDigit = true;
            continue;
        }
        if (!hasSpecial && isSpecialCharacter(now)) {
            hasSpecial = true;
            continue;
        }
    }
    return hasUpper && hasLower && hasDigit && hasSpecial;

}
function isUpper(char) {
    return char === char.toUpperCase() && char !== char.toLowerCase();
}

function isLower(char) {
    return char === char.toLowerCase() && char !== char.toUpperCase();
}
function isDigit(char) {
    let code = char.charCodeAt(0);
    return code >= 48 && code <= 57; // ASCII range for '0' to '9'
}
function isSpecialCharacter(char) {
    let code = char.charCodeAt(0);
    return (code >= 33 && code <= 47) || // Special characters ! to /
        (code >= 58 && code <= 64) || // Special characters : to @
        (code >= 91 && code <= 96) || // Special characters [ to `
        (code >= 123 && code <= 126); // Special characters { to ~
}
function getPassword() {
    let pass = "";
    for (let i = 0; i < 12; i++) {
        pass += getChar();
    }
    return pass;
}
function getChar() {
    return String.fromCharCode(Math.floor(Math.random() * (126 - 33 + 1)) + 33);
}

function showHidePassword() {
    if (!hidden) {
        toChange.dataset.originalText = toChange.innerText;
        toChange.innerText = "* ".repeat(12);
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    } else {
        toChange.innerText = toChange.dataset.originalText;
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    }
    hidden = !hidden;
}
function validateAndChange() {
    if (mailInputField.value === "") {
        mailInputField.style.backgroundColor = " rgb(255, 255, 255)";
        return;
    }
    if (isValidMail(mailInputField.value)) {
        correct(mailInputField);
    } else {
        wrong(mailInputField);
    }
}
const isValidMail = (inpMail) => {
    const mailPattern = /^[a-zA-Z0-9.%_+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // alert(mailPattern.test(String(inpMail)))

    return mailPattern.test(String(inpMail));
}
function chkPrime() {
    const primeInputField = document.getElementById("prime");
    let inpNum = primeInputField.value;

    if (isPrime(Number(inpNum))) {
        correct(primeInputField);
    } else {
        wrong(primeInputField);
    }

}
const isPrime = (x) => {
    for (let i = 2; i < x / 2; i++) {
        if (x % i == 0) return false;
    }
    return true;
}
function palliChk() {
    const inpStrField = document.getElementById("palli");
    let inpStr = inpStrField.value;

    if (isPalli(inpStr)) {
        correct(inpStrField);
    } else {
        wrong(inpStrField);
    }
}
function isPalli(str) {
    return (String(str).split("").reverse().join("") === str);
}
const correct = (e) => {
    e.style.backgroundColor = "green";
}
const wrong = (e) => {
    e.style.backgroundColor = "red";

}
function timer() {
    const timeInp = document.getElementById("time");
    let timeStop = timeInp.value;
    // console.log("INPUT : ",timeInp.value)
    // console.log(typeof timeInp.value)
    let timeDiff = getTimeDiffFrom(timeStop);
    displayTime(timeDiff);
    startTicking(timeDiff);
}
function startTicking(timeArr) {
    let interval = setInterval(() => {
        timeArr[2]--;
        displayTime(borrowUp(timeArr));
    }, 1000);
    setTimeout(() => {
        clearInterval(interval);
        alarmDone();
    }, timeInMillis(timeArr));
}
function alarmDone() {
    // alert("DONE")
    const alarmSound = new Audio("alarm.mp3");
    // Sound Effect by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=6402">freesound_community</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=6402">Pixabay</a>
    alarmSound.loop = true;
    alarmSound.volume = 1;
    alarmSound.play()
        .then(() => {
            console.log("Alarm is playing.");
        })
        .catch(error => {
            console.error("Error playing sound:", error);
        });
    flickerText();
    setTimeout(() => {
    alarmSound.loop = false;
        alarmSound.pause();
    }, 10*1000);
}
function flickerText() {
    console.log("Entered");
    const leftTime = document.querySelector(".leftTime");
    leftTime.innerText = "DONE";
    leftTime.classList.toggle("animate");
    setTimeout(() => {
        leftTime.classList.toggle("animate");
        leftTime.innerText = "00 : 00 : 00";
    }, 10 * 1000);
}
function timeInMillis(timeArr) {
    return (Number(timeArr[0]) * 60 * 60 * 1000) + (Number(timeArr[1]) * 60 * 1000) + (Number(timeArr[2]) * 1000);
}
function displayTime(timeArr) {
    const leftTime = document.querySelector(".leftTime");
    leftTime.innerText = timeArr.join(" : ");
}
const getTimeDiffFrom = (str) => {
    let endTime = str.split(":").map(
        x => Number(x)
    );
    endTime.push(0);
    // console.log("End Time as array",endTime);
    let startTime = getCurrentTimeAsArray();
    // console.log("Start Time as array : ",startTime);

    let timeDifference = endTime.map(
        (v, i) => {
            return endTime[i] - startTime[i];
        }
    );

    // console.log("Time difference Array (has negative) : ",timeDifference)
    return borrowUp(timeDifference);
}
function borrowUp(arr) {
    if (arr[1] < 0) {
        arr[0]--;
        arr[1] = 60 + arr[1];
    }
    if (arr[2] < 0) {
        arr[1]--;
        arr[2] = 60 + arr[2];
    }
    if (arr[0] < 0) {
        arr[0] = 24 + arr[0];
    }
    console.log("Time difference Array (after borrowUp) : ", arr)
    return arr;
}
function getCurrentTimeAsArray() {
    const now = new Date();
    let timeStart = [now.getHours(), now.getMinutes(), now.getSeconds()];
    return timeStart;
}
const generateButton = document.querySelector(".generate");
const toChange = document.getElementById("pass");
const generatePasswordButtom = document.getElementById("generatePass");
const eyeIcon = document.getElementById("eyeIcon");
const validateButn = document.getElementById("validate");
const mailInputField = document.getElementById("mail");
const primeCheckButton = document.getElementById("check");
const palliCheckButton = document.getElementById("palliCheck");
const startTimeButton = document.getElementById("startTime");

generateButton.addEventListener("click", generateRandomNumber);
generatePasswordButtom.addEventListener("click", generateRandomPassword);
eyeIcon.addEventListener("click", showHidePassword);
let hidden = false;
mailInputField.addEventListener("input", validateAndChange)
validateButn.addEventListener("click", validateAndChange);
primeCheckButton.addEventListener("click", chkPrime);
palliCheckButton.addEventListener("click", palliChk);
startTimeButton.addEventListener("click", timer);
var timeSec = 0;
startTimeButton.addEventListener("click",
    () => {
        timeSec = Number(new Date().getSeconds());
    }
);