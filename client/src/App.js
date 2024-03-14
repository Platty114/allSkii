import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Trails from './pages/Trails';
import Reviews from './pages/Reviews';
import Blogs from './pages/Blogs';
import Events from './pages/Events';
import Topbar from './components/Topbar';

function App() {
  return (
    <Router>
      <div>
        <Topbar />
        <Routes>
          <Route path="/" exact component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/trails" component={Trails} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/blogs" component={Blogs} />
          <Route path="/events" component={Events} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
