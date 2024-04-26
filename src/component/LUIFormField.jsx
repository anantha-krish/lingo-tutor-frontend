import { Field, ErrorMessage } from "formik";

export const LUIFormField = ({
  type,
  name,
  touched,
  errors,
  label,
  placeholder,
  values,
}) => (
  <div className="form-group">
    {label && <label htmlFor={name}>{label}</label>}
    <Field
      type={type ?? "text"}
      value={values[name]}
      name={name ?? ""}
      placeholder={placeholder ?? ""}
      autoComplete="off"
      className={`mt-2 form-control ${
        touched[name] && errors[name] ? "is-invalid" : ""
      }`}
    />
    <ErrorMessage component="div" name={name} className="invalid-feedback" />
  </div>
);
