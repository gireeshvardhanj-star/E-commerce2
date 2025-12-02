/* ===================================================
   CART FUNCTIONS
=================================================== */
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ===================================================
   MAIN SCRIPT
=================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ================================
     ADD TO CART (PRODUCT PAGES)
  ================================ */
  const addButtons = document.querySelectorAll(".add-cart");

  if (addButtons.length > 0) {
    addButtons.forEach(button => {
      button.addEventListener("click", () => {
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);

        const cart = getCart();
        cart.push({ name, price });
        saveCart(cart);

        alert(`${name} added to cart!`);
        window.location.href = "cart.html";
      });
    });
  }

  /* ================================
     DISPLAY CART ITEMS (cart.html)
  ================================ */
  if (window.location.pathname.includes("cart.html")) {
    const cartItems = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");
    const clearBtn = document.getElementById("clear-cart");

    const cart = getCart();

    if (cart.length === 0) {
      cartItems.innerHTML = "<li>Your cart is empty.</li>";
      totalPriceEl.textContent = "";
    } else {
      let total = 0;
      cartItems.innerHTML = "";

      cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${item.name} — $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);

        total += item.price;
      });

      totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        window.location.reload();
      });
    }
  }

  /* ===================================================
     LOGIN PAGE — 30 SEC AUTO CANCEL TIMER
  =================================================== */
  const loginForm = document.getElementById("loginForm");
  const timerDisplay = document.getElementById("loginTimer");

  if (loginForm && timerDisplay) {

    let timeLeft = 30;

    // Show initial timer
    timerDisplay.textContent = "Time left: " + timeLeft + "s";

    const countdown = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = "Time left: " + timeLeft + "s";

      if (timeLeft <= 0) {
        clearInterval(countdown);
        alert("Login cancelled! You took too long.");
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
      }

    }, 1000);

    /* LOGIN VALIDATION */
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const correctUser = "kanna";
      const correctPass = "Amma@123";

      if (username === correctUser && password === correctPass) {
        clearInterval(countdown);
        alert("Login successful!");
        localStorage.setItem("loggedIn", "true");
        window.location.href = "product.html";
      } else {
        alert("Invalid credentials. Try again.");
      }
    });
  }

}); // END OF MAIN DOMContentLoaded
