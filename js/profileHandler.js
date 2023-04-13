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

// my profile
const profileUsernameForm = document.getElementById("input-username");
const profileEmailForm = document.getElementById("input-email");

// company profile
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
    profileUsernameForm.value = myData.userData.username;
    profileEmailForm.value = myData.userData.email;
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

// Add a submit event listener to the form
profileForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let submitProfileBtn = document.getElementById("submit-profile-btn");
  submitProfileBtn.disabled = true;
  submitProfileBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  const options = {
    body: JSON.stringify({
      username: profileUsernameForm.value,
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
          "your profile has been successfully updated!",
          "success",
          "my-profile-alert",
          15000
        );

        saveData("masterData", {
          userData: {
            ...myData.userData,
            username: data.username,
            email: data.email,
          },
          authToken: myData.authToken,
          industryData: myData.industryData,
        });
      }
      submitProfileBtn.disabled = false;
      submitProfileBtn.innerHTML = "Update";
    })
    .catch((error) => {
      submitProfileBtn.disabled = false;
      submitProfileBtn.innerHTML = "Update";
    });
});

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

// Add a submit event listener to the form
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
          "company profile has been successfully updated!",
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

$(document).ready(function () {
  $("#input-select-industry").change(function () {
    var selected = [];
    $("#input-select-industry :selected").each(function () {
      selected.push($(this).text());
    });
    $("#selected-industries").text(selected.join(", "));
  });
});

populateSaveData();
