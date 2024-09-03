import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { loginSuccess } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";

function Login({ handleLogin }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setError(null);
    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      }
    );

    if (res.ok) {
      const data = await res.json();
      const { token, userId } = data;
      localStorage.setItem("userId", userId);
      dispatch(loginSuccess(token, userId));
    } else {
      const errorData = await res.json();
      setError(errorData.message);
    }
  };

  return (
    <>
      <Card className="mx-auto w-full max-w-[32rem]">
        <CardBody className="flex flex-col gap-4">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Log in to your account
          </h1>
          {error && <div className="text-red-500">{error}</div>}
          <Typography className="-mb-2" variant="h6">
            Your Username
          </Typography>
          <Input
            label="Username"
            size="lg"
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
          <Typography className="-mb-2" variant="h6">
            Your Password
          </Typography>
          <Input
            label="Password"
            type="password"
            size="lg"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <div className="-ml-2.5 -mt-3">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            fullWidth
            className="text-xs font-semibold"
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Typography variant="small" className="mt-4 flex justify-center">
            Don&apos;t have an account?
            <span
              color="blue-gray"
              className="ml-1 font-bold cursor-pointer text-blue-gray-900"
              onClick={handleLogin}
            >
              Sign up
            </span>
          </Typography>
        </CardFooter>
      </Card>
    </>
  );
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
