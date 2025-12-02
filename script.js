document.addEventListener("DOMContentLoaded", () => {
  /* ===================================================
     LOGIN PAGE — 30 SEC AUTO CANCEL TIMER (UPDATED)
  =================================================== */
  const loginForm = document.getElementById("loginForm");
  const timerDisplay = document.getElementById("loginTimer");
  const loginMessage = document.getElementById("loginMessage");
  const loginButton = document.getElementById("loginButton");

  if (loginForm && timerDisplay && loginMessage && loginButton) {

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
      loginButton.disabled = true;
      setMessage("Login cancelled! You took too long.", "red");
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
    }

    // Initial timer state
    updateTimer();
    setMessage(""); // clear any old message

    countdown = setInterval(() => {
      timeLeft--;
      updateTimer();

      if (timeLeft <= 0) {
        expireLogin();
      }
    }, 1000);

    /* LOGIN VALIDATION (DEMO ONLY) */
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (expired) {
        setMessage("Timer expired. Please reload the page to try again.", "red");
        return;
      }

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      const correctUser = "admin";  // demo only
      const correctPass = "admin";  // demo only

      if (username === correctUser && password === correctPass) {
        clearInterval(countdown);
        setMessage("Login successful! Redirecting...", "green");
        localStorage.setItem("loggedIn", "true");
        setTimeout(() => {
          window.location.href = "product.html";
        }, 800);
      } else {
        setMessage("Invalid credentials. Try again.", "red");
      }
    });
  }
});

