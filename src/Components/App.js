import React, { Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";

const Movies = React.lazy(() => import("./Movies/Movies"));
const SearchResults = React.lazy(() => import("./SearchResults"));
const MovieDetails = React.lazy(() =>
  import("./Movies/MovieDetails/MovieDetails")
);

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>
      <div className="app">
        <div>
          {/*<Nav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />*/}
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <h1>Loading...</h1>
              </div>
            }
          >
            <Switch>
              <Route
                path="/"
                exact
                render={(props) => (
                  <Movies
                    {...props}
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                  />
                )}
              />

              <Route
                path="/search"
                render={(props) => (
                  <SearchResults {...props} setSearchTerm={setSearchTerm} />
                )}
              />
              <Route path="/movie/:id" component={MovieDetails} />
            </Switch>
          </Suspense>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
