export const Input = ({
  id,
  type,
  name,
  label,
  button,
  placeholder,
  styleLabel,
  styleInput,
  styleButton,
  styleContainer,
  changeInput,
  clickButton,
}) => {
  return (
    <div className={styleContainer}>
      {button && (
        <button className={styleButton} onClick={clickButton}>
          {button}
        </button>
      )}
      {label && (
        <label className={styleLabel} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        onChange={changeInput}
        placeholder={placeholder}
        className={`${styleInput} outline-none`}
      />
    </div>
  );
};
