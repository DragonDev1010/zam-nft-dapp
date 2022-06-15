import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import countries from "i18n-iso-countries";
import ReCAPTCHA from "react-google-recaptcha";

import { SelectComponent } from "@src/components/fields/Select";
import { SocialItem } from "./social-item";

import enLocale from "i18n-iso-countries/langs/en.json";
import { SOCIALS_INFO, TASKS_INFO } from "../info";

import { IconCheckMark } from "@src/icons/icons";

const recaptchaKey = process.env.RECAPTCHA_KEY

export const FormTasks = () => {
  countries.registerLocale(enLocale);
  const countryObj = countries.getNames("en", { select: "official" });
  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    mode: "onChange"
  });

  const handleSubmitForm = (data) => {
    console.log("data", data);
  };

  return (
    <>
      <div className="whitelist-body__tasks">
        <div className="whitelist-body__title">Social Media Tasks</div>
        <div className="whitelist-body__subtitle">
          Please complete the social tasks below. They’re optional, but provide
          increased chances of getting whitelisted.
        </div>
        <div className="whitelist-body__tasks-list">
          {TASKS_INFO.map((item) => (
            <SocialItem {...item} key={item.id} />
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="whitelist-body__select">
          <div className="whitelist-body__select-title">
            What’s your Country?
          </div>
          <div className="input-field mt-10 mb-10">
            <Controller
              name="country"
              control={control}
              rules={{ required: "This is a required" }}
              render={({
                field: { onChange }
              }) => (
                <SelectComponent
                  classNamePrefix="select-field"
                  className="select-field select-field-transparent"
                  onChange={onChange}
                  options={countryArr}
                  placeholder="Choose Country"
                />
              )}
            />
          </div>
          <div className="ml-10 mb-10 input-field__input__error">
            {errors.country && <p>{errors.country.message}</p>}
          </div>
        </div>
        <div className="whitelist-body__terms">
          <div className="whitelist-body__terms-title">
            Do you agree with the Terms and Conditions
          </div>
          <label className="modal__wallet-agreement whitelist-body__terms-label">
            <div className="checkbox">
              <input
                type="checkbox"
                onChange={() => setAgreement(!agreement)}
                {...register("checkbox", {
                  required: "This is a required",
                })}
              />
              <IconCheckMark />
            </div>
            <div className="checkbox-label">
              I accept the{" "}
              <a
                className="whitelist-body__terms-link"
                href="https://zam.io/docs/debe5b38c66e212ac7afddf8293af433.pdf"
                target="_blank"
              >
                Terms and Conditions
              </a>
            </div>
          </label>
          <div className="mt-10 ml-10 input-field__input__error">
            {errors.checkbox && <p>{errors.checkbox.message}</p>}
          </div>
        </div>
        <div className="whitelist-body__recaptcha">
            <Controller
              name="recaptcha"
              control={control}
              rules={{ required: "This is a required" }}
              render={({
                field: { onChange }
              }) => (
                <ReCAPTCHA
                  sitekey={recaptchaKey}
                  onChange={onChange}
                />
              )}
            />
          <div className="mt-10 ml-10 input-field__input__error">
            {errors.recaptcha && <p>{errors.recaptcha.message}</p>}
          </div>
        </div>
        <button
          className="whitelist-body__submit button"
          type="submit"
        >
          Submit Your Application
        </button>
      </form>
    </>
  );
};
