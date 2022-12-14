import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store'
import UsersContainer from './UsersContainer';
import ResponsiveDrawer from './components/sidebar/sidebar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Main from './pages/main/Main'
// import Main from './pages/main/Main'
const drawerWidth = 240;
const App=()=> {
  return (
    
    <Provider store={store}>
       <Main/>
    </Provider>
  );
}

export default App;
