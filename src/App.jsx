import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './redux/appStore';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <Header />
        <Outlet />
      </Provider>
    </>
  );
};

export default App;
