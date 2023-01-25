
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




function ViewCarsInStock() {


  const [loading, setLoading] = useState(true)
  const [cars, setCars] = useState(null)
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('')


  const auth = getAuth()
  // const navigate = useNavigate()
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

  // const onEdit = (id) => {
  //  setId(id)
  //   setTimeout(() =>{
          
  //         setOpen(true) 
  //       }, 500)

  // }

  // onClick={() =>{
  //   setTimeout(() =>{
  //     setOpen(true) 
  //   }, 500)
  // }}


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

                      <div className='add-car' style={{fontSize :'1.8rem', textAlign:'center', color:'maroon', letterSpacing:'0.25rem', paddingTop:'2.5%', marginLeft:'5%', marginRight:'5%'}}>
                           <p >View, Edit & Delete Your Car Listings</p>
                      </div>
                  
                    <ul className='stock-card-ul' style={{display:'flex',  flexWrap:'wrap', listStyle:'none', paddingTop:'2.5%', width:'100%', paddingBottom:'2.5%'}} >
                      {cars.map((car) => (
                        car.data.sold === false && ! car.data.featuredVehicle &&
                        // car.data.featuredVehicle && car.data.featuredVehicle === true &&
                     
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
















                <div   className='enquire-main'>

                <div >





{/* 
                          <Button 
                            variant="contained"
                            // onClick={handleOpen}

                            onClick={() =>{
                              setTimeout(() =>{
                                setOpen(true) 
                              }, 500)
                            }}
                            style={{'backgroundColor':'black', 'color':'white', 'fontSize':'1.0rem', 'padding':'10px 50px 10px 50px',  border:'4px solid maroon', letterSpacing:'0.15rem'}} 
                            className='enquire-button-on-mobile'

                          
                          >
                            Enqiure
                          </Button> */}
                         




                              

                            {/* <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            BackdropProps={{style: {backgroundColor: 'rgb(224,224,224)'}}}
                          >
                            <Fade in={open}>
                              <Box sx={style3} className='modal-size-on-mobile'>







                              {open === true &&

                                <div style={{textAlign:'right'}}>
                                    <IconButton
                                      aria-label="close"
                                        onClick={handleClose}
                                        sx={{
                                          position: '',
                                          zIndex: '1800 !important',
                                      
                                        
                                          // color: (theme) => theme.palette.error.light,
                                          
                                        }}
                                        style={{ marginTop:'2.5%', marginRight:'2.5%' }}
                                        className=''
                                      >
                                    <CloseIcon
                                    sx={{  color:'black' }}
                                    style={{fontSize:'2.5rem'}}
                                    className='modal-x-icon-on-mobile'
                                    />
                                    </IconButton>


                                  </div>

                                } 






                                  

                                  <EditCar id={id}/> */}
                              {/* <ContactForm car={car} carUrl={window.location.href} /> */}
                              {/* </Box>
                            </Fade>
                          </Modal> */}





                </div>



                </div>














 <Footer/>

    </div>
  )
}

export default ViewCarsInStock