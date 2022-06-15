import React, { useContext, useState, useEffect } from "react";
import { useForm } from 'react-hook-form';

import useWindowSize from "@src/hooks/useWindowSize";
import { useAuth } from '../../hooks/auth'
import { WalletContext, ModalContext } from "@src/context";

export const RecoverPasswordModal = () => {
  const { wallet } = useContext(WalletContext);
  const { setModalLoginOpen, setModalRecoverPasswordOpen, setModalCheckEmailOpen } = useContext(ModalContext)
  const [disableBtn, setDisableBtn] = useState(false)
  const auth = useAuth();
  const { width } = useWindowSize();

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
    await auth.resetPassword(data).then(res => {
      if (res.ok) {
        setModalCheckEmailOpen(true)
      } else {
        setDisableBtn(false)
      }
    })
    reset()
  }
  
  useEffect(() => {
    if (auth.error) {
      setDisableBtn(false)
    }
  }, [auth])

  const returnSignForm = () => {
      setModalRecoverPasswordOpen(false)
      setModalLoginOpen(true)
  }

  return (
    <div className="login-modal">
      <div className="login-modal__title">Reset Password</div>
      <p className="login-modal__description">Enter your email and we'll send you a reset link.</p>
      <div className="login-body__wallet-info">
        <div className="login-body__wallet-address">
          <div className="button-wallet__icon">
            {wallet.type === "metamask" ? (
              <img src="./images/icon_metamask.svg" />
            ) : wallet.type === "binance" ? (
              <img src="./images/tokens/icon_token_bsc.svg" />
            ) : wallet.type === "walletconnect" ? (
              <img src="./images/icon_walletconnector.svg" />
            ) : (
              ""
            )}
          </div>
          <span>{width < 460  
                ? (`${String(wallet.address).substring(0, 5)}...${String(wallet.address).substring(40)}`) 
                : `${String(wallet.address).substring(0, 5)}...${String(wallet.address).substring(30)}`}
          </span>
        </div>
        <div className="login-body__wallet-status">{wallet.address ? 'Connected' : 'Disconnected'}</div>
      </div>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="login-modal__input">
          <label className="input-field__label">Email Address</label>
          <div className="input-field mt-10">
            <div className="input-field__column input-field__column_wauto buttons-switcher">
              <input
                className="input-field__input"
                placeholder="Enter Email"
                {...register("email", {
                  required: "This is a required"
                })}
              />
            </div>
          </div>
          <div className="mt-10 ml-10 input-field__input__error">
            {errors.email && <p>{errors.email.message}</p>}
          </div>
        </div>
        <button             
          type="submit" 
          disabled={disableBtn} 
          className={disableBtn
            ? "button disabled"
            : "button"}
        >
          Reset
        </button>
      </form>
      <div className="login-modal__line"> </div>
      <div className="login-modal__create">
        <a className="login-modal__forgot" onClick={() => returnSignForm()}>
        Return To Sign Form
        </a>
      </div>
    </div>
  );
};
