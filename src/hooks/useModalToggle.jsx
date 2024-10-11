import { useState, useRef, useEffect } from "react";

export const useModalToggle = () => {
  const current_modal = useRef(null);
  const [element, setElement] = useState({});

  useEffect(() => {}, [current_modal]);

  const add = () => {
    setElement((prev) => ({
      ...prev,
      [`elemento_${Object.values(element).length}`]: current_modal.current,
    }));
    console.log("ejecutado por:", current_modal);
  };

  // const openModal = (modalId) => {
  //   const modal = currentModal.current.querySelector(`#${modalId}`);
  //
  //   if (modal.classList.contains("hidden")) {
  //     modal.classList.remove("hidden");
  //     modal.classList.add("flex");
  //   }
  // };
  //
  // const closeModal = (modalId) => {
  //   const modal = currentModal.current.querySelector(`#${modalId}`);
  //
  //   if (modal.classList.contains("flex")) {
  //     modal.classList.remove("flex");
  //     modal.classList.add("hidden");
  //   }
  // };

  return { current_modal, add };
};
