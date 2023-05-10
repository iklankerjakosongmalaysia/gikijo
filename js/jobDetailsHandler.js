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
    location.href = "index?login=true";
  });
}

document
  .getElementById("topbar-job-list-btn-not-auth")
  .addEventListener("click", function () {
    location.href = "job-list";
  });

document
  .getElementById("topbar-job-list-btn-with-auth")
  .addEventListener("click", function () {
    location.href = "job-list";
  });

function populateOtherPost(data) {
  const listLoader = document.getElementById("job-list-loader");
  const listEmpty = document.getElementById("job-list-empty");
  const listContainer = document.getElementById("job-list-container");
  const listBody = document.getElementById("job-list-body");

  var totalRecord = [];

  data.forEach((item) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName("div");

    divs[0].addEventListener("click", function () {
      location.href = item.internal_apply_link;
    });

    const title = divs[0].getElementsByTagName("h7");

    title[0].innerHTML = item.title;

    totalRecord.push(card);
  });

  listLoader.classList.add("hidden");

  if (totalRecord.length === 0) {
    listEmpty.classList.remove("hidden");
    listContainer.classList.add("hidden");
  } else {
    listEmpty.classList.add("hidden");
    listContainer.classList.remove("hidden");

    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
    totalRecord.forEach((item) => {
      listContainer.appendChild(item);
    });
  }
}

const loadingIcon =
  '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
const loadingText =
  '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

var loading = false;

function applyJob(passData, passBtn, passBtnDefaultText) {
  const options = {
    body: JSON.stringify({
      user_id: passData.user_id,
      post_id: passData.id,
    }),
  };

  loading = true;
  passBtn.disabled = true;
  passBtn.innerHTML = loadingIcon;

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/post/apply`,
    "POST",
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        showToast("alert-toast-container", data.message, "danger");
        passBtn.disabled = false;
        passBtn.innerHTML = passBtnDefaultText;
        loading = false;
      } else {
        passBtn.disabled = false;
        passBtn.innerHTML = `<i class="fas fa-check"></i> Applied`;
        passBtn.setAttribute("class", "btn btn-success");
        showToast(
          "alert-toast-container",
          "Your application has been submitted successfully.",
          "success"
        );
      }
    })
    .catch((error) => {
      passBtn.disabled = false;
      passBtn.innerHTML = passBtnDefaultText;
      loading = false;
    });
}

function populateToJobDetails(item, is_applied) {
  const jobTitle = document.getElementById("job-title");
  jobTitle.innerHTML = item.title;

  const postedAt = document.getElementById("posted-at");
  var created_at = new Date(item.created_at);
  var timeAgo = moment(created_at).fromNow(true);

  postedAt.innerHTML = ` ${timeAgo} ago`;

  const jobListItem = document.getElementById("job-list-item");
  const listItem = jobListItem.getElementsByTagName("li");

  listItem[0].innerHTML = `<i class="fas fa-building"></i> <a href="company-profile?company_id=${item.company_data.id}">${item.company_data.name} (${item.company_data.ssm_number})</a>`;

  listItem[1].innerHTML = `<i class="fas fa-tag"></i> ${item.type}`;

  if (item.min_salary > 0) {
    listItem[2].innerHTML = `<i class="fas fa-money-bill-wave"></i> MYR ${item.min_salary} - ${item.max_salary} ${item.salary_type}`;
  } else {
    listItem[2].innerHTML = `<i class="fas fa-money-bill-wave"></i> Not Stated`;
  }

  listItem[3].innerHTML = `<i class="fas fa-map-marker-alt"></i> ${item.location}`;

  listItem[4].innerHTML = `<br>Requirement<br>${item.requirement.replace(
    /\n/g,
    "<br>"
  )}`;
  listItem[5].innerHTML = `<br>Benefit<br>${item.benefit.replace(
    /\n/g,
    "<br>"
  )}`;
  listItem[6].innerHTML = `<br>Additional Information<br>${item.additional_info.replace(
    /\n/g,
    "<br>"
  )}`;

  const actionProfileBtnContainer = document.getElementById(
    "action-job-button-container"
  );

  // remove existing dropdown button (if any)
  while (actionProfileBtnContainer.firstChild) {
    actionProfileBtnContainer.removeChild(actionProfileBtnContainer.firstChild);
  }

  const buttonInvite = document.createElement("button");
  buttonInvite.setAttribute("type", "button");
  buttonInvite.setAttribute("class", "btn btn-outline-secondary mr-1");
  buttonInvite.setAttribute("data-toggle", "modal");
  buttonInvite.setAttribute("data-target", "#inviteModal");
  buttonInvite.setAttribute("id", "button-send-invite");
  buttonInvite.innerHTML = `<i class="fas fa-link"></i>`;
  buttonInvite.addEventListener("click", function () {
    navigator.clipboard
      .writeText(item.internal_apply_link)
      .then(() => {
        buttonInvite.innerHTML = "Link copied!";
      })
      .catch((error) => {
        console.error("Failed to copy link: ", error);
      });
  });

  const buttonApply = document.createElement("button");
  buttonApply.setAttribute("type", "button");
  buttonApply.setAttribute("id", "apply-button");

  buttonApply.disabled = false;
  buttonApply.setAttribute("class", "btn btn-primary");
  if (token) {
    buttonApply.addEventListener("click", () => {
      applyJob(item, buttonApply, buttonApply.innerHTML);
    });
    if (is_applied) {
      buttonApply.innerHTML = `<i class="fas fa-check"></i> Applied`;
      buttonApply.setAttribute("class", "btn btn-success");
    } else {
      buttonApply.innerHTML = `Apply Now`;
      buttonApply.setAttribute("class", "btn btn-primary");
    }
  } else {
    buttonApply.innerHTML = `Login to Apply`;
    buttonApply.addEventListener("click", () => {
      window.open("index?postJob=true", "_blank");
    });
  }

  actionProfileBtnContainer.appendChild(buttonInvite);
  actionProfileBtnContainer.appendChild(buttonApply);
}

function fetchPostDetails() {
  var urlParams = new URLSearchParams(window.location.search);
  var customId = urlParams.get("postId");

  if (customId) {
    if (token) {
      fetchUrl = `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/post/is_login/${customId}`;
      fetchAPI(fetchUrl, "GET", token)
        .then((data) => {
          if (data?.message) {
            showToast("alert-toast-container", data.message, "danger");
          } else {
            populateToJobDetails(data.post_data, data.is_applied);
            populateOtherPost(data.post_all);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      fetchUrl = `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/post/not_login/${customId}`;
      fetchAPI(fetchUrl, "GET")
        .then((data) => {
          if (data?.message) {
            showToast("alert-toast-container", data.message, "danger");
          } else {
            populateToJobDetails(data.post_data, data.is_applied);
            populateOtherPost(data.post_all);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  } else {
    showToast("alert-toast-container", "Post Id not found.", "danger");
  }
}

$(document).ready(function () {
  fetchPostDetails();
});
