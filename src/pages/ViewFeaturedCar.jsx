


import { useState, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { useNavigate, useHistory } from 'react-router-dom'

import { 
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  getCountFromServer
 } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import CarItem from '../components/CarItem'
import './Admin.css'
import Footer from '../components/Footer'
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditCar from './EditCar'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';






function ViewFeaturedCar() {

  const [loading, setLoading] = useState(true)
  const [cars, setCars] = useState(null)
  const [featuredVehicle, setFeaturedVehicle] = useState(null)
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('')


  const auth = getAuth()



const history = useHistory()



     // Fetch car listings

     useEffect(() => {
      const fetchUserListings = async () => {
        const carsRef = collection(db, 'cars')
  
        const q = query(
          carsRef,
          where('userRef', '==', auth.currentUser.uid),
          orderBy('timestamp', 'desc')
        )
  
        const querySnap = await getDocs(q)
  
        let cars= []
  
        querySnap.forEach((doc) => {
          return cars.push({
            id: doc.id,
            data: doc.data(),
          })
        })
  
        setCars(cars)
        setLoading(false)
      }
  
      fetchUserListings()
    }, [auth.currentUser.uid])
  



// Fetch featured vehicle from firestore

useEffect(() =>{


 

  const getFeaturedVehicle = async() =>{
    try {
        const carsRef = collection(db, "cars");
        const q = query(
          carsRef,
          where('featuredVehicle', '==', true),
          where('userRef', '==', auth.currentUser.uid),
          orderBy('timestamp', 'desc')
          )
      
          const querySnap = await getDocs(q)
    
          let featuredCar= []
          querySnap.forEach((doc) => {
            return featuredCar.push({
              id: doc.id,
              data: doc.data(),
            })
          })
          
          setFeaturedVehicle(featuredCar)
          setLoading(false)




  
  
      } catch (error) {
       
      }
    } 

getFeaturedVehicle()      
}, [auth.currentUser.uid])









 // On Cnange function
//  const onDelete = async (carId) => {
//   if (window.confirm('Are you sure you want to delete?')) {
//     await deleteDoc(doc(db, 'cars', carId))
//     const updatedCars = cars.filter(
//       (car) => car.id !== carId
//     )
//     setCars(updatedCars)
//     toast.success('Successfully Deleted Car listing!')
//   }
// }

 const onEdit = (carId) =>  history.push(`/edit-car/${carId}`)

// const onEdit = (id) => {
//  setId(id)
//   setTimeout(() =>{
        
//         setOpen(true) 
//       }, 500)

// }








 // Enquire Modal styling 

 const style3 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  height: "100%",
  // bgcolor: 'background.gray',
  border: '2px solid #000',
  boxShadow: 24,
  p: 0,
  overflowY: "auto"
};



// Enqire  Modal  methods
// const handleOpen = () => setOpen(true);
const handleClose = () =>{
  setOpen(false)

} ;





  return (
    <div>

      {!loading && cars?.length > 0 && (
            
            <main>
              <div className='add-car' style={{fontSize :'1.8rem', textAlign:'center', color:'maroon', letterSpacing:'0.25rem', paddingTop:'2.5%', marginLeft:'5%', marginRight:'5%' }}>
                  <p > Featured Car </p>
              </div>
              <ul className='stock-card-ul' style={{display:'flex',  flexWrap:'wrap', listStyle:'none', paddingTop:'2.5%', width:'100%', paddingBottom:'2.5%', justifyContent:'center'}}>
                {cars.map((car) => (
                car.data.featuredVehicle && car.data.featuredVehicle === true &&
                <div className='stock-card-div' key={car.id} style={{flex:'33.33%', width:'100%', marginBottom:'2.5%', maxWidth:'33.33%'}}>
                  
                  <CarItem
                    key={car.id}
                    car={car.data}
                    id={car.id}
                    //  onDelete={() => onDelete(car.id)}
                    onEdit={() => onEdit(car.id)}
                  />
                  </div>
                ))}
              </ul>
            </main>
          )} 













         



                                <Footer/>



    </div>
  )
}

export default ViewFeaturedCar