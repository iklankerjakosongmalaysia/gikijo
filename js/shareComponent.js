function shareLoginModal() {
  return `
    <div
      class="modal fade"
      id="startNowModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="login-tab"
                  data-toggle="tab"
                  href="#login"
                  role="tab"
                  aria-controls="login"
                  aria-selected="true"
                  data-lang-key="login"
                >
                  Login
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="register-tab"
                  data-toggle="tab"
                  href="#register"
                  role="tab"
                  aria-controls="register"
                  aria-selected="false"
                  data-lang-key="register"
                >
                  Register
                </a>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="login"
                role="tabpanel"
                aria-labelledby="login-tab"
              >
                <form id="login-form">
                  <div class="form-group mt-3">
                    <label data-lang-key="email">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder=""
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label data-lang-key="password">Password</label>
                    <input
                      type="password"
                      class="form-control form-control-user"
                      id="password"
                      placeholder=""
                      required
                    />
                    <p
                      class="text-right mt-3 text-primary"
                      id="go-to-forgot-password-modal"
                      data-lang-key="forgot_password"
                    >
                      Forgot password?
                    </p>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary btn-user btn-block"
                    id="submit-btn-login"
                    data-lang-key="login"
                  >
                    Login
                  </button>
                </form>

                <div class="row mt-2 mb-2">
                  <div class="col-5">
                    <hr />
                  </div>
                  <div class="col-2 text-center">
                    <span class="px-3 bg-white" data-lang-key="or">
                      or
                    </span>
                  </div>
                  <div class="col-5">
                    <hr />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <a
                      class="btn btn-outline-dark btn-block"
                      role="button"
                      style="text-transform: none"
                      id="button-continue-login-with-google"
                    >
                      <img
                        width="20px"
                        style="margin-bottom: 3px; margin-right: 5px"
                        alt="Google sign-in"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                      />
                      <span data-lang-key="continue_with_google">
                        Continue with Google
                      </span>
                    </a>
                  </div>
                </div>

                <label
                  class="text-center form-check-label small mt-3"
                  data-lang-key="by_clicking_on_the_login"
                >
                  By clicking on the "Login" or "Continue with Google" button,
                  you are acknowledging and accepting our
                  <a href="terms-privacy-policy.txt" target="_blank">
                    Terms and Privacy Policy.
                  </a>
                </label>

                <p
                  class="text-center mt-4"
                  id="go-to-register-tab"
                  data-lang-key="dont_have_an_account"
                >
                  Don't have an account?
                  <strong class="text-primary" data-lang-key="register">
                    Register
                  </strong>
                </p>
              </div>
              <div
                class="tab-pane fade"
                id="register"
                role="tabpanel"
                aria-labelledby="register-tab"
              >
                <form id="register-form">
                  <div class="form-group mt-3">
                    <label data-lang-key="username">Username</label>
                    <input
                      maxlength="30"
                      type="text"
                      class="form-control"
                      id="input-username-register"
                      placeholder=""
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label data-lang-key="email">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="input-email-register"
                      aria-describedby="emailHelp"
                      placeholder=""
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label data-lang-key="password">Password</label>
                    <input
                      type="password"
                      class="form-control form-control-user"
                      id="input-password-register"
                      placeholder=""
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label data-lang-key="repeat_password">
                      Repeat Password
                    </label>
                    <input
                      type="password"
                      class="form-control form-control-user"
                      id="input-repeat-password-register"
                      placeholder=""
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    class="btn btn-primary btn-user btn-block"
                    id="submit-btn-register"
                    data-lang-key="register"
                  >
                    Register
                  </button>
                </form>

                <div class="row mt-2 mb-2">
                  <div class="col-5">
                    <hr />
                  </div>
                  <div class="col-2 text-center">
                    <span class="px-3 bg-white" data-lang-key="or">
                      or
                    </span>
                  </div>
                  <div class="col-5">
                    <hr />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <a
                      class="btn btn-outline-dark btn-block"
                      role="button"
                      style="text-transform: none"
                      id="button-continue-signup-with-google"
                    >
                      <img
                        width="20px"
                        style="margin-bottom: 3px; margin-right: 5px"
                        alt="Google sign-in"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                      />
                      <span data-lang-key="continue_with_google">
                        Continue with Google
                      </span>
                    </a>
                  </div>
                </div>

                <label
                  class="text-center form-check-label small mt-3"
                  data-lang-key="by_clicking_on_the_register"
                >
                  By clicking on the "Register" or "Continue with Google"
                  button, you are acknowledging and accepting our
                  <a href="terms-privacy-policy.txt" target="_blank">
                    Terms and Privacy Policy.
                  </a>
                </label>

                <p
                  class="text-center mt-4"
                  id="go-to-login-tab"
                  data-lang-key="already_have_an_account"
                >
                  Already have an account?
                  <strong class="text-primary">Login</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );`;
}

function shareReverifyModal() {
  return `
    <div
      class="modal fade"
      id="reverifyModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <form id="reverify-form">
              <div class="form-group mt-3">
                <label data-lang-key="email">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email-reverify"
                  aria-describedby="emailHelp"
                  placeholder=""
                  required
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary btn-user btn-block"
                id="submit-btn-reverify"
                data-lang-key="resend_verification_link"
              >
                Resend Verification Link
              </button>
              <p class="text-center mt-4" id="reverify-go-to-login-modal">
                <strong class="text-primary" data-lang-key="back_to_login">
                  Back to Login
                </strong>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  ;`;
}

function shareForgotPasswordModal() {
  return `
    <div
      class="modal fade"
      id="forgotPasswordModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <form id="forgot-password-form">
              <div class="form-group mt-3">
                <label data-lang-key="email">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email-forgot-password"
                  aria-describedby="emailHelp"
                  placeholder=""
                  required
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary btn-user btn-block"
                id="submit-btn-forgot-password"
                data-lang-key="reset_password"
              >
                Reset Password
              </button>
              <p class="text-center mt-4" id="go-to-login-modal">
                <strong class="text-primary" data-lang-key="back_to_login">
                  Back to Login
                </strong>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );`;
}

function shareLogoutModal() {
  return `
    <div
      class="modal fade"
      id="logoutModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="exampleModalLabel"
              data-lang-key="ready_to_leave"
            >
              Ready to Leave?
            </h5>
            <button
              class="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body" data-lang-key="select_logout_below">
            Select "Logout" below if you are ready to end your current session.
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              type="button"
              data-dismiss="modal"
              data-lang-key="cancel"
            >
              Cancel
            </button>
            <a
              class="btn btn-primary"
              id="button-logout-yes"
              data-lang-key="logout"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );`;
}
