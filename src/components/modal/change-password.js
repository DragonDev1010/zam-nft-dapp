import React, { useContext, useState } from "react";
import { useForm } from 'react-hook-form';

import { changePassword } from '../../api'

import { WalletContext, ModalContext } from "@src/context";

export const ModalChangePassword = () => {
  const { setModalChangePasswordOpen } = useContext(ModalContext)
  const [disableBtn, setDisableBtn] = useState(false)

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    mode: "onChange"
  });

  const handleSubmitForm = async (data, e) => {
    e.preventDefault();
    setDisableBtn(!disableBtn)

    await changePassword(data)
    .then(response => {
        setDisableBtn(false)
        setModalChangePasswordOpen(false)
    })
    .catch((error) => {
        console.log('error', error)
        setDisableBtn(false)
    })
    reset()
  }

  return (
    <div className="login-modal">
      <div className="login-modal__title">Change Password</div>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="login-modal__input">
          <label className="input-field__label">Old password</label>
          <div className="input-field mt-10">
            <div className="input-field__column input-field__column_wauto buttons-switcher">
              <input
                className="input-field__input"
                placeholder="Old password"
                type="password"
                {...register("oldPassword", {
                  required: "This is a required"
                })}
              />
            </div>
          </div>
          <div className="mt-10 ml-10 input-field__input__error">
            {errors.oldPassword && <p>{errors.oldPassword.message}</p>}
          </div>
        </div>
        <div className="login-modal__input">
          <label className="input-field__label">New password</label>
          <div className="input-field mt-10">
            <div className="input-field__column input-field__column_wauto buttons-switcher">
              <input
                className="input-field__input"
                placeholder="New password"
                type="password"
                {...register("newPassword", {
                  required: "This is a required",
                  pattern: {
                    value: /^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
                    message: "The password must be between 7 and 15 characters long and contain at least one number and a special character"
                  }
                })}
              />
            </div>
          </div>
          <div className="mt-10 ml-10 input-field__input__error">
            {errors.newPassword && <p>{errors.newPassword.message}</p>}
          </div>
        </div>
        <button             
          type="submit" 
          disabled={disableBtn} 
          className={disableBtn
            ? "login-modal__button button disabled"
            : "login-modal__button button"}
        >
          Change Password
        </button>
      </form>
    </div>
  );
};
