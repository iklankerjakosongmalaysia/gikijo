const myData = getSavedData("masterData");
const token = myData?.authToken;
if (token) {
  location.href = "home";
}

$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var login = urlParams.get("login");
  if (login === "true") {
    $("#startNowModal").modal("show");
  }
});

document
  .getElementById("topbar-job-list-btn")
  .addEventListener("click", function () {
    location.href = "job-list";
  });

function openLoginTab() {
  document.querySelector("#login-tab").click();
}

function openRegisterTab() {
  document.querySelector("#register-tab").click();
}

document.getElementById("find-job-btn").addEventListener("click", function () {
  location.href = "job-list";
});

document
  .getElementById("topbar-login-btn")
  .addEventListener("click", function () {
    $("#startNowModal").modal("show");
    setTimeout(openLoginTab, 500);
  });

// document
//   .getElementById("topbar-register-btn")
//   .addEventListener("click", function () {
//     $("#startNowModal").modal("show");
//     setTimeout(openRegisterTab, 500);
//   });

document
  .getElementById("go-to-login-tab")
  .addEventListener("click", function () {
    document.querySelector("#login-tab").click();
  });

document
  .getElementById("go-to-register-tab")
  .addEventListener("click", function () {
    document.querySelector("#register-tab").click();
  });

document
  .getElementById("go-to-forgot-password-modal")
  .addEventListener("click", function () {
    $("#startNowModal").modal("hide");
    $("#forgotPasswordModal").modal("show");
  });

document
  .getElementById("go-to-login-modal")
  .addEventListener("click", function () {
    $("#forgotPasswordModal").modal("hide");
    $("#startNowModal").modal("show");
  });

document
  .getElementById("reverify-go-to-login-modal")
  .addEventListener("click", function () {
    $("#reverifyModal").modal("hide");
    $("#startNowModal").modal("show");
  });

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let submitLoginBtn = document.querySelector("#submit-btn-login");

  submitLoginBtn.disabled = true;
  submitLoginBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const options = {
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };

  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/auth/login",
    "POST",
    null,
    options
  )
    .then((data) => {
      const hasKey = Object.keys(data).includes("authToken");
      if (hasKey === false) {
        submitLoginBtn.disabled = false;
        submitLoginBtn.innerHTML = "Login";
        if (data.payload === 700) {
          $("#startNowModal").modal("hide");
          $("#reverifyModal").modal("show");
          showAlert(
            "alert-reverify-container",
            "Error!",
            data.message,
            "danger",
            "my-reverify-alert"
          );
        } else {
          showAlert(
            "alert-login-container",
            "Error!",
            data.message,
            "danger",
            "my-login-alert"
          );
        }
      } else {
        saveData("masterData", {
          userData: data.userData,
          authToken: data.authToken,
        });
        submitLoginBtn.disabled = false;
        submitLoginBtn.innerHTML = "Login";

        if (data.userData.role_id) {
          location.href = "home";
        } else {
          location.href = "account-type";
        }
      }
    })
    .catch((error) => {
      submitLoginBtn.disabled = false;
      submitLoginBtn.innerHTML = "Login";
    });
});

document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let submitRegisterBtn = document.querySelector("#submit-btn-register");

    submitRegisterBtn.disabled = true;
    submitRegisterBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

    const accountType = document.getElementById("input-account-type").value;
    const username = document.getElementById("input-username-register").value;
    const email = document.getElementById("input-email-register").value;
    const password = document.getElementById("input-password-register").value;
    const repeatPassword = document.getElementById(
      "input-repeat-password-register"
    ).value;

    if (password == repeatPassword) {
      const options = {
        body: JSON.stringify({
          account_type: accountType,
          username: username,
          email: email,
          password: password,
        }),
      };
      fetchAPI(
        "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/auth/verify_email/signup",
        "POST",
        null,
        options
      )
        .then((data) => {
          submitRegisterBtn.disabled = false;
          submitRegisterBtn.innerHTML = "Register";
          if (data.code) {
            showAlert(
              "alert-register-container",
              "Error!",
              data.message,
              "danger",
              "my-register-alert"
            );
          } else {
            showAlert(
              "alert-register-container",
              "Success!",
              data.message,
              "success",
              "my-register-alert",
              15000
            );
          }
        })
        .catch((error) => {
          submitRegisterBtn.disabled = false;
          submitRegisterBtn.innerHTML = "Register";
          alert(error);
        });
    } else {
      showAlert(
        "alert-register-container",
        "Error!",
        "Password and confirm password does not match",
        "danger",
        "my-register-alert"
      );
      submitRegisterBtn.disabled = false;
      submitRegisterBtn.innerHTML = "Register";
    }
  });

document
  .getElementById("forgot-password-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let submitForgotPasswordBtn = document.querySelector(
      "#submit-btn-forgot-password"
    );

    submitForgotPasswordBtn.disabled = true;
    submitForgotPasswordBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

    const email = document.getElementById("email-forgot-password").value;

    const options = {
      body: JSON.stringify({
        email: email,
      }),
    };
    fetchAPI(
      "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7:v1/auth/password/request-magic-link",
      "POST",
      null,
      options
    )
      .then((data) => {
        submitForgotPasswordBtn.disabled = false;
        submitForgotPasswordBtn.innerHTML = "Reset Password";
        if (data.code) {
          showAlert(
            "alert-forgot-password-container",
            "Error!",
            data.message,
            "danger",
            "my-forgot-password-alert"
          );
        } else {
          showAlert(
            "alert-forgot-password-container",
            "Success!",
            data.message.message,
            "success",
            "my-forgot-password-alert",
            15000
          );
        }
      })
      .catch((error) => {
        submitForgotPasswordBtn.disabled = false;
        submitForgotPasswordBtn.innerHTML = "Reset Password";
        alert(error);
      });
  });

document
  .getElementById("reverify-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let submitReverifyBtn = document.querySelector("#submit-btn-reverify");

    submitReverifyBtn.disabled = true;
    submitReverifyBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

    const email = document.getElementById("email-reverify").value;

    const options = {
      body: JSON.stringify({
        email: email,
      }),
    };

    fetchAPI(
      "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7:v1/auth/verify_email/resend",
      "POST",
      null,
      options
    )
      .then((data) => {
        submitReverifyBtn.disabled = false;
        submitReverifyBtn.innerHTML = "Resend Verification Link";
        if (data.code) {
          showAlert(
            "alert-reverify-container",
            "Error!",
            data.message,
            "danger",
            "my-reverify-alert"
          );
        } else {
          showAlert(
            "alert-reverify-container",
            "Success!",
            data.message,
            "success",
            "my-reverify-alert"
          );
        }
      })
      .catch((error) => {
        submitReverifyBtn.disabled = false;
        submitReverifyBtn.innerHTML = "Resend Verification Link";
      });
  });

document
  .getElementById("button-continue-login-with-google")
  .addEventListener("click", function () {
    initGoogleCode();
  });

document
  .getElementById("button-continue-signup-with-google")
  .addEventListener("click", function () {
    initGoogleCode();
  });

var redirectUrl = "https://gikijo.com/";
var successUrl = "https://gikijo.com/home";
var selectRole = "https://gikijo.com/account-type";

function initGoogleCode() {
  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:OF8QSJWr/oauth/google/init?redirect_uri=${redirectUrl}`,
    "GET",
    null
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
      } else {
        window.location.href = data.authUrl;
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
}

window.onload = function () {
  var curUrl = new URL(document.location.href);
  var code = curUrl.searchParams.get("code");

  if (code) {
    continueOauth(code);
  }
};

function continueOauth(code) {
  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:OF8QSJWr/oauth/google/continue?redirect_uri=${redirectUrl}&code=${code}`,
    "GET",
    null
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
      } else {
        if (data?.authToken) {
          saveData("masterData", {
            userData: data.userData,
            authToken: data.authToken,
          });

          if (data.userData.role_id) {
            window.location.href = successUrl;
          } else {
            window.location.href = selectRole;
          }
        } else {
          alert("Token not found");
        }
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
}
