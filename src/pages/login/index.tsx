import { AuthPage } from "@refinedev/antd";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: { email: "martinondiwa@gmail.com", password: "demodemo" },
      }}
    />
  );
};
