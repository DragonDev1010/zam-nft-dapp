import React, { useContext, useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

import useWindowSize from "@src/hooks/useWindowSize";
import { useAuth } from '../../hooks/auth'
import { WalletContext, ModalContext, UserContext } from "@src/context";
import { getUserInfo } from '../../api'
import { setUserLocal } from '../../services/LocalStorageService'

export const LoginModal = () => {
  const { wallet } = useContext(WalletContext);
  const { setModalLoginOpen, setModalRecoverPasswordOpen } = useContext(ModalContext)
  const { setUserObj } = useContext(UserContext);
  const [disableBtn, setDisableBtn] = useState(false)
  const [messageRes, setMessageRes] = useState(null)
  const history = useHistory();
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
    await auth.signin(data).then(res => {
      if (!res?.error) {
        setModalLoginOpen(false)
        getUserInfo()
          .then(res => {
            let displayName = res.data.displayName
            let email = res.data.email

            if (res.data) {
              setUserObj({
                displayName: displayName,
                email: email
              })
  
              setUserLocal({
                displayName: displayName,
                email: email
              })
            }
            
          })
      } 
      else {
        setModalLoginOpen(true)
        setDisableBtn(false)
        setMessageRes('Wrong login or password!')
      }
    })

    reset()
  }

  const openModalRecovedPassword = () => {
    setModalLoginOpen(false)
    setModalRecoverPasswordOpen(true)
  }

  return (
    <div className="login-modal">
      <div className="login-modal__title">Sign In</div>
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
        <div className="mt-10 ml-10 login-modal__error">
            {messageRes && <p>{messageRes}</p>}
        </div>
        <div className="login-modal__input">
          <label className="input-field__label">Email Address</label>
          <div className="input-field mt-10">
            <div className="input-field__column input-field__column_wauto buttons-switcher">
              <input
                className="input-field__input"
                placeholder="Enter Email"
                {...register("userName", {
                  required: "This is a required"
                })}
              />
            </div>
          </div>
          <div className="mt-10 ml-10 input-field__input__error">
            {errors.userName && <p>{errors.userName.message}</p>}
          </div>
        </div>
        <div className="login-modal__input">
          <label className="input-field__label">Password</label>
          <div className="input-field mt-10">
            <div className="input-field__column input-field__column_wauto buttons-switcher">
              <input
                className="input-field__input"
                type="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: "This is a required"
                })}
              />
            </div>
          </div>
          <div className="mt-10 ml-10 input-field__input__error">
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        </div>
        <a className="login-modal__forgot" onClick={() => openModalRecovedPassword()}>
          Forgot Password?
        </a>
        <button             
          type="submit" 
          disabled={disableBtn} 
          className={disableBtn
            ? "login-modal__button button disabled"
            : "login-modal__button button"}
        >
          Sign In
        </button>
      </form>
      <div className="login-modal__line"> </div>
      <div className="login-modal__create">
        <p>
          Haven’t registered? <span onClick={() => setModalLoginOpen(false)}>Create free new account</span>
        </p>{" "}
      </div>
    </div>
  );
};
