import PropTypes from "prop-types";

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

Input.propTypes = {
   type: PropTypes.string,
   label: PropTypes.string,
   onChange: PropTypes.func.isRequired,
   placeholder: PropTypes.string,
   id: PropTypes.string.isRequired,
   name: PropTypes.string,
   className: PropTypes.string,
   required: PropTypes.bool,
   disabled: PropTypes.bool,
};

Input.defaultProps = {
   type: "text",
   label: "",
   placeholder: "",
   name: "",
   className: "",
   required: false,
   disabled: false,
};
