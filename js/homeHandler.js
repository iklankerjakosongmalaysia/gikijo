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

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

const refreshBtn = document.getElementById("refresh-job-list");
let can_refreshBtn = true;

refreshBtn.addEventListener("click", function () {
  if (can_refreshBtn) {
    can_refreshBtn = false;
    fetchMyJobs();
    let countdown = 20;
    refreshBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Try again in ${countdown} seconds`;
    let countdownInterval = setInterval(function () {
      countdown--;
      if (countdown > 0) {
        refreshBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Try again in ${countdown} seconds`;
      } else {
        clearInterval(countdownInterval);
        can_refreshBtn = true;
        refreshBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Refresh`;
      }
    }, 1000);
  } else {
    refreshBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Please wait ...`;
  }
});

const refreshPurchaseHistoryBtn = document.getElementById(
  "purchase-history-refresh-list"
);
let can_refreshPurchaseHistoryBtn = true;

refreshPurchaseHistoryBtn.addEventListener("click", function () {
  if (can_refreshPurchaseHistoryBtn) {
    can_refreshPurchaseHistoryBtn = false;
    fetchMyJobs();
    let countdown = 20;
    refreshPurchaseHistoryBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Try again in ${countdown} seconds`;
    let countdownInterval = setInterval(function () {
      countdown--;
      if (countdown > 0) {
        refreshPurchaseHistoryBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Try again in ${countdown} seconds`;
      } else {
        clearInterval(countdownInterval);
        can_refreshPurchaseHistoryBtn = true;
        refreshPurchaseHistoryBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Refresh`;
      }
    }, 1000);
  } else {
    refreshPurchaseHistoryBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Please wait ...`;
  }
});

const adminRefreshBtn = document.getElementById("admin-refresh-job-list");
let can_adminRefreshBtn = true;

adminRefreshBtn.addEventListener("click", function () {
  if (can_adminRefreshBtn) {
    can_adminRefreshBtn = false;
    fetchAdminMaster();
    let countdown = 20;
    adminRefreshBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Try again in ${countdown} seconds`;
    let countdownInterval = setInterval(function () {
      countdown--;
      if (countdown > 0) {
        adminRefreshBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Try again in ${countdown} seconds`;
      } else {
        clearInterval(countdownInterval);
        can_adminRefreshBtn = true;
        adminRefreshBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Refresh`;
      }
    }, 1000);
  } else {
    adminRefreshBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Please wait ...`;
  }
});

const adminRefreshUserBtn = document.getElementById("admin-refresh-user-list");
let can_adminRefreshUserBtn = true;

adminRefreshUserBtn.addEventListener("click", function () {
  if (can_adminRefreshUserBtn) {
    can_adminRefreshUserBtn = false;
    fetchAdminMaster();
    let countdown = 20;
    adminRefreshUserBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Try again in ${countdown} seconds`;
    let countdownInterval = setInterval(function () {
      countdown--;
      if (countdown > 0) {
        adminRefreshUserBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Try again in ${countdown} seconds`;
      } else {
        clearInterval(countdownInterval);
        can_adminRefreshUserBtn = true;
        adminRefreshUserBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Refresh`;
      }
    }, 1000);
  } else {
    adminRefreshUserBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Please wait ...`;
  }
});

const adminRefreshFeedbackBtn = document.getElementById(
  "admin-refresh-feedback-list"
);
let can_adminRefreshFeedbackBtn = true;

adminRefreshFeedbackBtn.addEventListener("click", function () {
  if (can_adminRefreshFeedbackBtn) {
    can_adminRefreshFeedbackBtn = false;
    fetchAdminMaster();
    let countdown = 20;
    adminRefreshFeedbackBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Try again in ${countdown} seconds`;
    let countdownInterval = setInterval(function () {
      countdown--;
      if (countdown > 0) {
        adminRefreshFeedbackBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Try again in ${countdown} seconds`;
      } else {
        clearInterval(countdownInterval);
        can_adminRefreshFeedbackBtn = true;
        adminRefreshFeedbackBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Refresh`;
      }
    }, 1000);
  } else {
    adminRefreshFeedbackBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Please wait ...`;
  }
});

const refreshChannelBtn = document.getElementById("refresh-channel-list");
refreshChannelBtn.addEventListener("click", firstCall);

function openMyJobTab() {
  document.querySelector("#my-job-tab").click();
}

const username = document.getElementById("username-text");
username.innerHTML = `Welcome back! ${myData.userData.username}`;

let tabs = [
  {
    id: "dashboard-tab",
    title: "Dashboard",
    content: "dashboard",
  },
  {
    id: "my-job-tab",
    title: "Job Slot",
    content: "my-job",
  },
  {
    id: "history-tab",
    title: "Purchase History",
    content: "history",
  },
];

if (myData.userData.role_id === 1) {
  tabs.push(
    {
      id: "admin-tab",
      title: "Jobs (admin)",
      content: "admin",
    },
    {
      id: "admin-user-tab",
      title: "Users (admin)",
      content: "admin-user",
    },
    {
      id: "admin-feedback-tab",
      title: "Feedbacks (admin)",
      content: "admin-feedback",
    }
  );
}

let tabHTML = "";

for (let i = 0; i < tabs.length; i++) {
  let isActive = i === 0 ? "active" : "";
  tabHTML += `
    <li class="nav-item">
      <a
        class="nav-link ${isActive}"
        id="${tabs[i].id}"
        data-toggle="tab"
        href="#${tabs[i].content}"
        role="tab"
        aria-controls="${tabs[i].content}"
        aria-selected="${isActive}"
        >${tabs[i].title}</a
      >
    </li>
  `;
}

document.getElementById("myTab").innerHTML = tabHTML;

let selectedJob;

const format = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

let selectedVisibilityItem = null;
var visibilityListData = [];

const retryVisibility = document.getElementById("retry-visibility-btn");
retryVisibility.addEventListener("click", fetchVisibilityProduct);

function populateVisibility(allData = []) {
  const listLoader = document.getElementById("visibility-list-loader");
  const listEmpty = document.getElementById("visibility-list-empty");
  const listContainer = document.getElementById("visibility-list-container");
  const listBody = document.getElementById("visibility-list-body");

  var totalRecord = [];

  allData.forEach((item) => {
    if (item.metadata.type === "visibility" && item.active == true) {
      const card = listBody.cloneNode(true);
      const divs = card.getElementsByTagName("div");

      const title = divs[0].getElementsByTagName("h7");

      title[0].innerHTML = `${item.name} - RM ${item.metadata.price}`;

      if (selectedVisibilityItem?.id == item.id) {
        divs[0].style.backgroundColor = "#f8f9fc";
        divs[0].style.border = "1px solid #4d72de";
        divs[0].style.borderRadius = "5px";
      } else {
        divs[0].style.backgroundColor = null;
        divs[0].style.border = null;
        divs[0].style.borderRadius = null;
      }

      divs[0].addEventListener("click", function () {
        var totalPriceElement = document.getElementById(
          "visibility-total-price-element"
        );
        visibilityPrice = parseInt(item.metadata.price, 10);
        totalPriceElement.innerHTML = `RM ${visibilityPrice}`;
        selectedVisibilityItem = item;
        populateVisibility(visibilityListData); // update background color
      });

      totalRecord.push(card);
    }
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

let selectedChannelItem = null;
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
    const iconExternalLink = divs[0].getElementsByTagName("i");

    var badgeInfo = "";

    if (item.is_new && item.paid_only === false) {
      badgeInfo = `<span class="badge badge-danger">New</span>`;
    } else if (item.is_new && item.paid_only === true) {
      badgeInfo = `<span class="badge badge-warning">Plus Slot Only</span> <span class="badge badge-danger">New</span>`;
    } else {
      badgeInfo = "";
    }

    title[0].innerHTML = `${item.source_name} ∙ ${item.name} ${badgeInfo}`;

    iconExternalLink[0].addEventListener("click", function () {
      window.open(item.url, "_blank");
    });

    if (selectedChannelItem?.id == item.id) {
      divs[0].style.backgroundColor = "#f8f9fc";
      divs[0].style.border = "1px solid #4d72de";
      divs[0].style.borderRadius = "5px";
    } else {
      divs[0].style.backgroundColor = null;
      divs[0].style.border = null;
      divs[0].style.borderRadius = null;
    }

    divs[0].addEventListener("click", function () {
      selectedChannelItem = item;
      populateChannel(); // update background color
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

document
  .getElementById("refresh-coupon-list")
  .addEventListener("click", firstCall);
document
  .getElementById("modal-refresh-coupon-list")
  .addEventListener("click", firstCall);

function populateCouponDashboard(data) {
  const loadingChannelCard = document.getElementById(
    "home-coupon-list-loading"
  );
  const emptyCard = document.getElementById("home-coupon-list-empty");
  const parentTable = document.getElementById("home-coupon-list-parent");
  const style = document.getElementById("home-coupon-list-child");
  const emptyDiv = [];

  data.forEach(function (item) {
    const card = style.cloneNode(true);
    const divs = card.getElementsByTagName("div");

    const title = divs[0].getElementsByTagName("h5");
    const description = divs[0].getElementsByTagName("h6");

    title[0].innerHTML = `${item.discount} - ${item.name}`;
    description[0].innerHTML = `Code: ${item.code}`;
    divs[2].addEventListener("click", function () {
      navigator.clipboard
        .writeText(item.code)
        .then(() => {
          divs[2].innerHTML = "Code copied!";
        })
        .catch((error) => {
          console.error("Failed to copy link: ", error);
        });
    });
    emptyDiv.push(card);
  });

  loadingChannelCard.classList.add("hidden");

  if (emptyDiv.length === 0) {
    emptyCard.classList.remove("hidden");
    parentTable.classList.add("hidden");
  } else {
    emptyCard.classList.add("hidden");
    parentTable.classList.remove("hidden");

    while (parentTable.firstChild) {
      parentTable.removeChild(parentTable.firstChild);
    }
    emptyDiv.forEach((item) => {
      parentTable.appendChild(item);
    });
  }
}

function populateCouponModal(data) {
  const loadingChannelCard = document.getElementById(
    "modal-coupon-list-loading"
  );
  const emptyCard = document.getElementById("modal-coupon-list-empty");
  const parentTable = document.getElementById("modal-coupon-list-parent");
  const style = document.getElementById("modal-coupon-list-child");
  const emptyDiv = [];

  data.forEach(function (item) {
    const card = style.cloneNode(true);
    const divs = card.getElementsByTagName("div");

    const title = divs[0].getElementsByTagName("h5");
    const description = divs[0].getElementsByTagName("h6");

    title[0].innerHTML = `${item.discount} - ${item.name}`;
    description[0].innerHTML = `Code: ${item.code}`;
    divs[2].addEventListener("click", function () {
      navigator.clipboard
        .writeText(item.code)
        .then(() => {
          divs[2].innerHTML = "Code copied!";
        })
        .catch((error) => {
          console.error("Failed to copy link: ", error);
        });
    });
    emptyDiv.push(card);
  });

  loadingChannelCard.classList.add("hidden");

  if (emptyDiv.length === 0) {
    emptyCard.classList.remove("hidden");
    parentTable.classList.add("hidden");
  } else {
    emptyCard.classList.add("hidden");
    parentTable.classList.remove("hidden");

    while (parentTable.firstChild) {
      parentTable.removeChild(parentTable.firstChild);
    }
    emptyDiv.forEach((item) => {
      parentTable.appendChild(item);
    });
  }
}

function populateChannelDashboard(data) {
  const loadingChannelCard = document.getElementById(
    "home-channel-list-loading"
  );
  const emptyCard = document.getElementById("home-channel-list-empty");
  const parentTable = document.getElementById("home-channel-list-parent");
  const style = document.getElementById("home-channel-list-child");
  const emptyDiv = [];

  data.forEach(function (item) {
    const card = style.cloneNode(true);
    const divs = card.getElementsByTagName("div");

    const title = divs[0].getElementsByTagName("a");
    const subscribers = divs[0].getElementsByTagName("h7");
    const description = divs[0].getElementsByTagName("p");

    if (item.is_new) {
      title[0].innerHTML = `${item.name} <span class="badge badge-danger">New</span>`;
    } else {
      title[0].innerHTML = `${item.name}`;
    }

    title[0].setAttribute("href", item.url);
    title[1].innerHTML = "View";

    if (item.source_code === "job_list") {
      subscribers[0].innerHTML = `${item.source_name}`;
    } else {
      subscribers[0].innerHTML = `${item.source_name} ∙ ${item.total_subscribers} subscribers`;
    }
    description[0].innerHTML = item.description;
    title[1].setAttribute("href", item.url);

    emptyDiv.push(card);
  });

  loadingChannelCard.classList.add("hidden");

  if (emptyDiv.length === 0) {
    emptyCard.classList.remove("hidden");
    parentTable.classList.add("hidden");
  } else {
    emptyCard.classList.add("hidden");
    parentTable.classList.remove("hidden");

    while (parentTable.firstChild) {
      parentTable.removeChild(parentTable.firstChild);
    }
    emptyDiv.forEach((item) => {
      parentTable.appendChild(item);
    });
  }
}

// Add a submit event listener to the form
channelForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (selectedJob.is_free && selectedChannelItem.paid_only) {
    alert(
      `This channel is exclusively for Plus job slots. Please create a Plus job slot to publish your job posting on this channel.`
    );
    return;
  }

  let submitChannelBtn = document.getElementById("submit-channel-btn");
  submitChannelBtn.disabled = true;
  submitChannelBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (selectedChannelItem?.id == null) {
    alert("Please select a channel in order to proceed.");
    submitChannelBtn.disabled = false;
    submitChannelBtn.innerHTML = "Post Now";
    return;
  }

  const options = {
    body: JSON.stringify({
      job_id: selectedJob.id,
      channel_id: selectedChannelItem.id,
      tz_name: userTimeZone,
    }),
  };

  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/job/post",
    "POST",
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        // delay of 2 seconds before calling fetchMyJobs
        setTimeout(() => {
          $("#channelJobModal").modal("hide");
          submitChannelBtn.disabled = false;
          submitChannelBtn.innerHTML = "Post Now";

          // Remove the previous event listener, if any
          $("#channelJobModal").off("hidden.bs.modal");
          // Attach a new event listener to show the alert
          $("#channelJobModal").on(
            "hidden.bs.modal",
            function handleModalHidden(e) {
              showAlert(
                "alert-post-container",
                "Error!",
                data.message,
                "danger",
                "my-post-alert",
                15000
              );
              window.scrollTo({ top: 0, behavior: "smooth" });
              // Remove the event listener after it's been triggered
              $("#channelJobModal").off("hidden.bs.modal", handleModalHidden);
            }
          );
        }, 2000);
      } else {
        // delay of 2 seconds before calling fetchMyJobs
        setTimeout(() => {
          $("#channelJobModal").modal("hide");
          submitChannelBtn.disabled = false;
          submitChannelBtn.innerHTML = "Post Now";
          fetchMyJobs();

          // Remove the previous event listener, if any
          $("#channelJobModal").off("hidden.bs.modal");
          // Attach a new event listener to show the alert
          $("#channelJobModal").on(
            "hidden.bs.modal",
            function handleModalHidden(e) {
              showAlert(
                "alert-post-container",
                "Great!",
                "your post has been successfully published. You can now view it by clicking on the 'View Published Post' button",
                "success",
                "my-post-alert",
                15000
              );
              window.scrollTo({ top: 0, behavior: "smooth" });
              // Remove the event listener after it's been triggered
              $("#channelJobModal").off("hidden.bs.modal", handleModalHidden);
            }
          );
        }, 2000);
      }
    })
    .catch((error) => {
      $("#channelJobModal").modal("hide");
      submitChannelBtn.disabled = false;
      submitChannelBtn.innerHTML = "Post Now";
    });
});

function fetchVisibilityProduct() {
  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:D1epqX-m:v1/products",
    "GET",
    token
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
        populateVisibility(visibilityListData);
      } else {
        visibilityListData = data.data;
        populateVisibility(data.data);
      }
    })
    .catch((error) => {
      console.error(error);
      populateVisibility(visibilityListData);
    });
}

const successUrl = "https://iklankerjakosongmalaysia.netlify.app/success";
const cancelUrl = "https://iklankerjakosongmalaysia.netlify.app/cancel";

// Add a submit event listener to the form
buyVisibilityForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let submitPayVisibilityBtn = document.getElementById("submit-visibility-btn");
  submitPayVisibilityBtn.disabled = true;
  submitPayVisibilityBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  if (selectedVisibilityItem == null) {
    alert("In order to continue, please pick one of the priced items");
    submitPayVisibilityBtn.disabled = false;
    submitPayVisibilityBtn.innerHTML = "Continue to payment";
    return;
  }

  var visibilityPrice = selectedVisibilityItem.default_price;
  var productVisibility = selectedVisibilityItem.metadata.day_visibility;
  var maxActivePost = selectedVisibilityItem.metadata.max_active_post;

  const options = {
    body: JSON.stringify({
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: [
        {
          price: visibilityPrice,
          quantity: 1,
        },
      ],
      metadata: {
        job_id: selectedJob.id,
        day_visibility: productVisibility,
        max_active_post: maxActivePost,
      },
    }),
  };

  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:9HYpvh_0:v1/sessions",
    "POST",
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
      } else {
        if (data.hasOwnProperty("url") && data.url !== null) {
          var checkoutUrl = data.url;
          window.location.href = checkoutUrl;
        } else {
          alert("Url not found in the response data");
        }
      }
      submitPayVisibilityBtn.disabled = false;
      submitPayVisibilityBtn.innerHTML = "Continue to payment";
    })
    .catch((error) => {
      submitPayVisibilityBtn.disabled = false;
      submitPayVisibilityBtn.innerHTML = "Continue to payment";
    });
});

const loadingIcon =
  '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
const loadingText =
  '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

var jobListState = [];
var openJobId = null;

function filterJob() {
  if (openJobId !== null) {
    var currentJob = {};

    jobListState.map((item) => {
      if (item.id === openJobId) {
        currentJob = item;
      }
    });

    listPostedJob(currentJob?.postData ? currentJob?.postData : []);
  }
}

var adminJobListState = [];
var adminOpenJobId = null;

function adminFilterJob() {
  if (adminOpenJobId !== null) {
    var currentJob = {};

    adminJobListState.map((item) => {
      if (item.id === adminOpenJobId) {
        currentJob = item;
      }
    });

    adminlistPostedJob(currentJob?.postData ? currentJob?.postData : []);
  }
}

function listPostedJob(passData) {
  const emptyCard = document.getElementById("posted-job-card-empty");

  const parentTable = document.getElementById("posted-job-card-list-parent");
  const style = document.getElementById("posted-job-card-list-child");

  const emptyDiv = [];

  if (passData.length !== 0) {
    passData.map((item) => {
      const card = style.cloneNode(true);
      const divs = card.getElementsByTagName("div");
      const channelContainer = divs[0].getElementsByTagName("h6");
      const activeAtContainer = divs[0].getElementsByTagName("h7");
      const deleteBtn = divs[0].getElementsByTagName("button")[0];
      deleteBtn.addEventListener("click", function () {
        deleteJob(item.id, this, "employer");
      });

      const viewBtn = divs[0].getElementsByTagName("button")[1];

      var newLink = "";

      if (item.is_telegram) {
        newLink = `${item.channel_data.url}/${item.telegram_data.message_id}`;
      } else {
        newLink = `${item.channel_data.url}?postId=${item.id}`;
      }

      viewBtn.addEventListener("click", function () {
        window.open(newLink);
      });

      let activeDate = new Date(item.created_at);
      const newActiveDate = activeDate.toLocaleString("en-US", format);

      channelContainer[0].innerHTML = `${item.channel_data.name}`;
      activeAtContainer[0].innerHTML = `Posted at: ${newActiveDate}`;
      emptyDiv.push(card);
    });
  }

  if (emptyDiv.length === 0) {
    emptyCard.classList.remove("hidden");
    parentTable.classList.add("hidden");
  } else {
    emptyCard.classList.add("hidden");
    parentTable.classList.remove("hidden");
    while (parentTable.firstChild) {
      parentTable.removeChild(parentTable.firstChild);
    }
    emptyDiv.forEach((item) => {
      parentTable.appendChild(item);
    });
  }
}

document
  .getElementById("edit-job-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let submitEditJobBtn = document.getElementById("submit-edit-job-btn");

    submitEditJobBtn.disabled = true;
    submitEditJobBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

    if (token) {
      var company_name = document.getElementById(
        "input-edit-company-name"
      ).value;
      var ssm_number = document.getElementById("input-edit-company-ssm").value;
      var title = document.getElementById("input-edit-job-title").value;
      var type = document.getElementById("input-edit-job-type").value;
      var min_salary = document.getElementById(
        "input-edit-job-min-salary"
      ).value;
      var max_salary = document.getElementById(
        "input-edit-job-max-salary"
      ).value;
      var salary_type = document.getElementById(
        "input-edit-job-salary-type"
      ).value;
      var requirement = document.getElementById(
        "input-edit-job-requirement"
      ).value;
      var benefit = document.getElementById("input-edit-job-benefit").value;
      var additional_info = document.getElementById(
        "input-edit-job-additional-info"
      ).value;
      var location = document.getElementById("input-edit-job-location").value;
      var apply_link = document.getElementById("input-edit-job-url").value;

      if (min_salary) {
        if (min_salary <= max_salary) {
          // proceed
        } else {
          alert("Maximum salary should be greater than minimum salary");
          submitEditJobBtn.disabled = false;
          submitEditJobBtn.innerHTML = "Submit";
          return;
        }
      }

      const options = {
        body: JSON.stringify({
          job_id: selectedJob.id,
          title: title,
          company_name: company_name,
          ssm_number: ssm_number,
          type: type,
          min_salary: min_salary,
          max_salary: max_salary,
          salary_type: salary_type,
          location: location,
          requirement: requirement,
          benefit: benefit,
          additional_info: additional_info,
          apply_link: apply_link,
        }),
      };

      fetchAPI(
        "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7:v1/job/edit",
        "PUT",
        token,
        options
      )
        .then((data) => {
          if (data?.message) {
            alert(data.message);
          } else {
            // delay of 2 seconds before calling fetchMyJobs
            setTimeout(() => {
              fetchMyJobs();
              $("#editJobModal").modal("hide");
              submitEditJobBtn.disabled = false;
              submitEditJobBtn.innerHTML = "Submit";
            }, 2000);
          }
        })
        .catch((error) => {
          $("#addJobModal").modal("hide");
          submitEditJobBtn.disabled = false;
          submitEditJobBtn.innerHTML = "Submit";
        });
    }
  });

function fetchMyJobs() {
  fetchAPI("https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/job", "GET", token)
    .then((data) => {
      var job_list = data.job_list;
      var post_list = data.post_list;

      post_list.map((item1) => {
        job_list.map((item2, index) => {
          if (item1.job_id == item2.id) {
            if (job_list[index].postData) {
              job_list[index].postData.push(item1);
            } else {
              job_list[index].postData = [item1];
            }
          }
        });
      });

      const loadingStatusCard = document.getElementById(
        "home-status-list-loading"
      );
      const parentTableHome = document.getElementById(
        "home-status-list-parent"
      );

      const emptyCard = document.getElementById("my-job-card-empty");
      const parentTable = document.getElementById("my-job-card-list-parent");
      const style = document.getElementById("my-job-card-list-child");
      const emptyDiv = [];

      const dashboard = {
        not_active: 0,
        active: 0,
        expired: 0,
      };

      if (data?.channel_list) {
        channelListData = data.channel_list;
        populateChannelDashboard(data.channel_list);
      }

      if (data?.coupon_list) {
        populateCouponDashboard(data.coupon_list);
        populateCouponModal(data.coupon_list);
      }

      populateOrderHistoryVisibility(job_list);

      jobListState = job_list;

      job_list.map((item) => {
        const card = style.cloneNode(true);
        const divs = card.getElementsByTagName("div");

        let isPaid_isFree = false;
        let badge = `<span class="badge badge-pill badge-danger">Not Active</span>`;

        if (item?.payment_info?.payment_status == "paid") {
          isPaid_isFree = true;
        }
        if (item.is_free == true) {
          isPaid_isFree = true;
        }

        const editBtn = divs[0].getElementsByTagName("i")[0];

        if (isPaid_isFree === true && item.status_id === 3) {
          editBtn.addEventListener("click", function () {
            alert("The job slot has expired and is no longer editable");
          });
        } else {
          editBtn.addEventListener("click", function () {
            var requirement = document.getElementById(
              "input-edit-job-requirement"
            );
            var benefit = document.getElementById("input-edit-job-benefit");
            var additonal_information = document.getElementById(
              "input-edit-job-additional-info"
            );
            var labelJobUrl = document.getElementById("label-edit-job-url");

            if (item.is_free == true) {
              var disableText = "This field only available for Plus version";
              requirement.value = "";
              requirement.disabled = true;
              requirement.placeholder = disableText;
              benefit.value = "";
              benefit.disabled = true;
              benefit.placeholder = disableText;
              additonal_information.value = "";
              additonal_information.disabled = true;
              additonal_information.placeholder = disableText;
              labelJobUrl.textContent = `Job application URL (ads may appear in
              the Free version).`;
            } else {
              requirement.disabled = false;
              requirement.placeholder = "";
              benefit.disabled = false;
              benefit.placeholder = "";
              additonal_information.disabled = false;
              additonal_information.placeholder = "";
              labelJobUrl.textContent = `Job application URL`;
            }

            $("#editJobModal").modal("show");
            $("#editJobModal").on("shown.bs.modal", function () {
              selectedJob = item;
              document.getElementById("input-edit-company-name").value =
                item.company_name;
              document.getElementById("input-edit-company-ssm").value =
                item.ssm_number;
              document.getElementById("input-edit-job-title").value =
                item.title;
              document.getElementById("input-edit-job-type").value = item.type;
              document.getElementById("input-edit-job-min-salary").value =
                item.min_salary;
              document.getElementById("input-edit-job-max-salary").value =
                item.max_salary;
              document.getElementById("input-edit-job-salary-type").value =
                item.salary_type;
              document.getElementById("input-edit-job-requirement").value =
                item.requirement;
              document.getElementById("input-edit-job-benefit").value =
                item.benefit;
              document.getElementById("input-edit-job-additional-info").value =
                item.additional_info;
              document.getElementById("input-edit-job-location").value =
                item.location;
              document.getElementById("input-edit-job-url").value =
                item.apply_link;
            });
          });
        }
        const jobTimeline = divs[0].getElementsByTagName("h7");

        if (item.timestamp_active && item.timestamp_expired) {
          let active = new Date(item.timestamp_active);
          let expired = new Date(item.timestamp_expired);

          const active_date = active.toLocaleString("en-US", format);
          const expired_date = expired.toLocaleString("en-US", format);

          if (item.status_id === 3) {
            jobTimeline[0].innerHTML = `This job slot has expired at ${expired_date}`;
          } else {
            if (item.is_free == true) {
              jobTimeline[0].innerHTML = `Free ∙ Maximum of ${item.payment_info.max_active_post} published post at a time ∙ Active for ${item.payment_info.day_visibility} day (${active_date} - ${expired_date})`;
            } else {
              jobTimeline[0].innerHTML = `Plus ∙ Maximum of ${item.payment_info.max_active_post} published post at a time ∙ Active for ${item.payment_info.day_visibility} day (${active_date} - ${expired_date})`;
            }
          }
        } else {
          jobTimeline[0].innerHTML = "-";
        }
        const listItem = divs[0].getElementsByTagName("li");
        listItem[0].innerHTML = `<b>Title of the job opening:</b> ${item.title}`;
        listItem[1].innerHTML = `<b>Company name:</b> ${item.company_name} (${item.ssm_number})`;

        listItem[2].innerHTML = `<b>Type:</b> ${item.type}`;

        if (item.min_salary > 0) {
          listItem[3].innerHTML = `<b>Salary:</b> MYR ${item.min_salary} - ${item.max_salary} ${item.salary_type}`;
        } else {
          listItem[3].innerHTML = `<b>Salary:</b> Not Stated`;
        }

        listItem[4].innerHTML = `<b>Location:</b> ${item.location}`;

        if (item.is_free == true) {
          listItem[5].innerHTML = "";
          listItem[6].innerHTML = "";
          listItem[7].innerHTML = "";
        } else {
          listItem[5].innerHTML = `<b>Requirements:</b><br>${item.requirement.replace(
            /\n/g,
            "<br>"
          )}`;
          listItem[6].innerHTML = `<b>Benefits:</b><br>${item.benefit.replace(
            /\n/g,
            "<br>"
          )}`;
          listItem[7].innerHTML = `<b>Additional Information:</b><br>${item.additional_info.replace(
            /\n/g,
            "<br>"
          )}`;
        }

        if (item.is_free == true) {
          listItem[8].innerHTML = `<b>Job application URL:</b> <a href="${item.apply_link_free}" target="_blank"> ${item.apply_link_free}</a>`;
        } else {
          listItem[8].innerHTML = `<b>Job application URL:</b> <a href="${item.apply_link}" target="_blank"> ${item.apply_link}</a>`;
        }

        const nextStepTitle = divs[0].getElementsByTagName("strong");
        const actionBtnContainer = divs[0].getElementsByTagName("div")[1];
        const actionBtn = actionBtnContainer.getElementsByTagName("button");
        const progressContainer = divs[4].getElementsByTagName("div")[1];

        const firstBtn = actionBtn[0];
        const secondBtn = actionBtn[1];

        var currentTotalPost = 0;

        if (item?.postData) {
          currentTotalPost = item?.postData.length;
        } else {
          currentTotalPost = 0;
        }

        if (isPaid_isFree === false) {
          dashboard.not_active = dashboard.not_active + 1;
          progressContainer.style.width = "35%";
          progressContainer.firstChild.nodeValue = "1/3 steps";
          nextStepTitle[0].innerHTML = `Next step: Activate`;
          firstBtn.innerHTML = "Activate";
          firstBtn.addEventListener("click", function () {
            if (visibilityListData.length == 0) {
              fetchVisibilityProduct();
            } else {
              populateVisibility(visibilityListData);
            }

            $("#payJobModal").modal("show");
            $("#payJobModal").on("shown.bs.modal", function () {
              selectedJob = item;
              const payJobTitle = document.getElementById(
                "pay-job-title-modal"
              );
              payJobTitle.innerHTML = `Job Slot ID: ${item.custom_id}`;
            });
          });

          firstBtn.disabled = false;
          firstBtn.classList.replace("btn-secondary", "btn-primary");
          secondBtn.classList.add("hidden");
        } else if (isPaid_isFree === true && item.status_id === 1) {
          dashboard.active = dashboard.active + 1;
          badge = `<span class="badge badge-pill badge-success">Active</span>`;
          progressContainer.style.width = "65%";
          progressContainer.firstChild.nodeValue = "2/3 steps";
          nextStepTitle[0].innerHTML = `Next step: First Time Post`;
          firstBtn.innerHTML = `First Time Post ${currentTotalPost}/${item.payment_info.max_active_post}`;
          firstBtn.addEventListener("click", function () {
            $("#channelJobModal").modal("show");
            $("#channelJobModal").on("shown.bs.modal", function () {
              selectedJob = item;
              populateChannel();
            });
          });
          firstBtn.disabled = false;
          firstBtn.classList.replace("btn-secondary", "btn-primary");
          secondBtn.classList.add("hidden");
        } else if (isPaid_isFree === true && item.status_id === 2) {
          badge = `<span class="badge badge-pill badge-success">Active</span>`;
          dashboard.active = dashboard.active + 1;
          firstBtn.innerHTML = `Post ${currentTotalPost}/${item.payment_info.max_active_post}`;
          firstBtn.addEventListener("click", function () {
            $("#channelJobModal").modal("show");
            $("#channelJobModal").on("shown.bs.modal", function () {
              selectedJob = item;
              populateChannel();
            });
          });
          firstBtn.disabled = false;
          firstBtn.classList.replace("btn-secondary", "btn-primary");

          progressContainer.style.width = "100%";
          progressContainer.firstChild.nodeValue = "3/3 steps";
          nextStepTitle[0].innerHTML = `Completed`;
          secondBtn.classList.remove("hidden");
          secondBtn.innerHTML = `View Published Post <span class="badge badge-light">${currentTotalPost}</span>`;
          secondBtn.addEventListener("click", function () {
            $("#postedJobModal").modal("show");
            openJobId = item.id;
            filterJob();
          });
        } else if (isPaid_isFree === true && item.status_id === 3) {
          dashboard.expired = dashboard.expired + 1;
          badge = `<span class="badge badge-pill badge-secondary">Expired</span>`;

          firstBtn.innerHTML = `Post ${currentTotalPost}/${item.payment_info.max_active_post}`;
          firstBtn.classList.replace("btn-primary", "btn-secondary");
          firstBtn.addEventListener("click", function () {
            alert(
              "We're sorry, but the job slot you're trying to post has expired, and all job postings associated with this slot will no longer be available on our channels. To post a new job opportunity, please create a new job slot."
            );
          });

          progressContainer.style.width = "100%";
          progressContainer.firstChild.nodeValue = "3/3 steps";
          nextStepTitle[0].innerHTML = "Completed";
          secondBtn.classList.add("hidden");
        } else if (isPaid_isFree === true && item.status_id === 4) {
          badge = `<span class="badge badge-pill badge-dark">Blocked</span>`;

          firstBtn.innerHTML = `Post ${currentTotalPost}/${item.payment_info.max_active_post}`;
          firstBtn.classList.replace("btn-primary", "btn-secondary");
          firstBtn.addEventListener("click", function () {
            alert(
              "Your job slot has been blocked and all related posts have been removed due to policy violation. To appeal this decision, please submit a request through the 'Feedback' section in your account settings and include the Job Slot ID for reference."
            );
          });

          progressContainer.style.width = "100%";
          progressContainer.firstChild.nodeValue = "3/3 steps";
          nextStepTitle[0].innerHTML = "Completed";
          secondBtn.classList.add("hidden");
        }

        const customId = divs[0].getElementsByTagName("h6");
        customId[0].innerHTML = `Job Slot ID: ${item.custom_id} ${badge}`;

        emptyDiv.push(card);
      });

      const summary1 = document.getElementById("total-not-active");
      summary1.innerHTML = dashboard.not_active;

      const summary2 = document.getElementById("total-active");
      summary2.innerHTML = dashboard.active;

      const summary3 = document.getElementById("total-expired");
      summary3.innerHTML = dashboard.expired;

      loadingStatusCard.classList.add("hidden");
      parentTableHome.classList.remove("hidden");

      if (emptyDiv.length === 0) {
        emptyCard.classList.remove("hidden");
        parentTable.classList.add("hidden");
        $("#onboardingModal").modal("show");
      } else {
        emptyCard.classList.add("hidden");
        parentTable.classList.remove("hidden");
        while (parentTable.firstChild) {
          parentTable.removeChild(parentTable.firstChild);
        }
        emptyDiv.forEach((item) => {
          parentTable.appendChild(item);
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function populateOrderHistoryVisibility(data) {
  const listLoader = document.getElementById(
    "order-history-visibility-list-loader"
  );
  const listEmpty = document.getElementById(
    "order-history-visibility-list-empty"
  );
  const listContainer = document.getElementById(
    "order-history-visibility-list-container"
  );
  const listBody = document.getElementById(
    "order-history-visibility-list-body"
  );

  // Clear the table before appending the new data
  while (listBody.firstChild) {
    listBody.removeChild(listBody.firstChild);
  }

  var totalRecord = [];

  data.forEach((item) => {
    if (item?.payment_info?.payment_status === "paid") {
      let row = document.createElement("tr");
      let jobId = document.createElement("td");
      jobId.innerText = item.custom_id;
      let datePurchased = document.createElement("td");
      if (item?.payment_info?.timestamp) {
        let timestamp = new Date(item.payment_info.timestamp);
        datePurchased.innerText = timestamp.toLocaleString("en-US", format);
      } else {
        datePurchased.innerText = "-";
      }

      let dayVisibility = document.createElement("td");

      if (item?.payment_info?.day_visibility) {
        dayVisibility.innerText = item.payment_info.day_visibility;
      } else {
        dayVisibility.innerText = 0;
      }

      let maxActivePost = document.createElement("td");

      if (item?.payment_info?.max_active_post) {
        maxActivePost.innerText = item.payment_info.max_active_post;
      } else {
        maxActivePost.innerText = 0;
      }

      // let totalAmount = document.createElement("td");
      // if (item?.payment_info?.amount_total) {
      //   totalAmount.innerText = formatPrice(item.payment_info.amount_total);
      // } else {
      //   totalAmount.innerText = "-";
      // }
      let orderStatus = document.createElement("td");
      orderStatus.innerText = "Paid";

      row.appendChild(jobId);
      row.appendChild(datePurchased);
      row.appendChild(dayVisibility);
      row.appendChild(maxActivePost);
      // row.appendChild(totalAmount);
      row.appendChild(orderStatus);
      totalRecord.push(item);
      document
        .getElementById("order-history-visibility-list-body")
        .appendChild(row);
    }
  });

  listLoader.classList.add("hidden");

  if (totalRecord.length === 0) {
    listEmpty.classList.remove("hidden");
    listContainer.classList.add("hidden");
  } else {
    listEmpty.classList.add("hidden");
    listContainer.classList.remove("hidden");
  }
}

document.getElementById("boost-post-btn").onclick = function () {
  $("#addJobModal").modal("hide");
  // Remove the previous event listener, if any
  $("#addJobModal").off("hidden.bs.modal");
  // Attach a new event listener to show the alert
  $("#addJobModal").on("hidden.bs.modal", function handleModalHidden(e) {
    $("#postBoostModal").modal("show");
    // Remove the event listener after it's been triggered
    $("#addJobModal").off("hidden.bs.modal", handleModalHidden);
  });
};

function openBackFreeSlotModal() {
  $("#postBoostModal").modal("hide");
  // Remove the previous event listener, if any
  $("#postBoostModal").off("hidden.bs.modal");
  // Attach a new event listener to show the alert
  $("#postBoostModal").on("hidden.bs.modal", function handleModalHidden(e) {
    $("#addJobModal").modal("show");
    // Remove the event listener after it's been triggered
    $("#postBoostModal").off("hidden.bs.modal", handleModalHidden);
  });
}

document.getElementById("close-open-free-slot-btn").onclick = function () {
  openBackFreeSlotModal();
};

document.getElementById("go-back-to-free-slot-btn").onclick = function () {
  openBackFreeSlotModal();
};

var company_name_free = document.getElementById("input-free-company-name");
var ssm_number_free = document.getElementById("input-free-company-ssm");
var title_free = document.getElementById("input-free-job-title");
var type_free = document.getElementById("input-free-job-type");
var min_salary_free = document.getElementById("input-free-job-min-salary");
var max_salary_free = document.getElementById("input-free-job-max-salary");
var salary_type_free = document.getElementById("input-free-job-salary-type");
var location_free = document.getElementById("input-free-job-location");
var apply_link_free = document.getElementById("input-free-job-url");

var company_name_paid = document.getElementById("input-paid-company-name");
var ssm_number_paid = document.getElementById("input-paid-company-ssm");
var title_paid = document.getElementById("input-paid-job-title");
var type_paid = document.getElementById("input-paid-job-type");
var min_salary_paid = document.getElementById("input-paid-job-min-salary");
var max_salary_paid = document.getElementById("input-paid-job-max-salary");
var salary_type_paid = document.getElementById("input-paid-job-salary-type");
var requirement_paid = document.getElementById("input-paid-job-requirement");
var benefit_paid = document.getElementById("input-paid-job-benefit");
var additional_info_paid = document.getElementById(
  "input-paid-job-additional-info"
);
var location_paid = document.getElementById("input-paid-job-location");
var apply_link_paid = document.getElementById("input-paid-job-url");

document.getElementById("transfer-content-to-plus-btn").onclick = function () {
  $("#postBoostModal").modal("hide");
  // Remove the previous event listener, if any
  $("#postBoostModal").off("hidden.bs.modal");
  // Attach a new event listener to show the alert
  $("#postBoostModal").on("hidden.bs.modal", function handleModalHidden(e) {
    $("#addJobModal").modal("show");
    document.querySelector("#my-paid-slot-tab").click();

    company_name_paid.value = company_name_free.value;
    company_name_free.value = "";

    ssm_number_paid.value = ssm_number_free.value;
    ssm_number_free.value = "";

    title_paid.value = title_free.value;
    title_free.value = "";

    type_paid.value = type_free.value;
    type_free.value = "";

    min_salary_paid.value = min_salary_free.value;
    min_salary_free.value = "";

    max_salary_paid.value = max_salary_free.value;
    max_salary_free.value = "";

    salary_type_paid.value = salary_type_free.value;
    salary_type_free.value = "";

    location_paid.value = location_free.value;
    location_free.value = "";

    apply_link_paid.value = apply_link_free.value;
    apply_link_free.value = "";

    // Remove the event listener after it's been triggered
    $("#postBoostModal").off("hidden.bs.modal", handleModalHidden);
  });
};

document
  .getElementById("free-job-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let submitFreeJobBtn = document.getElementById("submit-free-job-btn");

    submitFreeJobBtn.disabled = true;
    submitFreeJobBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

    if (token) {
      if (min_salary_free.value) {
        if (min_salary_free.value <= max_salary_free.value) {
          // proceed
        } else {
          alert("Maximum salary should be greater than minimum salary");
          submitFreeJobBtn.disabled = false;
          submitFreeJobBtn.innerHTML = "Create";
          return;
        }
      }

      const options = {
        body: JSON.stringify({
          title: title_free.value,
          company_name: company_name_free.value,
          ssm_number: ssm_number_free.value,
          type: type_free.value,
          min_salary: min_salary_free.value,
          max_salary: max_salary_free.value,
          salary_type: salary_type_free.value,
          location: location_free.value,
          apply_link: apply_link_free.value,
          is_free: true,
        }),
      };

      fetchAPI(
        "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7:v1/job",
        "POST",
        token,
        options
      )
        .then((data) => {
          if (data?.message) {
            alert(data.message);
            submitFreeJobBtn.disabled = false;
            submitFreeJobBtn.innerHTML = "Create";
          } else {
            // delay of 2 seconds before calling fetchMyJobs
            setTimeout(() => {
              fetchMyJobs();
              $("#addJobModal").modal("hide");
              submitFreeJobBtn.disabled = false;
              submitFreeJobBtn.innerHTML = "Create";
            }, 2000);
          }
        })
        .catch((error) => {
          $("#addJobModal").modal("hide");
          submitFreeJobBtn.disabled = false;
          submitFreeJobBtn.innerHTML = "Create";
        });
    }
  });

document
  .getElementById("paid-job-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let submitPaidJobBtn = document.getElementById("submit-paid-job-btn");

    submitPaidJobBtn.disabled = true;
    submitPaidJobBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

    if (token) {
      if (min_salary_paid.value) {
        if (min_salary_paid.value <= max_salary_paid.value) {
          // proceed
        } else {
          alert("Maximum salary should be greater than minimum salary");
          submitPaidJobBtn.disabled = false;
          submitPaidJobBtn.innerHTML = "Create";
          return;
        }
      }

      const options = {
        body: JSON.stringify({
          title: title_paid.value,
          company_name: company_name_paid.value,
          ssm_number: ssm_number_paid.value,
          type: type_paid.value,
          min_salary: min_salary_paid.value,
          max_salary: max_salary_paid.value,
          salary_type: salary_type_paid.value,
          location: location_paid.value,
          requirement: requirement_paid.value,
          benefit: benefit_paid.value,
          additional_info: additional_info_paid.value,
          apply_link: apply_link_paid.value,
          is_free: false,
        }),
      };

      fetchAPI(
        "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7:v1/job",
        "POST",
        token,
        options
      )
        .then((data) => {
          if (data?.message) {
            alert(data.message);
            submitPaidJobBtn.disabled = false;
            submitPaidJobBtn.innerHTML = "Create";
          } else {
            // delay of 2 seconds before calling fetchMyJobs
            setTimeout(() => {
              fetchMyJobs();
              $("#addJobModal").modal("hide");
              submitPaidJobBtn.disabled = false;
              submitPaidJobBtn.innerHTML = "Create";
            }, 2000);
          }
        })
        .catch((error) => {
          $("#addJobModal").modal("hide");
          submitPaidJobBtn.disabled = false;
          submitPaidJobBtn.innerHTML = "Create";
        });
    }
  });

const expiredBtn = document.getElementById("expired-slot-btn");
expiredBtn.addEventListener("click", expiredJob);

function expiredJob() {
  expiredBtn.disabled = true;
  expiredBtn.innerHTML = loadingText;

  const options = {
    body: JSON.stringify({
      job_id: adminOpenJobId,
    }),
  };

  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7:v1/admin/job/expired",
    "PUT",
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
        expiredBtn.disabled = false;
        expiredBtn.innerHTML = "Expired Slot";
      } else {
        // delay of 2 seconds before calling fetchMyJobs
        setTimeout(() => {
          fetchAdminMaster();
          $("#actionModal").modal("hide");
          expiredBtn.disabled = false;
          expiredBtn.innerHTML = "Expired Slot";
        }, 2000);
      }
    })
    .catch((error) => {
      $("#actionModal").modal("hide");
      expiredBtn.disabled = false;
      expiredBtn.innerHTML = "Expired Slot";
    });
}

const undoExpiredBtn = document.getElementById("undo-expired-slot-btn");
undoExpiredBtn.addEventListener("click", undoExpiredJob);

function undoExpiredJob() {
  undoExpiredBtn.disabled = true;
  undoExpiredBtn.innerHTML = loadingText;

  const options = {
    body: JSON.stringify({
      job_id: adminOpenJobId,
    }),
  };

  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/admin/job/undo/expired",
    "PUT",
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
        undoExpiredBtn.disabled = false;
        undoExpiredBtn.innerHTML = "Undo Expiry";
      } else {
        // delay of 2 seconds before calling fetchMyJobs
        setTimeout(() => {
          fetchAdminMaster();
          $("#actionModal").modal("hide");
          undoExpiredBtn.disabled = false;
          undoExpiredBtn.innerHTML = "Undo Expiry";
        }, 2000);
      }
    })
    .catch((error) => {
      $("#actionModal").modal("hide");
      undoExpiredBtn.disabled = false;
      undoExpiredBtn.innerHTML = "Undo Expiry";
    });
}

const blockBtn = document.getElementById("block-slot-btn");
blockBtn.addEventListener("click", blockSlot);

function blockSlot() {
  blockBtn.disabled = true;
  blockBtn.innerHTML = loadingText;

  const options = {
    body: JSON.stringify({
      job_id: adminOpenJobId,
    }),
  };

  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/admin/job/block",
    "PUT",
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
        blockBtn.disabled = false;
        blockBtn.innerHTML = "Block Slot";
      } else {
        // delay of 2 seconds before calling fetchMyJobs
        setTimeout(() => {
          fetchAdminMaster();
          $("#actionModal").modal("hide");
          blockBtn.disabled = false;
          blockBtn.innerHTML = "Block Slot";
        }, 2000);
      }
    })
    .catch((error) => {
      $("#actionModal").modal("hide");
      blockBtn.disabled = false;
      blockBtn.innerHTML = "Block Slot";
    });
}

const unblockBtn = document.getElementById("unblock-slot-btn");
unblockBtn.addEventListener("click", unBlockSlot);

function unBlockSlot() {
  unblockBtn.disabled = true;
  unblockBtn.innerHTML = loadingText;

  const options = {
    body: JSON.stringify({
      job_id: adminOpenJobId,
    }),
  };

  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/admin/job/unblock",
    "PUT",
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
        unblockBtn.disabled = false;
        unblockBtn.innerHTML = "Unblock Slot";
      } else {
        // delay of 2 seconds before calling fetchMyJobs
        setTimeout(() => {
          fetchAdminMaster();
          $("#actionModal").modal("hide");
          unblockBtn.disabled = false;
          unblockBtn.innerHTML = "Unblock Slot";
        }, 2000);
      }
    })
    .catch((error) => {
      $("#actionModal").modal("hide");
      unblockBtn.disabled = false;
      unblockBtn.innerHTML = "Unblock Slot";
    });
}

function adminlistPostedJob(passData) {
  const emptyCard = document.getElementById("admin-posted-job-card-empty");

  const parentTable = document.getElementById(
    "admin-posted-job-card-list-parent"
  );
  const style = document.getElementById("admin-posted-job-card-list-child");

  const emptyDiv = [];

  if (passData.length !== 0) {
    passData.map((item) => {
      const card = style.cloneNode(true);
      const divs = card.getElementsByTagName("div");
      const channelContainer = divs[0].getElementsByTagName("h6");
      const activeAtContainer = divs[0].getElementsByTagName("h7");
      const deleteBtn = divs[0].getElementsByTagName("button")[0];
      deleteBtn.addEventListener("click", function () {
        deleteJob(item.id, this, "admin");
      });

      const viewBtn = divs[0].getElementsByTagName("button")[1];

      var newLink = "";

      if (item.is_telegram) {
        newLink = `${item.channel_data.url}/${item.telegram_data.message_id}`;
      } else {
        newLink = `${item.channel_data.url}?postId=${item.id}`;
      }

      viewBtn.addEventListener("click", function () {
        window.open(newLink);
      });

      let activeDate = new Date(item.created_at);
      const newActiveDate = activeDate.toLocaleString("en-US", format);

      channelContainer[0].innerHTML = `${item.channel_data.name}`;
      activeAtContainer[0].innerHTML = `Posted at: ${newActiveDate}`;
      emptyDiv.push(card);
    });
  }

  if (emptyDiv.length === 0) {
    emptyCard.classList.remove("hidden");
    parentTable.classList.add("hidden");
  } else {
    emptyCard.classList.add("hidden");
    parentTable.classList.remove("hidden");
    while (parentTable.firstChild) {
      parentTable.removeChild(parentTable.firstChild);
    }
    emptyDiv.forEach((item) => {
      parentTable.appendChild(item);
    });
  }
}

var deleting = false;

function deleteJob(postId, deleteBtn, type) {
  if (deleting) {
    alert("Deletion is not yet complete. Please wait...");
  } else {
    var confirmDelete = confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    );

    if (confirmDelete) {
      const options = {
        body: JSON.stringify({
          post_id: postId,
        }),
      };

      deleting = true;
      deleteBtn.disabled = true;
      deleteBtn.innerHTML = loadingIcon;

      fetchAPI(
        "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/job/post/delete",
        "POST",
        token,
        options
      )
        .then((data) => {
          if (data?.message) {
            alert(data.message);
            deleteBtn.disabled = false;
            deleteBtn.innerHTML = `<i class="fa fa-trash ml-1"></i>`;
            deleting = false;
          } else {
            // delay of 2 seconds before calling fetchAdminMaster
            setTimeout(() => {
              if (type === "admin") {
                fetchAdminMaster();
              }
              if (type === "employer") {
                fetchMyJobs();
              }
              // delay of 2 seconds before calling fetchAdminMaster
              setTimeout(() => {
                deleteBtn.disabled = false;
                deleteBtn.innerHTML = `<i class="fa fa-trash ml-1"></i>`;
                if (type === "admin") {
                  adminFilterJob();
                  deleting = false;
                }
                if (type === "employer") {
                  filterJob();
                  deleting = false;
                }
              }, 3000);
            }, 2000);
          }
        })
        .catch((error) => {
          deleteBtn.disabled = false;
          deleteBtn.innerHTML = loadingText;
          deleting = false;
        });
    }
  }
}

function populateToAdminAllJobs(data) {
  var job_list = data.job;
  var post_list = data.post;

  post_list.map((item1) => {
    job_list.map((item2, index) => {
      if (item1.job_id == item2.id) {
        if (job_list[index].postData) {
          job_list[index].postData.push(item1);
        } else {
          job_list[index].postData = [item1];
        }
      }
    });
  });

  const loadingAdminAllJobCard = document.getElementById(
    "admin-all-job-card-loading"
  );
  const emptyCard = document.getElementById("admin-all-job-card-empty");
  const parentTable = document.getElementById("admin-all-job-table-parent");
  const tableBody = document.getElementById("admin-all-job-table-body");
  // Clear the table before appending the new data
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  adminJobListState = job_list;
  var totalRecord = [];

  job_list.forEach((item) => {
    let isPaid_isFree = false;
    let badge = `<span class="badge badge-pill badge-danger">Not Active</span>`;

    let active_date = "-";
    let expired_date = "-";
    let day_visibility = "-";

    let version_type = "-";

    if (item?.payment_info?.payment_status == "paid") {
      isPaid_isFree = true;
      version_type = "Plus";
    }
    if (item.is_free == true) {
      isPaid_isFree = true;
      version_type = "Free";
    }

    if (item.timestamp_active && item.timestamp_expired) {
      let activeDate = new Date(item.timestamp_active);
      let expiredDate = new Date(item.timestamp_expired);

      active_date = activeDate.toLocaleString("en-US", format);
      expired_date = expiredDate.toLocaleString("en-US", format);
      if (item?.payment_info?.payment_status == "paid") {
        day_visibility = item.payment_info.day_visibility;
      } else {
        day_visibility = 0;
      }
    } else {
      active_date = "-";
      expired_date = "-";
      day_visibility = "-";
    }

    if (isPaid_isFree === false) {
    } else if (isPaid_isFree === true && item.status_id === 1) {
      badge = `<span class="badge badge-pill badge-success">Active</span>`;
    } else if (isPaid_isFree === true && item.status_id === 2) {
      badge = `<span class="badge badge-pill badge-success">Active</span>`;
    } else if (isPaid_isFree === true && item.status_id === 3) {
      badge = `<span class="badge badge-pill badge-secondary">Expired</span>`;
    } else if (isPaid_isFree === true && item.status_id === 4) {
      badge = `<span class="badge badge-pill badge-dark">Blocked</span>`;
    }

    let row = document.createElement("tr");
    let jobId = document.createElement("td");
    jobId.innerText = item.custom_id;
    let jobTitle = document.createElement("td");
    jobTitle.innerText = item.title;
    let companyName = document.createElement("td");
    companyName.innerText = item.company_name;
    let postedAt = document.createElement("td");
    postedAt.innerText = active_date;
    let expiredAt = document.createElement("td");
    expiredAt.innerText = expired_date;
    let days = document.createElement("td");
    days.innerText = day_visibility;
    let version = document.createElement("td");
    version.innerHTML = version_type;

    let button = document.createElement("button");

    if (item.timestamp_active && item.timestamp_expired) {
      let expiredDate = new Date(item.timestamp_expired);

      // Get the current date and time
      let currentDate = new Date();

      // Compare the two dates
      if (
        expiredDate.getTime() < currentDate.getTime() &&
        item.status_id !== 3
      ) {
        badge = `<span class="badge badge-pill badge-warning">Action needed</span>`;
        button.classList.add("btn", "btn-primary");
      } else {
        button.classList.add("btn", "btn-secondary");
      }
    } else {
      button.classList.add("btn", "btn-secondary");
    }

    button.setAttribute("type", "button");
    button.setAttribute("data-telegram", JSON.stringify(item.telegram));

    if (item?.postData) {
      button.innerHTML = `View All <span class="badge badge-light">${item.postData.length}</span>`;
    } else {
      button.innerHTML = `View All <span class="badge badge-light">0</span>`;
    }

    button.onclick = function () {
      $("#actionModal").modal("show");
      adminOpenJobId = item.id;
      adminFilterJob();
    };

    let status = document.createElement("td");
    status.innerHTML = badge;

    let action = document.createElement("td");
    action.appendChild(button);

    row.appendChild(jobId);
    row.appendChild(jobTitle);
    row.appendChild(companyName);
    row.appendChild(postedAt);
    row.appendChild(expiredAt);
    row.appendChild(days);
    row.appendChild(status);
    row.appendChild(version);
    row.appendChild(action);
    totalRecord.push(item);
    document.getElementById("admin-all-job-table-body").appendChild(row);
  });

  loadingAdminAllJobCard.classList.add("hidden");

  if (totalRecord.length === 0) {
    emptyCard.classList.remove("hidden");
    parentTable.classList.add("hidden");
  } else {
    emptyCard.classList.add("hidden");
    parentTable.classList.remove("hidden");
  }
}

function populateToAdminAllUsers(data) {
  const loadingAdminAllJobCard = document.getElementById(
    "admin-all-user-card-loading"
  );
  const emptyCard = document.getElementById("admin-all-user-card-empty");
  const parentTable = document.getElementById("admin-all-user-table-parent");
  const tableBody = document.getElementById("admin-all-user-table-body");
  // Clear the table before appending the new data
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  var totalRecord = [];

  data.forEach((item) => {
    let badge = ``;

    if (item.verify) {
      badge = `<span class="badge badge-pill badge-success">Verified</span>`;
    } else {
      badge = `<span class="badge badge-pill badge-warning">Not Verified</span>`;
    }

    let row = document.createElement("tr");

    let userId = document.createElement("td");
    userId.innerText = item.id;

    let tempCreatedDate = new Date(item.created_at);
    createdDate = tempCreatedDate.toLocaleString("en-US", format);
    let createdDate_Td = document.createElement("td");
    createdDate_Td.innerText = createdDate;

    let username = document.createElement("td");
    username.innerText = item.username;

    let email = document.createElement("td");
    email.innerText = item.email;

    let companyName = document.createElement("td");
    companyName.innerText = item.company_name ? item.company_name : "-";

    let verify = document.createElement("td");
    verify.innerHTML = badge;

    let role = document.createElement("td");
    role.innerText = item.role_data?.title;

    let lastPosted_Td = document.createElement("td");

    if (item.timestamp_last_posted) {
      let tempLastPosted = new Date(item.timestamp_last_posted);
      lastPosted = tempLastPosted.toLocaleString("en-US", format);
      lastPosted_Td.innerText = lastPosted;
    } else {
      lastPosted_Td.innerText = "-";
    }

    row.appendChild(userId);
    row.appendChild(createdDate_Td);
    row.appendChild(username);
    row.appendChild(email);
    row.appendChild(companyName);
    row.appendChild(verify);
    row.appendChild(role);
    row.appendChild(lastPosted_Td);

    totalRecord.push(item);
    document.getElementById("admin-all-user-table-body").appendChild(row);
  });

  loadingAdminAllJobCard.classList.add("hidden");

  if (totalRecord.length === 0) {
    emptyCard.classList.remove("hidden");
    parentTable.classList.add("hidden");
  } else {
    emptyCard.classList.add("hidden");
    parentTable.classList.remove("hidden");
  }
}

function populateToAdminAllFeedbacks(data) {
  const loadingAdminAllJobCard = document.getElementById(
    "admin-all-feedback-card-loading"
  );
  const emptyCard = document.getElementById("admin-all-feedback-card-empty");
  const parentTable = document.getElementById(
    "admin-all-feedback-table-parent"
  );
  const tableBody = document.getElementById("admin-all-feedback-table-body");
  // Clear the table before appending the new data
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  var totalRecord = [];

  data.forEach((item) => {
    let row = document.createElement("tr");
    let type = document.createElement("td");
    type.innerText = item.type;
    let title = document.createElement("td");
    title.innerText = item.title;
    let description = document.createElement("td");
    description.innerText = item.description;
    let username = document.createElement("td");
    let email = document.createElement("td");

    if (item?.user_data) {
      username.innerText = item.user_data.username;
      email.innerText = item.user_data.email;
    } else {
      username.innerText = "-";
      email.innerText = "-";
    }

    let createdAt = document.createElement("td");
    let newCreatedAt = new Date(item.created_at);
    createdAt.innerText = newCreatedAt.toLocaleString("en-US", format);

    row.appendChild(type);
    row.appendChild(title);
    row.appendChild(description);
    row.appendChild(username);
    row.appendChild(email);
    row.appendChild(createdAt);
    totalRecord.push(item);
    document.getElementById("admin-all-feedback-table-body").appendChild(row);
  });

  loadingAdminAllJobCard.classList.add("hidden");

  if (totalRecord.length === 0) {
    emptyCard.classList.remove("hidden");
    parentTable.classList.add("hidden");
  } else {
    emptyCard.classList.add("hidden");
    parentTable.classList.remove("hidden");
  }
}

function fetchAdminMaster() {
  if (myData.userData.role_id === 1) {
    fetchAPI(
      "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/admin/master",
      "GET",
      token
    )
      .then((data) => {
        if (data?.message) {
          alert(data.message);
        } else {
          populateToAdminAllJobs(data);
          populateToAdminAllUsers(data.user);
          populateToAdminAllFeedbacks(data.feedback);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

function firstCall() {
  fetchMyJobs();
  fetchAdminMaster();
}

firstCall();
