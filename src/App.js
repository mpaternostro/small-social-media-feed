import React from "react";
import Navbar from "./app/Navbar";
import { Switch, Route } from "react-router-dom";
import "bulma/css/bulma.css";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <>
              <AddPostForm />
              <PostsList />
            </>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
