import React, { useState } from "react";

export const ModalContext = React.createContext();

export const modalContextProps = () => {
  const [modalWalletIsOpen, setModalWalletOpen] = useState(false);
  const [modalNetworkIsOpen, setModalNetworkOpen] = useState(false);
  const [modalWarningIsOpen, setWarningOpen] = useState(false);
  const [modalLoginIsOpen, setModalLoginOpen] = useState(false);

  return {
    modalWalletIsOpen,
    setModalWalletOpen,
    modalNetworkIsOpen,
    setModalNetworkOpen,
    modalWarningIsOpen,
    setWarningOpen,
    modalLoginIsOpen,
    setModalLoginOpen,
  };
};
