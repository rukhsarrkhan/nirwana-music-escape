import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Main from './pages/main/Main';
import {  BrowserRouter as Router } from 'react-router-dom';
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Main />
      </Router>
    </Provider>
  );
};

export default App;
