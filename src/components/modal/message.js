import React from 'react';

export const ModalMessage = ({ title, content, onClose, success = false }) => {
    return (
        <div className={success ? "modal__success" : "modal__warning"}>
            <h4>{title}</h4>
            <p className="mt-20 mb-20">
                {content}
            </p>
            <div className="flex justify-center">
                <span className="gray-link close-link" onClick={onClose}>Close</span>
            </div>
        </div>
    )
}
