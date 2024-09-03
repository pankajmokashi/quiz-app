import React from "react";
import { Button, Dialog } from "@material-tailwind/react";
import PropTypes from "prop-types";
import Login from "./Login";
import Signup from "./Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AuthDialog() {
  const [logIn, setLogIn] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleLogin = () => setLogIn((cur) => !cur);

  const handleLogInOpen = () => {
    handleOpen();
    setLogIn(true);
  };

  const handleSignUpOpen = () => {
    handleOpen();
    setLogIn(false);
  };

  return (
    <>
      <Button color="blue" onClick={handleLogInOpen}>
        <span>Log In</span>
      </Button>
      <Button color="green" onClick={handleSignUpOpen}>
        <span>Sign Up</span>
      </Button>

      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        {logIn ? (
          <Login handleLogin={handleLogin} />
        ) : (
          <Signup handleLogin={handleLogin} />
        )}
        <ToastContainer />
      </Dialog>
    </>
  );
}

AuthDialog.propTypes = {
  show: PropTypes.bool,
};
