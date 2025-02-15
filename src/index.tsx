import ReactDOM from "react-dom";
import reducer from "../src/Redux/Reducer";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import "./i18n";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/browser";
import "./style/index.css";
import { registerSW } from "virtual:pwa-register"

if (import.meta.env.PROD) {
  registerSW({ immediate: false })
}

const store = createStore(reducer, applyMiddleware(thunk));
if (import.meta.env.PROD) {
  Sentry.init({
    environment: import.meta.env.MODE,
    dsn: "https://8801155bd0b848a09de9ebf6f387ebc8@sentry.io/5183632",
  });
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0e9f6e",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
