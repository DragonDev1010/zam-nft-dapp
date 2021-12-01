import {Modal} from "@src/components/modal/modal";
import {ModalWalletConnect} from "@src/components/modal/wallet-connect";
import React, {useContext} from "react";
import {ModalSwitchNetwork} from "@src/components/modal/wallet-switch-network";
import {ModalContext} from "@src/context";
import {ModalWarning} from "@src/components/modal/warning";

export const ModalsGlobal = () => {
    const {
        modalWalletIsOpen,
        setModalWalletOpen,
        modalNetworkIsOpen,
        setModalNetworkOpen,
        modalWarningIsOpen,
        setWarningOpen
    } = useContext(ModalContext);

    return (
        <>
            <Modal isOpen={modalWalletIsOpen} onClose={() => setModalWalletOpen(false)}>
                <ModalWalletConnect onClose={() => setModalWalletOpen(false)}/>
            </Modal>
            <Modal isOpen={modalNetworkIsOpen} onClose={() => setModalNetworkOpen(false)}>
                <ModalSwitchNetwork onClose={() => setModalNetworkOpen(false)} targetNetwork={modalNetworkIsOpen}/>
            </Modal>
            <Modal isOpen={modalWarningIsOpen} onClose={() => setWarningOpen(false)}>
                <ModalWarning onClose={() => setWarningOpen(false)} content={modalWarningIsOpen}/>
            </Modal>
        </>
    )
}

