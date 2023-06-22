const myData = getSavedData('masterData');
const token = myData?.authToken;

const topbarNotAuth = document.getElementById('topbar-not-auth');
const topbarWithAuth = document.getElementById('topbar-with-auth');
const topbarUsername = document.getElementById('topbar-username');
const topBarPostJobButton = document.getElementById('topbar-post-job-btn');
const logoutBtn = document.getElementById('button-logout-yes');
logoutBtn.addEventListener('click', clearSession);

if (token) {
  topbarWithAuth.removeAttribute('style');
  topbarNotAuth.setAttribute('style', 'display: none');
  topbarUsername.innerHTML = myData.userData.username;
} else {
  topbarNotAuth.removeAttribute('style');
  topbarWithAuth.setAttribute('style', 'display: none');
  topbarUsername.innerHTML = '...';
  topBarPostJobButton.addEventListener('click', function () {
    location.href = 'index?login=true';
  });
  location.href = 'index';
}

let userMenu = [];

userMenu.push(
  {
    href: 'home',
    iconSideBar: 'fas fa-fw fa-home',
    iconTopBar: 'fas fa-home fa-sm fa-fw mr-2 text-gray-400',
    title: 'Home',
  },
  {
    isActive: true,
    href: 'profile',
    iconSideBar: 'fas fa-fw fa-user',
    iconTopBar: 'fas fa-user fa-sm fa-fw mr-2 text-gray-400',
    title: 'Profile',
  },
  {
    href: 'job-list',
    iconSideBar: 'fas fa-fw fa-list',
    iconTopBar: 'fas fa-list fa-sm fa-fw mr-2 text-gray-400',
    title: 'Job List',
  },
  {
    href: 'settings',
    iconSideBar: 'fas fa-fw fa-cogs',
    iconTopBar: 'fas fa-cogs fa-sm fa-fw mr-2 text-gray-400',
    title: 'Settings',
  },
  {
    href: '#logoutModal',
    iconSideBar: 'fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400',
    iconTopBar: 'fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400',
    title: 'Logout',
    dataToggle: 'modal',
  }
);

let userMenuSideBarHTML = '';
let userMenuTopBarHTML = '';

for (let i = 0; i < userMenu.length; i++) {
  let dataToggle = userMenu[i].dataToggle
    ? `data-toggle="${userMenu[i].dataToggle}"`
    : '';
  userMenuSideBarHTML += `
  <li class="nav-item ${userMenu[i].isActive ? 'active' : ''}">
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

document.getElementById('top-bar-menu-list').innerHTML = userMenuTopBarHTML;
document.getElementById('sidebar-menu-list').innerHTML = userMenuSideBarHTML;

let tabs = [];

if (myData.userData.role_id === 3) {
  var defaultActiveTab = document.getElementById('account');
  defaultActiveTab.classList.add('show', 'active');

  tabs.push(
    {
      id: 'account-tab',
      title: 'Account',
      content: 'account',
    },
    {
      id: 'my-resume-tab',
      title: 'My Public Resume',
      content: 'my-resume',
    }
  );
} else {
  var defaultActiveTab = document.getElementById('account');
  defaultActiveTab.classList.add('show', 'active');

  tabs.push(
    {
      id: 'account-tab',
      title: 'Account',
      content: 'account',
    },
    {
      id: 'company-profile-tab',
      title: 'Company Profile',
      content: 'company-profile',
    }
  );
}

let tabHTML = '';

for (let i = 0; i < tabs.length; i++) {
  let isActive = i === 0 ? 'active' : '';
  let isShow = i === 0 ? 'show' : '';
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

document.getElementById('myTab').innerHTML = tabHTML;

// -- account section

const accoutUsernameForm = document.getElementById('input-username');
const accountEmailForm = document.getElementById('input-email');

accountForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let useBtn = document.getElementById('submit-account-btn');
  let defaultBtnText = useBtn.innerHTML;

  useBtn.disabled = true;
  useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

  const options = {
    body: JSON.stringify({
      username: accoutUsernameForm.value,
      account_type: myData.userData.role_id,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/user/edit_account`,
    'PUT',
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        showToast(
          'alert-toast-container',
          'Account has been successfully updated.',
          'success'
        );
        saveData('masterData', {
          userData: {
            ...myData.userData,
            username: data.username,
            email: data.email,
            role_id: data.role_id,
          },
          authToken: myData.authToken,
        });
      }
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    });
});

// -- end of account section
// -- company profile section

const inputSelectProfileVisibility = document.getElementById(
  'input-select-profile-visibility'
);
const inputCompanyName = document.getElementById('input-company-name');
const inputSsmNumber = document.getElementById('input-ssm-number');
const inputAboutUs = document.getElementById('input-about-us');
const inputSelectIndustry = document.getElementById('input-select-industry');
const inputSelectCompanySize = document.getElementById(
  'input-select-company-size'
);
const inputCompanyWebsite = document.getElementById('input-company-website');
const inputBusinessAddress = document.getElementById('input-business-address');

function updateCompanyProfileViewButton(toggle, custom_id) {
  const viewCompanyProfileButton = document.getElementById(
    'view-company-profile-btn'
  );

  if (toggle) {
    viewCompanyProfileButton.disabled = false;
    viewCompanyProfileButton.innerHTML = `<i class="fa fa-eye ml-1"></i> View Company Profile`;
    viewCompanyProfileButton.addEventListener('click', function (e) {
      window.open(`company-profile?custom_id=${custom_id}`, '_self');
    });
  } else {
    viewCompanyProfileButton.disabled = true;
    viewCompanyProfileButton.innerHTML = `<i class="fa fa-eye ml-1"></i> Update to view company profile`;
  }
}

function getCompanyProfileData() {
  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/profile/company`,
    'GET',
    token
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        [
          { name: 'Public', value: 1 },
          { name: 'Private', value: 2 },
        ].forEach((option) => {
          const optionElement = document.createElement('option');
          optionElement.value = option.value;
          optionElement.text = `${option.name}`;
          inputSelectProfileVisibility.appendChild(optionElement);
        });

        data.industry_list.forEach((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.id;
          optionElement.text = item.name;
          inputSelectIndustry.appendChild(optionElement);
        });

        [
          { name: '1-10 Employees', value: '1-10 Employees' },
          { name: '11-50 Employees', value: '11-50 Employees' },
          { name: '51-200 Employees', value: '51-200 Employees' },
          { name: '201-500 Employees', value: '201-500 Employees' },
          { name: '501-1000 Employees', value: '501-1000 Employees' },
          { name: '1001+ Employees', value: '1001+ Employees' },
        ].forEach((option) => {
          const optionElement = document.createElement('option');
          optionElement.value = option.value;
          optionElement.text = `${option.name}`;
          inputSelectCompanySize.appendChild(optionElement);
        });

        if (data.company_data !== null) {
          if (data.company_data.industry.length !== 0) {
            let newIndustry = [];
            data.company_data.industry.map((item) => {
              newIndustry.push(item.industry_id);
            });
            $('#input-select-industry').val(newIndustry);

            var selected = [];
            $('#input-select-industry :selected').each(function () {
              selected.push($(this).text());
            });
            $('#selected-industries').text(selected.join(', '));
          }

          inputSelectProfileVisibility.value =
            data.company_data.profile_visibility == true ? 1 : 2;
          inputCompanyName.value = data.company_data.name;
          inputSsmNumber.value = data.company_data.ssm_number;
          inputAboutUs.value = data.company_data.about_us;
          inputSelectCompanySize.value = data.company_data.size;
          inputCompanyWebsite.value = data.company_data.website;
          inputBusinessAddress.value = data.company_data.business_address;

          updateCompanyProfileViewButton(true, data.company_data.custom_id);
        } else {
          updateCompanyProfileViewButton(false);
        }
      }
    })
    .catch((error) => {});
}

companyProfileForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let submitCompanyProfileBtn = document.getElementById(
    'submit-company-profile-btn'
  );
  submitCompanyProfileBtn.disabled = true;
  submitCompanyProfileBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  var selectedIndustry = [];
  $('#input-select-industry :selected').each(function () {
    selectedIndustry.push({ industry_id: $(this).val() });
  });

  const textElements = [
    inputSelectProfileVisibility,
    inputCompanyName,
    inputSsmNumber,
    inputAboutUs,
    selectedIndustry,
    inputSelectCompanySize,
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
  const progressPercentage = (
    (totalPointsEarned / totalPossiblePoints) *
    100
  ).toFixed(0);

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
    'POST',
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        showToast(
          'alert-toast-container',
          'Company profile has been successfully updated.',
          'success'
        );
        updateCompanyProfileViewButton(true, data.company_data.custom_id);
      }

      submitCompanyProfileBtn.disabled = false;
      submitCompanyProfileBtn.innerHTML = 'Update';
    })
    .catch((error) => {
      submitCompanyProfileBtn.disabled = false;
      submitCompanyProfileBtn.innerHTML = 'Update';
      updateCompanyProfileViewButton(false);
    });
});

// -- end of company profile section
// -- resume section

// const inputSelectContactInformationVisibility = document.getElementById(
//   'input-select-contact-information-visibility'
// );
const inputSummary = document.getElementById('input-summary');
const inputResumeFullName = document.getElementById('input-resume-full-name');
const inputSelectResumeGender = document.getElementById(
  'input-select-resume-gender'
);
const inputResumeDateOfBirth = document.getElementById(
  'input-resume-date-of-birth'
);
const inputResumeEmail = document.getElementById('input-resume-email');
const inputResumePhoneNumber = document.getElementById(
  'input-resume-phone-number'
);
const inputSelectResumeLocation = document.getElementById(
  'input-select-resume-location'
);
const inputResumeAddress = document.getElementById('input-resume-address');
const inputSelectResumeCurrentJobStatus = document.getElementById(
  'input-select-resume-current-job-status'
);
const inputResumePreferredJob = document.getElementById(
  'input-resume-preferred-job'
);
const inputResumeExpectedMinSalary = document.getElementById(
  'input-resume-expected-min-salary'
);
const inputResumeExpectedMaxSalary = document.getElementById(
  'input-resume-expected-max-salary'
);
const inputResumeExpectedSalaryType = document.getElementById(
  'input-resume-expected-salary-type'
);

const inputResumeOtherInformation = document.getElementById(
  'input-resume-other-information'
);

var workExperienceContainer = document.getElementById(
  'container_work_experience'
);
var educationContainer = document.getElementById('container_education');
var skillsContainer = document.getElementById('container_skills');
var languagesContainer = document.getElementById('container_languages');

function updateResumeViewButton(toggle, custom_id) {
  const viewResumeButton = document.getElementById('view-resume-btn');

  if (toggle) {
    viewResumeButton.disabled = false;
    viewResumeButton.innerHTML = `<i class="fa fa-eye ml-1"></i> View Resume`;
    viewResumeButton.addEventListener('click', function (e) {
      window.open(`user-profile?custom_id=${custom_id}`, '_self');
    });
  } else {
    viewResumeButton.disabled = true;
    viewResumeButton.innerHTML = `<i class="fa fa-eye ml-1"></i> Update to view resume`;
  }
}

resumeForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let useBtn = document.getElementById('submit-resume-btn');
  let defaultBtnText = useBtn.innerHTML;

  useBtn.disabled = true;
  useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

  if (inputResumeExpectedMinSalary.value) {
    if (
      inputResumeExpectedMinSalary.value <= inputResumeExpectedMaxSalary.value
    ) {
      // proceed
    } else {
      showToast(
        'alert-toast-container',
        'Expected maximum salary should be greater or equal to minimum salary',
        'danger'
      );
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      return;
    }
  }

  var workExperienceInputs =
    workExperienceContainer.querySelectorAll('input, textarea');
  var workExperienceData = [];
  var currentExperience = {};

  for (var i = 0; i < workExperienceInputs.length; i++) {
    var input = workExperienceInputs[i];

    if (input.name.includes('job_title')) {
      currentExperience.job_title = input.value;
    } else if (input.name.includes('company_name')) {
      currentExperience.company_name = input.value;
      currentExperience.mask_company_name = maskText(input.value);
    } else if (input.name.includes('responsibility')) {
      currentExperience.responsibility = input.value;
      currentExperience.mask_responsibility = maskText(input.value);
    } else if (input.name.includes('start_date')) {
      currentExperience.start_date = input.value;
    } else if (input.name.includes('end_date')) {
      currentExperience.end_date = input.value;
      workExperienceData.push(currentExperience);
      currentExperience = {};
    }
  }

  var educationInputs = educationContainer.getElementsByTagName('input');
  let educationData = [];
  let currentEducation = {};

  for (var i = 0; i < educationInputs.length; i++) {
    if (educationInputs[i].name.includes('field_of_study')) {
      currentEducation.field_of_study = educationInputs[i].value;
    } else if (educationInputs[i].name.includes('institution_name')) {
      currentEducation.institution_name = educationInputs[i].value;
      currentEducation.mask_institution_name = maskText(
        educationInputs[i].value
      );
    } else if (educationInputs[i].name.includes('start_date')) {
      currentEducation.start_date = educationInputs[i].value;
    } else if (educationInputs[i].name.includes('end_date')) {
      currentEducation.end_date = educationInputs[i].value;
      educationData.push(currentEducation);
      currentEducation = {};
    }
  }

  var skillElements = skillsContainer.getElementsByClassName('form-group');
  var skillsData = [];

  for (var i = 0; i < skillElements.length; i++) {
    var skillElement = skillElements[i];
    var titleInput = skillElement.querySelector("input[name^='skills']");
    var levelSelect = skillElement.querySelector("select[name^='skills']");
    // filter to exclude add button
    if (titleInput?.value && levelSelect?.value) {
      var skill = { title: titleInput.value, level: levelSelect.value };
      skillsData.push(skill);
    }
  }

  var langguageElements =
    languagesContainer.getElementsByClassName('form-group');
  var languagesData = [];

  for (var i = 0; i < langguageElements.length; i++) {
    var langguageElement = langguageElements[i];
    var titleInput = langguageElement.querySelector("input[name^='languages']");
    var levelSelect = langguageElement.querySelector(
      "select[name^='languages']"
    );
    // filter to exclude add button
    if (titleInput?.value && levelSelect?.value) {
      var skill = { title: titleInput.value, level: levelSelect.value };
      languagesData.push(skill);
    }
  }

  const textElements = [
    inputSummary,
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
    workExperienceData,
    educationData,
    skillsData,
    languagesData,
    inputResumeOtherInformation,
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
  const progressPercentage = (
    (totalPointsEarned / totalPossiblePoints) *
    100
  ).toFixed(0);

  const options = {
    body: JSON.stringify({
      summary: textElements[0].value,
      mask_summary: maskText(textElements[0].value),
      full_name: textElements[1].value,
      mask_full_name: maskText(textElements[1].value),
      gender: textElements[2].value,
      date_of_birth: textElements[3].value,
      email: textElements[4].value,
      mask_email: maskText(textElements[4].value),
      phone_number: textElements[5].value,
      mask_phone_number: maskText(textElements[5].value),
      location_id: textElements[6].value,
      address: textElements[7].value,
      mask_address: maskText(textElements[7].value),
      preferred_job: textElements[8].value,
      current_job_status: textElements[9].value,
      expected_min_salary: textElements[10].value,
      expected_max_salary: textElements[11].value,
      expected_salary_type: textElements[12].value,
      work_experience: textElements[13],
      education: textElements[14],
      skills: textElements[15],
      languages: textElements[16],
      other_information: textElements[17].value,
      mask_other_information: maskText(textElements[17].value),
      progress_percentage: progressPercentage,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/profile/resume`,
    'POST',
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        showToast(
          'alert-toast-container',
          'Resume has been successfully updated.',
          'success'
        );
        updateResumeViewButton(true, data.profile_data.custom_id);
      }

      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      updateResumeViewButton(false);
    });
});

function getResumeData() {
  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/profile/resume`,
    'GET',
    token
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        // inputSelectContactInformationVisibility.innerHTML = '';
        // data.contact_visibility_list.forEach((option) => {
        //   const optionElement = document.createElement('option');
        //   optionElement.value = option.id;
        //   optionElement.text = `${option.name} - ${option.description}`;
        //   inputSelectContactInformationVisibility.appendChild(optionElement);
        // });

        inputSelectResumeLocation.innerHTML = '';
        data.location_list.forEach((option) => {
          const optionElement = document.createElement('option');
          optionElement.value = option.id;
          optionElement.textContent = option.name;
          inputSelectResumeLocation.appendChild(optionElement);
        });

        if (data.profile_data !== null) {
          // inputSelectContactInformationVisibility.value =
          //   data.profile_data.contact_visibility_data.id;

          inputSummary.value = data.profile_data.summary;

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

          generateDynamicForms(
            'WORK_EXPERIENCE',
            data.profile_data.work_experience,
            workExperienceContainer,
            'add_work_experience_field_button',
            10
          );

          generateDynamicForms(
            'EDUCATION',
            data.profile_data.education,
            educationContainer,
            'add_education_field_button',
            10
          );

          generateDynamicForms(
            'SKILLS',
            data.profile_data.skills,
            skillsContainer,
            'add_skills_field_button',
            10
          );

          generateDynamicForms(
            'LANGUAGES',
            data.profile_data.languages,
            languagesContainer,
            'add_languages_field_button',
            10
          );

          inputResumeOtherInformation.value =
            data.profile_data.other_information;

          inputSelectResumeLocation.value = data.profile_data.location_id;

          updateResumeViewButton(true, data.profile_data.custom_id);
        } else {
          inputResumeEmail.value = myData.userData.email;

          generateDynamicForms(
            'WORK_EXPERIENCE',
            [],
            workExperienceContainer,
            'add_work_experience_field_button',
            10
          );

          generateDynamicForms(
            'EDUCATION',
            [],
            educationContainer,
            'add_education_field_button',
            10
          );

          generateDynamicForms(
            'SKILLS',
            [],
            skillsContainer,
            'add_skills_field_button',
            10
          );

          generateDynamicForms(
            'LANGUAGES',
            [],
            languagesContainer,
            'add_languages_field_button',
            10
          );

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

  $('#input-select-industry').change(function () {
    var selected = [];
    $('#input-select-industry :selected').each(function () {
      selected.push($(this).text());
    });
    $('#selected-industries').text(selected.join(', '));
  });
}

function dynamicFormUI(value, index, type) {
  if (type == 'WORK_EXPERIENCE') {
    const fieldLabels = 'Work Experience';
    const fieldIdName = 'work_experience';

    const newInput = document.createElement('div');
    newInput.classList.add('form-group');
    newInput.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <label>${fieldLabels}</label>
        <a href="#" class="remove_field">Remove</a>
      </div>
      <input type="text" name="${fieldIdName}[${index}][job_title]" class="form-control" placeholder="Job Title" required value="${
      value == null ? '' : value.job_title
    }">
      <input type="text" name="${fieldIdName}[${index}][company_name]" class="form-control mt-1" placeholder="Company Name" required value="${
      value == null ? '' : value.company_name
    }">
    <textarea  maxlength="500" rows="3" name="${fieldIdName}[${index}][responsibility]" class="form-control mt-1" placeholder="Responsibility" required>${
      value == null ? '' : value.responsibility
    }</textarea>
      <div class="form-row mt-1">
        <div class="col">
          <div class="input-group">
            <input type="date" name="${fieldIdName}[${index}][start_date]" class="form-control" placeholder="Start Date" required value="${
      value == null ? '' : value.start_date
    }">
          </div>
        </div>
        <div class="d-flex align-items-center">-</div>
        <div class="col">
          <div class="input-group">
            <input type="date" name="${fieldIdName}[${index}][end_date]" class="form-control" placeholder="End Date" required value="${
      value == null ? '' : value.end_date
    }">
          </div>
        </div>
      </div>`;

    return newInput;
  }

  if (type == 'EDUCATION') {
    const fieldLabels = 'Education';
    const fieldIdName = 'education';

    const newInput = document.createElement('div');
    newInput.classList.add('form-group');
    newInput.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <label>${fieldLabels}</label>
        <a href="#" class="remove_field">Remove</a>
      </div>
      <input type="text" name="${fieldIdName}[${index}][field_of_study]" class="form-control" placeholder="Field of Study" required value="${
      value == null ? '' : value.field_of_study
    }">
      <input type="text" name="${fieldIdName}[${index}][institution_name]" class="form-control mt-1" placeholder="Institution Name" required value="${
      value == null ? '' : value.institution_name
    }">
      <div class="form-row mt-1">
        <div class="col">
          <div class="input-group">
            <input type="date" name="${fieldIdName}[${index}][start_date]" class="form-control" placeholder="Start Date" required value="${
      value == null ? '' : value.start_date
    }">
          </div>
        </div>
        <div class="d-flex align-items-center">-</div>
        <div class="col">
          <div class="input-group">
            <input type="date" name="${fieldIdName}[${index}][end_date]" class="form-control" placeholder="End Date" required value="${
      value == null ? '' : value.end_date
    }">
          </div>
        </div>
      </div>`;

    return newInput;
  }

  if (type == 'SKILLS') {
    const fieldLabels = 'Skill';
    const fieldIdName = 'skills';

    const newInput = document.createElement('div');
    newInput.classList.add('form-group');
    newInput.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <label>${fieldLabels}</label>
        <a href="#" class="remove_field">Remove</a>
      </div>
      <input type="text" name="${fieldIdName}[${index}][title]" class="form-control" placeholder="Title" required value="${
      value == null ? '' : value.title
    }">
    <select name="${fieldIdName}[${index}][level]" class="form-control mt-1" required> 
      <option value="">Select Level</option>
      <option value="beginner" ${
        value && value.level === 'beginner' ? 'selected' : ''
      }>Beginner</option>
      <option value="intermediate" ${
        value && value.level === 'intermediate' ? 'selected' : ''
      }>Intermediate</option>
      <option value="advanced" ${
        value && value.level === 'advanced' ? 'selected' : ''
      }>Advanced</option>
    </select>  
      </div>`;

    return newInput;
  }

  if (type == 'LANGUAGES') {
    const fieldLabels = 'Language';
    const fieldIdName = 'languages';

    const newInput = document.createElement('div');
    newInput.classList.add('form-group');
    newInput.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <label>${fieldLabels}</label>
        <a href="#" class="remove_field">Remove</a>
      </div>
      <input type="text" name="${fieldIdName}[${index}][title]" class="form-control" placeholder="Langguage Name" required value="${
      value == null ? '' : value.title
    }">
    <select name="${fieldIdName}[${index}][level]" class="form-control mt-1" required> 
      <option value="">Select Proficiency Level</option>
      <option value="beginner" ${
        value && value.level === 'beginner' ? 'selected' : ''
      }>Beginner</option>
      <option value="intermediate" ${
        value && value.level === 'intermediate' ? 'selected' : ''
      }>Intermediate</option>
      <option value="advanced" ${
        value && value.level === 'advanced' ? 'selected' : ''
      }>Advanced</option>
    </select>  
      </div>`;

    return newInput;
  }
}

function generateDynamicForms(
  type,
  currentData,
  containerElement,
  add_field_btn_id,
  maxFields = 10
) {
  const MAX_FIELDS = maxFields;
  const addButton = document.querySelector(`#${add_field_btn_id}`);
  let x = 0;

  for (const data of currentData) {
    x++;
    const newInput = dynamicFormUI(data, x - 1, type);
    containerElement.appendChild(newInput);

    const removeButton = newInput.querySelector('.remove_field');
    removeButton.addEventListener('click', function (event) {
      event.preventDefault();
      newInput.remove();
      x--;
    });

    containerElement.insertBefore(newInput, addButton.parentNode);
  }

  addButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (x < MAX_FIELDS) {
      x++;

      const newInput = dynamicFormUI(null, x - 1, type);
      containerElement.insertBefore(newInput, addButton.parentNode);
    } else {
      showToast(
        'alert-toast-container',
        "You've reached the maximum number of forms allowed",
        'danger'
      );
    }

    containerElement.addEventListener('click', function (event) {
      if (event.target.classList.contains('remove_field')) {
        event.preventDefault();
        event.target.parentNode.parentNode.remove();
        x--;
      }
    });
  });
}

$(document).ready(function () {
  if (myData.userData.role_id) {
    var urlParams = new URLSearchParams(window.location.search);
    var code = urlParams.get('code');
    if (code === 'company_profile') {
      document.querySelector('#company-profile-tab').click();
    }
    if (code === 'resume') {
      document.querySelector('#my-resume-tab').click();
    }
    firstFetch();
  } else {
    location.href = 'account-type';
  }
});
