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

function populateOtherPost(data) {
  const listLoader = document.getElementById('job-list-loader');
  const listEmpty = document.getElementById('job-list-empty');
  const listContainer = document.getElementById('job-list-container');
  const listBody = document.getElementById('job-list-body');

  var totalRecord = [];

  data.forEach((item) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName('div');

    divs[0].addEventListener('click', function () {
      location.href = item.internal_apply_link;
    });

    const content = divs[0].getElementsByTagName('h7');

    content[0].innerHTML = `<b>${item.title}</b>`;
    content[1].innerHTML = `<i class="fas fa-building"></i> ${item.company_data.name}`;
    content[2].innerHTML = `<i class="fas fa-tag"></i> ${item.type}`;

    if (item.min_salary > 0) {
      content[3].innerHTML = `<i class="fas fa-money-bill-wave"></i> MYR ${item.min_salary} - ${item.max_salary} ${item.salary_type}`;
    } else {
      content[3].innerHTML = `<i class="fas fa-money-bill-wave"></i> Not Stated`;
    }

    content[4].innerHTML = `<i class="fas fa-map-marker-alt"></i> ${item.location}`;

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

document
  .getElementById('update-now-resume-btn')
  .addEventListener('click', function () {
    location.href = 'profile?code=resume';
  });

function applyJob(item, useBtn) {
  let defaultBtnText = useBtn.innerHTML;

  useBtn.disabled = true;
  useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

  const options = {
    body: JSON.stringify({
      user_id: item.user_id,
      post_id: item.id,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/post/apply`,
    'POST',
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        if (data.payload) {
          if (data.payload.is_resume_not_complete == true) {
            // const progressContainer = document.getElementById(
            //   'resume-progress-bar'
            // );

            // progressContainer.style.width = `${data.payload.value}%`;
            // progressContainer.innerHTML = `${data.payload.value}%`;

            const updateResumeMessage = document.getElementById(
              'update-resume-message'
            );
            const isResumeIncomplete = data.payload.value.progress < 50;
            const isVisibilityNotPublic = data.payload.value.visibility !== 2;

            let resumeMessageHTML = `<ul style="list-style-type: none;">
              <li>
                <i class="fas ${
                  isVisibilityNotPublic
                    ? 'fa-times text-danger mr-2'
                    : 'fa-check text-success mr-1'
                }"></i> Your resume is set to "Public" visibility.
              </li>
              <li>
                <i class="fas ${
                  isResumeIncomplete
                    ? 'fa-times text-danger mr-2'
                    : 'fa-check text-success mr-1'
                } mr-1"></i> Your resume is at least 70% complete.
              </li>
            </ul>`;

            updateResumeMessage.innerHTML = resumeMessageHTML;

            $('#updateResumeModal').modal('show');
          }
        } else {
          showToast('alert-toast-container', data.message, 'danger');
        }
      } else {
        showToast(
          'alert-toast-container',
          'Your application has been submitted successfully.',
          'success'
        );
        useBtn.setAttribute('class', 'btn btn-success');
        useBtn.innerHTML = `<i class="fas fa-check"></i> Applied`;
        useBtn.disabled = false;
      }
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      console.log('error', error);
    });
}

function populateToJobDetails(item, is_applied) {
  const jobTitle = document.getElementById('job-title');
  jobTitle.innerHTML = item.title;

  const postedAt = document.getElementById('posted-at');
  var created_at = new Date(item.created_at);
  var timeAgo = moment(created_at).fromNow(true);

  postedAt.innerHTML = ` ${timeAgo} ago`;

  const jobListItem = document.getElementById('job-list-item');
  const listItem = jobListItem.getElementsByTagName('li');

  listItem[0].innerHTML = `<i class="fas fa-building"></i> <a href="company-profile?custom_id=${item.company_data.id}">${item.company_data.name}</a>`;

  listItem[1].innerHTML = `<i class="fas fa-tag"></i> ${item.type}`;

  if (item.min_salary > 0) {
    listItem[2].innerHTML = `<i class="fas fa-money-bill-wave"></i> MYR ${item.min_salary} - ${item.max_salary} ${item.salary_type}`;
  } else {
    listItem[2].innerHTML = `<i class="fas fa-money-bill-wave"></i> Not Stated`;
  }

  listItem[3].innerHTML = `<i class="fas fa-map-marker-alt"></i> ${item.location}`;

  listItem[4].innerHTML = `<br><b>Requirements</b><br>${item.requirement.replace(
    /\n/g,
    '<br>'
  )}`;
  listItem[5].innerHTML = `<br><b>Benefits</b><br>${item.benefit.replace(
    /\n/g,
    '<br>'
  )}`;
  listItem[6].innerHTML = `<br><b>Additional Information</b><br>${item.additional_info.replace(
    /\n/g,
    '<br>'
  )}`;

  const actionProfileBtnContainer = document.getElementById(
    'action-job-button-container'
  );

  // remove existing dropdown button (if any)
  while (actionProfileBtnContainer.firstChild) {
    actionProfileBtnContainer.removeChild(actionProfileBtnContainer.firstChild);
  }

  const buttonCopyLink = document.createElement('button');
  buttonCopyLink.setAttribute('type', 'button');
  buttonCopyLink.setAttribute('class', 'btn btn-outline-secondary mr-1');
  buttonCopyLink.setAttribute('id', 'button-send-invite');
  buttonCopyLink.innerHTML = `<i class="fas fa-link"></i>`;
  buttonCopyLink.addEventListener('click', function () {
    navigator.clipboard
      .writeText(item.internal_apply_link)
      .then(() => {
        buttonCopyLink.innerHTML = 'Link copied!';
      })
      .catch((error) => {
        console.error('Failed to copy link: ', error);
      });
  });

  const buttonApply = document.createElement('button');
  buttonApply.setAttribute('type', 'button');
  buttonApply.setAttribute('id', 'apply-button');

  buttonApply.disabled = false;
  buttonApply.setAttribute('class', 'btn btn-primary');

  if (item.is_external_apply) {
    buttonApply.innerHTML = `<i class="fas fa-external-link-alt mr-1"></i> Apply Now`;
    buttonApply.setAttribute('class', 'btn btn-primary');
    buttonApply.addEventListener('click', () => {
      window.open(item.external_apply_link, '_blank');
    });
  } else {
    if (token) {
      buttonApply.addEventListener('click', () => {
        applyJob(item, buttonApply);
      });
      if (is_applied) {
        buttonApply.innerHTML = `<i class="fas fa-check"></i> Applied`;
        buttonApply.setAttribute('class', 'btn btn-success');
      } else {
        buttonApply.innerHTML = `Apply Now`;
        buttonApply.setAttribute('class', 'btn btn-primary');
      }
    } else {
      buttonApply.innerHTML = `Login to Apply`;
      buttonApply.addEventListener('click', () => {
        window.open('index?postJob=true', '_self');
      });
    }
  }

  actionProfileBtnContainer.appendChild(buttonCopyLink);
  actionProfileBtnContainer.appendChild(buttonApply);
}

function fetchPostDetails() {
  var urlParams = new URLSearchParams(window.location.search);
  var customId = urlParams.get('postId');

  if (customId) {
    if (token) {
      fetchUrl = `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/post/is_login/${customId}`;
      fetchAPI(fetchUrl, 'GET', token)
        .then((data) => {
          if (data?.message) {
            showToast('alert-toast-container', data.message, 'danger');
            populateOtherPost([]);
          } else {
            populateToJobDetails(data.post_data, data.is_applied);
            populateOtherPost(data.post_all);
          }
        })
        .catch((error) => {
          console.error(error);
          populateOtherPost([]);
        });
    } else {
      fetchUrl = `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/post/not_login/${customId}`;
      fetchAPI(fetchUrl, 'GET')
        .then((data) => {
          if (data?.message) {
            showToast('alert-toast-container', data.message, 'danger');
            populateOtherPost([]);
          } else {
            populateToJobDetails(data.post_data, data.is_applied);
            populateOtherPost(data.post_all);
          }
        })
        .catch((error) => {
          console.error(error);
          populateOtherPost([]);
        });
    }
  } else {
    showToast('alert-toast-container', 'Post Id not found.', 'danger');
    populateOtherPost([]);
  }
}

$(document).ready(function () {
  fetchPostDetails();
});
