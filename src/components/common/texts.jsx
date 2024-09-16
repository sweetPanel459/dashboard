export const Title = ({ text, style }) => <h1 className={style}>{text}</h1>;

export const Paragraph = ({ text, style }) => <p className={style}>{text}</p>;

export const Text = ({ text, style }) => <span className={style}>{text}</span>;

export const DoubleText = ({
   fristText,
   secondText,
   fristTextStyle,
   secondTextStyle,
   style,
}) => (
   <span className={`${style} flex`}>
      <span className={fristTextStyle}>{fristText}</span>
      <span className={secondTextStyle}>{secondText}</span>
   </span>
);

export const IconText = ({ icon, text, style, styleIcon, styleText }) => (
   <span className={`${style} flex`}>
      <span className={styleIcon}>{icon}</span>
      <span className={styleText}>{text}</span>
   </span>
);
