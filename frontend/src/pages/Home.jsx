import { Button, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "../redux/actions/authActions";
import { AuthDialog } from "../components/AuthDialog";

function Home() {
  let navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <main className="w-full h-full">
      <div className="h-full flex flex-col items-center justify-center gap-8">
        <Typography className="text-xl font-bold sm:text-3xl text-center">
          Welcome to the Quiz App
        </Typography>
        {isAuthenticated ? (
          <Button
            className="mt-4"
            color="green"
            onClick={() => navigate("/quiz")}
          >
            Get Started
          </Button>
        ) : (
          <div className="flex items-center gap-4">
            <AuthDialog />
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;
