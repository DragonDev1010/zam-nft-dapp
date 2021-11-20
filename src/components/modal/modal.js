import React, {useRef, useEffect} from 'react';

export const Modal = (props) => {
    const ref = useRef(null);
    const refOutside = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                props.onClose();
            }
        }

        if (props.isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

    }, [props.isOpen]);

    if (!props.isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal__overlay" ref={refOutside}>
                <div className="modal__container" ref={ref}>
                    {props.children}

                    <a href="#" onClick={(event) => {event.preventDefault(); props.onClose()}}
                       className="modal__close">
                        <img src="images/icon_close.svg"/>
                    </a>
                </div>
            </div>
        </div>
    );
}
