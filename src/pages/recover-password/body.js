import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/auth'
import { ModalContext } from "@src/context";

export const RecoverBody = ({ token, userId }) => {
  const [errorPassword, setErrorPassword] = useState('')
  const [messageRes, setMessageRes] = useState(null)
  const [disableBtn, setDisableBtn] = useState(false)
  const auth = useAuth();
  let history = useHistory();

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
    setDisableBtn(true)
    await auth.recoverPassword(data.password, token, userId)
    .then(res => {
      if (!res?.controversy) {
        setMessageRes('Successfully!')
        history.push('/login')
      } else {
        setMessageRes(res?.controversy[0])
      }
      setDisableBtn(false)
    })
    reset()
  }

  return (
    <div className="recover-body">
      <div className="recover-body__registration">
        {messageRes && 
          <div className="recover-body__registration_message mt-10">
            <p>{messageRes}</p>
          </div>
        }
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="recover-body__registration__input">
            <label className="input-field__label">New Password</label>
            <div className="input-field mt-10">
              <input
                className="input-field__input"
                type="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: "This is a required",
                  pattern: {
                    value: /^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
                    message: "The password must be between 7 and 15 characters long and contain at least one number and a special character"
                  }
                })}
            />
            </div>
            <div className="mt-10 ml-10 input-field__input__error">
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          </div>
          <div className="recover-body__registration__input">
            <label className="input-field__label">Confirm  New Password</label>
            <div className="input-field mt-10">
              <input
                className="input-field__input"
                type="password"
                placeholder="Confirm Password"
                {...register("confirm_password", {
                  required: "This is a required",
                })}
            />
            </div>
            <div className="mt-10 ml-10 input-field__input__error">
              {errors.confirm_password && <p>{errors.confirm_password.message}</p>}
              {errorPassword && <p>{errorPassword}</p>}
            </div>
          </div>
          <button 
            type="submit" 
            disabled={disableBtn} 
            className={disableBtn && 'disabled'}
          >
              Change Password
          </button>
        </form>
      </div>
      <div className="recover-modal__line"> </div>
      <div className="recover-modal__create">
        <p>
          <span onClick={() => history.push("/login")}>Return To Sign Form</span>
        </p>
      </div>
    </div>
  );
};