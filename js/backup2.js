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
adminRefreshBtn.addEventListener("click", adminRefreshJobList);

function adminRefreshJobList() {
  adminRefreshBtn.innerHTML = `Refreshing...`;
  fetchAllJobs(); // update refresh button innerHTML inside fetchAllJobs
}
function adminResetRefreshBtn() {
  adminRefreshBtn.innerHTML = `<i class="fas fa-sync mr-2"></i>Refresh`;
}

const refreshChannelBtn = document.getElementById("refresh-channel-list");
refreshChannelBtn.addEventListener("click", firstCall);

function openMyJobTab() {
  document.querySelector("#my-job-tab").click();
}

const logoutBtn = document.getElementById("button-logout-yes");
logoutBtn.addEventListener("click", clearSession);

const myData = getSavedData("userData");
const token = myData.authToken;

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
    title: "My Job",
    content: "my-job",
  },
  {
    id: "history-tab",
    title: "Purchase History",
    content: "history",
  },
];

if (myData.userData.role_id === 1) {
  tabs.push({
    id: "admin-tab",
    title: "All Jobs",
    content: "admin",
  });
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

function populateChannel(data) {
  var selectChannel = document.getElementById("channel-list");
  selectChannel.innerHTML = ""; // clear select item

  data.forEach(function (item) {
    var div = document.createElement("div");
    div.className = "form-check";

    var input = document.createElement("input");
    input.type = "radio";
    input.className = "form-check-input";
    input.name = "channelCheck";
    input.id = "form-select-channel-" + item.id;
    input.value = item.id;
    input.required = true;
    if (!item.enable) {
      input.disabled = true;
    }
    div.appendChild(input);

    var label = document.createElement("label");
    label.className = "form-check-label";
    label.innerHTML =
      item.name + " <a href='" + item.url + "'>(" + item.url + ")</a>";
    div.appendChild(label);

    selectChannel.appendChild(div);
  });

  populateChannelDashboard(data);
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
    if (item.enable) {
      const card = style.cloneNode(true);
      const divs = card.getElementsByTagName("div");

      const title = divs[0].getElementsByTagName("a");
      const subscribers = divs[0].getElementsByTagName("h6");
      const description = divs[0].getElementsByTagName("p");

      title[0].innerHTML = item.name;
      title[0].setAttribute("href", item.url);
      subscribers[0].innerHTML = `${item.total_subscribers} subscribers`;
      description[0].innerHTML = item.description;
      title[1].innerHTML = "Visit Channel";
      title[1].setAttribute("href", item.url);

      emptyDiv.push(card);
    }
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

  var selectedChannel = document.querySelector(
    "input[name='channelCheck']:checked"
  );

  var selectedChannnelData = JSON.parse(selectedChannel.value);

  const options = {
    body: JSON.stringify({
      job_id: selectedJobId,
      channel_id: selectedChannnelData,
    }),
  };

  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/Webhooks",
    "POST",
    token,
    options
  )
    .then((data) => {
      if (data?.response?.result == "Accepted") {
        // delay of 2 seconds before calling fetchMyJobs
        setTimeout(() => {
          $("#channelJobModal").modal("hide");
          submitChannelBtn.disabled = false;
          submitChannelBtn.innerHTML = "Post Now";
          fetchMyJobs();

          $("#channelJobModal")
            .modal("hide")
            .on("hidden.bs.modal", function (e) {
              showAlert(
                "alert-post-container",
                "Great!",
                "your post has been successfully published. You can now view it by clicking on the 'View Post' button",
                "success",
                "my-post-alert",
                15000
              );
            });
        }, 2000);
      } else {
        // delay of 2 seconds before calling fetchMyJobs
        setTimeout(() => {
          $("#channelJobModal").modal("hide");
          submitChannelBtn.disabled = false;
          submitChannelBtn.innerHTML = "Post Now";

          $("#channelJobModal")
            .modal("hide")
            .on("hidden.bs.modal", function (e) {
              showAlert(
                "alert-post-container",
                "Error!",
                data.message,
                "danger",
                "my-post-alert",
                15000
              );
            });
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
  var listLoader = document.getElementById("visibility-list-loader");
  var listContainer = document.getElementById("visibility-list-container");
  var selectVisibility = document.getElementById("visibility-list-body");
  var totalPriceElement = document.getElementById(
    "visibility-total-price-element"
  );

  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:D1epqX-m:v1/products",
    "GET",
    token
  )
    .then((data) => {
      selectVisibility.innerHTML = ""; // clear select item

      data.data.forEach(function (item) {
        if (item.metadata.type === "visibility" && item.active == true) {
          var div = document.createElement("div");
          div.className = "form-check";
          var input = document.createElement("input");
          input.type = "radio";
          input.className = "form-check-input";
          input.name = "productVisibilityCheck";
          input.id = "form-select-product-" + item.id;
          input.value = JSON.stringify(item);
          input.required = true;
          input.addEventListener("change", function () {
            visibilityPrice = parseInt(item.metadata.price, 10);
            totalPriceElement.innerHTML = `RM ${visibilityPrice}`;
          });
          div.appendChild(input);

          var label = document.createElement("label");
          label.className = "form-check-label";
          label.innerHTML = `${item.name} - RM ${item.metadata.price}`;
          div.appendChild(label);

          selectVisibility.appendChild(div);
        }
      });

      listLoader.classList.add("hidden");
      listContainer.classList.remove("hidden");
    })
    .catch((error) => {
      listLoader.classList.add("hidden");
      console.error(error);
    });
}

function fetchRepostProduct() {
  var listLoader = document.getElementById("repost-list-loader");
  var listContainer = document.getElementById("repost-list-container");
  var listBody = document.getElementById("repost-list-body");
  var totalPriceElement = document.getElementById("repost-total-price-element");

  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:D1epqX-m:v1/products",
    "GET",
    token
  )
    .then((data) => {
      listBody.innerHTML = ""; // clear select item

      data.data.forEach(function (item) {
        if (item.metadata.type === "repost" && item.active == true) {
          var div = document.createElement("div");
          div.className = "form-check";

          var input = document.createElement("input");
          input.type = "radio";
          input.className = "form-check-input";
          input.name = "productRepostCheck";
          input.id = "form-select-product-" + item.id;
          input.value = JSON.stringify(item);
          input.required = true;
          input.addEventListener("change", function () {
            repostPrice = parseInt(item.metadata.price, 10);
            totalPriceElement.innerHTML = `RM ${repostPrice}`;
          });
          div.appendChild(input);

          var label = document.createElement("label");
          label.className = "form-check-label";
          label.innerHTML = `${item.name} - RM ${item.metadata.price}`;
          div.appendChild(label);

          listBody.appendChild(div);
        }
      });

      listLoader.classList.add("hidden");
      listContainer.classList.remove("hidden");
    })
    .catch((error) => {
      listLoader.classList.add("hidden");
      console.error(error);
    });
}

const successUrl = "https://ikkm.000webhostapp.com/success.html";
const cancelUrl = "https://ikkm.000webhostapp.com/cancel.html";

// Add a submit event listener to the form
buyRepostForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let submitPayRepostBtn = document.getElementById("submit-topup-repost-btn");
  submitPayRepostBtn.disabled = true;
  submitPayRepostBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  var selectedProductRepost = document.querySelector(
    "input[name='productRepostCheck']:checked"
  );

  var repostData = JSON.parse(selectedProductRepost.value);
  var productRepostCount = repostData.metadata.repost_count;
  var repostPrice = repostData.default_price;

  const options = {
    body: JSON.stringify({
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: [
        {
          price: repostPrice,
          quantity: 1,
        },
      ],
      repost_count: productRepostCount,
      type_payment: "repost",
    }),
  };

  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:9HYpvh_0/sessions",
    "POST",
    token,
    options
  )
    .then((data) => {
      submitPayRepostBtn.disabled = false;
      submitPayRepostBtn.innerHTML = "Continue to payment";

      if (data.hasOwnProperty("url") && data.url !== null) {
        var checkoutUrl = data.url;
        window.location.href = checkoutUrl;
      } else {
        console.log("Url not found in the response data");
      }
    })
    .catch((error) => {
      submitPayRepostBtn.disabled = false;
      submitPayRepostBtn.innerHTML = "Continue to payment";
    });
});

// Add a submit event listener to the form
buyVisibilityForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let submitPayVisibilityBtn = document.getElementById("submit-visibility-btn");
  submitPayVisibilityBtn.disabled = true;
  submitPayVisibilityBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  var selectedProductVisibility = document.querySelector(
    "input[name='productVisibilityCheck']:checked"
  );

  var visibilityData = JSON.parse(selectedProductVisibility.value);
  var productVisibility = visibilityData.metadata.day_visibility;
  var visibilityPrice = visibilityData.default_price;

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
      job_id: selectedJobId,
      day_visibility: productVisibility,
      type_payment: "visibility",
    }),
  };

  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:9HYpvh_0/sessions",
    "POST",
    token,
    options
  )
    .then((data) => {
      submitPayVisibilityBtn.disabled = false;
      submitPayVisibilityBtn.innerHTML = "Continue to payment";

      if (data.hasOwnProperty("url") && data.url !== null) {
        var checkoutUrl = data.url;
        window.location.href = checkoutUrl;
      } else {
        console.log("Url not found in the response data");
      }
    })
    .catch((error) => {
      submitPayVisibilityBtn.disabled = false;
      submitPayVisibilityBtn.innerHTML = "Continue to payment";
    });
});

function listPostedJob(title, data) {
  const jobTitle = document.getElementById("postedJobModalSubTitle");
  jobTitle.innerHTML = title;

  const emptyCard = document.getElementById("posted-job-card-empty");

  const parentTable = document.getElementById("posted-job-card-list-parent");
  const style = document.getElementById("posted-job-card-list-child");

  const emptyDiv = [];

  if (data.length !== 0) {
    data.map((data) => {
      const card = style.cloneNode(true);
      const divs = card.getElementsByTagName("div");
      const channelContainer = divs[0].getElementsByTagName("h6");
      const activeAtContainer = divs[0].getElementsByTagName("h7");
      const viewBtn = divs[0].getElementsByTagName("button")[0];
      const newLink = `${data._channel.url}/${data.message_id}`;
      viewBtn.addEventListener("click", function () {
        window.open(newLink);
      });

      let activeDate = new Date(data.timestamp_active);
      const newActiveDate = activeDate.toLocaleString("en-US", format);

      channelContainer[0].innerHTML = `${data._channel.name}`;
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
        populateChannel(data.channel_list);
      }

      populateOrderHistoryVisibility(data.job_list);

      populateOrderHistoryRepost(data.session);

      const repostBalanceButton = document.getElementById(
        "dropdownTopupMenuButton"
      );
      // repostBalanceButton.innerHTML = `<i class="fas fa-retweet mr-2" id="repost-balance-text"></i> Repost Balance: ${totalRepost} `;
      repostBalanceButton.innerHTML = `Repost Balance: ${data.total_repost} `;

      data.job_list.map((item) => {
        const card = style.cloneNode(true);

        const divs = card.getElementsByTagName("div");
        let isPaid = false;
        let badge = `<span class="badge badge-pill badge-danger">Not Active</span>`;

        if (item?._session_of_job?.payment_status == "paid") {
          isPaid = true;
        }

        const jobTimeline = divs[0].getElementsByTagName("h6");

        if (item.timestamp_active && item.timestamp_expired) {
          let active = new Date(item.timestamp_active);
          let expired = new Date(item.timestamp_expired);

          const active_date = active.toLocaleString("en-US", format);
          const expired_date = expired.toLocaleString("en-US", format);

          jobTimeline[0].innerHTML = `Active period (${item._session_of_job.day_visibility} days): <b>${active_date} - ${expired_date}</b>`;
        } else {
          // to avoid catch, need to ad else
          const jobTimeline = divs[0].getElementsByTagName("h6");
          jobTimeline[0].innerHTML = "-";
        }

        const customJobId = divs[0].getElementsByTagName("h7");
        customJobId[0].innerHTML = `ID: ${item.custom_id}`;

        const listItem = divs[0].getElementsByTagName("li");
        const companyName =
          (listItem[0].innerHTML = `<i class="fas fa-building mr-2 text-gray-500"></i> ${item.company_name}`);
        const salary =
          (listItem[1].innerHTML = `<i class="fas fa-money-bill mr-2 text-gray-500"></i> MYR ${item.min_salary} - ${item.max_salary}`);
        const location =
          (listItem[2].innerHTML = `<i class="fas fa-map-pin mr-2 text-gray-500"></i> ${item.location}`);
        const applyLink =
          (listItem[3].innerHTML = `<i class="fas fa-link mr-2 text-gray-500"></i><a href="${item.apply_link}">${item.apply_link}</a>`);

        const nextStepTitle = divs[0].getElementsByTagName("strong");
        const actionBtnContainer = divs[0].getElementsByTagName("div")[0];
        const actionBtn = actionBtnContainer.getElementsByTagName("button");
        const progressContainer = divs[4].getElementsByTagName("div")[0];

        const firstBtn = actionBtn[0];
        const secondBtn = actionBtn[1];

        if (isPaid === false) {
          dashboard.not_active = dashboard.not_active + 1;
          progressContainer.style.width = "35%";
          progressContainer.firstChild.nodeValue = "1/3 steps";
          nextStepTitle[0].innerHTML = `Next step: Activate`;
          firstBtn.innerHTML = "Activate";
          firstBtn.addEventListener("click", function () {
            $("#payJobModal").modal("show");
            $("#payJobModal").on("shown.bs.modal", function () {
              selectedJobId = item.id;
              const jobTitle = document.getElementById("pay-job-title-modal");
              jobTitle.innerHTML = item.title;
            });
          });
          firstBtn.disabled = false;
          firstBtn.classList.replace("btn-secondary", "btn-primary");
          secondBtn.classList.add("hidden");
        } else if (isPaid === true && item.status_id === 1) {
          dashboard.active = dashboard.active + 1;
          badge = `<span class="badge badge-pill badge-success">Active</span>`;
          progressContainer.style.width = "65%";
          progressContainer.firstChild.nodeValue = "2/3 steps";
          nextStepTitle[0].innerHTML = `Next step: First Post Free`;
          firstBtn.innerHTML = "First Post Free";
          firstBtn.addEventListener("click", function () {
            $("#channelJobModal").modal("show");
            $("#channelJobModal").on("shown.bs.modal", function () {
              selectedJobId = item.id;
            });
          });
          firstBtn.disabled = false;
          firstBtn.classList.replace("btn-secondary", "btn-primary");
          secondBtn.classList.add("hidden");
        } else if (isPaid === true && item.status_id === 2) {
          badge = `<span class="badge badge-pill badge-success">Active</span>`;
          dashboard.active = dashboard.active + 1;
          if (data.total_repost > 0) {
            firstBtn.innerHTML = "Repost";
            firstBtn.addEventListener("click", function () {
              $("#channelJobModal").modal("show");
              $("#channelJobModal").on("shown.bs.modal", function () {
                selectedJobId = item.id;
              });
            });
            firstBtn.disabled = false;
            firstBtn.classList.replace("btn-secondary", "btn-primary");
          } else {
            firstBtn.innerHTML = "Repost";
            firstBtn.addEventListener("click", function () {
              $("#topupRepostModal").modal("show");
              // $("#topupRepostModal").on("shown.bs.modal", function () {
              //   showAlert(
              //     "alert-repost-container",
              //     "Oops!",
              //     "looks like you don't have enough repost balance to repost your job. To proceed, please purchase a repost balance. Thank you!",
              //     "warning",
              //     "my-post-alert",
              //     15000
              //   );
              // });
            });
            firstBtn.classList.replace("btn-primary", "btn-secondary");
          }
          progressContainer.style.width = "100%";
          progressContainer.firstChild.nodeValue = "3/3 steps";
          nextStepTitle[0].innerHTML = `Completed`;
          secondBtn.classList.remove("hidden");
          secondBtn.addEventListener("click", function () {
            $("#postedJobModal").modal("show");
            $("#postedJobModal").on("shown.bs.modal", function () {
              listPostedJob(item.title, item.telegram);
            });
          });
        } else if (isPaid === true && item.status_id === 3) {
          dashboard.expired = dashboard.expired + 1;
          badge = `<span class="badge badge-pill badge-secondary">Expired</span>`;

          firstBtn.innerHTML = "Repost";
          firstBtn.disabled = true;
          firstBtn.classList.replace("btn-primary", "btn-secondary");

          progressContainer.style.width = "100%";
          progressContainer.firstChild.nodeValue = "3/3 steps";
          nextStepTitle[0].innerHTML = `Completed`;
          secondBtn.classList.add("hidden");
        }

        const jobTitle = divs[0].getElementsByTagName("h5");
        jobTitle[0].innerHTML = `${item.title} ${badge}`;

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
    if (item?._session_of_job?.payment_status === "paid") {
      let row = document.createElement("tr");
      let jobId = document.createElement("td");
      jobId.innerText = item.custom_id;
      let dateCreated = document.createElement("td");
      if (item?._session_of_job?.created_at) {
        let create_at = new Date(item._session_of_job.created_at);
        dateCreated.innerText = create_at.toLocaleString("en-US", format);
      } else {
        dateCreated.innerText = "-";
      }
      let jobTitle = document.createElement("td");
      jobTitle.innerText = item.title;
      let dayVisibility = document.createElement("td");

      if (item?._session_of_job?.day_visibility) {
        dayVisibility.innerText = item._session_of_job.day_visibility;
      } else {
        dayVisibility.innerText = "-";
      }
      let totalAmount = document.createElement("td");
      if (item?._session_of_job?.amount_total) {
        totalAmount.innerText = formatPrice(item._session_of_job.amount_total);
      } else {
        totalAmount.innerText = "-";
      }
      let orderStatus = document.createElement("td");
      orderStatus.innerText = "Paid";

      row.appendChild(jobId);
      row.appendChild(dateCreated);
      row.appendChild(jobTitle);
      row.appendChild(dayVisibility);
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

function populateOrderHistoryRepost(data) {
  const listLoader = document.getElementById(
    "order-history-repost-list-loader"
  );
  const listEmpty = document.getElementById("order-history-repost-list-empty");
  const listContainer = document.getElementById(
    "order-history-repost-list-container"
  );
  const listBody = document.getElementById("order-history-repost-list-body");

  // Clear the table before appending the new data
  while (listBody.firstChild) {
    listBody.removeChild(listBody.firstChild);
  }

  var totalRecord = [];

  data.forEach((item) => {
    let row = document.createElement("tr");
    let dateCreated = document.createElement("td");
    let create_at = new Date(item.created_at);
    dateCreated.innerText = create_at.toLocaleString("en-US", format);
    let repostCount = document.createElement("td");
    repostCount.innerText = item.repost_count;
    let totalAmount = document.createElement("td");
    totalAmount.innerText = formatPrice(item.amount_total);
    let orderStatus = document.createElement("td");
    orderStatus.innerText = item.payment_status;

    row.appendChild(dateCreated);
    row.appendChild(repostCount);
    row.appendChild(totalAmount);
    row.appendChild(orderStatus);
    totalRecord.push(item);
    document.getElementById("order-history-repost-list-body").appendChild(row);
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

const companyNameDefaultForm = document.getElementById("input-company-name");
companyNameDefaultForm.value = myData.userData.company_name;

document.getElementById("job-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let submitJobBtn = document.getElementById("submit-job-btn");

  submitJobBtn.disabled = true;
  submitJobBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  if (token) {
    var company_name = companyNameDefaultForm.value;
    var ssm_number = document.getElementById("input-company-ssm").value;
    var title = document.getElementById("input-job-title").value;
    var min_salary = document.getElementById("input-job-min-salary").value;
    var max_salary = document.getElementById("input-job-max-salary").value;
    var location = document.getElementById("input-job-location").value;
    var apply_link = document.getElementById("input-job-url").value;

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
      }),
    };

    fetchAPI(
      "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/job",
      "POST",
      token,
      options
    )
      .then((data) => {
        // delay of 2 seconds before calling fetchMyJobs
        setTimeout(() => {
          fetchMyJobs();
          $("#addJobModal").modal("hide");
          submitJobBtn.disabled = false;
          submitJobBtn.innerHTML = "Create";
        }, 2000);
      })
      .catch((error) => {
        $("#addJobModal").modal("hide");
        submitJobBtn.disabled = false;
        submitJobBtn.innerHTML = "Create";
      });
  }
});

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
    adminlistPostedJob(openJobId, currentJob.telegram);
  }
}

const expiredBtn = document.getElementById("expired-this-post-btn");
expiredBtn.addEventListener("click", expiredJob);

function expiredJob() {
  expiredBtn.disabled = true;
  expiredBtn.innerHTML = loadingText;

  const options = {
    body: JSON.stringify({
      job_id: openJobId,
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
          fetchAllJobs();
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
        deleteJob(jobId, item, this);
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

function deleteJob(jobId, telegramData, deleteBtn) {
  const options = {
    body: JSON.stringify({
      job_id: jobId,
      username_id: telegramData._channel.username_id,
      message_id: telegramData.message_id,
      chat_id: telegramData.chat_id,
    }),
  };

  deleteBtn.disabled = true;
  deleteBtn.innerHTML = loadingText;

  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7:v1/admin/webhooks/delete",
    "POST",
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
        deleteBtn.disabled = false;
        deleteBtn.innerHTML = loadingText;
      } else {
        // delay of 2 seconds before calling fetchAllJobs
        setTimeout(() => {
          fetchAllJobs();
          // delay of 2 seconds before calling fetchAllJobs
          setTimeout(() => {
            deleteBtn.disabled = false;
            deleteBtn.innerHTML = "Delete";
            filterJob();
          }, 3000);
        }, 5000);
      }
    })
    .catch((error) => {
      deleteBtn.disabled = false;
      deleteBtn.innerHTML = loadingText;
    });
}

function fetchAllJobs() {
  if (myData.userData.role_id === 1) {
    fetchAPI(
      "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/admin/jobs",
      "GET",
      token
    )
      .then((data) => {
        if (data?.message) {
          alert(data.message);
        } else {
          const loadingAdminAllJobCard = document.getElementById(
            "admin-all-job-card-loading"
          );
          const emptyCard = document.getElementById("admin-all-job-card-empty");
          const parentTable = document.getElementById(
            "admin-all-job-table-parent"
          );
          const tableBody = document.getElementById("admin-all-job-table-body");
          // Clear the table before appending the new data
          while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
          }

          jobListState = data;
          var totalRecord = [];

          data.forEach((item) => {
            let isPaid = false;
            let badge = `<span class="badge badge-pill badge-danger">Not Active</span>`;

            let resent_used = "";
            let active_date = "-";
            let expired_date = "-";
            let day_visibility = "-";

            if (item?._session_of_job?.payment_status == "paid") {
              isPaid = true;
            } else {
              isPaid = false;
            }

            if (item.timestamp_active && item.timestamp_expired) {
              resent_used = item.telegram.length - 1; // minus the first time post
              let activeDate = new Date(item.timestamp_active);
              let expiredDate = new Date(item.timestamp_expired);

              active_date = activeDate.toLocaleString("en-US", format);
              expired_date = expiredDate.toLocaleString("en-US", format);
              day_visibility = item._session_of_job.day_visibility;
            } else {
              active_date = "-";
              expired_date = "-";
              day_visibility = "-";
            }

            if (isPaid === false) {
            } else if (isPaid === true && item.status_id === 1) {
              badge = `<span class="badge badge-pill badge-success">Active</span>`;
            } else if (isPaid === true && item.status_id === 2) {
              badge = `<span class="badge badge-pill badge-success">Active</span>`;
            } else if (isPaid === true && item.status_id === 3) {
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
            days.innerText = day_visibility; //innerText
            let status = document.createElement("td");
            status.innerHTML = badge; //innerHTML

            let action = document.createElement("td");
            let button = document.createElement("button");
            button.classList.add("btn", "btn-primary");
            button.setAttribute("type", "button");
            button.setAttribute("data-telegram", JSON.stringify(item.telegram));
            button.innerText = "Open";
            button.onclick = function () {
              $("#actionModal").modal("show");
              openJobId = item.id;
              filterJob();
            };

            action.appendChild(button);

            row.appendChild(jobId);
            row.appendChild(jobTitle);
            row.appendChild(companyName);
            row.appendChild(postedAt);
            row.appendChild(expiredAt);
            row.appendChild(days);
            row.appendChild(status);
            row.appendChild(action);
            totalRecord.push(item);
            document
              .getElementById("admin-all-job-table-body")
              .appendChild(row);
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

        adminResetRefreshBtn();
      })
      .catch((error) => {
        console.error(error);
        adminResetRefreshBtn();
      });
  }
}

function firstCall() {
  fetchMyJobs();
  fetchAllJobs();
  fetchRepostProduct();
  fetchVisibilityProduct();
}

firstCall();
