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
  readOnly = false,
  enableValidFeedback = true,
}) => {
  const inputId = useId();
  const triggerValidation = !readOnly && touched[name];
  const validClass = triggerValidation && enableValidFeedback ? "is-valid" : "";
  const inputClass = `form-control ${
    triggerValidation && errors[name] ? "is-invalid" : validClass
  }`;

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
        autoComplete="off"
        readOnly={readOnly}
        className="form-control-plaintext"
        {...(!readOnly && {
          placeholder: placeholder ?? "",
          className: inputClass,
        })}
      />
      <div className="invalid-feedback field_error">
        {triggerValidation && errors[name]}
      </div>
    </div>
  );
};
