


import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import {  useHistory } from 'react-router-dom'

import { 

  collection,
  getDocs,
  query,
  where,
  orderBy,

 } from 'firebase/firestore'
import { db } from '../firebase.config'

import CarItem from '../components/CarItem'
import './Admin.css'
import Footer from '../components/Footer'







function ViewFeaturedCar() {

  const [loading, setLoading] = useState(true)
  const [featuredVehicle, setFeaturedVehicle] = useState(null)
  const auth = getAuth()
  const history = useHistory()



  



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











  return (
    <div>

        {!loading  && (
               
      
                   <>
                       
                       <div style={{fontSize :'1.6rem', textAlign:'center', color:'maroon', letterSpacing:'0.25rem'}}>
                         <p className='listingText'>Your Car Listings</p>
                     </div>
                     <ul  className='stock-card-ul' style={{display:'flex',  flexWrap:'wrap', listStyle:'none', paddingTop:'2.5%', width:'100%', paddingBottom:'2.5%', justifyContent:'center'}}>
                       {
                        featuredVehicle && featuredVehicle.length > 0 &&
                        <div className='stock-card-div' key={featuredVehicle[0].id} style={{flex:'33.33%', width:'100%', marginBottom:'2.5%', maxWidth:'33.33%'}}>
                              <CarItem
                                key={featuredVehicle[0].id}
                                car={featuredVehicle[0].data}
                                id={featuredVehicle[0].id}
                                //  onDelete={() => onDelete(car.id)}
                                onEdit={() => onEdit(featuredVehicle[0].id)}
                              />
                         </div>
                       }
                     </ul>
                   </>
                 )} 
  












         



                                <Footer/>



    </div>
  )
}

export default ViewFeaturedCar