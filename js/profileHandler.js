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
          industryData: myData.industryData,
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

function populateSaveData() {
  if (myData?.userData) {
    accoutUsernameForm.value = myData.userData.username;
    accountEmailForm.value = myData.userData.email;
  }

  if (myData?.industryData) {
    inputSelectProfileVisibility.value =
      myData.userData.profile_visibility == true ? 1 : 2;
    inputCompanyName.value = myData.userData.company_name;
    inputSsmNumber.value = myData.userData.ssm_number;
    inputAboutUs.value = myData.userData.about_us;

    if (myData?.industryData?.length !== 0) {
      myData.industryData.forEach((item) => {
        const optionElement = document.createElement("option");
        optionElement.value = item.id;
        optionElement.text = item.name;
        inputSelectIndustry.appendChild(optionElement);
      });

      if (myData?.userData?.industry.length !== 0) {
        let newIndustry = [];
        myData.userData.industry.map((item) => {
          newIndustry.push(item.industry_id);
        });
        $("#input-select-industry").val(newIndustry);

        var selected = [];
        $("#input-select-industry :selected").each(function () {
          selected.push($(this).text());
        });
        $("#selected-industries").text(selected.join(", "));
      }
    } else {
      alert("Something went wrong, please login again");
      clearSession();
    }

    inputCompanySize.value = myData.userData.company_size;
    inputCompanyWebsite.value = myData.userData.company_website;
    inputBusinessAddress.value = myData.userData.business_address;
  }
}

document
  .getElementById("view-company-profile-btn")
  .addEventListener("click", function (e) {
    if (myData?.userData.id) {
      window.open(`company-profile.html?company_id=${myData.userData.id}`);
    } else {
      alert("Something went wrong, please login again");
      clearSession();
    }
  });

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

  const options = {
    body: JSON.stringify({
      profile_visibility:
        inputSelectProfileVisibility.value == 1 ? true : false,
      company_name: inputCompanyName.value,
      ssm_number: inputSsmNumber.value,
      about_us: inputAboutUs.value,
      industry: selectedIndustry,
      company_size: inputCompanySize.value,
      company_website: inputCompanyWebsite.value,
      business_address: inputBusinessAddress.value,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/user/edit_company_profile`,
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
          "Company profile has been successfully updated!",
          "success",
          "my-profile-alert",
          15000
        );

        saveData("masterData", {
          userData: {
            ...myData.userData,
            profile_visibility: data.profile_visibility,
            company_name: data.company_name,
            ssm_number: data.ssm_number,
            about_us: data.about_us,
            industry: data.industry,
            company_size: data.company_size,
            company_website: data.company_website,
            business_address: data.business_address,
          },
          authToken: myData.authToken,
          industryData: myData.industryData,
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      submitCompanyProfileBtn.disabled = false;
      submitCompanyProfileBtn.innerHTML = "Update";
    })
    .catch((error) => {
      submitCompanyProfileBtn.disabled = false;
      submitCompanyProfileBtn.innerHTML = "Update";
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
        firstFetch();
        showAlert(
          "alert-profile-container",
          "Success!",
          "Resume has been successfully updated!",
          "success",
          "my-profile-alert",
          15000
        );

        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      submitResumeBtn.disabled = false;
      submitResumeBtn.innerHTML = "Update";
    })
    .catch((error) => {
      submitResumeBtn.disabled = false;
      submitResumeBtn.innerHTML = "Update";
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
        const viewResumeButton = document.getElementById("view-resume-btn");

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

        if (data.resume !== null) {
          inputSelectContactInformationVisibility.value =
            data.resume.contact_visibility_data.id;

          inputAboutMe.value = data.resume.about_me;

          inputResumeFullName.value = data.resume.full_name;
          inputSelectResumeGender.value = data.resume.gender;
          inputResumeDateOfBirth.value = data.resume.date_of_birth;
          inputResumeEmail.value = data.resume.email;
          inputResumePhoneNumber.value = data.resume.phone_number;
          inputResumeAddress.value = data.resume.address;
          inputSelectResumeCurrentJobStatus.value =
            data.resume.current_job_status;

          inputResumePreferredJob.value = data.resume.preferred_job;
          inputResumeExpectedMinSalary.value = data.resume.expected_min_salary;
          inputResumeExpectedMaxSalary.value = data.resume.expected_max_salary;
          inputResumeExpectedSalaryType.value =
            data.resume.expected_salary_type;
          inputResumeWorkExperience.value = data.resume.work_experience;
          inputResumeEducation.value = data.resume.education;
          inputResumeSkills.value = data.resume.skills;
          inputResumeLanguages.value = data.resume.languages;
          inputResumeOtherInformation.value = data.resume.other_information;

          inputSelectResumeLocation.value = data.resume.location_id;
        }

        if (data.resume !== null) {
          viewResumeButton.disabled = false;
          viewResumeButton.innerHTML = `<i class="fa fa-external-link-alt ml-1"></i> View Resume`;
          viewResumeButton.addEventListener("click", function (e) {
            window.open(`user-profile.html?profile_id=${data.resume.id}`);
          });
        } else {
          viewResumeButton.disabled = true;
          viewResumeButton.innerHTML = `<i class="fa fa-external-link-alt ml-1"></i> Update to view resume`;
        }
      }
    })
    .catch((error) => {});
}

// -- end of resume section

function firstFetch() {
  populateSaveData();
  getResumeData();

  $("#input-select-industry").change(function () {
    var selected = [];
    $("#input-select-industry :selected").each(function () {
      selected.push($(this).text());
    });
    $("#selected-industries").text(selected.join(", "));
  });
}

$(document).ready(function () {
  firstFetch();
});
