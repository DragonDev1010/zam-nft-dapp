import React, { useContext, useState } from "react";
import { useForm } from 'react-hook-form';

import { resetDisplayName } from '../../api'

import { ModalContext, UserContext } from "@src/context";
import { setUserLocal } from '../../services/LocalStorageService'

export const ModalChangeDisplayName = () => {
  const { setModalChangeDisplayNameOpen } = useContext(ModalContext)
  const [disableBtn, setDisableBtn] = useState(false)
  const { userObj, setUserObj } = useContext(UserContext);

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
    if (userObj?.displayName !== data.displayName) {
      setDisableBtn(!disableBtn)
      await resetDisplayName(data.displayName)
      .then(res => {
        setDisableBtn(false)
        setModalChangeDisplayNameOpen(false)
        setUserObj({
          displayName: data.displayName
        })
        setUserLocal({
          displayName: data.displayName
        })
      })
      reset()
    } else {
      console.log('Some displayName!')
    }
  }

  return (
    <div className="login-modal">
      <div className="login-modal__title">Change Display Name</div>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="login-modal__input">
          <label className="input-field__label">New Display Name</label>
          <div className="input-field mt-10">
            <div className="input-field__column input-field__column_wauto buttons-switcher">
              <input
                className="input-field__input"
                placeholder="Display Name"
                defaultValue={userObj?.displayName ? userObj?.displayName : ''}
                {...register("displayName", {
                  required: "This is a required",
                  pattern: {
                    value: /^[a-zA-Z\-]+$/,
                    message: "Incorrect username!"
                  }
                })}
              />
            </div>
          </div>
          <div className="mt-10 ml-10 input-field__input__error">
            {errors.displayName && <p>{errors.displayName.message}</p>}
          </div>
        </div>
        <button             
          type="submit" 
          disabled={disableBtn} 
          className={disableBtn
            ? "login-modal__button button disabled"
            : "login-modal__button button"}
        >
          Change Display Name
        </button>
      </form>
    </div>
  );
};
