
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Login from './pages/auth/login/page';
import Dashboard from './pages/home/page';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Register from './pages/auth/register/page';
import TopUp from './pages/top_up/page';
import Transaction from './pages/transacton/page';
import Service from './pages/service/page';
import Account from './pages/akun/page';
import ErrorPage from './pages/error';
import ErrorBoundary from './components/errorBoundary';
import { decryptWithExpiry } from './hook/useCript';

function App() {
  const history = useHistory();
  const location = useLocation();
  const [token, setToken] = useState<any>();

  useEffect(() => {
    getData();
  }, [location.pathname]);

  const getData = async () => {
    try {
      const res: any = localStorage.getItem('token_enc');
      var token = null;
      if (res) {
        const data_encpt: any = decryptWithExpiry(res);
        const data = JSON.parse(data_encpt.data);
        token = data.token;
      }
      setToken(token);
      if (!token) {
        if (['/register'].includes(location.pathname)) {
          return true;
        }
        return history.push('/');
      } else {
        if (['/', '/register'].includes(location.pathname)) {
          return history.push('/dashboard');
        }
      }
    } catch (e) {
      Cookies.remove('token');
    }
  }


  return (
    <Route>
      <ErrorBoundary>

        {token && <Header />}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/topup" component={TopUp} />
          <Route exact path="/transacton" component={Transaction} />
          <Route exact path="/account" component={Account} />
          <Route path="/error" component={ErrorPage} />
          <Route exact path="/:service" component={Service} />
          <Route component={ErrorPage} />
        </Switch>
      </ErrorBoundary>
    </Route>
  );
}

export default App;
