import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./app/Navbar";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import "bulma/css/bulma.css";

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
        <Route exact path="/editPost/:postId" component={EditPostForm} />
        <Route exact path="/post/:postId" component={SinglePostPage} />
      </Switch>
    </div>
  );
}

export default App;
