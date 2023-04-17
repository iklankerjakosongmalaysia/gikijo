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
}

function populateContent(passData) {
  const listLoader = document.getElementById("content-list-loader");
  const listEmpty = document.getElementById("content-list-empty");
  const listContainer = document.getElementById("content-list-container");
  const listBody = document.getElementById("content-list-body");

  var totalRecord = [];

  passData.forEach((item) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName("div");

    const title = divs[0].getElementsByTagName("strong");
    const postedAt = divs[0].getElementsByTagName("h8");
    const listItem = divs[0].getElementsByTagName("li");
    const applyButton = divs[0].getElementsByTagName("button");

    var created_at = new Date(item.created_at);
    var timeAgo = moment(created_at).fromNow(true);

    postedAt[0].innerHTML = ` ${timeAgo} ago`;
    title[0].innerHTML = item.title;

    listItem[0].innerHTML = `<i class="fas fa-building"></i> <a href="company-profile.html?company_id=${item.user_id}">${item.company_name} (${item.ssm_number})</a>`;

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

    const copyLink = `${item.channel_data.url}?postId=${item.id}`;

    applyButton[0].addEventListener("click", function () {
      navigator.clipboard
        .writeText(copyLink)
        .then(() => {
          applyButton[0].innerHTML = "Link copied!";
        })
        .catch((error) => {
          console.error("Failed to copy link: ", error);
        });
    });

    applyButton[1].addEventListener("click", function () {
      window.open(item.apply_link, "_blank");
    });

    // const paragraph = divs[0].getElementsByTagName("p");
    // paragraph[0].innerHTML = item.content.replace(/\n/g, "<br>");

    // const collapse = divs[0].getElementsByTagName("a")[0];
    // const collapseId = `collapseSummary${index}`;
    // paragraph[0].setAttribute("id", collapseId);
    // collapse.setAttribute("href", `#${collapseId}`);
    // collapse.setAttribute("aria-controls", collapseId);

    totalRecord.push(card);
  });

  listLoader.classList.add("hidden");

  const textTotalJOb = document.getElementById("text-total-job");
  if (totalRecord.length > 0) {
    textTotalJOb.innerText = `Showing ${totalRecord.length} jobs`;
  } else {
    textTotalJOb.innerText = `Showing ${totalRecord.length} job`;
  }

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

document
  .getElementById("refresh-channel-list")
  .addEventListener("click", function () {
    populateChannel();
  });

var channelListData = [];

function populateChannel() {
  const listLoader = document.getElementById("channel-list-loader");
  const listEmpty = document.getElementById("channel-list-empty");
  const listContainer = document.getElementById("channel-list-container");
  const listBody = document.getElementById("channel-list-body");

  var totalRecord = [];

  channelListData.forEach((item) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName("div");

    const title = divs[0].getElementsByTagName("h7");

    title[0].innerHTML = `${item.source_name} ∙ ${item.name}`;

    divs[0].addEventListener("click", function () {
      window.open(item.url, "_blank");
    });

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

const inputKeyword = document.getElementById("input-keyword");
const inputLocation = document.getElementById("input-job-location");
const inputType = document.getElementById("input-job-type");
const inputMinSalary = document.getElementById("input-job-min-salary");
const inputMaxSalary = document.getElementById("input-job-max-salary");

var inputPostId = "";
var postData = [];

document
  .getElementById("reset-filter-job-btn")
  .addEventListener("click", function () {
    inputPostId = "";
    inputLocation.value = "";
    inputType.value = "";
    inputMinSalary.value = "";
    inputMaxSalary.value = "";
    fetchPostList("", "");
  });

const submitFilterJobBtn = document.getElementById("submit-filter-job-btn");

document
  .getElementById("filter-job-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    submitFilterJobBtn.disabled = true;
    submitFilterJobBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

    fetchPostList(inputKeyword.value, inputPostId);
  });

const buttonRetryPostList = document.getElementById("button-retry-post-list");
let canClickRetryButton = true;

buttonRetryPostList.addEventListener("click", function () {
  if (canClickRetryButton) {
    canClickRetryButton = false;
    fetchPostList(inputKeyword.value, inputPostId);
    let countdown = 20;
    buttonRetryPostList.textContent = `Retry (available again in ${countdown} seconds)`;
    let countdownInterval = setInterval(function () {
      countdown--;
      if (countdown > 0) {
        buttonRetryPostList.textContent = `Retry (available again in ${countdown} seconds)`;
      } else {
        clearInterval(countdownInterval);
        canClickRetryButton = true;
        buttonRetryPostList.textContent = "Retry";
      }
    }, 1000);
  } else {
    buttonRetryPostList.textContent = "Please wait before clicking again.";
  }
});

function fetchPostList(passKeyword, passPostId) {
  inputKeyword.value = passKeyword;

  const options = {
    body: JSON.stringify({
      post_id: passPostId,
      search_query: passKeyword,
      location: inputLocation.value,
      type: inputType.value,
      min_salary: inputMinSalary.value,
      max_salary: inputMaxSalary.value,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/job/post/list`,
    "POST",
    null,
    options
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
      } else {
        postData = data.post_list;
        channelListData = data.channel_list;

        populateContent(data.post_list);
        populateChannel();
      }

      submitFilterJobBtn.disabled = false;
      submitFilterJobBtn.innerHTML = "Search";
    })
    .catch((error) => {
      populateChannel();
      populateContent(postData);
      submitFilterJobBtn.disabled = false;
      submitFilterJobBtn.innerHTML = "Search";
      console.error(error);
    });
}

$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var postId = urlParams.get("postId");

  if (postId) {
    inputPostId = postId;
    fetchPostList(inputKeyword.value, postId);
  } else {
    fetchPostList(inputKeyword.value, inputPostId);
  }
});
