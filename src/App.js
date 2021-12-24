import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import "antd/dist/antd.css";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import BookingTruck from './Pages/BookingTruck/BookingTruck';
import Header from './Pages/Shared/Header';
import Truck from './Pages/Home/Truck';
import Footer from './Pages/Shared/Footer';
import AuthProvider from './Context/AuthProvider/AuthProvider';
import UserBooking from './Pages/User/UserBookings/UserBooking';
import AddTruck from './Pages/Admin/AddTruck/AddTruck';
import AdminHome from './Pages/Admin/AdminHome/AdminHome';
import EditTruck from './Pages/Admin/EditTruck/EditTruck';

function App() {
  const user = localStorage.getItem("user");
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* <Header /> */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <PrivateRoute path="/booking/:truckId">
            <BookingTruck />
          </PrivateRoute>
          <PrivateRoute path="/userbookings">
            <UserBooking />
          </PrivateRoute>
          <AdminRoute path="/adminHome">
            <AdminHome />
          </AdminRoute>
          <AdminRoute path="/addTruck">
            <AddTruck />
          </AdminRoute>
          <AdminRoute path="/editTruck/:truckId">
            <EditTruck />
          </AdminRoute>
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

export function PrivateRoute(props){
  if(localStorage.getItem('user')){
    return <Route {...props} />
  } else {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }
}
export function AdminRoute(props){
  const user = JSON.parse(localStorage.getItem("user"));
  if(user?.role === "admin"){
    return <Route {...props} />
  } else {
    return <Redirect to="/" />
  }
}