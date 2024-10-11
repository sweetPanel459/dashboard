import { useRef, useCallback } from "react";

export const useModalToggle = () => {
  const modalRefs = useRef({});

  const openModal = useCallback((modalId) => {
    const modalNode = modalRefs.current[modalId];
    if (modalNode) {
      modalNode.classList.remove("hidden");
      modalNode.classList.add("flex");
    }
  });

  const closeModal = useCallback((modalId) => {
    const modalNode = modalRefs.current[modalId];
    if (modalNode) {
      modalNode.classList.remove("flex");
      modalNode.classList.add("hidden");
    }
  });

  const registerModalRef = useCallback((modalId, node) => {
    if (node) modalRefs.current[modalId] = node;
  });

  return { registerModalRef, openModal, closeModal };
};
