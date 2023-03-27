const myData = getSavedData("masterData");
const token = myData?.authToken;
if (token) {
  location.href = "home";
}

$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var postJob = urlParams.get("postJob");
  if (postJob === "true") {
    $("#startNowModal").modal("show");
  }
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

document
  .getElementById("topbar-register-btn")
  .addEventListener("click", function () {
    $("#startNowModal").modal("show");
    setTimeout(openRegisterTab, 500);
  });

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
        location.href = "home";
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

    const companyName = document.getElementById("company_name_register").value;
    const username = document.getElementById("username_register").value;
    const email = document.getElementById("email_register").value;
    const password = document.getElementById("password_register").value;
    const repeatPassword = document.getElementById(
      "repeat_password_register"
    ).value;

    if (password == repeatPassword) {
      const options = {
        body: JSON.stringify({
          company_name: companyName,
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
  .getElementById("button-continue-with-google")
  .addEventListener("click", function () {
    initGoogleSignin();
  });

document
  .getElementById("button-signup-with-google")
  .addEventListener("click", function () {
    alert("hi");
  });

var redirectUrl = "https://iklankerjakosongmalaysia.netlify.app/index";
var successUrl = "https://iklankerjakosongmalaysia.netlify.app/home";

function initGoogleSignin() {
  const options = {
    body: JSON.stringify({
      redirect_uri: redirectUrl,
    }),
  };

  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/oauth/google/init",
    "POST",
    null,
    options
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
    loginOauth(code);
  }
};

function loginOauth(code) {
  console.log("code");
  const options = {
    body: JSON.stringify({
      code: code,
      redirect_uri: redirectUrl,
    }),
  };

  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:OF8QSJWr/oauth/google/login",
    "POST",
    null,
    options
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
      } else {
        if (data?.authToken) {
          // saveData("userData", data);
          // window.location.href = successUrl;

          console.log("code", data);
        } else {
          alert("Token not found");
        }
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
}
