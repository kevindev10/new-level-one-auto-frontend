
import { Router, Switch, Route } from 'react-router-dom'

import { createBrowserHistory } from "history"
import { wrapHistory } from "oaf-react-router"



import PrivateRoute from './components/PrivateRoute'
import SignUp from "./pages/SignUp";
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Stock from "./pages/Stock";
import PreviouslySold from "./pages/PreviouslySold";
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
import SellYourCar from './pages/SellYourCar'
import FAQ from './pages/FAQ'
import ContactUs from "./pages/ContactUs";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddCar from './pages/AddCar'
import Car from "./pages/Car"
import EditCar from './pages/EditCar';
import ViewCarsInStock from './pages/ViewCarsInStock'
import ViewSoldCars from './pages/ViewSoldCars'
import  ViewFeaturedCar from './pages/ViewFeaturedCar'




function App() {

        const history = createBrowserHistory();
        wrapHistory(history, { renderTimeout: 500 });
  return (
    <>

      <Router history={history}>

              <Navbar/>


              <Switch>

              <Route exact path='/'>
                      <Home/>
               </Route>

              <Route path="/stock" >
                      <Stock/>
              </Route>

              <Route path="/previously-sold" > 
                      <PreviouslySold/>
              </Route>



              <Route path="/sign-up"  >
                      <SignUp/>
              </Route>


              <Route path='/login'  >
                      <SignIn />
              </Route>

              <Route path='/forgot-password' >
                      <ForgotPassword />
              </Route>

           



              <Route path='/admin' >
                <PrivateRoute>  <Admin/>  </PrivateRoute>
              </Route>

              <Route path='/add-car' >
                 <PrivateRoute>  <AddCar/>  </PrivateRoute>
              </Route>


              <Route path='/edit-car/:carId' >
                 <PrivateRoute>  <EditCar/>  </PrivateRoute>
              </Route>


              <Route path='/view-cars-in-stock' >
                 <PrivateRoute > <ViewCarsInStock/> </PrivateRoute>
              </Route>

             <Route path='/view-sold-cars' >
                 <PrivateRoute > <ViewSoldCars /> </PrivateRoute>
             </Route> 


          <Route path='/view-featured-car' >
            <PrivateRoute  > < ViewFeaturedCar /> </PrivateRoute>
          </Route> 







              <Route path='/sell-your-car'  > 
                       <SellYourCar/>
              </Route>

              <Route path='/frequently-asked-questions'  >
                         <FAQ/>
              </Route>

              <Route path="/contact-us" >
                        <ContactUs/>
              </Route> 


              <Route path='/car/:carId'  >
                         <Car/>
              </Route>


          
          
        </Switch>





      </Router>

      <ToastContainer />
     
 
    </>
  );
}

export default App;
