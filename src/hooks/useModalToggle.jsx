export const useModalToggle = (currentModal) => {
  const openModal = (modalId) => {
    const modal = currentModal.current.querySelector(`#${modalId}`);

    if (modal.classList.contains("hidden")) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
  };

  const closeModal = (modalId) => {
    const modal = currentModal.current.querySelector(`#${modalId}`);

    if (modal.classList.contains("flex")) {
      modal.classList.remove("flex");
      modal.classList.add("hidden");
    }
  };

  return { closeModal, openModal };
};
