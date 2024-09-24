import "./App.css";
import { showToast } from "./showToast";
import Toast from "./Toast";

function App() {
  return (
    <div className="App">
      <h1>React Event Bus Toast Example</h1>
      <button
        className="info"
        onClick={() => showToast({ message: "This is a toast message!" })}
      >
        Show info Toast
      </button>
      <button
        className="success"
        onClick={() =>
          showToast({
            message: "This is a toast Success message!",
            type: "success",
          })
        }
      >
        Show Success Toast
      </button>
      <button
        className="error"
        onClick={() =>
          showToast({
            message: "This is a toast Error message!",
            type: "error",
          })
        }
      >
        Show Error Toast
      </button>
      <Toast />
    </div>
  );
}

export default App;
