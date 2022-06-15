import React, { useContext, useState } from "react";
import { useForm } from 'react-hook-form';

import { ModalContext, WalletContext } from "@src/context";
import { registerUser } from '../../api'
import useWindowSize from "@src/hooks/useWindowSize";

import { IconCheckMark } from "@src/icons/icons";

export const LoginBody = () => {
  const { wallet } = useContext(WalletContext);
  const [agreement, setAgreement] = useState(wallet?.address !== "");
  const { setModalLoginOpen } = useContext(ModalContext);
  const [errorPassword, setErrorPassword] = useState('')
  const [successAlert, setSuccessAler] = useState(false)
  const [disableBtn, setDisableBtn] = useState(false)
  const { width } = useWindowSize();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    mode: "onChange"
  });

  const handleSubmitForm = async (data, e) => {
    e.preventDefault();
    if (data.password === data.confirm_password) {
      setDisableBtn(true)
      await registerUser(data)
      .then(res => {
        if (!res.controversy) {
          reset()
          console.log('User created successfully')
          setSuccessAler(true)
        }
        setDisableBtn(false)
      })
      .catch(error => {
          setDisableBtn(false)
          console.log("error", error)
      })
      reset()
    } else {
      setErrorPassword('Password do not match')
    }
  };

  return (
    <div className="login-body">
      <div className="login-body__registration">
        <div className="login-body__wallet">
          <div className="login-body__wallet-title">Wallet Address</div>
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
        </div>
        <div className="login-body__caution">
          <img src="./images/profile/caution.png" />
          <p>
            Please note that once registered you <span>will not be able</span> to change your wallet address.
          </p>
        </div>
        
        {successAlert && 
          <div className="login-body__alert">
            <p>
              Please check your email address
            </p>
          </div>
        }
        
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="login-body__registration-input">
            <label className="input-field__label">Email Address</label>
            <div className="input-field mt-10">
              <div className="input-field__column input-field__column_wauto buttons-switcher">
                <input
                  type="email"
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
          <div className="login-body__registration-input">
            <label className="input-field__label">Password</label>
            <div className="input-field mt-10">
              <div className="input-field__column input-field__column_wauto buttons-switcher">
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
            </div>
            <div className="mt-10 ml-10 input-field__input__error">
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          </div>
          <div className="login-body__registration-input">
            <label className="input-field__label">Confirm Password</label>
            <div className="input-field mt-10">
              <div className="input-field__column input-field__column_wauto buttons-switcher">
                <input
                  className="input-field__input"
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirm_password", {
                    required: "This is a required",
                  })}
                />
              </div>
            </div>
            <div className="mt-10 ml-10 input-field__input__error">
              {errors.confirm_password && <p>{errors.confirm_password.message}</p>}
              {errorPassword && <p>{errorPassword}</p>}
            </div>
          </div>
          <label className="modal__wallet-agreement mt-20">
          <div className="checkbox">
            <input type="checkbox" 
              onChange={() => setAgreement(!agreement)}
              {...register("checkbox", {
                required: "This is a required"
              })} 
            />
            <IconCheckMark />
          </div>
          <div className="checkbox-label">
            By using zam.io you agree to our{" "}
            <a href="https://zam.io/docs/debe5b38c66e212ac7afddf8293af433.pdf" target="_blank">
              Terms and Conditions
            </a>{" "}
            along with our{" "}
            <a href="https://zam.io/docs/5e7b377cde8403176232a4cff7b679b4.pdf" target="_blank">
              Privacy Policy
            </a>{" "}
            and any other applicable documents.
          </div>

          </label>
          <div className="mt-10 ml-10 input-field__input__error">
            {errors.checkbox && <p>{errors.checkbox.message}</p>}
          </div>
          <button 
            type="submit" 
            disabled={disableBtn} 
            className={disableBtn
              ? "login-body__button button disabled"
              : "login-body__button button"}
          >
              Create Account
          </button>
        </form>
      </div>
      <div className="login-body__line"></div>
      <div className="login-body__signin">
        <div className="login-body__signin-title">Already Registered?</div>
        <button className="login-body__signin-button" onClick={setModalLoginOpen}>Sign In</button>
      </div>
    </div>
  );
};
