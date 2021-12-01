import React from "react";

export const ButtonSpinner = ({title, className, onClick, isPending = false, disabled = false}) => {
    return (
        <button className={`button-spinner ${className}`} onClick={onClick} disabled={isPending || disabled}>
            <div className="button-spinner__name">
                {
                    isPending ? 'Please wait...' : title
                }
            </div>
            {
                !isPending ||
                    <div className="button-spinner__spinner">
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                    </div>
            }
        </button>
    )
}
