const ERROR_MESSAGE = {
  required: "Please fill in this field",
  regexp: "Field is not like format",
  minmax: (min, max) => `Xin vui lòng nhập từ ${min}-${max} ký tự`,
  confirm: "xin vui lòng nhập lại đúng mật khẩu",
};

const REGEXP = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  url: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
};

export const validate = (rules, forms) => {
  const errorObject = {};
  for (let name in rules) {
    for (let rule of rules[name]) {
      if (rule.required) {
        if (
          (typeof forms[name] === "boolean" && !forms[name]) ||
          (typeof forms[name] !== "boolean" && !forms[name]?.trim())
        ) {
          errorObject[name] = rule.message || ERROR_MESSAGE.required;
          break;
        }
      }
      if (rule.regexp && forms[name]) {
        let regexp = rule.regexp;
        if (regexp in REGEXP) {
          regexp = REGEXP[regexp];
        } else if (!(regexp instanceof RegExp)) {
          regexp = new RegExp();
        }

        if (!regexp.test(forms[name])) {
          errorObject[name] = rule.message || ERROR_MESSAGE.regexp;
        }
      }

      if (rule.min || rule.max) {
        if (forms[name]?.length < rule.min || forms[name]?.length > rule.max) {
          errorObject[name] =
            rule.message || ERROR_MESSAGE.minmax(rule.min, rule.max);
        }
      }
      if (rule.confirm) {
        if (forms[rule.confirm] !== forms[name]) {
          errorObject[name] = rule.message || ERROR_MESSAGE.confirm;
        }
      }
    }
  }
  return errorObject;
};

export const required = (message) => ({
  message,
  required: true,
});
export const regexp = (pattern, message) => ({
  message,
  regexp: pattern,
});
export const minMax = (min, max, message) => ({
  message,
  min,
  max,
});
export const confirm = (field, message) => ({
  confirm: field,
  message,
});
