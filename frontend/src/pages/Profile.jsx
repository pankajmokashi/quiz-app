import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { fetchQuizzes } from "../redux/actions/dataActions";
import Table from "../components/Table";

function Profile() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { userId } = useSelector((state) => state.auth);
  const { quizzes } = useSelector((state) => state.data);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    dispatch(fetchQuizzes(userId));
  }, [dispatch, isAuthenticated, userId, navigate]);

  return (
    <main className="p-4 lg:p-8">
      <div className="flex flex-col items-center">
        <div className="h-14 flex items-center justify-center">
          <Typography variant="h6" className="">
            Quiz History
          </Typography>
        </div>
        <Table data={quizzes} />
      </div>
    </main>
  );
}

export default Profile;
