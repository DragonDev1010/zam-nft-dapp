import { Modal } from "@src/components/modal/modal";
import { ModalWalletConnect } from "@src/components/modal/wallet-connect";
import React, { useContext } from "react";
import { ModalSwitchNetwork } from "@src/components/modal/wallet-switch-network";
import { ModalContext } from "@src/context";
import { ModalMessage } from "@src/components/modal/message";
import { LoginModal } from "@src/components/modal/login-modal";
import { RecoverPasswordModal } from "@src/components/modal/recover-password";
import { ModalCheckEmail } from "@src/components/modal/check-email";
import { ModalChangePassword } from "@src/components/modal/change-password";
import { ModalChangeDisplayName } from "@src/components/modal/change-displayname";

export const ModalsGlobal = () => {
  const {
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
  } = useContext(ModalContext);

  return (
    <>
      <Modal isOpen={modalWalletIsOpen} onClose={() => setModalWalletOpen(false)}>
        <ModalWalletConnect onClose={() => setModalWalletOpen(false)} />
      </Modal>
      <Modal isOpen={modalNetworkIsOpen} onClose={() => setModalNetworkOpen(false)}>
        <ModalSwitchNetwork onClose={() => setModalNetworkOpen(false)} targetNetwork={modalNetworkIsOpen} />
      </Modal>
      <Modal isOpen={modalMessage.isOpen} onClose={() => setMessage({
        message: "",
        isOpen: false,
        success: false,
        title: ''
      })}>
        <ModalMessage onClose={() => setMessage({
          message: "",
          isOpen: false,
          success: false,
          title: ''
        })} content={modalMessage.message} title={modalMessage.title} success={modalMessage.success} />
      </Modal>
      <Modal isOpen={modalLoginIsOpen} onClose={() => setModalLoginOpen(false)}>
        <LoginModal onClose={() => setModalLoginOpen(false)} />
      </Modal>
      <Modal isOpen={modalRecoverPasswordIsOpen} onClose={() => setModalRecoverPasswordOpen(false)}>
        <RecoverPasswordModal onClose={() => setModalRecoverPasswordOpen(false)} />
      </Modal>
      <Modal isOpen={modalCheckEmailOpen} onClose={() => setModalCheckEmailOpen(false)}>
        <ModalCheckEmail onClose={() => setModalCheckEmailOpen(false)} />
      </Modal>
      <Modal isOpen={modalChangePasswordOpen} onClose={() => setModalChangePasswordOpen(false)}>
        <ModalChangePassword onClose={() => setModalChangePasswordOpen(false)} />
      </Modal>
      <Modal isOpen={modalChangeDisplayNameOpen} onClose={() => setModalChangeDisplayNameOpen(false)}>
        <ModalChangeDisplayName onClose={() => setModalChangeDisplayNameOpen(false)} />
      </Modal>
    </>
  );
};
