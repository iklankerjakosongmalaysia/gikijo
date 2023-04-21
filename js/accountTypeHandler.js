const myData = getSavedData("masterData");
const token = myData?.authToken;

const topbarNotAuth = document.getElementById("topbar-not-auth");
const topbarWithAuth = document.getElementById("topbar-with-auth");
const topbarUsername = document.getElementById("topbar-username");
const topBarPostJobButton = document.getElementById("topbar-post-job-btn");
const logoutBtn = document.getElementById("button-logout-yes");
logoutBtn.addEventListener("click", clearSession);

if (token) {
  topbarWithAuth.removeAttribute("style");
  topbarNotAuth.setAttribute("style", "display: none");
  topbarUsername.innerHTML = myData.userData.username;
} else {
  topbarNotAuth.removeAttribute("style");
  topbarWithAuth.setAttribute("style", "display: none");
  topbarUsername.innerHTML = "...";
  topBarPostJobButton.addEventListener("click", function () {
    location.href = "index?postJob=true";
  });
  location.href = "index";
}

document
  .getElementById("topbar-job-list-btn")
  .addEventListener("click", function () {
    location.href = "job-list";
  });

let submitEmployerBtn = document.getElementById("submit-employer-btn");

submitEmployerBtn.addEventListener("click", function () {
  handlingAccountType("employer", submitEmployerBtn);
});

let submitJobSeekerBtn = document.getElementById("submit-job-seeker-btn");

submitJobSeekerBtn.addEventListener("click", function () {
  handlingAccountType("job-seeker", submitJobSeekerBtn);
});

function handlingAccountType(accountTye, submitBtn) {
  var btnResetTitle = "";

  if (accountTye == "employer") {
    btnResetTitle = `I'm an Employer`;
  } else {
    btnResetTitle = `I'm a Job Seeker`;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  const options = {
    body: JSON.stringify({
      username: myData.userData.username,
      account_type: accountTye == "employer" ? 2 : 3,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/user/edit_user`,
    "PUT",
    token,
    options
  )
    .then((data) => {
      if (data) {
        if (data.message) {
          showAlert(
            "alert-account-type-container",
            "Error!",
            data.message,
            "danger",
            "my-account-type-alert",
            15000
          );
        } else {
          saveData("masterData", {
            userData: {
              ...myData.userData,
              username: data.username,
              email: data.email,
              role_id: data.role_id,
            },
            authToken: myData.authToken,
            industryData: myData.industryData,
          });
          location.href = "home";
        }
      }
      submitBtn.disabled = false;
      submitBtn.innerHTML = btnResetTitle;
    })
    .catch((error) => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = btnResetTitle;
    });
}
