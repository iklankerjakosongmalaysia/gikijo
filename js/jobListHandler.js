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

var inputKeyword = document.getElementById("input-keyword");
var jobData = [];

document
  .getElementById("reset-filter-job-btn")
  .addEventListener("click", function () {
    inputKeyword.value = "";
    populateContent(jobData, "");
  });

document
  .getElementById("filter-job-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let submitFreeJobBtn = document.getElementById("submit-filter-job-btn");

    submitFreeJobBtn.disabled = true;
    submitFreeJobBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

    populateContent(jobData, inputKeyword.value);

    submitFreeJobBtn.disabled = false;
    submitFreeJobBtn.innerHTML = "Search";
  });

function populateContent(data, userInput) {
  const listLoader = document.getElementById("content-list-loader");
  const listEmpty = document.getElementById("content-list-empty");
  const listContainer = document.getElementById("content-list-container");
  const listBody = document.getElementById("content-list-body");

  var totalRecord = [];

  // Filter data based on user input
  const filteredData = data.filter((item) => {
    return item.stringifyAllData
      .toLowerCase()
      .includes(userInput.toLowerCase());
  });

  filteredData.forEach((item, index) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName("div");

    const title = divs[0].getElementsByTagName("strong");
    const postedAt = divs[0].getElementsByTagName("h8");
    const listItem = divs[0].getElementsByTagName("li");
    const applyButton = divs[0].getElementsByTagName("button");

    var timestamp = new Date(item.timestamp);
    var timeAgo = moment(timestamp).fromNow(true);

    postedAt[0].innerHTML = ` ${timeAgo} ago`;
    title[0].innerHTML = item.title;

    listItem[0].innerHTML = `<i class="fas fa-building"></i> ${item.company_name} (${item.ssm_number})`;

    if (item.min_salary > 0) {
      listItem[1].innerHTML = `<i class="fas fa-money-bill-wave"></i> MYR ${item.min_salary} - ${item.max_salary} ${item.salary_type}`;
    } else {
      listItem[1].innerHTML = `<i class="fas fa-money-bill-wave"></i> Not Stated`;
    }

    listItem[2].innerHTML = `<i class="fas fa-map-marker-alt"></i> ${item.location}`;

    if (item.is_free == true) {
      listItem[3].innerHTML = "";
      listItem[4].innerHTML = "";
      listItem[5].innerHTML = "";
      applyButton[0].addEventListener("click", function () {
        window.open(item.apply_link_free, "_blank");
      });
    } else {
      listItem[3].innerHTML = `<br>Requirement<br>${item.requirement.replace(
        /\n/g,
        "<br>"
      )}`;
      listItem[4].innerHTML = `<br>Benefit<br>${item.benefit.replace(
        /\n/g,
        "<br>"
      )}`;
      listItem[5].innerHTML = `<br>Additional Information<br>${item.additional_info.replace(
        /\n/g,
        "<br>"
      )}`;
      applyButton[0].addEventListener("click", function () {
        window.open(item.apply_link, "_blank");
      });
    }

    // salary[0].innerHTML = item.title;
    // console.log("item", item.title);
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
    textTotalJOb.innerHTML = `Showing ${totalRecord.length} jobs`;
  } else {
    textTotalJOb.innerHTML = `Showing ${totalRecord.length} job`;
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

const buttonRetryJobList = document.getElementById("button-retry-job-list");
buttonRetryJobList.addEventListener("click", function () {
  fetchJobList();
});

function fetchJobList(postId = "") {
  buttonRetryJobList.disabled = true;
  buttonRetryJobList.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  fetchAPI("https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7:v1/job/list", "GET")
    .then((data) => {
      if (data?.message) {
        alert(data.message);
        buttonRetryJobList.disabled = false;
        buttonRetryJobList.innerHTML = "Retry";
      } else {
        var jobList = [];

        data.job.map((item) => {
          if (item.telegram.length !== 0) {
            item.telegram.map((item_2) => {
              if (item_2.channel_data.source_code == "job_list") {
                const newItem = Object.assign({}, item_2, {
                  stringifyAllData: JSON.stringify(item_2),
                });
                jobList.push(newItem);
              }
            });
          }
        });

        const reversedJobList = [...jobList].reverse(); // 4 3 2

        jobData = reversedJobList;
        channelListData = data.channel;

        populateContent(reversedJobList, postId);
        populateChannel();
        buttonRetryJobList.disabled = false;
        buttonRetryJobList.innerHTML = "Retry";
      }
    })
    .catch((error) => {
      buttonRetryJobList.disabled = false;
      buttonRetryJobList.innerHTML = "Retry";
      console.error(error);
    });
}

$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var postId = urlParams.get("postId");
  if (postId) {
    fetchJobList(postId);
  } else {
    fetchJobList();
  }
});
