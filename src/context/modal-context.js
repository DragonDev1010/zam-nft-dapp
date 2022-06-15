import React, { useState } from "react";

export const ModalContext = React.createContext();

export const modalContextProps = () => {
  const [modalWalletIsOpen, setModalWalletOpen] = useState(false);
  const [modalNetworkIsOpen, setModalNetworkOpen] = useState(false);
  const [modalMessage, setMessage] = useState({
    isOpen: false,
    message: '',
    success: false,
    title: ''
  });
  const [modalLoginIsOpen, setModalLoginOpen] = useState(false);
  const [modalRecoverPasswordIsOpen, setModalRecoverPasswordOpen] = useState(false);
  const [modalCheckEmailOpen, setModalCheckEmailOpen] = useState(false);
  const [modalChangePasswordOpen, setModalChangePasswordOpen] = useState(false);
  const [modalChangeDisplayNameOpen, setModalChangeDisplayNameOpen] = useState(false);

  return {
    modalWalletIsOpen,
    setModalWalletOpen,
    modalNetworkIsOpen,
    setModalNetworkOpen,
    modalMessage,
    setMessage,
    modalLoginIsOpen,
    setModalLoginOpen,
    modalRecoverPasswordIsOpen,
    setModalRecoverPasswordOpen,
    modalCheckEmailOpen,
    setModalCheckEmailOpen,
    modalChangePasswordOpen,
    setModalChangePasswordOpen,
    modalChangeDisplayNameOpen,
    setModalChangeDisplayNameOpen
  };
};
