import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style/App.css";
import "./style/index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      // WARNING: Enabling strict mode will cause the component to render twice.
      // SEE: https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar#:~:text=React.Strict%20mode%20is%20on
      // ALSO SEE: https://beta.reactjs.org/learn/you-might-not-need-an-effect
      // <React.StrictMode>
      <Provider store={store}>
            <BrowserRouter>
                  <App />
            </BrowserRouter>
      </Provider>
      // </React.StrictMode>
);
