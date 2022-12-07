import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store'
import UsersContainer from './UsersContainer';
function App() {
  return (
    <Provider store={store}>
       <div>
       <UsersContainer />
       </div>
    </Provider>
  );
}

export default App;
