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
refreshBtn.addEventListener("click", refreshJobList);

const refreshPurchaseHistoryhBtn = document.getElementById(
  "purchase-history-refresh-list"
);

refreshPurchaseHistoryhBtn.addEventListener("click", refreshJobList);

function refreshJobList() {
  refreshBtn.innerHTML = `Refreshing...`;
  refreshPurchaseHistoryhBtn.innerHTML = `Refreshing...`;
  fetchMyJobs(); // update refresh button innerHTML inside fetchMyJobs
}

function resetRefreshBtn() {
  refreshBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Refresh`;
  refreshPurchaseHistoryhBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Refresh`;
}

const adminRefreshBtn = document.getElementById("admin-refresh-job-list");
adminRefreshBtn.addEventListener("click", adminRefreshMaster);

const adminRefreshFeedbackBtn = document.getElementById(
  "admin-refresh-feedback-list"
);
adminRefreshFeedbackBtn.addEventListener("click", adminRefreshMaster);

function adminRefreshMaster() {
  adminRefreshBtn.innerHTML = `Refreshing...`;
  adminRefreshFeedbackBtn.innerHTML = `Refreshing...`;
  fetchAdminMaster(); // update refresh button innerHTML inside fetchAdminMaster
}
function adminResetRefreshBtn() {
  adminRefreshBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Refresh`;
  adminRefreshFeedbackBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Refresh`;
}

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

let selectedJobId;

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

    if (item.is_new) {
      title[0].innerHTML = `${item.source_name} ∙ ${item.name} <span class="badge badge-danger">New</span>`;
    } else {
      title[0].innerHTML = `${item.source_name} ∙ ${item.name}`;
    }

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
      job_id: selectedJobId,
      channel_id: selectedChannelItem.id,
      tz_name: userTimeZone,
    }),
  };

  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7:v1/job/telegram/send",
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
        job_id: selectedJobId,
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
    listPostedJob(openJobId, currentJob.telegram);
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
    adminlistPostedJob(adminOpenJobId, currentJob.telegram);
  }
}

function listPostedJob(jobId, passData) {
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
        deleteJob(jobId, item, this, "employer");
      });

      const viewBtn = divs[0].getElementsByTagName("button")[1];

      var newLink = "";

      if (item._channel.source_code == "telegram") {
        newLink = `${item._channel.url}/${item.message_id}`;
      } else {
        newLink = `${item._channel.url}?postId=${item.custom_id}`;
      }

      viewBtn.addEventListener("click", function () {
        window.open(newLink);
      });

      let activeDate = new Date(item.timestamp_active);
      const newActiveDate = activeDate.toLocaleString("en-US", format);

      channelContainer[0].innerHTML = `${item._channel.name}`;
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
      var min_salary = document.getElementById(
        "input-edit-job-min-salary"
      ).value;
      var max_salary = document.getElementById(
        "input-edit-job-max-salary"
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

      const options = {
        body: JSON.stringify({
          job_id: selectedJobId,
          title: title,
          company_name: company_name,
          ssm_number: ssm_number,
          min_salary: min_salary,
          max_salary: max_salary,
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
  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7:v1/job",
    "GET",
    token
  )
    .then((data) => {
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

      populateOrderHistoryVisibility(data.job_list);

      jobListState = data.job_list;

      data.job_list.map((item) => {
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
              var disableText = "This field only available for paid version";
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
              the free version).`;
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
              selectedJobId = item.id;
              document.getElementById("input-edit-company-name").value =
                item.company_name;
              document.getElementById("input-edit-company-ssm").value =
                item.ssm_number;
              document.getElementById("input-edit-job-title").value =
                item.title;
              document.getElementById("input-edit-job-min-salary").value =
                item.min_salary;
              document.getElementById("input-edit-job-max-salary").value =
                item.max_salary;
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
              jobTimeline[0].innerHTML = `Paid ∙ Maximum of ${item.payment_info.max_active_post} published post at a time ∙ Active for ${item.payment_info.day_visibility} day (${active_date} - ${expired_date})`;
            }
          }
        } else {
          jobTimeline[0].innerHTML = "-";
        }
        const listItem = divs[0].getElementsByTagName("li");
        listItem[0].innerHTML = `<b>Title of the job opening:</b> ${item.title}`;
        listItem[1].innerHTML = `<b>Company name:</b> ${item.company_name} (${item.ssm_number})`;

        if (item.min_salary !== 0 && item.max_salary !== 0) {
          listItem[2].innerHTML = `<b>Salary:</b> MYR ${item.min_salary} - ${item.max_salary} monthly`;
        } else {
          listItem[2].innerHTML = `<b>Salary:</b> Not Stated`;
        }

        listItem[3].innerHTML = `<b>Location:</b> ${item.location}`;

        if (item.is_free == true) {
          listItem[4].innerHTML = "";
          listItem[5].innerHTML = "";
          listItem[6].innerHTML = "";
        } else {
          listItem[4].innerHTML = `<b>Requirements:</b><br>${item.requirement.replace(
            /\n/g,
            "<br>"
          )}`;
          listItem[5].innerHTML = `<b>Benefits:</b><br>${item.benefit.replace(
            /\n/g,
            "<br>"
          )}`;
          listItem[6].innerHTML = `<b>Additional Information:</b><br>${item.additional_info.replace(
            /\n/g,
            "<br>"
          )}`;
        }

        if (item.is_free == true) {
          listItem[7].innerHTML = `<b>Job application URL:</b> <a href="${item.apply_link_free}" target="_blank"> ${item.apply_link_free}</a>`;
        } else {
          listItem[7].innerHTML = `<b>Job application URL:</b> <a href="${item.apply_link}" target="_blank"> ${item.apply_link}</a>`;
        }

        const nextStepTitle = divs[0].getElementsByTagName("strong");
        const actionBtnContainer = divs[0].getElementsByTagName("div")[1];
        const actionBtn = actionBtnContainer.getElementsByTagName("button");
        const progressContainer = divs[4].getElementsByTagName("div")[1];

        const firstBtn = actionBtn[0];
        const secondBtn = actionBtn[1];

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
              selectedJobId = item.id;
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
          firstBtn.innerHTML = `First Time Post ${item.telegram.length}/${item.payment_info.max_active_post}`;
          firstBtn.addEventListener("click", function () {
            $("#channelJobModal").modal("show");
            $("#channelJobModal").on("shown.bs.modal", function () {
              selectedJobId = item.id;
              populateChannel();
            });
          });
          firstBtn.disabled = false;
          firstBtn.classList.replace("btn-secondary", "btn-primary");
          secondBtn.classList.add("hidden");
        } else if (isPaid_isFree === true && item.status_id === 2) {
          badge = `<span class="badge badge-pill badge-success">Active</span>`;
          dashboard.active = dashboard.active + 1;
          firstBtn.innerHTML = `Post ${item.telegram.length}/${item.payment_info.max_active_post}`;
          firstBtn.addEventListener("click", function () {
            $("#channelJobModal").modal("show");
            $("#channelJobModal").on("shown.bs.modal", function () {
              selectedJobId = item.id;
              populateChannel();
            });
          });
          firstBtn.disabled = false;
          firstBtn.classList.replace("btn-secondary", "btn-primary");

          progressContainer.style.width = "100%";
          progressContainer.firstChild.nodeValue = "3/3 steps";
          nextStepTitle[0].innerHTML = `Completed`;
          secondBtn.classList.remove("hidden");
          secondBtn.innerHTML = `View Published Post <span class="badge badge-light">${item.telegram.length}</span>`;
          secondBtn.addEventListener("click", function () {
            $("#postedJobModal").modal("show");
            openJobId = item.id;
            filterJob();
          });
        } else if (isPaid_isFree === true && item.status_id === 3) {
          dashboard.expired = dashboard.expired + 1;
          badge = `<span class="badge badge-pill badge-secondary">Expired</span>`;

          firstBtn.innerHTML = `Post ${item.telegram.length}/${item.payment_info.max_active_post}`;
          firstBtn.classList.replace("btn-primary", "btn-secondary");
          firstBtn.addEventListener("click", function () {
            alert(
              "We're sorry, but the job slot you're trying to post to has expired, and all job postings associated with this slot will no longer be available on our channels. To post a new job opportunity, please create a new job slot."
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
      resetRefreshBtn();
    })
    .catch((error) => {
      console.error(error);
      resetRefreshBtn();
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

      let totalAmount = document.createElement("td");
      if (item?.payment_info?.amount_total) {
        totalAmount.innerText = formatPrice(item.payment_info.amount_total);
      } else {
        totalAmount.innerText = "-";
      }
      let orderStatus = document.createElement("td");
      orderStatus.innerText = "Paid";

      row.appendChild(jobId);
      row.appendChild(datePurchased);
      row.appendChild(dayVisibility);
      row.appendChild(maxActivePost);
      row.appendChild(totalAmount);
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

document
  .getElementById("free-job-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let submitFreeJobBtn = document.getElementById("submit-free-job-btn");

    submitFreeJobBtn.disabled = true;
    submitFreeJobBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

    if (token) {
      var company_name = document.getElementById(
        "input-free-company-name"
      ).value;
      var ssm_number = document.getElementById("input-free-company-ssm").value;
      var title = document.getElementById("input-free-job-title").value;
      var min_salary = document.getElementById(
        "input-free-job-min-salary"
      ).value;
      var max_salary = document.getElementById(
        "input-free-job-max-salary"
      ).value;
      var location = document.getElementById("input-free-job-location").value;
      var apply_link = document.getElementById("input-free-job-url").value;

      const custom_job_Id = generateUniqueID();

      const options = {
        body: JSON.stringify({
          title: title,
          company_name: company_name,
          ssm_number: ssm_number,
          min_salary: min_salary,
          max_salary: max_salary,
          location: location,
          apply_link: apply_link,
          custom_id: custom_job_Id,
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
      var company_name = document.getElementById(
        "input-paid-company-name"
      ).value;
      var ssm_number = document.getElementById("input-paid-company-ssm").value;
      var title = document.getElementById("input-paid-job-title").value;
      var min_salary = document.getElementById(
        "input-paid-job-min-salary"
      ).value;
      var max_salary = document.getElementById(
        "input-paid-job-max-salary"
      ).value;
      var requirement = document.getElementById(
        "input-paid-job-requirement"
      ).value;
      var benefit = document.getElementById("input-paid-job-benefit").value;
      var additional_info = document.getElementById(
        "input-paid-job-additional-info"
      ).value;
      var location = document.getElementById("input-paid-job-location").value;
      var apply_link = document.getElementById("input-paid-job-url").value;

      const custom_job_Id = generateUniqueID();

      const options = {
        body: JSON.stringify({
          title: title,
          company_name: company_name,
          ssm_number: ssm_number,
          min_salary: min_salary,
          max_salary: max_salary,
          location: location,
          requirement: requirement,
          benefit: benefit,
          additional_info: additional_info,
          apply_link: apply_link,
          custom_id: custom_job_Id,
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

const expiredBtn = document.getElementById("expired-this-post-btn");
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
      } else {
        // delay of 2 seconds before calling fetchMyJobs
        setTimeout(() => {
          fetchAdminMaster();
          $("#actionModal").modal("hide");
          expiredBtn.disabled = false;
          expiredBtn.innerHTML = "Expired this post";
        }, 2000);
      }
    })
    .catch((error) => {
      $("#actionModal").modal("hide");
      expiredBtn.disabled = false;
      expiredBtn.innerHTML = "Expired this post";
    });
}

function adminlistPostedJob(jobId, data) {
  const emptyCard = document.getElementById("admin-posted-job-card-empty");

  const parentTable = document.getElementById(
    "admin-posted-job-card-list-parent"
  );
  const style = document.getElementById("admin-posted-job-card-list-child");

  const emptyDiv = [];

  if (data.length !== 0) {
    data.map((item) => {
      const card = style.cloneNode(true);
      let activeDate = new Date(item.timestamp_active);
      const newActiveDate = activeDate.toLocaleString("en-US", format);

      card.querySelector("h6").textContent = `${item._channel.name}`;
      card.querySelector("h7").textContent = `Posted at: ${newActiveDate}`;
      const deleteBtn = card.querySelector("button");
      deleteBtn.addEventListener("click", function () {
        deleteJob(jobId, item, this, "admin");
      });

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

function deleteJob(jobId, telegramData, deleteBtn, type) {
  if (deleting) {
    alert("Deletion is not yet complete. Please wait...");
  } else {
    var confirmDelete = confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    );

    if (confirmDelete) {
      const options = {
        body: JSON.stringify({
          job_id: jobId,
          username_id: telegramData._channel.username_id,
          message_id: telegramData.message_id,
          chat_id: telegramData.chat_id,
          source_code: telegramData._channel.source_code,
          custom_id: telegramData.custom_id,
        }),
      };

      deleting = true;
      deleteBtn.disabled = true;
      deleteBtn.innerHTML = loadingIcon;

      fetchAPI(
        "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7:v1/job/telegram/delete",
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

  adminJobListState = data;
  var totalRecord = [];

  data.forEach((item) => {
    let isPaid_isFree = false;
    let badge = `<span class="badge badge-pill badge-danger">Not Active</span>`;

    let resent_used = "";
    let active_date = "-";
    let expired_date = "-";
    let day_visibility = "-";

    let version_type = "-";

    if (item?.payment_info?.payment_status == "paid") {
      isPaid_isFree = true;
      version_type = "Paid";
    }
    if (item.is_free == true) {
      isPaid_isFree = true;
      version_type = "Free";
    }

    if (item.timestamp_active && item.timestamp_expired) {
      resent_used = item.telegram.length - 1; // minus the first time post
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
    button.innerHTML = `View All <span class="badge badge-light">${item.telegram.length}</span>`;
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
    username.innerText = item.user_data.username;
    let email = document.createElement("td");
    email.innerText = item.user_data.email;

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
          populateToAdminAllJobs(data.job);
          populateToAdminAllFeedbacks(data.feedback);
          adminResetRefreshBtn();
        }
      })
      .catch((error) => {
        console.error(error);
        adminResetRefreshBtn();
      });
  }
}

function firstCall() {
  fetchMyJobs();
  fetchAdminMaster();
}

firstCall();
