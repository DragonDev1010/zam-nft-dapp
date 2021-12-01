import React, {useState} from 'react';

export const ModalContext = React.createContext();

export const modalContextProps = () => {
    const [modalWalletIsOpen, setModalWalletOpen] = useState(false);
    const [modalNetworkIsOpen, setModalNetworkOpen] = useState(false);
    const [modalWarningIsOpen, setWarningOpen] = useState(false);

    return {
        modalWalletIsOpen,
        setModalWalletOpen,
        modalNetworkIsOpen,
        setModalNetworkOpen,
        modalWarningIsOpen,
        setWarningOpen,
    }
};
