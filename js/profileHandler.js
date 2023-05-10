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

let userMenu = [];

userMenu.push(
  {
    href: "home",
    iconSideBar: "fas fa-fw fa-home",
    iconTopBar: "fas fa-home fa-sm fa-fw mr-2 text-gray-400",
    title: "Home",
  },
  {
    isActive: true,
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
  var defaultActiveTab = document.getElementById("account");
  defaultActiveTab.classList.add("show", "active");

  tabs.push(
    {
      id: "account-tab",
      title: "Account",
      content: "account",
    },
    {
      id: "my-resume-tab",
      title: "My Resume",
      content: "my-resume",
    }
  );
} else {
  var defaultActiveTab = document.getElementById("account");
  defaultActiveTab.classList.add("show", "active");

  tabs.push(
    {
      id: "account-tab",
      title: "Account",
      content: "account",
    },
    {
      id: "company-profile-tab",
      title: "Company Profile",
      content: "company-profile",
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

document.getElementById("myTab").innerHTML = tabHTML;

// -- account section

const accoutUsernameForm = document.getElementById("input-username");
const accountEmailForm = document.getElementById("input-email");

accountForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let submitAccountBtn = document.getElementById("submit-account-btn");
  submitAccountBtn.disabled = true;
  submitAccountBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  const options = {
    body: JSON.stringify({
      username: accoutUsernameForm.value,
      account_type: myData.userData.role_id,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/user/edit_user`,
    "PUT",
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
      } else {
        showAlert(
          "alert-profile-container",
          "Success!",
          "Account has been successfully updated!",
          "success",
          "my-profile-alert",
          15000
        );

        saveData("masterData", {
          userData: {
            ...myData.userData,
            username: data.username,
            email: data.email,
            role_id: data.role_id,
          },
          authToken: myData.authToken,
        });
      }
      submitAccountBtn.disabled = false;
      submitAccountBtn.innerHTML = "Update";
    })
    .catch((error) => {
      submitAccountBtn.disabled = false;
      submitAccountBtn.innerHTML = "Update";
    });
});

// -- end of account section
// -- company profile section

const inputSelectProfileVisibility = document.getElementById(
  "input-select-profile-visibility"
);
const inputCompanyName = document.getElementById("input-company-name");
const inputSsmNumber = document.getElementById("input-ssm-number");
const inputAboutUs = document.getElementById("input-about-us");
const inputSelectIndustry = document.getElementById("input-select-industry");
const inputCompanySize = document.getElementById("input-company-size");
const inputCompanyWebsite = document.getElementById("input-company-website");
const inputBusinessAddress = document.getElementById("input-business-address");

function updateCompanyProfileViewButton(toggle, company_id) {
  const viewCompanyProfileButton = document.getElementById(
    "view-company-profile-btn"
  );

  if (toggle) {
    viewCompanyProfileButton.disabled = false;
    viewCompanyProfileButton.innerHTML = `<i class="fa fa-external-link-alt ml-1"></i> View Company Profile`;
    viewCompanyProfileButton.addEventListener("click", function (e) {
      window.open(`company-profile?company_id=${company_id}`);
    });
  } else {
    viewCompanyProfileButton.disabled = true;
    viewCompanyProfileButton.innerHTML = `<i class="fa fa-external-link-alt ml-1"></i> Update to view company profile`;
  }
}

function getCompanyProfileData() {
  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/profile/company`,
    "GET",
    token
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
      } else {
        [
          { name: "Public", value: 1 },
          { name: "Private", value: 2 },
        ].forEach((option) => {
          const optionElement = document.createElement("option");
          optionElement.value = option.value;
          optionElement.text = `${option.name}`;
          inputSelectProfileVisibility.appendChild(optionElement);
        });

        data.industry_list.forEach((item) => {
          const optionElement = document.createElement("option");
          optionElement.value = item.id;
          optionElement.text = item.name;
          inputSelectIndustry.appendChild(optionElement);
        });

        if (data.company_data !== null) {
          if (data.company_data.industry.length !== 0) {
            let newIndustry = [];
            data.company_data.industry.map((item) => {
              newIndustry.push(item.industry_id);
            });
            $("#input-select-industry").val(newIndustry);

            var selected = [];
            $("#input-select-industry :selected").each(function () {
              selected.push($(this).text());
            });
            $("#selected-industries").text(selected.join(", "));
          }

          inputSelectProfileVisibility.value =
            data.company_data.profile_visibility == true ? 1 : 2;
          inputCompanyName.value = data.company_data.name;
          inputSsmNumber.value = data.company_data.ssm_number;
          inputAboutUs.value = data.company_data.about_us;
          inputCompanySize.value = data.company_data.size;
          inputCompanyWebsite.value = data.company_data.website;
          inputBusinessAddress.value = data.company_data.business_address;
        }

        if (data.company_data !== null) {
          updateCompanyProfileViewButton(true, data.company_data.id);
        } else {
          updateCompanyProfileViewButton(false);
        }
      }
    })
    .catch((error) => {});
}

companyProfileForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let submitCompanyProfileBtn = document.getElementById(
    "submit-company-profile-btn"
  );
  submitCompanyProfileBtn.disabled = true;
  submitCompanyProfileBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  var selectedIndustry = [];
  $("#input-select-industry :selected").each(function () {
    selectedIndustry.push({ industry_id: $(this).val() });
  });

  const textElements = [
    inputSelectProfileVisibility,
    inputCompanyName,
    inputSsmNumber,
    inputAboutUs,
    selectedIndustry,
    inputCompanySize,
    inputCompanyWebsite,
    inputBusinessAddress,
  ];

  // start progress bar
  const POINTS_PER_FIELD = 10;
  let completedFields = 0;
  for (let i = 0; i < textElements.length; i++) {
    if (textElements[i]?.value) {
      completedFields++;
    } else {
      if (Array.isArray(textElements[i])) {
        if (textElements[i].length !== 0) {
          completedFields++;
        }
      }
    }
  }

  const totalPointsEarned = completedFields * POINTS_PER_FIELD;
  const totalPossiblePoints = textElements.length * POINTS_PER_FIELD;
  const progressPercentage =
    ((totalPointsEarned / totalPossiblePoints) * 100).toFixed(0) + "%";

  const options = {
    body: JSON.stringify({
      profile_visibility: textElements[0].value == 1 ? true : false,
      name: textElements[1].value,
      ssm_number: textElements[2].value,
      about_us: textElements[3].value,
      industry: textElements[4],
      size: textElements[5].value,
      website: textElements[6].value,
      business_address: textElements[7].value,
      progress_percentage: progressPercentage,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/profile/company`,
    "POST",
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
      } else {
        showAlert(
          "alert-profile-container",
          "Success!",
          "Company profile has been successfully updated!",
          "success",
          "my-profile-alert",
          15000
        );

        window.scrollTo({ top: 0, behavior: "smooth" });
        updateCompanyProfileViewButton(true, data.company_data.id);
      }

      submitCompanyProfileBtn.disabled = false;
      submitCompanyProfileBtn.innerHTML = "Update";
    })
    .catch((error) => {
      submitCompanyProfileBtn.disabled = false;
      submitCompanyProfileBtn.innerHTML = "Update";
      updateCompanyProfileViewButton(false);
    });
});

// -- end of company profile section
// -- resume section

const inputSelectContactInformationVisibility = document.getElementById(
  "input-select-contact-information-visibility"
);
const inputAboutMe = document.getElementById("input-about-me");
const inputResumeFullName = document.getElementById("input-resume-full-name");
const inputSelectResumeGender = document.getElementById(
  "input-select-resume-gender"
);
const inputResumeDateOfBirth = document.getElementById(
  "input-resume-date-of-birth"
);
const inputResumeEmail = document.getElementById("input-resume-email");
const inputResumePhoneNumber = document.getElementById(
  "input-resume-phone-number"
);
const inputSelectResumeLocation = document.getElementById(
  "input-select-resume-location"
);
const inputResumeAddress = document.getElementById("input-resume-address");
const inputSelectResumeCurrentJobStatus = document.getElementById(
  "input-select-resume-current-job-status"
);
const inputResumePreferredJob = document.getElementById(
  "input-resume-preferred-job"
);
const inputResumeExpectedMinSalary = document.getElementById(
  "input-resume-expected-min-salary"
);
const inputResumeExpectedMaxSalary = document.getElementById(
  "input-resume-expected-max-salary"
);
const inputResumeExpectedSalaryType = document.getElementById(
  "input-resume-expected-salary-type"
);
const inputResumeWorkExperience = document.getElementById(
  "input-resume-work-experience"
);
const inputResumeEducation = document.getElementById("input-resume-education");
const inputResumeSkills = document.getElementById("input-resume-skills");
const inputResumeLanguages = document.getElementById("input-resume-languages");
const inputResumeOtherInformation = document.getElementById(
  "input-resume-other-information"
);

function updateResumeViewButton(toggle, profile_id) {
  const viewResumeButton = document.getElementById("view-resume-btn");

  if (toggle) {
    viewResumeButton.disabled = false;
    viewResumeButton.innerHTML = `<i class="fa fa-external-link-alt ml-1"></i> View Resume`;
    viewResumeButton.addEventListener("click", function (e) {
      window.open(`user-profile?profile_id=${profile_id}`);
    });
  } else {
    viewResumeButton.disabled = true;
    viewResumeButton.innerHTML = `<i class="fa fa-external-link-alt ml-1"></i> Update to view resume`;
  }
}

resumeForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let submitResumeBtn = document.getElementById("submit-resume-btn");
  submitResumeBtn.disabled = true;
  submitResumeBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  if (inputResumeExpectedMinSalary.value) {
    if (
      inputResumeExpectedMinSalary.value <= inputResumeExpectedMaxSalary.value
    ) {
      // proceed
    } else {
      alert(
        "Expected maximum salary should be greater or equal to minimum salary"
      );
      submitResumeBtn.disabled = false;
      submitResumeBtn.innerHTML = "Update";
      return;
    }
  }

  const textElements = [
    inputSelectContactInformationVisibility,
    inputAboutMe,
    inputResumeFullName,
    inputSelectResumeGender,
    inputResumeDateOfBirth,
    inputResumeEmail,
    inputResumePhoneNumber,
    inputSelectResumeLocation,
    inputResumeAddress,
    inputResumePreferredJob,
    inputSelectResumeCurrentJobStatus,
    inputResumeExpectedMinSalary,
    inputResumeExpectedMaxSalary,
    inputResumeExpectedSalaryType,
    inputResumeWorkExperience,
    inputResumeEducation,
    inputResumeSkills,
    inputResumeLanguages,
    inputResumeOtherInformation,
  ];

  // start progress bar
  const POINTS_PER_FIELD = 10;
  let completedFields = 0;
  for (let i = 0; i < textElements.length; i++) {
    if (textElements[i].value !== "") {
      completedFields++;
    }
  }
  const totalPointsEarned = completedFields * POINTS_PER_FIELD;
  const totalPossiblePoints = textElements.length * POINTS_PER_FIELD;
  const progressPercentage =
    ((totalPointsEarned / totalPossiblePoints) * 100).toFixed(0) + "%";

  const options = {
    body: JSON.stringify({
      contact_visibility_id: textElements[0].value,
      about_me: textElements[1].value,
      full_name: textElements[2].value,
      gender: textElements[3].value,
      date_of_birth: textElements[4].value,
      email: textElements[5].value,
      phone_number: textElements[6].value,
      location_id: textElements[7].value,
      address: textElements[8].value,
      preferred_job: textElements[9].value,
      current_job_status: textElements[10].value,
      expected_min_salary: textElements[11].value,
      expected_max_salary: textElements[12].value,
      expected_salary_type: textElements[13].value,
      work_experience: textElements[14].value,
      education: textElements[15].value,
      skills: textElements[16].value,
      languages: textElements[17].value,
      other_information: textElements[18].value,
      progress_percentage: progressPercentage,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/profile/resume`,
    "POST",
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
      } else {
        showAlert(
          "alert-profile-container",
          "Success!",
          "Resume has been successfully updated!",
          "success",
          "my-profile-alert",
          15000
        );

        window.scrollTo({ top: 0, behavior: "smooth" });
        updateResumeViewButton(true, data.profile_data.id);
      }

      submitResumeBtn.disabled = false;
      submitResumeBtn.innerHTML = "Update";
    })
    .catch((error) => {
      submitResumeBtn.disabled = false;
      submitResumeBtn.innerHTML = "Update";
      updateResumeViewButton(false);
    });
});

function getResumeData() {
  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/profile/resume`,
    "GET",
    token
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
      } else {
        inputSelectContactInformationVisibility.innerHTML = "";
        data.contact_visibility_list.forEach((option) => {
          const optionElement = document.createElement("option");
          optionElement.value = option.id;
          optionElement.text = `${option.name} - ${option.description}`;
          inputSelectContactInformationVisibility.appendChild(optionElement);
        });

        inputSelectResumeLocation.innerHTML = "";
        data.location_list.forEach((option) => {
          const optionElement = document.createElement("option");
          optionElement.value = option.id;
          optionElement.textContent = option.name;
          inputSelectResumeLocation.appendChild(optionElement);
        });

        if (data.profile_data !== null) {
          inputSelectContactInformationVisibility.value =
            data.profile_data.contact_visibility_data.id;

          inputAboutMe.value = data.profile_data.about_me;

          inputResumeFullName.value = data.profile_data.full_name;
          inputSelectResumeGender.value = data.profile_data.gender;
          inputResumeDateOfBirth.value = data.profile_data.date_of_birth;
          inputResumeEmail.value = data.profile_data.email;
          inputResumePhoneNumber.value = data.profile_data.phone_number;
          inputResumeAddress.value = data.profile_data.address;
          inputSelectResumeCurrentJobStatus.value =
            data.profile_data.current_job_status;

          inputResumePreferredJob.value = data.profile_data.preferred_job;
          inputResumeExpectedMinSalary.value =
            data.profile_data.expected_min_salary;
          inputResumeExpectedMaxSalary.value =
            data.profile_data.expected_max_salary;
          inputResumeExpectedSalaryType.value =
            data.profile_data.expected_salary_type;
          inputResumeWorkExperience.value = data.profile_data.work_experience;
          inputResumeEducation.value = data.profile_data.education;
          inputResumeSkills.value = data.profile_data.skills;
          inputResumeLanguages.value = data.profile_data.languages;
          inputResumeOtherInformation.value =
            data.profile_data.other_information;

          inputSelectResumeLocation.value = data.profile_data.location_id;
        }

        if (data.profile_data !== null) {
          updateResumeViewButton(true, data.profile_data.id);
        } else {
          updateResumeViewButton(false);
        }
      }
    })
    .catch((error) => {
      updateResumeViewButton(false);
    });
}

// -- end of resume section

function firstFetch() {
  // first tab
  if (myData?.userData) {
    accoutUsernameForm.value = myData.userData.username;
    accountEmailForm.value = myData.userData.email;
  }

  if (myData.userData.role_id === 3) {
    getResumeData();
  } else {
    getCompanyProfileData();
  }

  $("#input-select-industry").change(function () {
    var selected = [];
    $("#input-select-industry :selected").each(function () {
      selected.push($(this).text());
    });
    $("#selected-industries").text(selected.join(", "));
  });
}

$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var code = urlParams.get("code");
  if (code === "company_profile") {
    document.querySelector("#company-profile-tab").click();
  }
  if (code === "resume") {
    document.querySelector("#my-resume-tab").click();
  }
  firstFetch();
});
