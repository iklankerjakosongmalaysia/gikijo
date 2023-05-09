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
  location.href = "index";
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

const refreshChannelBtn = document.getElementById("refresh-channel-list");
refreshChannelBtn.addEventListener("click", firstCall);

function openMyJobTab() {
  document.querySelector("#my-job-tab").click();
}

const username = document.getElementById("username-text");
username.innerHTML = `Welcome back! ${myData.userData.username}`;

let userMenu = [];

if (myData.userData.role_id === 3) {
  userMenu.push(
    {
      isActive: true,
      href: "home",
      iconSideBar: "fas fa-fw fa-home",
      iconTopBar: "fas fa-home fa-sm fa-fw mr-2 text-gray-400",
      title: "Home",
    },
    {
      href: "profile",
      iconSideBar: "fas fa-fw fa-user",
      iconTopBar: "fas fa-user fa-sm fa-fw mr-2 text-gray-400",
      title: "Profile",
    },
    {
      href: "job-list",
      iconSideBar: "fas fa-fw fa-list",
      iconTopBar: "fas fa-list fa-sm fa-fw mr-2 text-gray-400",
      title: "Job List",
    },
    {
      href: "settings",
      iconSideBar: "fas fa-fw fa-cogs",
      iconTopBar: "fas fa-cogs fa-sm fa-fw mr-2 text-gray-400",
      title: "Settings",
    },
    {
      href: "#logoutModal",
      iconSideBar: "fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400",
      iconTopBar: "fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400",
      title: "Logout",
      dataToggle: "modal",
    }
  );
} else {
  userMenu.push(
    {
      isActive: true,
      href: "home",
      iconSideBar: "fas fa-fw fa-home",
      iconTopBar: "fas fa-home fa-sm fa-fw mr-2 text-gray-400",
      title: "Home",
    },
    {
      href: "profile",
      iconSideBar: "fas fa-fw fa-user",
      iconTopBar: "fas fa-user fa-sm fa-fw mr-2 text-gray-400",
      title: "Profile",
    },
    {
      href: "job-list",
      iconSideBar: "fas fa-fw fa-list",
      iconTopBar: "fas fa-list fa-sm fa-fw mr-2 text-gray-400",
      title: "Job List",
    },
    {
      href: "settings",
      iconSideBar: "fas fa-fw fa-cogs",
      iconTopBar: "fas fa-cogs fa-sm fa-fw mr-2 text-gray-400",
      title: "Settings",
    },
    {
      href: "#logoutModal",
      iconSideBar: "fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400",
      iconTopBar: "fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400",
      title: "Logout",
      dataToggle: "modal",
    }
  );
}

let userMenuSideBarHTML = "";
let userMenuTopBarHTML = "";

for (let i = 0; i < userMenu.length; i++) {
  let dataToggle = userMenu[i].dataToggle
    ? `data-toggle="${userMenu[i].dataToggle}"`
    : "";
  userMenuSideBarHTML += `
  <li class="nav-item ${userMenu[i].isActive ? "active" : ""}">
  <a class="nav-link" href="${userMenu[i].href}" ${dataToggle}>
    <i class="${userMenu[i].iconSideBar}"></i>
    <span>${userMenu[i].title}</span></a
  >
  </li>
  `;

  userMenuTopBarHTML += `<a class="dropdown-item" href="${userMenu[i].href}" ${dataToggle}>
  <i class="${userMenu[i].iconTopBar}"></i>
  ${userMenu[i].title}
</a>`;
}

document.getElementById("top-bar-menu-list").innerHTML = userMenuTopBarHTML;
document.getElementById("sidebar-menu-list").innerHTML = userMenuSideBarHTML;

let tabs = [];

if (myData.userData.role_id === 3) {
  var defaultActiveTab = document.getElementById("dashboard-job-seeker");
  defaultActiveTab.classList.add("show", "active");

  tabs.push(
    {
      id: "dashboard-job-seeker-tab",
      title: "Dashboard",
      content: "dashboard-job-seeker",
    },
    {
      id: "my-job-job-seeker-tab",
      title: "My Application",
      content: "my-job-job-seeker",
    }
  );
}

if (myData.userData.role_id === 2) {
  var defaultActiveTab = document.getElementById("dashboard-employer");
  defaultActiveTab.classList.add("show", "active");

  tabs.push(
    {
      id: "dashboard-employer-tab",
      title: "Dashboard",
      content: "dashboard-employer",
    },
    {
      id: "my-job-tab",
      title: "Job Slot",
      content: "my-job",
    },
    {
      id: "applicants-tab",
      title: "Applicants",
      content: "applicants",
    },
    {
      id: "history-tab",
      title: "Purchase History",
      content: "history",
    }
  );
}

if (myData.userData.role_id === 1) {
  var defaultActiveTab = document.getElementById("dashboard-employer");
  defaultActiveTab.classList.add("show", "active");

  tabs.push(
    {
      id: "dashboard-employer-tab",
      title: "Dashboard",
      content: "dashboard-employer",
    },
    {
      id: "my-job-tab",
      title: "Job Slot",
      content: "my-job",
    },
    {
      id: "applicants-tab",
      title: "Applicants",
      content: "applicants",
    },
    {
      id: "history-tab",
      title: "Purchase History",
      content: "history",
    },
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
  let isShow = i === 0 ? "show" : "";
  tabHTML += `
    <li class="nav-item">
      <a
        class="nav-link ${isActive} ${isShow}"
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

// const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
document.getElementById("myTab").innerHTML = tabHTML;

document
  .getElementById("create-update-company-profile")
  .addEventListener("click", () => {
    location.href = "profile?code=company_profile";
  });

document
  .getElementById("edit-update-company-profile")
  .addEventListener("click", () => {
    location.href = "profile?code=company_profile";
  });

const successUrl = "https://gikijo.com/success";
const cancelUrl = "https://gikijo.com/cancel";

const profileUnlockBalanceContainer = document.getElementById(
  "profile-unlock-balance-container"
);

if (myData.userData.role_id === 2 || myData.userData.role_id === 1) {
  profileUnlockBalanceContainer.removeAttribute("style");
} else {
  profileUnlockBalanceContainer.removeAttribute("style");
  profileUnlockBalanceContainer.setAttribute("style", "display: none");
}

let selectedJob;

const format = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

let selectedTopupItem = null;
var topupListData = [];

const retryTopup = document.getElementById("retry-topup-btn");
retryTopup.addEventListener("click", fetchProductList);

const addTopupBtn = document.getElementById("add-topup-btn");
addTopupBtn.addEventListener("click", fetchProductList);

function populateTopup(allData = []) {
  const listLoader = document.getElementById("topup-list-loader");
  const listEmpty = document.getElementById("topup-list-empty");
  const listContainer = document.getElementById("topup-list-container");
  const listBody = document.getElementById("topup-list-body");

  var totalRecord = [];

  allData.forEach((item) => {
    if (item.metadata.type === "coin" && item.active == true) {
      const card = listBody.cloneNode(true);
      const divs = card.getElementsByTagName("div");

      const title = divs[0].getElementsByTagName("h7");

      title[0].innerHTML = `${item.name} - RM ${item.metadata.price}`;

      if (selectedTopupItem?.id == item.id) {
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
          "topup-total-price-element"
        );
        coinPrice = parseInt(item.metadata.price, 10);
        totalPriceElement.innerHTML = `RM ${coinPrice}`;
        selectedTopupItem = item;
        populateTopup(topupListData); // update background color
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

let selectedVisibilityItem = null;
var visibilityListData = [];

const retryVisibility = document.getElementById("retry-visibility-btn");
retryVisibility.addEventListener("click", fetchProductList);

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

var submitChannelBtn = document.getElementById("submit-channel-btn");
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

    let badgeInfo = "";
    let status = 1;
    let viewURL = "";

    if (selectedJob.is_shared) {
      if (selectedJob.telegram_data.channel_id == item.id) {
        // badgeInfo = `<span class="badge badge-success">Shared</span>`;
        viewURL = `${item.url}/${selectedJob.telegram_data.message_id}`;
        status = 2;
      } else {
        viewURL = "";
        badgeInfo = "";
        status = 1;
      }
    } else {
      viewURL = "";
      badgeInfo = "";
      status = 1;
    }

    const channelContainer = divs[0];
    channelContainer.innerHTML = ""; // Clear existing posts

    const mainContainer = document.createElement("div");
    mainContainer.className = "card-body d-flex justify-content-between";

    const firstRow = document.createElement("div");

    const telegramImage = document.createElement("img");
    telegramImage.src = "https://telegram.org/img/t_logo.png";
    telegramImage.className = "mr-2";
    telegramImage.width = 25;
    telegramImage.height = 25;

    firstRow.appendChild(telegramImage);

    const elementH7 = document.createElement("h7");
    elementH7.className = "align-middle";
    elementH7.innerHTML = `${item.name} ${badgeInfo}`;
    firstRow.appendChild(elementH7);

    const secondRow = document.createElement("div");

    if (status == 2) {
      const channelViewButton = document.createElement("button");
      channelViewButton.className = "btn btn-outline-primary ml-1";
      channelViewButton.type = "button";
      channelViewButton.style.border = "none";
      const channelViewIcon = document.createElement("i");
      channelViewIcon.className = "fa fa-paper-plane";
      channelViewButton.appendChild(channelViewIcon);
      channelViewButton.addEventListener("click", function () {
        window.open(viewURL, "_blank");
      });
      secondRow.appendChild(channelViewButton);
    }

    const channelShareButton = document.createElement("button");
    channelShareButton.className = "btn btn-outline-secondary ml-1";
    channelShareButton.type = "button";
    channelShareButton.style.border = "none";
    const channelShareIcon = document.createElement("i");
    channelShareIcon.className = "fa fa-external-link-alt";
    channelShareIcon.addEventListener("click", () => {});
    channelShareButton.appendChild(channelShareIcon);
    channelShareButton.addEventListener("click", function () {
      window.open(item.url, "_blank");
    });
    secondRow.appendChild(channelShareButton);

    mainContainer.appendChild(firstRow);
    mainContainer.appendChild(secondRow);

    channelContainer.appendChild(mainContainer);

    if (selectedChannelItem?.id == item.id) {
      channelContainer.style.backgroundColor = "#f8f9fc";
      channelContainer.style.border = "1px solid #4d72de";
      channelContainer.style.borderRadius = "5px";
      if (selectedJob.is_shared) {
        if (selectedJob.telegram_data.channel_id == item.id) {
          submitChannelBtn.innerHTML = "Unshare";
          submitChannelBtn.classList.remove("btn-primary");
          submitChannelBtn.classList.add("btn-danger");
        } else {
          submitChannelBtn.innerHTML = "Share Now";
          submitChannelBtn.classList.remove("btn-danger");
          submitChannelBtn.classList.add("btn-primary");
        }
      } else {
        submitChannelBtn.innerHTML = "Share Now";
        submitChannelBtn.classList.remove("btn-danger");
        submitChannelBtn.classList.add("btn-primary");
      }
    } else {
      channelContainer.style.backgroundColor = null;
      channelContainer.style.border = null;
      channelContainer.style.borderRadius = null;
    }

    channelContainer.addEventListener("click", function () {
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

// Add a submit event listener to the form
channelForm.addEventListener("submit", function (event) {
  event.preventDefault();

  submitChannelBtn.disabled = true;
  submitChannelBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  if (selectedChannelItem?.id == null) {
    alert("Please select a channel in order to proceed.");
    submitChannelBtn.disabled = false;
    submitChannelBtn.innerHTML = "Share Now";
    return;
  }

  const options = {
    body: JSON.stringify({
      post_id: selectedJob.id,
      channel_id: selectedChannelItem.id,
    }),
  };

  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/post/share",
    "POST",
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        // delay of 2 seconds before calling fetchMyJobs
        setTimeout(() => {
          submitChannelBtn.disabled = false;
          submitChannelBtn.innerHTML = "Share Now";
          showAlert(
            "alert-share-container",
            "Error!",
            data.message,
            "danger",
            "my-share-alert",
            15000
          );
        }, 2000);
      } else {
        // delay of 2 seconds before calling fetchMyJobs
        setTimeout(() => {
          fetchMyJobs();
          $("#channelJobModal").modal("hide");
          window.scrollTo(0, 0);
          showAlert(
            "alert-post-container",
            "Success!",
            data.status_message,
            "success",
            "my-share-alert",
            15000
          );
          submitChannelBtn.disabled = false;
          submitChannelBtn.innerHTML = "Share Now";
        }, 2000);
      }
    })
    .catch((error) => {
      submitChannelBtn.disabled = false;
      submitChannelBtn.innerHTML = "Share Now";
    });
});

document
  .getElementById("refresh-coupon-list")
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

function fetchProductList() {
  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:D1epqX-m:v1/products",
    "GET",
    token
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
        populateVisibility(visibilityListData);
        populateTopup(topupListData);
      } else {
        visibilityListData = data.data;
        topupListData = data.data;
        populateVisibility(data.data);
        populateTopup(data.data);
      }
    })
    .catch((error) => {
      console.error(error);
      populateVisibility(visibilityListData);
      populateTopup(topupListData);
    });
}

function fetchProductList() {
  fetchAPI(
    "https://x8ki-letl-twmt.n7.xano.io/api:D1epqX-m:v1/products",
    "GET",
    token
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
        populateVisibility(visibilityListData);
        populateTopup(topupListData);
      } else {
        visibilityListData = data.data;
        topupListData = data.data;
        populateVisibility(data.data);
        populateTopup(data.data);
      }
    })
    .catch((error) => {
      console.error(error);
      populateVisibility(visibilityListData);
      populateTopup(topupListData);
    });
}

// Add a submit event listener to the form
buyTopupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let submitPayTopupBtn = document.getElementById("submit-topup-btn");
  submitPayTopupBtn.disabled = true;
  submitPayTopupBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  if (selectedTopupItem == null) {
    alert("In order to continue, please pick one of the priced items");
    submitPayTopupBtn.disabled = false;
    submitPayTopupBtn.innerHTML = "Continue to payment";
    return;
  }

  const options = {
    body: JSON.stringify({
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: [
        {
          price: selectedTopupItem.default_price,
          quantity: 1,
        },
      ],
      metadata: {
        user_id: myData.userData.id,
        coin_amount: selectedTopupItem.metadata.coin_amount,
        type: selectedTopupItem.metadata.type,
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
      submitPayTopupBtn.disabled = false;
      submitPayTopupBtn.innerHTML = "Continue to payment";
    })
    .catch((error) => {
      submitPayTopupBtn.disabled = false;
      submitPayTopupBtn.innerHTML = "Continue to payment";
    });
});

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

  const options = {
    body: JSON.stringify({
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: [
        {
          price: selectedVisibilityItem.default_price,
          quantity: 1,
        },
      ],
      metadata: {
        user_id: myData.userData.id,
        job_id: selectedJob.id,
        day_visibility: selectedVisibilityItem.metadata.day_visibility,
        type: selectedVisibilityItem.metadata.type,
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
  }
}

var slot_type_edit = document.getElementById("input-edit-slot-type");
var company_name_edit = document.getElementById("input-edit-company-name");
var ssm_number_edit = document.getElementById("input-edit-company-ssm");
var title_edit = document.getElementById("input-edit-job-title");
var job_type_edit = document.getElementById("input-edit-job-type");
var min_salary_edit = document.getElementById("input-edit-job-min-salary");
var max_salary_edit = document.getElementById("input-edit-job-max-salary");
var salary_type_edit = document.getElementById("input-edit-job-salary-type");
var requirement_edit = document.getElementById("input-edit-job-requirement");
var benefit_edit = document.getElementById("input-edit-job-benefit");
var additional_info_edit = document.getElementById(
  "input-edit-job-additional-info"
);
var location_edit = document.getElementById("input-edit-job-location");
var apply_type_edit = document.getElementById("input-edit-apply-type");
var external_apply_link_edit = document.getElementById("input-edit-job-url");
var containerEditJobUrl = document.getElementById("container-edit-job-url");

apply_type_edit.addEventListener("change", function () {
  const selectedValue = this.value;
  if (selectedValue === "external") {
    containerEditJobUrl.style.display = "block";
    external_apply_link_edit.disabled = false;
  } else {
    containerEditJobUrl.style.display = "none";
    external_apply_link_edit.disabled = true;
  }
});

document
  .getElementById("edit-job-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let submitEditJobBtn = document.getElementById("submit-edit-job-btn");

    submitEditJobBtn.disabled = true;
    submitEditJobBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

    if (token) {
      if (min_salary_edit.value) {
        if (min_salary_edit.value <= max_salary_edit.value) {
          // proceed
        } else {
          alert("Maximum salary should be greater or equal to minimum salary");
          submitEditJobBtn.disabled = false;
          submitEditJobBtn.innerHTML = "Submit";
          return;
        }
      }

      const options = {
        body: JSON.stringify({
          job_id: selectedJob.id,
          title: title_edit.value,
          type: job_type_edit.value,
          min_salary: min_salary_edit.value,
          max_salary: max_salary_edit.value,
          salary_type: salary_type_edit.value,
          location: location_edit.value,
          requirement: requirement_edit.value,
          benefit: benefit_edit.value,
          additional_info: additional_info_edit.value,
          external_apply_link: external_apply_link_edit.value,
          is_external_apply: apply_type_edit.value == "external" ? true : false,
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

var changeApplicantStatusloading = false;

function changeApplicantStatus(applicationId, applicationStatusId, passBtn) {
  if (changeApplicantStatusloading) {
    alert("Status update is still in progress. Please wait...");
  } else {
    const options = {
      body: JSON.stringify({
        application_id: applicationId,
        application_status_id: applicationStatusId,
      }),
    };
    changeApplicantStatusloading = true;
    passBtn.innerHTML = loadingText;
    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/application/update_status`,
      "PUT",
      token,
      options
    )
      .then((data) => {
        if (data?.message) {
          alert(data?.message);
          changeApplicantStatusloading = false;
          passBtn.innerHTML = "Status";
        } else {
          setTimeout(() => {
            firstCall();
            changeApplicantStatusloading = false;
            passBtn.innerHTML = "Status";
          }, 2000);
        }
      })
      .catch((error) => {
        changeApplicantStatusloading = false;
        passBtn.innerHTML = "Status";
      });
  }
}

var unlockProfileLoading = false;

function unlockProfile(profileId, passBtn, passBtnDefaultText) {
  if (
    confirm(
      "Are you sure you want to unlock this profile? This action cannot be undone."
    )
  ) {
  } else {
    return;
  }

  if (unlockProfileLoading) {
    alert("Unlock profile is still in progress. Please wait...");
  } else {
    const options = {
      body: JSON.stringify({
        profile_id: profileId,
      }),
    };
    unlockProfileLoading = true;
    passBtn.innerHTML = loadingText;
    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/user/unlock/profile`,
      "POST",
      token,
      options
    )
      .then((data) => {
        if (data?.message) {
          alert(data?.message);
          unlockProfileLoading = false;
          passBtn.innerHTML = passBtnDefaultText;
        } else {
          setTimeout(() => {
            firstCall();
            unlockProfileLoading = false;
            passBtn.innerHTML = passBtnDefaultText;
          }, 2000);
        }
      })
      .catch((error) => {
        unlockProfileLoading = false;
        passBtn.innerHTML = passBtnDefaultText;
      });
  }
}

function populateApplication(data, applicationStatusData, userData) {
  const unlockProfileList = userData.unlocked_profile;
  const unlockLimit = userData.profile_unlock_limit;

  const loadingCard = document.getElementById("home-applicant-list-loading");
  const emptyCard = document.getElementById("home-applicant-list-empty");
  const parentTable = document.getElementById("home-applicant-list-parent");
  const style = document.getElementById("home-applicant-list-child");
  const emptyDiv = [];

  data.forEach(function (item) {
    const card = style.cloneNode(true);
    const divs = card.getElementsByTagName("div");
    const h6Text = divs[0].getElementsByTagName("h6");

    h6Text[0].innerHTML = `${item.profile_data.full_name} <span class="badge badge-pill badge-info">${item.application_status_data.name}</span> `;
    h6Text[1].innerHTML = item.post_data.title;

    const time = divs[0].getElementsByTagName("h7");
    var created_at = new Date(item.created_at);
    var timeAgo = moment(created_at).fromNow(true);
    time[0].innerHTML = `${timeAgo} ago`;

    // create button element
    const buttonParent = document.createElement("button");
    buttonParent.classList.add("btn", "btn-primary", "dropdown-toggle");
    buttonParent.setAttribute("type", "button");
    buttonParent.setAttribute("id", "dropdownMenu2");
    buttonParent.setAttribute("data-toggle", "dropdown");
    buttonParent.setAttribute("aria-haspopup", "true");
    buttonParent.setAttribute("aria-expanded", "false");
    buttonParent.textContent = "Status";

    // create dropdown menu element
    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu");
    dropdownMenu.setAttribute("aria-labelledby", "dropdownMenu2");

    const dropdownButtonContainer = divs[4];

    // remove existing dropdown button (if any)
    while (dropdownButtonContainer.firstChild) {
      dropdownButtonContainer.removeChild(dropdownButtonContainer.firstChild);
    }

    // create dropdown menu options
    const options = applicationStatusData;

    options.forEach((option) => {
      const buttonChild = document.createElement("button");
      buttonChild.classList.add("dropdown-item");
      buttonChild.setAttribute("type", "button");
      buttonChild.textContent = option.name;
      buttonChild.setAttribute("value", option.code);
      buttonChild.addEventListener("click", () => {
        changeApplicantStatus(item.id, option.id, buttonParent);
      });

      const currentStatus = item.application_status_data.code;
      const loopStatus = option.code;

      const statusesToHide = {
        pending: [
          "pending",
          "underReview",
          "interviewing",
          "offered",
          "hired",
          "notSelected",
        ],
        underReview: ["underReview", "pending"],
        interviewing: ["interviewing", "pending"],
        offered: ["offered", "pending"],
        hired: ["hired", "pending"],
        notSelected: ["notSelected", "pending"],
        withdraw: [
          "pending",
          "underReview",
          "interviewing",
          "offered",
          "hired",
          "notSelected",
        ],
        default: ["pending"],
      };

      const isLoopStatusInStatusesToHide = statusesToHide[currentStatus]
        ? statusesToHide[currentStatus].includes(loopStatus)
        : statusesToHide.default.includes(loopStatus);

      buttonChild.disabled = isLoopStatusInStatusesToHide;

      dropdownMenu.appendChild(buttonChild);
    });

    buttonParent.appendChild(dropdownMenu);
    dropdownButtonContainer.appendChild(buttonParent);

    const buttonUnlock = document.createElement("button");
    const buttonView = document.createElement("button");
    buttonView.classList.add("btn", "btn-outline-primary", "ml-1");
    buttonView.innerHTML = `<i class="fa fa-external-link-alt mr-1"></i>`;
    buttonView.addEventListener("click", () => {
      window.open(`user-profile.html?profile_id=${item.profile_data.id}`);
    });

    var isProfileLocked = true;

    unlockProfileList.map((unloakItem) => {
      if (unloakItem.profile_id == item.profile_data.id) {
        isProfileLocked = false;
        return;
      }
    });

    if (isProfileLocked == false) {
      buttonUnlock.disabled = true;
      buttonUnlock.classList.add("btn", "btn-outline-secondary", "ml-1");
      buttonUnlock.innerHTML = `<i class="fa fa-lock-open"></i>`;
    } else {
      buttonUnlock.disabled = false;
      buttonUnlock.classList.add("btn", "btn-outline-primary", "ml-1");
      buttonUnlock.innerHTML = `<i class="fa fa-lock"></i>`;
      buttonUnlock.addEventListener("click", () => {
        unlockProfile(
          item.profile_data.id,
          buttonUnlock,
          buttonUnlock.innerHTML
        );
      });
    }

    dropdownButtonContainer.appendChild(buttonUnlock);
    dropdownButtonContainer.appendChild(buttonView);

    emptyDiv.push(card);
  });

  loadingCard.classList.add("hidden");

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

function editForm(item) {
  selectedJob = item;
  if (item.is_free) {
    containerEditJobUrl.style.display = "none";
    slot_type_edit.value = "coin-based";
    apply_type_edit.value = "internal";
    apply_type_edit.disabled = true;
    external_apply_link_edit.disabled = true;
  } else {
    containerEditJobUrl.style.display = "block";
    slot_type_edit.value = "time-based";
    apply_type_edit.value =
      item.is_external_apply == true ? "external" : "internal";
    apply_type_edit.disabled = false;

    if (item.is_external_apply == true) {
      containerEditJobUrl.style.display = "block";
      external_apply_link_edit.disabled = false;
    } else {
      containerEditJobUrl.style.display = "none";
      external_apply_link_edit.disabled = true;
    }
  }

  document.getElementById("input-edit-company-name").value =
    item.company_data.name;
  document.getElementById("input-edit-company-ssm").value =
    item.company_data.ssm_number;
  document.getElementById("input-edit-job-title").value = item.title;
  document.getElementById("input-edit-job-type").value = item.type;
  document.getElementById("input-edit-job-min-salary").value = item.min_salary;
  document.getElementById("input-edit-job-max-salary").value = item.max_salary;
  document.getElementById("input-edit-job-salary-type").value =
    item.salary_type;
  document.getElementById("input-edit-job-requirement").value =
    item.requirement;
  document.getElementById("input-edit-job-benefit").value = item.benefit;
  document.getElementById("input-edit-job-additional-info").value =
    item.additional_info;
  document.getElementById("input-edit-job-location").value = item.location;
  document.getElementById("input-edit-job-url").value =
    item.external_apply_link;
}

var loading = false;

function addPost(passData, passBtn, passBtnDefaultText) {
  if (loading) {
    alert("Posting is still in progress. Please wait...");
  } else {
    loading = true;
    passBtn.disabled = true;
    passBtn.innerHTML = loadingIcon;

    const options = {
      body: JSON.stringify({
        job_id: passData.id,
      }),
    };

    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/post/add`,
      "POST",
      token,
      options
    )
      .then((data) => {
        if (data?.message) {
          alert(data.message);

          passBtn.disabled = false;
          passBtn.innerHTML = passBtnDefaultText;
          loading = false;
        } else {
          setTimeout(() => {
            firstCall();
            passBtn.disabled = false;
            passBtn.innerHTML = passBtnDefaultText;
            loading = false;
          }, 2000);
        }
      })
      .catch((error) => {
        passBtn.disabled = false;
        passBtn.innerHTML = passBtnDefaultText;
        loading = false;
      });
  }
}

function deletePost(passData, passBtn, passBtnDefaultText) {
  if (loading) {
    alert("Deletion is still in progress. Please wait...");
  } else {
    loading = true;
    passBtn.disabled = true;
    passBtn.innerHTML = loadingIcon;

    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/post/delete/${passData.id}`,
      "DELETE",
      token
    )
      .then((data) => {
        if (data?.message) {
          alert(data.message);

          passBtn.disabled = false;
          passBtn.innerHTML = passBtnDefaultText;
          loading = false;
        } else {
          setTimeout(() => {
            firstCall();
            setTimeout(() => {
              passBtn.disabled = false;
              passBtn.innerHTML = passBtnDefaultText;
              loading = false;
            }, 1000);
          }, 2000);
        }
      })
      .catch((error) => {
        passBtn.disabled = false;
        passBtn.innerHTML = passBtnDefaultText;
        loading = false;
      });
  }
}

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

      if (data.company_data !== null) {
        company_data = data.company_data;
        company_name_create.value = data.company_data.name;
        ssm_number_create.value = data.company_data.ssm_number;
      } else {
        company_data = null;
      }

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
      }

      if (data?.application_list && data?.application_status_list) {
        populateApplication(
          data.application_list,
          data.application_status_list,
          data.user_data
        );
      }

      const profileUnlockBalance = document.getElementById(
        "profile-unlock-balance"
      );
      const topupModalBalance = document.getElementById("topup-modal-balance");

      currentCoinBalance =
        data.user_data.profile_unlock_limit -
        data.user_data.unlocked_profile.length;

      profileUnlockBalance.innerHTML = currentCoinBalance;
      topupModalBalance.innerHTML = `Balance: <i class="fas fa-coins"></i>  ${currentCoinBalance}`;

      populateOrderHistoryVisibility(job_list);

      jobListState = job_list;

      job_list.map((item) => {
        var slot_post_list = [];

        post_list.map((postItem) => {
          if (item.id == postItem.job_id) {
            slot_post_list.push(postItem);
          }
        });

        const card = style.cloneNode(true);
        const divs = card.getElementsByTagName("div");

        let is_coin_based = false;
        let is_time_based = false;
        let is_time_based_paid = false;
        const jobTimeline = divs[0].getElementsByTagName("h7");

        if (item.is_free == true) {
          is_coin_based = true;
        } else {
          is_time_based = true;
        }

        if (item?.payment_info?.payment_status == "paid") {
          is_time_based_paid = true;
        } else {
          is_time_based_paid = false;
        }

        const activeDateString =
          item.timestamp_active &&
          new Date(item.timestamp_active).toLocaleString("en-US", format);
        const expiredDateString =
          item.timestamp_expired &&
          new Date(item.timestamp_expired).toLocaleString("en-US", format);

        let paymentTypeString = "";
        if (item.is_free) {
          paymentTypeString = `<i class="fas fa-coins mr-1"></i>Coin-based`;
        } else {
          paymentTypeString = `<i class="fas fa-clock mr-1"></i>Time-Based`;
        }

        if (item.status_id === 3) {
          jobTimeline[0].innerHTML = `This job slot has expired at ${expiredDateString}`;
        } else {
          if (activeDateString && expiredDateString) {
            jobTimeline[0].innerHTML = `${paymentTypeString} ∙ Active for ${item.payment_info.day_visibility} day ∙ Expires on ${expiredDateString}`;
          } else {
            jobTimeline[0].innerHTML = paymentTypeString;
          }
        }

        const listItem = divs[0].getElementsByTagName("li");
        listItem[0].innerHTML = `<b>Title of the job opening:</b> ${item.title}`;
        listItem[1].innerHTML = `<b>Company name:</b> <a href="company-profile?company_id=${item.company_data.id}" target="_blank" rel="noopener noreferrer">${item.company_data.name} (${item.company_data.ssm_number})</a>`;
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

        if (item.is_free == false) {
          if (item.is_external_apply) {
            listItem[8].innerHTML = `<b>External Job application URL:</b> <a href="${item.external_apply_link}" target="_blank"> ${item.external_apply_link}</a>`;
          } else {
            listItem[8].innerHTML = ``;
          }
        } else {
          listItem[8].innerHTML = ``;
        }

        const postBtn = divs[0].getElementsByTagName("button")[0];
        const editBtn = divs[0].getElementsByTagName("button")[1];

        if (is_time_based == true && is_time_based_paid == false) {
          dashboard.not_active++;
          badge = `<span class="badge badge-pill badge-danger">Not Active</span>`;
          postBtn.innerHTML = "Activate";
          postBtn.addEventListener("click", function () {
            if (visibilityListData.length == 0) {
              fetchProductList();
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
          postBtn.disabled = false;
          postBtn.classList.replace("btn-secondary", "btn-primary");
          editBtn.addEventListener("click", function () {
            $("#editJobModal").modal("show");
            $("#editJobModal").on("shown.bs.modal", function () {
              editForm(item);
            });
          });
        } else {
          if (item.status_id === 3) {
            dashboard.expired++;
            badge = `<span class="badge badge-pill badge-secondary">Expired</span>`;
            postBtn.innerHTML = `Post Now`;
            postBtn.classList.replace("btn-primary", "btn-secondary");
            postBtn.addEventListener("click", () => {
              alert(
                "We're sorry, but the job slot you're trying to post has expired, and all job postings associated with this slot will no longer be available on our channels. To post a new job opportunity, please create a new job slot."
              );
            });
            editBtn.addEventListener("click", function () {
              alert("The job slot has expired and is no longer editable");
            });
          } else if (item.status_id === 4) {
            badge = `<span class="badge badge-pill badge-dark">Blocked</span>`;
            postBtn.innerHTML = `Post Now`;
            postBtn.classList.replace("btn-primary", "btn-secondary");
            postBtn.addEventListener("click", () => {
              alert(
                "Your job slot has been blocked and all related posts have been removed due to policy violation. To appeal this decision, please submit a request through the 'Feedback' section in your account settings and include the Job Slot ID for reference."
              );
            });
            editBtn.addEventListener("click", function () {
              $("#editJobModal").modal("show");
              $("#editJobModal").on("shown.bs.modal", function () {
                editForm(item);
              });
            });
          } else {
            badge = `<span class="badge badge-pill badge-success">Active</span>`;
            postBtn.innerHTML = `Post Now`;
            postBtn.addEventListener("click", () => {
              addPost(item, postBtn, postBtn.innerHTML);
            });
            postBtn.disabled = false;
            postBtn.classList.replace("btn-secondary", "btn-primary");
            editBtn.addEventListener("click", function () {
              $("#editJobModal").modal("show");
              $("#editJobModal").on("shown.bs.modal", function () {
                editForm(item);
              });
            });
          }
        }

        const customId = divs[0].getElementsByTagName("h6");
        customId[0].innerHTML = `Job Slot ID: ${item.custom_id} ${badge}`;

        const postContainer = divs[0].getElementsByTagName("div")[3];
        postContainer.innerHTML = ""; // Clear existing posts

        slot_post_list.forEach((post) => {
          const postTitle = document.createElement("h6");
          postTitle.className = "modal-title font-weight-bold";
          postTitle.innerHTML = post.title;
          postTitle.addEventListener("click", () => {
            window.open(post.internal_apply_link);
          });

          const postTimestamp = document.createElement("h8");
          postTimestamp.className = "modal-title";
          postTimestamp.style.fontSize = "13px";
          var postTime = new Date(post.created_at);
          var postTimeAgo = moment(postTime).fromNow(true);
          postTimestamp.innerHTML = `${postTimeAgo} ago`;

          const postView = document.createElement("View");
          postView.appendChild(postTitle);
          postView.appendChild(postTimestamp);

          const postShareButton = document.createElement("button");
          postShareButton.className = "btn btn-outline-primary mr-2";
          postShareButton.type = "button";
          postShareButton.style.border = "none";
          const telegramImage = document.createElement("img");
          telegramImage.src = "https://telegram.org/img/t_logo.png";
          telegramImage.className = "ml-1";
          telegramImage.width = 25;
          telegramImage.height = 25;
          const badgeSpan = document.createElement("span");
          badgeSpan.className = "badge badge-light";
          if (post.is_shared) {
            badgeSpan.textContent = "1";
          } else {
            badgeSpan.textContent = "0";
          }
          postShareButton.appendChild(badgeSpan);
          postShareButton.addEventListener("click", () => {
            $("#channelJobModal").modal("show");
            $("#channelJobModal").on("shown.bs.modal", () => {
              selectedJob = post;
              populateChannel();
            });
          });

          postShareButton.appendChild(telegramImage);

          const postLinkButton = document.createElement("button");
          postLinkButton.className = "btn btn-outline-primary mr-2";
          postLinkButton.type = "button";
          postLinkButton.style.border = "none";
          const postLinkIcon = document.createElement("i");
          postLinkIcon.className = "fa fa-external-link-alt ml-1";
          postLinkButton.appendChild(postLinkIcon);

          postLinkButton.addEventListener("click", () => {
            window.open(post.internal_apply_link);
          });

          const postDeleteButton = document.createElement("button");
          postDeleteButton.className = "btn btn-outline-danger";
          postDeleteButton.type = "button";
          postDeleteButton.style.border = "none";
          const postDeleteIcon = document.createElement("i");
          postDeleteIcon.className = "fa fa-trash ml-1";
          postDeleteButton.appendChild(postDeleteIcon);
          postDeleteButton.addEventListener("click", () => {
            var confirmDelete = confirm(
              "Are you sure you want to delete this post? This action cannot be undone."
            );
            if (confirmDelete) {
              deletePost(post, postDeleteButton, postDeleteButton.innerHTML);
            }
          });

          const postButtons = document.createElement("View");
          postButtons.appendChild(postLinkButton);
          postButtons.appendChild(postShareButton);
          postButtons.appendChild(postDeleteButton);

          const postRow = document.createElement("div");
          postRow.className = "row justify-content-between pl-3 pr-3";
          postRow.appendChild(postView);
          postRow.appendChild(postButtons);

          postContainer.appendChild(document.createElement("hr"));
          postContainer.appendChild(postRow);
        });

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

var company_data = null;
var slot_type_create = document.getElementById("input-create-slot-type");
var company_name_create = document.getElementById("input-create-company-name");
var ssm_number_create = document.getElementById("input-create-company-ssm");
var title_create = document.getElementById("input-create-job-title");
var job_type_create = document.getElementById("input-create-job-type");
var min_salary_create = document.getElementById("input-create-job-min-salary");
var max_salary_create = document.getElementById("input-create-job-max-salary");
var salary_type_create = document.getElementById(
  "input-create-job-salary-type"
);
var requirement_create = document.getElementById(
  "input-create-job-requirement"
);
var benefit_create = document.getElementById("input-create-job-benefit");
var additional_info_create = document.getElementById(
  "input-create-job-additional-info"
);
var location_create = document.getElementById("input-create-job-location");
var apply_type_create = document.getElementById("input-create-apply-type");
var external_apply_link_create = document.getElementById(
  "input-create-job-url"
);
var containerCreateJobUrl = document.getElementById("container-create-job-url");

slot_type_create.addEventListener("change", function () {
  const selectedValue = this.value;
  if (selectedValue === "coin-based") {
    apply_type_create.value = "internal";
    apply_type_create.disabled = true;
    external_apply_link_create.disabled = true;
    containerCreateJobUrl.style.display = "none";
  } else {
    apply_type_create.value = "internal";
    apply_type_create.disabled = false;
    external_apply_link_create.disabled = true;
    containerCreateJobUrl.style.display = "none";
  }
});

apply_type_create.addEventListener("change", function () {
  const selectedValue = this.value;
  if (selectedValue === "external") {
    external_apply_link_create.disabled = false;
    containerCreateJobUrl.style.display = "block";
  } else {
    external_apply_link_create.disabled = true;
    containerCreateJobUrl.style.display = "none";
  }
});

function defaultHide() {
  slot_type_create.value = "coin-based";
  apply_type_create.value = "internal";
  apply_type_create.disabled = true;
  external_apply_link_create.disabled = true;
  containerCreateJobUrl.style.display = "none";
}

defaultHide();
let company_profile_id = null;

document
  .getElementById("create-job-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    if (company_data) {
      let submitCreateJobBtn = document.getElementById("submit-create-job-btn");

      submitCreateJobBtn.disabled = true;
      submitCreateJobBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

      if (token) {
        if (min_salary_create.value) {
          if (min_salary_create.value <= max_salary_create.value) {
            // proceed
          } else {
            alert(
              "Maximum salary should be greater or equal to minimum salary"
            );
            submitCreateJobBtn.disabled = false;
            submitCreateJobBtn.innerHTML = "Create";
            return;
          }
        }

        const options = {
          body: JSON.stringify({
            company_id: company_data.id,
            title: title_create.value,
            type: job_type_create.value,
            min_salary: min_salary_create.value,
            max_salary: max_salary_create.value,
            salary_type: salary_type_create.value,
            location: location_create.value,
            requirement: requirement_create.value,
            benefit: benefit_create.value,
            additional_info: additional_info_create.value,
            external_apply_link: external_apply_link_create.value,
            is_free: slot_type_create.value == "coin-based" ? true : false,
            is_external_apply:
              apply_type_create.value == "external" ? true : false,
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
              submitCreateJobBtn.disabled = false;
              submitCreateJobBtn.innerHTML = "Create";
            } else {
              // delay of 2 seconds before calling fetchMyJobs
              setTimeout(() => {
                fetchMyJobs();
                $("#addJobModal").modal("hide");
                submitCreateJobBtn.disabled = false;
                submitCreateJobBtn.innerHTML = "Create";
              }, 2000);
            }
          })
          .catch((error) => {
            $("#addJobModal").modal("hide");
            submitCreateJobBtn.disabled = false;
            submitCreateJobBtn.innerHTML = "Create";
          });
      }
    } else {
      alert("Company profile not updated, please update your company profile");
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
    let badge = "";

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

function toggleApply(passData, passBtn, passBtnDefaultText) {
  loading = true;
  passBtn.disabled = true;
  passBtn.innerHTML = loadingText;

  const options = {
    body: JSON.stringify({
      is_apply: !passData.is_apply,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/invite/apply/${passData.id}`,
    "PUT",
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);

        passBtn.disabled = false;
        passBtn.innerHTML = passBtnDefaultText;
        loading = false;
      } else {
        setTimeout(() => {
          firstCall();
          passBtn.disabled = false;
          passBtn.innerHTML = passBtnDefaultText;
          loading = false;
        }, 2000);
      }
    })
    .catch((error) => {
      passBtn.disabled = false;
      passBtn.innerHTML = passBtnDefaultText;
      loading = false;
    });
}

document
  .getElementById("refresh-job-seeker-application")
  .addEventListener("click", firstCall);

function populateJobSeekerApplication(data, applicationStatusData) {
  const loadingCard = document.getElementById(
    "home-job-seeker-application-loading"
  );
  const emptyCard = document.getElementById(
    "home-job-seeker-application-empty"
  );
  const parentTable = document.getElementById(
    "home-job-seeker-application-parent"
  );
  const style = document.getElementById("home-job-seeker-application-child");
  const emptyDiv = [];

  data.forEach(function (item) {
    const card = style.cloneNode(true);
    const divs = card.getElementsByTagName("div");
    const h6Text = divs[0].getElementsByTagName("h6");
    h6Text[0].innerHTML = `${item.post_data.title} <span class="badge badge-pill badge-info">${item.application_status_data.name}</span> `;
    h6Text[1].innerHTML = `Company: ${item.post_data.company_name}`;

    const time = divs[0].getElementsByTagName("h7");
    var created_at = new Date(item.created_at);
    var timeAgo = moment(created_at).fromNow(true);
    time[0].innerHTML = `${timeAgo} ago`;

    // create button element
    const buttonParent = document.createElement("button");
    buttonParent.classList.add("btn", "btn-primary", "dropdown-toggle");
    buttonParent.setAttribute("type", "button");
    buttonParent.setAttribute("id", "dropdownMenu2");
    buttonParent.setAttribute("data-toggle", "dropdown");
    buttonParent.setAttribute("aria-haspopup", "true");
    buttonParent.setAttribute("aria-expanded", "false");
    buttonParent.textContent = "Action";

    // create dropdown menu element
    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu");
    dropdownMenu.setAttribute("aria-labelledby", "dropdownMenu2");

    const dropdownButtonContainer = divs[4];

    // remove existing dropdown button (if any)
    while (dropdownButtonContainer.firstChild) {
      dropdownButtonContainer.removeChild(dropdownButtonContainer.firstChild);
    }

    // create dropdown menu options
    const options = applicationStatusData;

    options.forEach((option) => {
      const buttonChild = document.createElement("button");
      buttonChild.classList.add("dropdown-item");
      buttonChild.setAttribute("type", "button");
      buttonChild.textContent = option.name;
      buttonChild.setAttribute("value", option.code);
      buttonChild.addEventListener("click", () => {
        changeApplicantStatus(item.id, option.id, buttonParent);
      });

      const currentStatus = item.application_status_data.code;
      const loopStatus = option.code;

      const statusesToHide = {
        pending: ["pending", "decline", "withdraw"],
        decline: ["decline", "withdraw"],
        withdraw: ["decline", "withdraw"],
        apply: ["apply", "decline"],
        default: ["apply", "decline"],
      };

      const isLoopStatusInStatusesToHide = statusesToHide[currentStatus]
        ? statusesToHide[currentStatus].includes(loopStatus)
        : statusesToHide.default.includes(loopStatus);

      buttonChild.disabled = isLoopStatusInStatusesToHide;

      dropdownMenu.appendChild(buttonChild);
    });

    buttonParent.appendChild(dropdownMenu);
    dropdownButtonContainer.appendChild(buttonParent);

    emptyDiv.push(card);
  });

  loadingCard.classList.add("hidden");

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

function fetchMyApplication() {
  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/application`,
    "GET",
    token
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
      } else {
        if (data.application_list && data.application_status_list) {
          populateJobSeekerApplication(
            data.application_list,
            data.application_status_list
          );
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function firstCall() {
  if (myData.userData.role_id === 3) {
    fetchMyApplication();
  } else {
    fetchMyJobs();
    fetchAdminMaster();
  }
}

firstCall();
