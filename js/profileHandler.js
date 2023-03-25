const myData = getSavedData("userData");
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

const profileUsernameForm = document.getElementById("input-username");
const profileEmailForm = document.getElementById("input-email");
const profileCompanyName = document.getElementById("input-company-name");

function fetchMe() {
  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/auth/me",
    "GET",
    token
  )
    .then((data) => {
      if (data) {
        profileUsernameForm.value = data.username;
        profileEmailForm.value = data.email;
        profileCompanyName.value = data.company_name;
      }
    })
    .catch((error) => {});
}

// Add a submit event listener to the form
profileForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let submitPayBtn = document.getElementById("submit-profile-btn");
  submitPayBtn.disabled = true;
  submitPayBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  const options = {
    body: JSON.stringify({
      username: profileUsernameForm.value,
      company_name: profileCompanyName.value,
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
        showAlert(
          "alert-profile-container",
          "Success!",
          "your profile has been successfully updated!",
          "success",
          "my-post-alert",
          15000
        );
      }
      submitPayBtn.disabled = false;
      submitPayBtn.innerHTML = "Update";
    })
    .catch((error) => {
      submitPayBtn.disabled = false;
      submitPayBtn.innerHTML = "Update";
    });
});

fetchMe();
