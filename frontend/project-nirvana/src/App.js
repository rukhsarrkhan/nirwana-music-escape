import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store'
import UsersContainer from './UsersContainer';
// import Main from './pages/main/Main'
function App() {
  return (
    <Provider store={store}>
       <div>
       <UsersContainer />
        {/* <Main/> */}
       </div>
    </Provider>
  );
}

export default App;
