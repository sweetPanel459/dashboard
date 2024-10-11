import { Text } from "../common/texts";
import { Button } from "../common/button";

import { FaXmark } from "react-icons/fa6";

export const ModalHeader = ({ text, click }) => (
   <header className="flex items-center justify-between h-10">
      <Text
         text={text}
         style="text-4xl tracking-widest font-semibold font-grotesk"
      />
      <Button
         icon={<FaXmark />}
         styleButton="text-4xl text-gray-600"
         click={() => click("modal-no")}
      />
   </header>
);
