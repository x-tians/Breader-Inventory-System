import './App.css';
import './mediaQuery.css'
import {useSelector, useDispatch} from 'react-redux'
import Login from './pages/LoginPage';
import UserDashboardHomePage from './pages/UserDashboardHomePage';
import {Routes, Route,useNavigate,Navigate } from 'react-router-dom';
import DashboardAddProductPage from './pages/DashboardAddProductPage';
import DashboardCashierPage from './pages/DashboardCashierPage'
import DashboardProfilePage from './pages/DashboardProfilePage';



function App() {
  const uname=useSelector( state=>state );
  const navigate = useNavigate();
  
  return (
    <div className='App'>
      {/*Routes */}
      <Routes>
        <Route  path='/home' element ={ <UserDashboardHomePage/> }></Route>
        <Route  path='/products' element ={ <DashboardAddProductPage/> }></Route>
        <Route  path='/cashier' element ={ <DashboardCashierPage/> }></Route>
        <Route path ='/' element ={ <Login/> }/>
        <Route path ='/profile' element ={ <DashboardProfilePage/> }/>
      </Routes>
    </div>
  );
}

export default App;