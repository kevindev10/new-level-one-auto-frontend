

import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useHistory } from 'react-router-dom'
import { 

  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,

 } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import CarItem from '../components/CarItem'
import './Admin.css'
import Footer from '../components/Footer'








function ViewSoldCars() {


  const [loading, setLoading] = useState(true)
  const [cars, setCars] = useState(null)



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



  // On Cnange function
  const onDelete = async (carId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'cars', carId))
      const updatedCars = cars.filter(
        (car) => car.id !== carId
      )
      setCars(updatedCars)
      toast.success('Successfully Deleted Car listing!')
    }
  }


  const onEdit = (carId) => history.push(`/edit-car/${carId}`)

  









  return (
    <div>

        {!loading && cars?.length > 0 && (
            
                        
                              
            <main>

            <div className='add-car'  style={{fontSize :'1.8rem', textAlign:'center', color:'maroon', letterSpacing:'0.25rem', paddingTop:'2.5%', marginLeft:'5%', marginRight:'5%' }}>
                <p > View, Edit & Delete Sold Car Listings </p>
            </div>
                <ul className='stock-card-ul' style={{display:'flex',  flexWrap:'wrap', listStyle:'none', paddingTop:'2.5%', width:'100%', paddingBottom:'2.5%'}} >
                  {cars.map((car) => (
                    car.data.sold === true &&
                    <div className='stock-card-div' key={car.id} style={{flex:'33.33%', width:'100%', marginBottom:'2.5%', paddingLeft:'2.5%', paddingRight:'2.5%', maxWidth:'33.33%'}}>
                      <CarItem
                        key={car.id}
                        car={car.data}
                        id={car.id}
                        onDelete={() => onDelete(car.id)}
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

export default ViewSoldCars