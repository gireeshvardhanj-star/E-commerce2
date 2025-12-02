document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");
  const timerDisplay = document.getElementById("loginTimer");
  const loginMessage = document.getElementById("loginMessage");
  const loginButton = document.getElementById("loginButton");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  let timeLeft = 30;
  let countdown = null;
  let expired = false;

  function setMessage(text, color = "red") {
    loginMessage.textContent = text;
    loginMessage.style.color = color;
  }

  function updateTimer() {
    timerDisplay.textContent = "Time left: " + timeLeft + "s";
  }

  function expireLogin() {
    expired = true;
    clearInterval(countdown);

    // disable everything
    loginButton.disabled = true;
    usernameInput.disabled = true;
    passwordInput.disabled = true;

    // show message
    setMessage("Login cance
