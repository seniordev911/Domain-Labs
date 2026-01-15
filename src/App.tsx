import ContextWrapper from "./ContextWrapper";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CounterProvider, ThemeProvider } from "./utils/store";
import ContextProvider from "./utils/ContextProvider";

const App = () => {

  return (
    <ContextProvider>
      <CounterProvider>
        <ThemeProvider>
          < ContextWrapper />
        </ThemeProvider>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </CounterProvider>
    </ContextProvider>
  );
};

export default App;