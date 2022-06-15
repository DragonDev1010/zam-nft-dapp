import React from 'react';

import { IconSucsess } from '../../icons/icons'

export const ModalCheckEmail = () => {
    return (
        <div className="modal__success">
            <IconSucsess />
            <h4>Check Your Email</h4>

            <p className="mt-20 mb-20">
                We' have sent you a reset link.
            </p>
        </div>
    );
}
