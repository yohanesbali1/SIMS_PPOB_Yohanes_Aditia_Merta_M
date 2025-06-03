
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Login from './pages';
import dashboard from './pages/dashboard';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

function App() {
  const history = useHistory();
  const location = useLocation();
  const token = Cookies.get('token');

  useEffect(() => {
    getData();
  }, [location.pathname]);

  const getData = async () => {
    try {
      if (!token) {
        return history.push('/');
      }
    } catch (e) {
      Cookies.remove('token');
    }
  }


  return (
    <Route>
      {token && <Header />}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={dashboard} />
      </Switch>
    </Route>
  );
}

export default App;
