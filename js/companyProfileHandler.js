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

function populateCompany(data) {
  const listLoader = document.getElementById("company-list-loader");
  const listEmpty = document.getElementById("company-list-empty");
  const listContainer = document.getElementById("company-list-container");
  const listBody = document.getElementById("company-list-body");

  var totalRecord = [];

  data.forEach((item) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName("div");

    divs[0].addEventListener("click", function () {
      location.href = `company-profile.html?company_id=${item.id}`;
    });

    const title = divs[0].getElementsByTagName("h7");

    title[0].innerHTML = `<i class="fas fa-building"></i> ${item.company_name}`;

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

const buttonRetryPostList = document.getElementById("button-retry-post-list");
let canClickRetryButton = true;

buttonRetryPostList.addEventListener("click", function () {
  if (canClickRetryButton) {
    canClickRetryButton = false;
    fetchCompanyPostList();
    let countdown = 20;
    buttonRetryPostList.textContent = `Try again in ${countdown} seconds`;
    let countdownInterval = setInterval(function () {
      countdown--;
      if (countdown > 0) {
        buttonRetryPostList.textContent = `Try again in ${countdown} seconds`;
      } else {
        clearInterval(countdownInterval);
        canClickRetryButton = true;
        buttonRetryPostList.textContent = "Retry";
      }
    }, 1000);
  } else {
    buttonRetryPostList.textContent = "Please wait ...";
  }
});

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

var jobData = [];
var is_private = false;

function fetchCompanyPostList() {
  var urlParams = new URLSearchParams(window.location.search);
  var companyId = urlParams.get("company_id");

  if (companyId) {
    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/company/profile/list?company_id=${companyId}`,
      "GET"
    )
      .then((data) => {
        if (data?.message) {
          alert(data.message);
        } else {
          populateCompany(data.other_company_list);
          if (data.company_profile == null) {
            is_private = true;
            populateContent([]);
            const textCompanyName =
              document.getElementById("text-company-name");
            textCompanyName.innerHTML = `This profile is private  <i class="fas fa-lock"></i>`;
          } else {
            const textCompanyName =
              document.getElementById("text-company-name");
            const testSsmNumber = document.getElementById("text-ssm-number");
            const textCompanySize =
              document.getElementById("text-company-size");
            const textIndustry = document.getElementById("text-industry");
            const textCompanyWebsite = document.getElementById(
              "text-company-website"
            );
            const textBusinessAddress = document.getElementById(
              "text-business-address"
            );
            const textAboutUs = document.getElementById("text-about-us");

            if (data.company_profile?.company_name) {
              textCompanyName.innerHTML = `<i class="fas fa-building"></i> ${data.company_profile?.company_name}`;
            }
            if (data.company_profile?.ssm_number) {
              testSsmNumber.innerHTML = data.company_profile?.ssm_number;
            }
            if (data.company_profile?.company_size) {
              textCompanySize.innerHTML = data.company_profile?.company_size;
            }
            if (data.company_profile?.industry) {
              if (data.company_profile?.industry.length !== 0) {
                const industryNames = data.company_profile?.industry.map(
                  (industry) => industry.industry_data.name
                );
                const combinedNames = industryNames.join(", ");
                textIndustry.innerHTML = combinedNames;
              }
            }
            if (data.company_profile?.company_website) {
              textCompanyWebsite.innerHTML =
                data.company_profile?.company_website;
            }
            if (data.company_profile?.business_address) {
              textBusinessAddress.innerHTML =
                data.company_profile?.business_address;
            }
            if (data.company_profile?.about_us) {
              textAboutUs.innerHTML = data.company_profile?.about_us;
            }

            populateContent(data.post_list);
          }
        }
      })
      .catch((error) => {
        populateCompany([]);
        populateContent([]);
        console.error(error);
      });
  } else {
    alert("Company Id not found");
    populateCompany([]);
    populateContent([]);
  }
}

document
  .getElementById("refresh-company-list")
  .addEventListener("click", function () {
    fetchCompanyPostList();
  });

fetchCompanyPostList();
