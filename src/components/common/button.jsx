import { Text } from "./texts";

export const Button = ({
   icon,
   text,
   styleButton,
   styleText,
   styleIcon,
   buttonRef,
   click,
}) => (
   <button ref={buttonRef} onClick={click} className={`${styleButton} flex`}>
      <span className={styleIcon}>{icon}</span>
      <Text style={styleText} text={text} />
   </button>
);
