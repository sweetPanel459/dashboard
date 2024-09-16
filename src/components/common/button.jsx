import { Text } from "./texts";

export const Button = ({
   icon,
   text,
   styleButton,
   styleText,
   styleIcon,
   click,
}) => (
   <button onClick={click} className={`${styleButton} flex`}>
      <span className={styleIcon}>{icon}</span>
      <Text style={styleText} text={text} />
   </button>
);
