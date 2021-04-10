import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AddPost from "./components/AddPost";
import ShowPosts from "./components/ShowPosts";

import "./App.css";

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact component={ShowPosts} />
          <Route path='/posts/add' component={AddPost} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
