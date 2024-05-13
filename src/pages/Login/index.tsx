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
import Loading from "src/components/Loader";

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

  const { mutate, isPending } = loginMutation();

  const onSubmit = () => {
    const { username, password } = getValues();

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          dispatch(loginHandler(data.access_token));
          navigate("/admin/add");
          successToast("Welcome");
          if (error) $error(false);
        },
        onError: () => $error(true),
      }
    );
  };
  return (
    <div className={cl("max-w-sm w-full mx-auto")}>
      <h3 className="text-center mb-3">Log in</h3>
      {isPending && <Loading />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput className="mb-0" error={errors.username}>
          <MainInput
            register={register("username", { required: "required" })}
            autoFocus
            placeholder={"Username"}
          />
        </BaseInput>
        <BaseInput className="mb-0" error={errors.password}>
          <MainInput
            register={register("password", { required: "required" })}
            type="password"
            className={cl("mb-4")}
            placeholder={"Password"}
          />
          {error && (
            <p className="text-danger">Incorrect username or password</p>
          )}
        </BaseInput>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
