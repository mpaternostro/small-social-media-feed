import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./app/Navbar";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";
import NotificationList from "./features/notifications/NotificationList";
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
        <Route exact path="/users" component={UsersList} />
        <Route exact path="/users/:userId" component={UserPage} />
        <Route exact path="/notifications" component={NotificationList} />
      </Switch>
    </div>
  );
}

export default App;
