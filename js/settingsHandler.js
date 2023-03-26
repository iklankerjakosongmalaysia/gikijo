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

const newPasswordForm = document.getElementById("input-new-password");
const repeatNewPasswordForm = document.getElementById(
  "input-repeat-new-password"
);

const currentPasswordForm = document.getElementById("input-current-password");

// Add a submit event listener to the form
changePasswordForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let submitChangeBtn = document.getElementById("submit-change-password-btn");
  submitChangeBtn.disabled = true;
  submitChangeBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  const newPassword = newPasswordForm.value;
  const repeatPassword = repeatNewPasswordForm.value;

  if (newPassword !== repeatPassword) {
    // Show error message that passwords do not match
    showAlert(
      "alert-settings-container",
      "Error!",
      "passwords do not match",
      "danger",
      "my-settings-alert",
      15000
    );
    submitChangeBtn.disabled = false;
    submitChangeBtn.innerHTML = "Update";
    return;
  } else {
    const options = {
      body: JSON.stringify({
        password: newPassword,
      }),
    };

    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/user/change_password`,
      "PUT",
      token,
      options
    )
      .then((data) => {
        if (data) {
          showAlert(
            "alert-settings-container",
            "Success!",
            "your password has been successfully updated!",
            "success",
            "my-settings-alert",
            15000
          );
        }
        submitChangeBtn.disabled = false;
        submitChangeBtn.innerHTML = "Update";
      })
      .catch((error) => {
        submitChangeBtn.disabled = false;
        submitChangeBtn.innerHTML = "Update";
      });
  }
});

// Add a submit event listener to the form
feedbackForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let submitFeedbackBtn = document.getElementById("submit-feedback-btn");
  submitFeedbackBtn.disabled = true;
  submitFeedbackBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  const feedbackType = document.getElementById("feedback-type");
  const feedbackTitle = document.getElementById("input-feedback-title");
  const feedbackDescription = document.getElementById(
    "input-feedback-description"
  );

  const options = {
    body: JSON.stringify({
      type: feedbackType.value,
      title: feedbackTitle.value,
      description: feedbackDescription.value,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7:v1/feedback`,
    "POST",
    token,
    options
  )
    .then((data) => {
      if (data) {
        if (data.message) {
          showAlert(
            "alert-settings-container",
            "Error!",
            data.message,
            "danger",
            "my-settings-alert",
            15000
          );
        } else {
          showAlert(
            "alert-settings-container",
            "Thank you!",
            "your feedback has been submitted successfully",
            "success",
            "my-settings-alert",
            15000
          );
          feedbackTitle.value = "";
          feedbackDescription.value = "";
        }
      }
      submitFeedbackBtn.disabled = false;
      submitFeedbackBtn.innerHTML = "Submit";
    })
    .catch((error) => {
      submitFeedbackBtn.disabled = false;
      submitFeedbackBtn.innerHTML = "Submit";
    });
});

// Add a submit event listener to the form
deleteProfileForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (
    confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    )
  ) {
  } else {
    return;
  }

  let submitDeleteProfileBtn = document.getElementById(
    "submit-delete-profile-btn"
  );
  submitDeleteProfileBtn.disabled = true;
  submitDeleteProfileBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  const currentPassword = currentPasswordForm.value;

  const options = {
    body: JSON.stringify({
      password: currentPassword,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/user/delete_user`,
    "POST",
    token,
    options
  )
    .then((data) => {
      if (data) {
        if (data.payload === 0) {
          showAlert(
            "alert-settings-container",
            "Error!",
            data.message,
            "danger",
            "my-settings-alert",
            15000
          );
        } else {
          showAlert(
            "alert-settings-container",
            "Success!",
            "your account has been deleted",
            "success",
            "my-settings-alert",
            15000
          );
          clearSession();
        }
      }
      submitDeleteProfileBtn.disabled = false;
      submitDeleteProfileBtn.innerHTML = "Delete Account";
    })
    .catch((error) => {
      submitDeleteProfileBtn.disabled = false;
      submitDeleteProfileBtn.innerHTML = "Delete Account";
    });
});
