import { useState } from "react";
import { validate } from "../utils/validate";

export const useForm = (rules, initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setError] = useState({});

  const _validate = () => {
    const errorObject = validate(rules, values);
    setError(errorObject);
    return Object.keys(errorObject).length === 0;
  };

  const register = (name) => {
    return {
      error: errors[name],
      value: values[name] || "",
      onChange: (value) => {
        let _values = { ...values, [name]: value };
        if (rules[name]) {
          const error = validate(
            {
              [name]: rules[name],
            },
            _values
          );
          setError((prev) => ({ ...prev, [name]: error[name] || "" }));
        }

        setValues((prev) => ({ ...prev, [name]: value }));
      },
    };
  };
  const reset = () => {
    setValues({});
  };
  return {
    values,
    reset,
    errors,
    register,
    validate: _validate,
  };
};
