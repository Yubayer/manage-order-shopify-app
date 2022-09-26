import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";

import NavBar from "./pages/NavBar";
import { Page } from "@shopify/polaris";


export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <Page fullWidth>

              <div class="row">
                <div class="col-2">
                  <NavBar />
                </div>
                <div class="col-10">
                  <Routes pages={pages} />
                </div>
              </div>
            </Page>
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
