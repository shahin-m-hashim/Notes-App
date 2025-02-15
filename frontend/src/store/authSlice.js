import nameSchema from "schemas/nameSchema";
import emailSchema from "schemas/emailSchema";
import passwordSchema from "schemas/passwordSchema";

const initialLoginForm = {
  email: "",
  password: "",
  showPassword: false,
};

const initialRegisterForm = {
  name: {
    value: "",
    error: null,
  },
  email: {
    value: "",
    error: null,
  },
  password: {
    value: "",
    error: null,
    showValue: false,
  },
  confirmPassword: {
    value: "",
    error: null,
    showValue: false,
  },
};

const createAuthSlice = (set) => ({
  auth: {
    login: initialLoginForm,
    register: initialRegisterForm,
  },

  setLoginFormField: (field, value) => {
    set(
      (state) => {
        state.auth.login[field] = value;
      },
      undefined,
      "setLoginFormField"
    );
  },

  setRegisterFormField: (field, value) => {
    set(
      (state) => {
        const { register } = state.auth;
        register[field].value = value;

        const validators = {
          name: () => {
            const result = nameSchema.safeParse(value);
            register.name.error = !result.success
              ? result.error.issues[0].message
              : null;
          },

          email: () => {
            const result = emailSchema.safeParse(value);
            register.email.error = !result.success
              ? result.error.issues[0].message
              : null;
          },

          password: () => {
            const result = passwordSchema.safeParse(value);
            register.password.error = !result.success
              ? result.error.issues[0].message
              : null;

            if (register.confirmPassword.value) {
              register.confirmPassword.error =
                value !== register.confirmPassword.value
                  ? "Passwords do not match."
                  : null;
            }
          },

          confirmPassword: () => {
            register.confirmPassword.error =
              value !== register.password.value
                ? "Passwords do not match."
                : null;
          },
        };

        validators[field]();
      },
      undefined,
      "setRegisterFormField"
    );
  },

  setShowPasswordValue: (form, show) => {
    set(
      (state) => {
        if (form === "register") {
          state.auth.register.password.showValue = show;
        } else {
          state.auth.login.showPassword = show;
        }
      },
      undefined,
      "setShowPasswordValue"
    );
  },

  setShowConfirmPasswordValue: (show) => {
    set(
      (state) => {
        state.auth.register.confirmPassword.showValue = show;
      },
      undefined,
      "setShowConfirmPasswordValue"
    );
  },

  resetForm: (form) => {
    set(
      (state) => {
        if (form === "login") {
          state.auth.login = initialLoginForm;
        } else if (form === "register") {
          state.auth.register = initialRegisterForm;
        }
      },
      undefined,
      "resetForm"
    );
  },
});

export default createAuthSlice;
