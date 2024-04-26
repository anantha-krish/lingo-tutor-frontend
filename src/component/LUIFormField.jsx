import { Field } from "formik";
import { useId } from "react";
import { FormLabel } from "react-bootstrap";

export const LUIFormField = ({
  type,
  name,
  touched,
  errors,
  label,
  placeholder,
  values,
  enableValidFeedback = true,
}) => {
  const inputId = useId();
  const validClass = touched[name] && enableValidFeedback ? "is-valid" : "";
  return (
    <div className="form-group">
      {label && (
        <FormLabel htmlFor={inputId} className="text-body-secondary">
          <strong>{label}</strong>
        </FormLabel>
      )}
      <Field
        type={type ?? "text"}
        value={values[name]}
        id={inputId}
        name={name ?? ""}
        placeholder={placeholder ?? ""}
        autoComplete="off"
        className={`form-control ${
          touched[name] && errors[name] ? "is-invalid" : validClass
        }`}
      />
      <div className="invalid-feedback field_error">
        {touched[name] && errors[name]}
      </div>
    </div>
  );
};
