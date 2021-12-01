import React from 'react';


export const ModalWarning = (props) => {

    return (
        <div className="modal__warning">
            <h4>Warning</h4>

            <p className="mt-20 mb-20">
                {props.content}
            </p>

            <div className="flex justify-center">
                <span className="gray-link close-link" onClick={props.onClose}>Close</span>
            </div>
        </div>
    );
}
