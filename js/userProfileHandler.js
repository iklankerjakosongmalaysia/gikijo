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
}

document
  .getElementById('topbar-job-list-btn-not-auth')
  .addEventListener('click', function () {
    location.href = 'job-list';
  });

document
  .getElementById('topbar-job-list-btn-with-auth')
  .addEventListener('click', function () {
    location.href = 'job-list';
  });

const format = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

function populateMoreProfiles(data) {
  const listLoader = document.getElementById('profile-list-loader');
  const listEmpty = document.getElementById('profile-list-empty');
  const listContainer = document.getElementById('profile-list-container');
  const listBody = document.getElementById('profile-list-body');

  var totalRecord = [];

  data.forEach((item) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName('div');

    divs[0].addEventListener('click', function () {
      location.href = `user-profile.html?custom_id=${item.custom_id}`;
    });

    const title = divs[0].getElementsByTagName('h7');

    title[0].innerHTML = `<i class="fas fa-user"></i> ${item.full_name}`;

    totalRecord.push(card);
  });

  listLoader.classList.add('hidden');

  if (totalRecord.length === 0) {
    listEmpty.classList.remove('hidden');
    listContainer.classList.add('hidden');
  } else {
    listEmpty.classList.add('hidden');
    listContainer.classList.remove('hidden');

    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
    totalRecord.forEach((item) => {
      listContainer.appendChild(item);
    });
  }
}

let loading = false;

function cancelInvite(invite_id, inviteBtn) {
  if (loading) {
    showToast(
      'alert-toast-container',
      'Another task is currently in progress. Please wait for it to complete...',
      'danger'
    );

    return;
  }

  var confirmDelete = confirm(
    `Are you sure you want to cancel this invitation? This action cannot be undone.`
  );

  if (confirmDelete) {
    let useBtn = inviteBtn;
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);
    loading = true;

    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/invitation/${invite_id}`,
      'DELETE',
      token
    )
      .then((data) => {
        if (data?.message) {
          showToast('alert-toast-container', data.message, 'danger');
          useBtn.disabled = false;
          useBtn.innerHTML = defaultBtnText;
          loading = false;
          $('#inviteModal').modal('hide');
        } else {
          setTimeout(() => {
            fetchUserProfile();
            showToast(
              'alert-toast-container',
              `The invitation has been successfully canceled.`,
              'success'
            );
            useBtn.disabled = false;
            useBtn.innerHTML = defaultBtnText;
            loading = false;
            $('#inviteModal').modal('hide');
          }, 2000);
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        loading = false;
        $('#inviteModal').modal('hide');
      });
  }
}

function sendInvite(postId, inviteBtn, profileId) {
  if (loading) {
    showToast(
      'alert-toast-container',
      'Another task is currently in progress. Please wait for it to complete...',
      'danger'
    );

    return;
  }

  const options = {
    body: JSON.stringify({
      post_id: postId,
      profile_id: profileId,
    }),
  };

  let useBtn = inviteBtn;
  let defaultBtnText = useBtn.innerHTML;

  useBtn.disabled = true;
  useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);
  loading = true;

  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/invitation',
    'POST',
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        loading = false;
        $('#inviteModal').modal('hide');
      } else {
        setTimeout(() => {
          fetchUserProfile();
          showToast(
            'alert-toast-container',
            'The invitation has been sent successfully.',
            'success'
          );
          useBtn.disabled = false;
          useBtn.innerHTML = defaultBtnText;
          loading = false;
          $('#inviteModal').modal('hide');
        }, 2000);
      }
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      loading = false;
      $('#inviteModal').modal('hide');
    });
}

function listInvitation(passData, profileId, applicationList) {
  const emptyCard = document.getElementById('posted-job-card-empty');

  const parentTable = document.getElementById('posted-job-card-list-parent');
  const style = document.getElementById('posted-job-card-list-child');

  const emptyDiv = [];

  if (passData.length !== 0) {
    passData.map((item) => {
      const card = style.cloneNode(true);
      const divs = card.getElementsByTagName('div');
      const titleContainer = divs[0].getElementsByTagName('h6');
      const activeAtContainer = divs[0].getElementsByTagName('h7');

      let invited = false;
      let invite_id = null;

      applicationList.map((item2) => {
        if (item.id == item2.post_id && profileId == item2.profile_id) {
          invited = true;
          invite_id = item2.id;
        }
      });

      const inviteBtn = divs[0].getElementsByTagName('button')[0];

      let badgeText = '';
      let buttonText = '';

      if (invited === true) {
        badgeText = `<span class="badge badge-pill badge-success">Invited</span>`;
        buttonText = 'Cancel Invite';
      } else {
        badgeText = '';
        buttonText = 'Invite to Apply';
      }

      inviteBtn.innerHTML = buttonText;
      titleContainer[0].innerHTML = `${item.title} ${badgeText}`;

      if (invited === true) {
        inviteBtn.classList.remove('btn-primary');
        inviteBtn.classList.add('btn-secondary');
        inviteBtn.addEventListener('click', function () {
          cancelInvite(invite_id, this);
        });
      } else {
        inviteBtn.disabled = false;
        inviteBtn.classList.remove('btn-secondary');
        inviteBtn.classList.add('btn-primary');
        inviteBtn.addEventListener('click', function () {
          sendInvite(item.id, this, profileId);
        });
      }

      titleContainer[0].addEventListener('click', function () {
        window.open(item.internal_apply_link);
      });

      var created_at = new Date(item.created_at);
      var timeAgo = moment(created_at).fromNow(true);

      activeAtContainer[0].innerHTML = `Posted ${timeAgo} ago`;

      emptyDiv.push(card);
    });
  }

  if (emptyDiv.length === 0) {
    emptyCard.classList.remove('hidden');
    parentTable.classList.add('hidden');
  } else {
    emptyCard.classList.add('hidden');
    parentTable.classList.remove('hidden');
    while (parentTable.firstChild) {
      parentTable.removeChild(parentTable.firstChild);
    }
    emptyDiv.forEach((item) => {
      parentTable.appendChild(item);
    });
  }
}

var selectedProfileId = null;

unlockProfileForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let useBtn = document.getElementById('unlock-now');
  let defaultBtnText = useBtn.innerHTML;

  useBtn.disabled = true;
  useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

  if (!selectedProfileId) {
    showToast('alert-toast-container', 'Profile Id not found.', 'danger');
    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
    return;
  }

  const options = {
    body: JSON.stringify({
      profile_id: selectedProfileId,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/user/unlock/profile`,
    'POST',
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        $('#coinBalanceModal').modal('hide');
      } else {
        setTimeout(() => {
          fetchUserProfile();
          useBtn.disabled = false;
          useBtn.innerHTML = defaultBtnText;
          $('#coinBalanceModal').modal('hide');
        }, 2000);
      }
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    });
});

const unlockNowButton = document.getElementById('unlock-now');
const textCoinAmountToUnlockProfile = document.getElementById(
  'text-coin-amount-to-unlock-profile'
);
const textCurrentBalance = document.getElementById('text-current-balance');

function fetchUserProfile() {
  var urlParams = new URLSearchParams(window.location.search);
  var customId = urlParams.get('custom_id');

  if (customId) {
    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/profile/resume/list?custom_id=${customId}`,
      'GET',
      token
    )
      .then((data) => {
        if (data?.message) {
          showToast('alert-toast-container', data.message, 'danger');
        } else {
          // populateMoreProfiles(data.other_profiles);

          if (data.profile_details !== null) {
            listInvitation(
              data.employer_posts,
              data.profile_details.id,
              data.employer_invitations
            );

            textCoinAmountToUnlockProfile.innerHTML = `Unlock this profile and view what's hidden behind the "****" symbol for just <b>${data.coin_amount_to_unlock_profile}</b> <i class="fas fa-coins mr-1"></i> token.`;
            textCurrentBalance.innerHTML = `Your Current Balance: <b>${data.employer_coin_balance}</b> <i class="fas fa-coins mr-1"></i> token`;

            const progressContainer =
              document.getElementById('profile-progress');
            progressContainer.style.width = `${data.profile_details.progress_percentage}%`;
            progressContainer.innerHTML = `${data.profile_details.progress_percentage}%`;

            const actionProfileBtnContainer = document.getElementById(
              'action-profile-button-container'
            );

            const textElements = [
              document.getElementById('text-full-name'),
              document.getElementById('text-gender'),
              document.getElementById('text-email'),
              document.getElementById('text-phone-number'),
              document.getElementById('text-date-of-birth'),
              document.getElementById('text-current-job-status'),
              document.getElementById('text-preferred-job'),
              document.getElementById('text-expected-salary'),
              document.getElementById('text-location'),
              document.getElementById('text-address'),
              document.getElementById('text-summary'),
              document.getElementById('work-experience-container'),
              document.getElementById('education-container'),
              document.getElementById('skills-container'),
              document.getElementById('languages-container'),
              document.getElementById('text-other-information'),
              document.getElementById('text-last-updated'),
              // document.getElementById('text-resume-visibility'),
            ];

            var my_full_name = '-';
            var my_gender = '-';
            var my_current_job_status = '-';
            var my_preferred_job = '-';
            var my_expected_salary = '-';
            var my_email = '-';
            var my_phone_number = '-';
            var my_date_of_birth = '-';
            var my_location = '-';
            var my_address = '-';
            var my_summary = '-';
            var my_other_information = '-';
            var my_work_experience = [];
            var my_education = [];
            var my_skills = [];
            var my_languages = [];
            var my_last_updated = '';
            // var my_resume_visibility = '';

            my_full_name = data.profile_unlocked
              ? data.profile_details.full_name
              : data.profile_details.mask_full_name;

            document.getElementById(
              'invite-subtitle'
            ).innerHTML = `Send an invitation to ${my_full_name} to apply for your job posting.`;

            if (data.profile_details?.gender == 'male') {
              my_gender = 'Male';
            } else if (data.profile_details?.gender == 'female') {
              my_gender = 'Female';
            } else {
              my_gender = '';
            }

            my_email = data.profile_unlocked
              ? data.profile_details.email
              : data.profile_details.mask_email;

            my_phone_number = data.profile_unlocked
              ? data.profile_details.phone_number
              : data.profile_details.mask_phone_number;

            my_date_of_birth = data.profile_details?.date_of_birth;
            my_current_job_status = data.profile_details?.current_job_status;
            my_preferred_job = data.profile_details?.preferred_job;

            let minSalary = data.profile_details?.expected_min_salary;
            let maxSalary = data.profile_details?.expected_max_salary;
            let salaryType = data.profile_details?.expected_salary_type;
            if (minSalary && maxSalary && salaryType) {
              my_expected_salary = `${minSalary} - ${maxSalary} ${salaryType}`;
            }

            my_location = data.profile_details?.location_data?.name;

            my_address = data.profile_unlocked
              ? data.profile_details.address
              : data.profile_details.mask_address;
            my_summary = data.profile_unlocked
              ? structureText(data.profile_details.summary)
              : structureText(data.profile_details.mask_summary);

            textElements[0].innerHTML = `<i class="fas fa-user"></i> ${my_full_name}`;
            textElements[1].innerHTML = my_gender;
            textElements[2].innerHTML = my_email;
            textElements[3].innerHTML = my_phone_number;
            textElements[4].innerHTML = my_date_of_birth;
            textElements[5].innerHTML = my_current_job_status;
            textElements[6].innerHTML = my_preferred_job;
            textElements[7].innerHTML = my_expected_salary;
            textElements[8].innerHTML = my_location;
            textElements[9].innerHTML = my_address;
            textElements[10].innerHTML = my_summary;

            if (data.profile_details?.work_experience) {
              // Clear existing content
              while (textElements[11].firstChild) {
                textElements[11].removeChild(textElements[11].firstChild);
              }

              my_work_experience = data.profile_details.work_experience;
              my_work_experience.forEach((item) => {
                const div = document.createElement('div');
                div.innerHTML = `
                      <h7 class="font-weight-bold mb-0">${item.job_title}</h7>
                      <h6 class="text-muted mb-0">${
                        data.profile_unlocked
                          ? item.company_name
                          : item.mask_company_name
                      } ◦ ${item.start_date} - ${item.end_date}</h6>
                      <h6>${
                        data.profile_unlocked
                          ? structureText(item.responsibility)
                          : structureText(item.mask_responsibility)
                      }</h6>
              `;

                textElements[11].appendChild(div);
              });
            }

            if (data.profile_details?.education) {
              // Clear existing content
              while (textElements[12].firstChild) {
                textElements[12].removeChild(textElements[12].firstChild);
              }

              my_education = data.profile_details.education;
              my_education.forEach((item) => {
                const div = document.createElement('div');
                div.innerHTML = `
                      <h7 class="font-weight-bold mb-0">${
                        item.field_of_study
                      }</h7>
                      <h6 class="text-muted">${
                        data.profile_unlocked
                          ? item.institution_name
                          : item.mask_institution_name
                      } ◦ ${item.start_date} - ${item.end_date}</h6>
              `;

                textElements[12].appendChild(div);
              });
            }

            const levelTitle = {
              beginner: 'Beginner',
              intermediate: 'Intermediate',
              advanced: 'Advanced',
            };

            if (data.profile_details?.skills) {
              // Clear existing content
              while (textElements[13].firstChild) {
                textElements[13].removeChild(textElements[13].firstChild);
              }

              my_skills = data.profile_details.skills;
              my_skills.forEach((item) => {
                const div = document.createElement('div');
                div.innerHTML = `
                      <h7 class="font-weight-bold mb-0">${item.title}</h7>
                      <h6 class="text-muted">${levelTitle[item.level]}</h6>
              `;

                textElements[13].appendChild(div);
              });
            }

            if (data.profile_details?.languages) {
              // Clear existing content
              while (textElements[14].firstChild) {
                textElements[14].removeChild(textElements[14].firstChild);
              }

              my_languages = data.profile_details.languages;
              my_languages.forEach((item) => {
                const div = document.createElement('div');
                div.innerHTML = `
                      <h7 class="font-weight-bold mb-0">${item.title}</h7>
                      <h6 class="text-muted">${levelTitle[item.level]}</h6>
              `;

                textElements[14].appendChild(div);
              });
            }

            my_other_information = data.profile_unlocked
              ? structureText(data.profile_details.other_information)
              : structureText(data.profile_details.mask_other_information);

            textElements[15].innerHTML = my_other_information;

            var last_update_at = new Date(data.profile_details.last_updated);
            var last_update_timeAgo = moment(last_update_at).fromNow(true);

            my_last_updated = `${last_update_timeAgo} ago`;

            textElements[16].innerHTML = my_last_updated;

            // my_resume_visibility =
            //   data.profile_details.resume_visibility_data.name;

            // textElements[17].innerHTML = my_resume_visibility;

            for (let i = 0; i < textElements.length; i++) {
              if (
                textElements[i].innerText == '' ||
                textElements[i].innerText == 'undefined' ||
                textElements[i].innerText == '-'
              ) {
                textElements[i].innerHTML = '-';
              }
            }

            // remove existing dropdown button (if any)
            while (actionProfileBtnContainer.firstChild) {
              actionProfileBtnContainer.removeChild(
                actionProfileBtnContainer.firstChild
              );
            }

            if (myData.userData.role_id == 1 || myData.userData.role_id == 2) {
              const buttonDownload = document.createElement('button');
              buttonDownload.setAttribute('type', 'button');
              buttonDownload.setAttribute(
                'class',
                'btn btn-outline-primary mr-1'
              );
              buttonDownload.setAttribute('id', 'button-download');
              buttonDownload.innerHTML = `<i class="fas fa-download mr-1"></i>Download`;
              buttonDownload.addEventListener('click', () => {
                if (data.profile_unlocked == true) {
                  var profileResumeData = {
                    full_name: {
                      title: 'Full Name',
                      type: 'string',
                      value: my_full_name,
                    },
                    gender: {
                      title: 'Gender',
                      type: 'string',
                      value: my_gender,
                    },
                    current_job_status: {
                      title: 'Current Job Status',
                      type: 'string',
                      value: my_current_job_status,
                    },
                    date_of_birth: {
                      title: 'Date of Birth',
                      type: 'string',
                      value: my_date_of_birth,
                    },
                    email: { title: 'Email', type: 'string', value: my_email },
                    phone: {
                      title: 'Phone Number',
                      type: 'string',
                      value: my_phone_number,
                    },
                    location: {
                      title: 'My Location',
                      type: 'string',
                      value: my_location,
                    },
                    address: {
                      title: 'Address',
                      type: 'string',
                      value: my_address,
                    },
                    preferred_job: {
                      title: 'Preferred Job',
                      type: 'string',
                      value: my_preferred_job,
                    },
                    expected_salary: {
                      title: 'Expected Salary',
                      type: 'string',
                      value: my_expected_salary,
                    },
                    summary: {
                      title: 'Summary',
                      type: 'string',
                      value: my_summary,
                    },
                    experience: {
                      title: 'Work Experience',
                      type: 'array',
                      value: my_work_experience,
                    },
                    education: {
                      title: 'Education',
                      type: 'array',
                      value: my_education,
                    },
                    skills: {
                      title: 'Skills',
                      type: 'array',
                      value: my_skills,
                    },
                    languages: {
                      title: 'Languages',
                      type: 'array',
                      value: my_languages,
                    },
                    other_information: {
                      title: 'Other Information',
                      type: 'string',
                      value: my_other_information,
                    },
                  };

                  // Create a new jsPDF instance
                  var doc = new jsPDF();

                  // Generate the HTML content
                  var htmlContent = '<div style="font-size: 13px;">';

                  htmlContent += '<h2>User Profile</h2>';

                  Object.keys(profileResumeData).forEach(function (key) {
                    var data = profileResumeData[key];
                    htmlContent += '<div>';
                    htmlContent +=
                      '<span style="font-weight: bold;">' +
                      data.title +
                      ': </span>';

                    if (data.type === 'string') {
                      htmlContent += '<span>' + (data.value || '-') + '</span>';
                    } else if (data.type === 'array') {
                      if (Array.isArray(data.value) && data.value.length > 0) {
                        htmlContent += '<ul>';
                        data.value.forEach(function (item) {
                          if (data.title == 'Work Experience') {
                            htmlContent += `<li>${item.job_title} at ${
                              item.company_name
                            } (${item.start_date} - ${
                              item.end_date
                            })</li><li>${structureText(
                              item.responsibility
                            )}</li>`;
                          } else if (data.title == 'Education') {
                            htmlContent += `<li>${item.field_of_study} at ${item.institution_name} (${item.start_date} - ${item.end_date})</li>`;
                          } else {
                            htmlContent +=
                              '<li>' +
                              `${item.title} - ${item.level}` +
                              '</li>';
                          }
                        });
                        htmlContent += '</ul>';
                      } else {
                        htmlContent +=
                          '<span>Not ' +
                          data.title.toLowerCase() +
                          ' available</span>';
                      }
                    }

                    htmlContent += '</div>';
                  });

                  htmlContent += '</div>';

                  // Generate the PDF from HTML content
                  doc.fromHTML(htmlContent, 15, 0, {
                    width: 170,
                  });

                  var fileName =
                    profileResumeData.full_name.value.replace(/\s+/g, '_') +
                    '_Profile.pdf';
                  doc.save(fileName);
                } else {
                  showToast(
                    'alert-toast-container',
                    'Profile is currently locked. Unlock it to enable the download feature.',
                    'danger'
                  );
                }
              });

              const buttonInvite = document.createElement('button');
              buttonInvite.setAttribute('type', 'button');
              buttonInvite.setAttribute(
                'class',
                'btn btn-outline-primary mr-1'
              );
              buttonInvite.setAttribute('data-toggle', 'modal');
              buttonInvite.setAttribute('data-target', '#inviteModal');
              buttonInvite.setAttribute('id', 'button-send-invite');
              buttonInvite.innerHTML = `<i class="fas fa-envelope mr-1"></i>Invite`;

              const buttonUnlock = document.createElement('button');
              buttonUnlock.setAttribute('type', 'button');
              buttonUnlock.setAttribute('id', 'unlock-button');

              if (data.profile_unlocked == true) {
                buttonUnlock.disabled = true;
                buttonUnlock.setAttribute('class', 'btn btn-secondary');
                buttonUnlock.innerHTML = `<i class="fas fa-lock-open mr-1"></i>Profile Unlocked`;
              } else {
                buttonUnlock.disabled = false;
                buttonUnlock.setAttribute('class', 'btn btn-primary');
                buttonUnlock.innerHTML = `<i class="fas fa-lock mr-1"></i>Unlock Profile`;
                buttonUnlock.setAttribute('data-toggle', 'modal');
                buttonUnlock.setAttribute('data-target', '#coinBalanceModal');

                selectedProfileId = data.profile_details.id;

                if (
                  data.employer_coin_balance >=
                  data.coin_amount_to_unlock_profile
                ) {
                  unlockNowButton.setAttribute('class', 'btn btn-success');
                  unlockNowButton.innerHTML =
                    '<i class="fas fa-lock mr-1"></i> Unlock Now';
                } else {
                  unlockNowButton.setAttribute('class', 'btn btn-secondary');
                  unlockNowButton.innerHTML =
                    '<i class="fas fa-lock mr-1"></i> Unlock Now';
                }
              }

              actionProfileBtnContainer.appendChild(buttonInvite);
              actionProfileBtnContainer.appendChild(buttonDownload);
              actionProfileBtnContainer.appendChild(buttonUnlock);
            }
          } else {
            const textCompanyName = document.getElementById('text-full-name');
            textCompanyName.innerHTML = `This profile is set to private <i class="fas fa-lock"></i>`;
          }
        }
      })
      .catch((error) => {
        // populateMoreProfiles([]);
        console.error(error);
      });
  } else {
    // populateMoreProfiles([]);
    showToast('alert-toast-container', 'Resume Id not found', 'danger');
  }
}

// document
//   .getElementById('refresh-profile-list')
//   .addEventListener('click', function () {
//     fetchUserProfile();
//   });

fetchUserProfile();
