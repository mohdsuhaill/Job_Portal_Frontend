import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "./components/ui/sonner.jsx";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";


 const persistor = persistStore(store);
//  const [token,setToken]=useState('')

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//       <App token={token} setToken={setToken} />
//       </PersistGate>
//     </Provider>
//     <Toaster />
//   </React.StrictMode>
// );

function AppWithState() {
  // useState must be inside a functional component
  const [token, setToken] = useState('');
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App token={token} setToken={setToken} />
      </PersistGate>
    </Provider>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWithState />
    <Toaster />
  </React.StrictMode>
);