import { useRef, useState } from "react";

import { Text } from "./texts";
import { Button } from "./button";

import { IoIosArrowUp } from "react-icons/io";

export const DropdownOptions = ({
   styleContainer,
   styleHeader,
   styleList,
   direction = true,
   option,
   buttonClick,
}) => {
   const [isOpen, setIsOpen] = useState(false);
   const buttonRef = useRef({});

   const handlerToggleDropdown = () => setIsOpen(!isOpen);

   const handlerActiveEffect = (buttonName) => {
      const nodeButtons = Object.values(buttonRef.current);

      nodeButtons.forEach((element) => element.classList.remove("active"));
      buttonRef.current[buttonName].classList.add("active");
   };
   const refRegisterButton = (node, name) => {
      buttonRef.current[name] = node;
   };

   return (
      <div className={`${styleContainer} relative`}>
         <header
            onClick={handlerToggleDropdown}
            className={`${styleHeader} cursor-pointer select-none flex items-center justify-between gap-5 px-2 rounded-lg border `}
         >
            <Text
               style="text-lg text-gray-400"
               text="Seleccione la hoja de trabajo"
            />
            <IoIosArrowUp className="text-xl" />
         </header>

         <section
            className={`${styleList} ${isOpen ? "flex" : "hidden"}  ${direction ? "bottom-full mb-1" : "top-full mt-1"} absolute  flex-col w-full h-fit  rounded-lg border bg-white overflow-hidden `}
         >
            {option?.map((index, key) => (
               <Button
                  key={key}
                  buttonRef={(node) => refRegisterButton(node, index)}
                  text={index}
                  styleButton={`${styleList} ${false ? "border-l-4 border-blue-600 bg-blue-300 text-white font-semibold" : "text-black"} items-center w-full pl-2 py-2 h-10 text-lg border-b border-b-gray-300 hover:bg-blue-100 last:border-b-0`}
                  click={(e) => {
                     buttonClick(e, index);
                     handlerActiveEffect(index);
                  }}
               />
            ))}
         </section>
      </div>
   );
};
