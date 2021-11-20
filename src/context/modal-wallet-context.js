import React, {useState} from 'react';

export const ModalWalletContext = React.createContext();

export const modalWalletContextProps = () => {
    const [modalIsOpen, setModalOpen] = useState(false);

    return {
        modalIsOpen,
        setModalOpen,
    }
};
