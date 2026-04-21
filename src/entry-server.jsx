import { renderToString } from "react-dom/server";
import App from "./App.jsx";

export const render = (pathname = "/") => {
  const appHtml = renderToString(<App initialPathname={pathname} />);
  return { appHtml };
};
