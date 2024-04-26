import { Field } from "formik";
import { FormLabel } from "react-bootstrap";

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
    {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
    <Field
      type={type ?? "text"}
      value={values[name]}
      name={name ?? ""}
      placeholder={placeholder ?? ""}
      autoComplete="off"
      className={`form-control ${
        touched[name] && errors[name] ? "is-invalid" : ""
      }`}
    />
    <div className="invalid-feedback field_error">
      {touched[name] && errors[name]}
    </div>
  </div>
);
