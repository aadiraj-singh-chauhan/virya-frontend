import styles from '../css/FormField.module.css';

// Floating-label form field — label sits inline until the field has a value,
// then disappears via the `:not(:placeholder-shown)` trick. Shared by the
// brochure download modal and the Contact page form.
export default function FormField({ idPrefix, name, label, type = 'text', required = true }) {
  const id = `${idPrefix}-${name}`;
  const isTextarea = type === 'textarea';
  const Tag = isTextarea ? 'textarea' : 'input';

  return (
    <div className={`${styles.field} ${isTextarea ? styles.fieldTextarea : ''}`}>
      <Tag
        id={id}
        name={name}
        type={isTextarea ? undefined : type}
        rows={isTextarea ? 4 : undefined}
        required={required}
        placeholder=" "
        aria-label={label}
        className={`${styles.input} ${isTextarea ? styles.textarea : ''}`}
      />
      <label htmlFor={id} className={`${styles.fieldLabel} ${isTextarea ? styles.fieldLabelTextarea : ''}`} aria-hidden="true">
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
    </div>
  );
}
