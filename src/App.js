import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import "antd/dist/antd.css";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import BookingTruck from './Pages/BookingTruck/BookingTruck';
import Header from './Pages/Shared/Header';
import Truck from './Pages/Rent/Truck/Truck';
import Footer from './Pages/Shared/Footer';
import AuthProvider from './Context/AuthProvider/AuthProvider';
import UserBooking from './Pages/User/UserBookings/UserBooking';
import AddTruck from './Pages/Admin/AddTruck/AddTruck';
import AdminHome from './Pages/Admin/AdminHome/AdminHome';
import EditTruck from './Pages/Admin/EditTruck/EditTruck';
import Rent from './Pages/Rent/Rent/Rent';
import Navbar from './Pages/Shared/Navbar';
import Car from './Pages/Rent/Car/Car';
import Bike from './Pages/Rent/Bike/Bike';
import AddCar from './Pages/Admin/AddCar/AddCar';
import EditCar from './Pages/Admin/EditCar/EditCar';
import AddBike from './Pages/Admin/AddBike/AddBike';
import EditBike from './Pages/Admin/EditBike/EditBike';

function App() {
  const user = localStorage.getItem("user");
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
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
          <PrivateRoute path="/rent">
            <Rent />
            <Switch>
              <PrivateRoute exact path="/rent/">
                <Truck />
              </PrivateRoute>
              <PrivateRoute path="/rent/truck">
                <Truck />
              </PrivateRoute>
              <PrivateRoute path="/rent/car">
                <Car />
              </PrivateRoute>
              <PrivateRoute path="/rent/bike">
                <Bike />
              </PrivateRoute>
              <AdminRoute path="/rent/addTruck">
                <AddTruck />
              </AdminRoute>
              <AdminRoute path="/rent/addCar">
                <AddCar />
              </AdminRoute>
              <AdminRoute path="/rent/addBike">
                <AddBike />
              </AdminRoute>
              
              <AdminRoute path="/rent/editTruck/:truckId">
                <EditTruck />
              </AdminRoute>
              <AdminRoute path="/rent/editCar/:carId">
                <EditCar />
              </AdminRoute>
              <AdminRoute path="/rent/editBike/:bikeId">
                <EditBike />
              </AdminRoute>
            </Switch>
          </PrivateRoute>

          <PrivateRoute path="/userbookings">
            <UserBooking />
          </PrivateRoute>
          <AdminRoute path="/adminHome">
            <AdminHome />
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