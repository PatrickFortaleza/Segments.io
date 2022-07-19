import { useEffect, useState } from "react";
import { Api } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "./redux/actions/users";
import Sidebar from "./components/Sidebar";
import DropBuckets from "./components/DropBuckets";
import Summary from "./components/Summary";
import Header from "./components/Header";
import { initializeAttributeMeta } from "./redux/actions/attribute";

function App() {
  const [usersPopulated, setUsersPopulated] = useState<Boolean>(false);
  const api = new Api();

  const users = useSelector((state: any) => state.users.users);
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

  useEffect(() => {
    if (Array.isArray(users) && users.length > 0 && usersPopulated === false) {
      dispatch(initializeAttributeMeta({ users: users }));
      setUsersPopulated(true);
    }
  }, [users]);

  return (
    <div className="app">
      <Header />
      <div className="body">
        <Sidebar />
        <main>
          <DropBuckets />
          <Summary />
        </main>
      </div>
    </div>
  );
}

export default App;
