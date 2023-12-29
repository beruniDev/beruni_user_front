import { useForm } from "react-hook-form";
import { useState } from "react";
import cl from "classnames";

import { useAppDispatch } from "src/store/utils/types";
import { successToast } from "src/utils/toast";
import BaseInput from "src/components/BaseInputs";
import MainInput from "src/components/BaseInputs/MainInput";
import { loginHandler } from "src/store/reducers/auth";
import loginMutation from "src/hooks/mutation/login";
import Button from "src/components/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const [error, $error] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { mutate } = loginMutation();

  const onSubmit = () => {
    const { username, password } = getValues();

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          dispatch(loginHandler(data.access_token));
          navigate("/admin/add");
          successToast("Добро пожаловать");
          if (error) $error(false);
        },
        onError: () => $error(true),
      }
    );
  };
  return (
    <div className={cl("max-w-sm w-full mx-auto")}>
      <h3 className="text-center mb-3">Авторизация</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput className="mb-0" error={errors.username}>
          <MainInput
            register={register("username", { required: "required" })}
            autoFocus
            placeholder={"Логин"}
          />
        </BaseInput>
        <BaseInput className="mb-0" error={errors.password}>
          <MainInput
            register={register("password", { required: "required" })}
            type="password"
            className={cl("mb-4")}
            placeholder={"Пароль"}
          />
          {error && (
            <p className="text-danger">
              Неправильное имя пользователя или пароль.
            </p>
          )}
        </BaseInput>

        <Button type="submit" className="bg-gray-300 w-full">
          Логин
        </Button>
      </form>
    </div>
  );
};

export default Login;
