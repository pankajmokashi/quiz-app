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
import { useDispatch } from "react-redux";
import { registerSuccess } from "../redux/actions/authActions";

function Signup({ handleLogin }) {
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setError(null);

    if (password == credentials.password) {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      if (res.ok) {
        dispatch(registerSuccess());
        handleLogin();
      } else {
        const errorData = await res.json();
        setError(errorData.message);
      }
    } else {
      setError("Password mismatch.");
    }
  };

  return (
    <>
      <Card className="mx-auto w-full max-w-[32rem]">
        <CardBody className="flex flex-col gap-4">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign up to your account
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
          <Typography className="-mb-2" variant="h6">
            Confirm Password
          </Typography>
          <Input
            label="Confirm Password"
            type="password"
            size="lg"
            onChange={(e) => setPassword(e.target.value)}
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
            Sign Up
          </Button>
          <Typography variant="small" className="mt-4 flex justify-center">
            Already have an account?
            <span
              className="ml-1 font-semibold cursor-pointer text-blue-gray-900"
              onClick={handleLogin}
            >
              Log In
            </span>
          </Typography>
        </CardFooter>
      </Card>
    </>
  );
}

Signup.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Signup;
