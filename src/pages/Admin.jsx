
import { useState, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import {  useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { 
  // updateDoc,
  // doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  // deleteDoc,
  getCountFromServer
 } from 'firebase/firestore'
import { db } from '../firebase.config'
// import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import { IoCarSportSharp } from "react-icons/io5";
import './Admin.css'
import Footer from '../components/Footer'



function Admin() {
  
  const auth = getAuth()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const [loading, setLoading] = useState(true)
  // const [cars, setCars] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)
  const { name, email } = formData
 
  const [ collectionCount, setCollectionCount] = useState(0)
  const [ totalCarsForSale, setTotalCarsForSale] = useState(0)
  const [ totalCarsSold, setTotalCarsSold ] = useState(0)
  const [featuredVehicle, setFeaturedVehicle] = useState(null)



    const history = useHistory()




  
  const onLogout = () => {
    auth.signOut()
    history.push('/login')
  }




  
  // const onSubmit = async () => {
    
  //   try {
  //     if (auth.currentUser.displayName !== name) {
  //       // Update display name in fb
  //       await updateProfile(auth.currentUser, {
  //         displayName: name,
  //       })

  //       // Update in firestore
  //       const userRef = doc(db, 'users', auth.currentUser.uid)
  //       await updateDoc(userRef, {
  //         name,
  //       })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     toast.error('Could not update profile details')
  //   }
  // }



  // Fetch car listings

  // useEffect(() => {
  //   const fetchUserListings = async () => {
  //     const carsRef = collection(db, 'cars')

  //     const q = query(
  //       carsRef,
  //       where('userRef', '==', auth.currentUser.uid),
  //       orderBy('timestamp', 'desc')
  //     )

  //     const querySnap = await getDocs(q)

  //     let cars= []

  //     querySnap.forEach((doc) => {
  //       return cars.push({
  //         id: doc.id,
  //         data: doc.data(),
  //       })
  //     })

  //     setCars(cars)
  //     setLoading(false)
  //   }

  //   fetchUserListings()
  // }, [auth.currentUser.uid])




// On Cnange function

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }


// On Cnange function
  // const onDelete = async (carId) => {
  //   if (window.confirm('Are you sure you want to delete?')) {
  //     await deleteDoc(doc(db, 'cars', carId))
  //     const updatedCars = cars.filter(
  //       (car) => car.id !== carId
  //     )
  //     setCars(updatedCars)
  //     toast.success('Successfully Deleted Car listing!')
  //   }
  // }

  // const onEdit = (carId) => history.push(`/edit-car/${carId}`)










// Fetch collection size count from firestore

useEffect(() =>{
  const collectionCount = async() =>{
      const coll = collection(db, "cars");
      const query_ = query(coll,  where('userRef', '==', auth.currentUser.uid));
      const snapshot = await getCountFromServer(query_);
      
      setCollectionCount(snapshot.data().count);
  }

  const totalCarsForSale = async() =>{
      
    const coll = collection(db, "cars");
    const query_ = query(coll, where('sold', '==', false), where('userRef', '==', auth.currentUser.uid));
    const snapshot = await getCountFromServer(query_);
    setTotalCarsForSale(snapshot.data().count);
      
  }
  const totalCarsSold = async() =>{
      
    const coll = collection(db, "cars");
    const query_ = query(coll, where('sold', '==', true), where('userRef', '==', auth.currentUser.uid));
    const snapshot = await getCountFromServer(query_);
    setTotalCarsSold(snapshot.data().count);
      
  }

 

  
  collectionCount()
  totalCarsForSale()
  totalCarsSold ()
  
})


// Fetch featured vehicle from firestore

useEffect(() =>{


 

    const getFeaturedVehicle = async() =>{
      try {
          const carsRef = collection(db, "cars");
          const q = query(
            carsRef,
            where('featuredVehicle', '==', true),
            // where('userRef', '==', auth.currentUser.uid),
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





  return (
    <div>
    <div  className='' style={{paddingTop:'5%', }}>
    <header className='profileHeader'>
      <div style={{display:'flex', justifyContent:'flex-start', width:'50%'}}>
        <p className='' style={{ fontSize:'1.6rem', paddingBottom:'2.5%', letterSpacing:'0.25rem'}}>Admin</p>
      </div>
     
     <div style={{display:'flex', justifyContent:'flex-end', width:'50%'}}>
     <button type='button' className='logOut' onClick={onLogout}>
        Logout
      </button>
     </div>
   
    </header>

    <main>
      <div className='profileDetailsHeader'>
        <p className=''  style={{ fontSize:'1.0rem', paddingLeft:'5%', paddingRight:'5%'}}>Personal Details</p>
        {/* <p
          className='changePersonalDetails'
          onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails((prevState) => !prevState)
          }}
        >
          {changeDetails ? 'done' : 'change'}
        </p> */}
      </div>

      <div className='profileCard'>
        <form>
          <input
            type='text'
            id='name'
            //className={!changeDetails ? 'profileName' : 'profileNameActive'}
            className= 'profileNameActive'
           disabled={!changeDetails}
            value={name}
            onChange={onChange}
          />
          <input
            type='text'
            id='email'
           // className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
            className= 'profileEmailActive'
            disabled={!changeDetails}
            value={email}
            onChange={onChange}
          />
        </form>
      </div>

    <Link to='/add-car' className='createListing'>
        
        <IoCarSportSharp />
        <p>Add Car to stock</p>
        <img src={arrowRight} alt='arrow right' />
      </Link>

    


      




        <div className='cars-in-stock' style={{marginLeft:'5%', marginBottom:'5%'}}>
          <div className='cars-in-stock-header' style={{textAlign:'center',  color:'maroon', fontSize:'1.2rem'}}>
            <h3 >Cars In Stock</h3>
          </div>


                      <p className='total-cars' style={{backgroundColor:'rgba(220,220,220, 0.6)', marginBottom:'5%', padding :'5%', fontSize:'1.2rem'}}>Total Cars: {collectionCount} </p>
                     
                    <div className='total-cars-for-sale-flex' style={{display :'flex',  justifyContent:'space-between'}}>
                      <p className='total-cars-for-sale-quantity' style={{backgroundColor:'rgba(220,220,220, 0.6)', marginBottom:'5%', padding :'5%', fontSize:'1.2rem'}}>Total Cars For Sale: {totalCarsForSale} </p>
                     <button onClick={() =>history.push('/view-cars-in-stock')} className='cars-for-sale-button'  style={{marginBottom:'5%', padding :'5%', fontSize:'1.2rem', }}>View, Edit & Delete Cars For sale</button>
                    </div>

                    <div className='total-cars-for-sale-flex' style={{display :'flex',  justifyContent:'space-between'}}>
                      <p  className='total-cars-for-sale-quantity'  style={{backgroundColor:'rgba(220,220,220, 0.6)', marginBottom:'5%', padding :'5%', fontSize:'1.2rem'}}>Total Cars Sold: {totalCarsSold} </p>
                      <button  onClick={() =>history.push('/view-sold-cars')} className='cars-for-sale-button'  style={{ marginBottom:'5%', padding :'5%', fontSize:'1.2rem',}}>View, Edit & Delete Sold Car Listings </button>
                    </div>

                      {/* <p className='pageHeader'>Featured Car: {featuredVehicle[0].data.title} </p> */}
                      {featuredVehicle !== null && 
                      <div className='total-cars-for-sale-flex' style={{display :'flex',  justifyContent:'space-between'}}>
                        <p className='total-cars-for-sale-quantity' style={{backgroundColor:'rgba(220,220,220, 0.6)', marginBottom:'5%', padding :'5%', fontSize:'1.2rem'}}>Featured Car: {featuredVehicle[0].data.title} </p>
                        <button  onClick={() =>history.push('/view-featured-car')} className='cars-for-sale-button'  style={{ marginBottom:'5%', padding :'5%', fontSize:'1.2rem',}}>View & Edit Featured Car </button>
                      </div>
                      
                      }

              
         


        </div>












         
        


    </main>
  </div>
                        <Footer/>
</div>
  )
}

export default Admin