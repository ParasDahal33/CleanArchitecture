import AppRoutes from "./routes/AppRoutes";
import useAuth from "./hooks/auth/useAuth";
import NavBar from "./components/navbar/NavBar";
import SideNav from "./components/sidebar/SideNav";
import { Status } from "./helpers/constants";

function App() {
      const { isLoggedIn } = useAuth();

      return (
            <>
                  <NavBar />

                  <main id="app-container" className="flex">
                        {isLoggedIn === Status.Succeeded && <SideNav />}

                        <div id="app" className="w-full min-h-screen">
                              <AppRoutes />
                        </div>
                  </main>
            </>
      );
}

export default App;
