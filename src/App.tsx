import { useEffect, useMemo, useState } from "react";
import { Api } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "./redux/actions/users";
import Sidebar from "./components/Sidebar";
import DropBuckets from "./components/DropBuckets";
import Summary from "./components/Summary";
import Header from "./components/Header";
import { initializeAttributeMeta } from "./redux/actions/attribute";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

function App() {
  const [usersPopulated, setUsersPopulated] = useState<Boolean>(false);
  const isMobile = useMemo(
    () => window.matchMedia("(any-hover: none)").matches,
    [window]
  );
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
      {isMobile && (
        <Modal
          title={"Segments.io"}
          badge={"question circle outline"}
          enable={{
            setter: null,
            value: true,
          }}
        >
          <>
            <br />
            <p>
              Sorry! Segments.io is not build for mobile devices yet, but we
              will be working on mobile versions in the near future.
            </p>
            <br />
            <p>
              Please consider following me on{" "}
              <a
                href="https://github.com/PatrickFortaleza"
                target="blank_"
                rel="noreferrer"
              >
                github
              </a>{" "}
              for the latests updates on this project.
            </p>
          </>
        </Modal>
      )}
      <Header />
      <Sidebar />
      {!isMobile && (
        <main>
          <div className="main__container">
            <DropBuckets />
          </div>
        </main>
      )}
      <Summary />
      <Footer />
    </div>
  );
}

export default App;
