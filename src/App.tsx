
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Login from './pages/auth/login/page';
import Dashboard from './pages/home/page';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Register from './pages/auth/register/page';
import TopUp from './pages/top_up/page';
import Transaction from './pages/transacton/page';
import Service from './pages/service/page';
import Account from './pages/akun/page';

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
        if (['/register'].includes(location.pathname)) {
          return true;
        }
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
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/topup" component={TopUp} />
        <Route exact path="/transacton" component={Transaction} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/:service" component={Service} />
      </Switch>
    </Route>
  );
}

export default App;
