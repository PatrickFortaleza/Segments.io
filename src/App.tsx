import { useEffect } from "react";
import { Api } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "./redux/actions/users";
import Sidebar from "./components/Sidebar";

function App() {
  const api = new Api();

  const users = useSelector((state: any) => state.usersReducer.users);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const result = await api.getUserData();
      if (result.error === true) throw new Error("Error fetching user data");

      dispatch(initializeUsers({ users: result }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {Array.isArray(users) && users.length > 0 && users.length}
      <Sidebar />
    </div>
  );
}

export default App;
