

import { useState,  useEffect } from 'react'
import {  useParams, useHistory } from 'react-router-dom'
import './Car.css'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {EmailShareButton, FacebookShareButton, TwitterShareButton, WhatsappShareButton} from "react-share";
import {EmailIcon, FacebookIcon, TwitterIcon, WhatsappIcon} from "react-share";
import ContactForm from '../components/ContactForm'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import audi  from '../assets/photos/audi_r8_x.jpg'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Footer from '../components/Footer'
import { Helmet, HelmetProvider } from 'react-helmet-async';



function Car() {

  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const params = useParams()
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [nav3, setNav3] = useState();
  const [open, setOpen] = useState(false);



  


  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'cars', params.carId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setCar(docSnap.data())
       
        setLoading(false)
      }
    }

    fetchListing()
    
  

  }, [history, params.carId])

  if (loading) {
    return <Spinner />
  }








  const settingsMain1 = {
   
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  

  };

  const settingsMain2 = {
    arrows:false,
    dots: false,
    infinite: true,
    slidesToShow:2,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };








const getCarPics = () => {
  let carImageUrls = car.imageUrls
  
  return carImageUrls.map((imageUrl)=>{
    
    return <div key={params.carId}>
             
                                  <img src={imageUrl} alt={car.title} className='car-page-slider-image-on-mobile'  width='620px' height='413px'  style={{objectFit:'cover', maxWidth:'100%'}}/>


                             
            </div>
  })
}










const getCarPics2 = () => {
 
  const carImageUrls = car.imageUrls;
  const index = Math.round(carImageUrls.length/3)

  // Change Array Iteration Start point to index
  const getArray = (carImageUrls, index) => {
    const result = [];
    const length = carImageUrls.length;
    for (let i = 0; i < length; i++) {
     
      result.push(carImageUrls[(index + i) % length]);
    }
    return result;
  };


const imageArrayLeft = getArray(carImageUrls , index)
 
      
      return imageArrayLeft.map((imageUrl)=>{
        
        return <div key={params.carId}>
                
                                  
                                      <img src={imageUrl} alt={car.title}  width='295px' height='201px'   style={{objectFit:'cover', maxWidth:'100%', marginLeft:'2.7%'}} />


                </div>

      })


   


}






const getCarPics3 = () => {
 
  const carImageUrls3 = car.imageUrls;
  const index3 = (Math.round(carImageUrls3.length/3))*2

  // Change Array Iteration Start point to index3
  const getArray = (carImageUrls3, index3) => {
    const result3 = [];
    const length3 = carImageUrls3.length;
    for (let i = 0; i < length3; i++) {
     
      result3.push(carImageUrls3[(index3 + i) % length3]);
    }
    return result3;
  };


const imageArrayRight = getArray(carImageUrls3 , index3)
 
      
      return imageArrayRight.map((imageUrl)=>{
        
        return <div key={params.carId}>
                 
                                  
                                      <img  src={imageUrl} alt={car.title}  width='295px'  height='201px'  style={{objectFit:'cover', maxWidth:'100%', marginLeft:'-2.7%'}} />


                </div>

      })


   


}








 // Enquire Modal styling 

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  height: "95%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 0,
  overflowY: "auto"
};




const handleClose = () =>{
  setOpen(false)
 
} ;





// Share Url

let shareUrl = window.location.href;
let title = car.title
let image = car.imageUrls[0]
let hashtag = '#leveloneauto' 
let quote =  "";
let description = car.description













  return (

  <>
<HelmetProvider>
  <div>

  <Helmet>
            <title>{title}</title>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="csrf_token" content="" />
            <meta property="type" content="website" />
            <meta property="url" content={shareUrl} />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="_token" content="" />
            <meta name="robots" content="noodp" />
            <meta property="title" content={title} />
            <meta property="quote" content={quote} />
            <meta name="description" content={description} />
            <meta property="image" content={image} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:quote" content={quote} />
            <meta property="og:hashtag" content={hashtag} />
            <meta property="og:image" content={image} />
            <meta content="image/*" property="og:image:type" />
            <meta property="og:url" content={shareUrl} />
            <meta property="og:site_name" content="Level One Auto" />
            <meta property="og:description" content={description} />  
      </Helmet>


  </div>
</HelmetProvider>


    <main
    className='car-page-main-div'
    
     >






        <div  style={{padding:'2.5%', }} >

          
         
        <div  >

        <div className='car-page-flex-title' style={{display:'flex', justifyContent:'space-between'}} >
            <h3 className='car-page-title-heading' style={{fontSize:'1.45rem', fontWeight:'bold', }}>{car.title}</h3>
            <h3 className='car-page-title-price-desktop' style={{fontSize:'1.6rem', fontWeight:'bold'
                    , color:'maroon'}} >Ksh&nbsp; {car.discountedPrice?  car.discountedPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') : car.regularPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h3>

        </div>

        <div className='car-page-title-description' style={{fontSize:'1.1rem', fontWeight:'100', marginBottom:'1.5%' }}>
          <p>{car.description}</p>
        </div>

        <div  className='car-page-title-price-mobile'>
        <h3  className='car-page-title-price-mobile-font' style={{fontSize:'1.6rem', fontWeight:'bold'
                    , color:'maroon'}} >Ksh&nbsp; {car.discountedPrice?  car.discountedPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') : car.regularPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h3>

        </div>

        </div>

  


            <div
            
             >


                            
                            

                            <div className='car-page-flex-main-sliders' style={{display:'flex' ,   height:'31.5rem' , justifyContent:'space-around' , }}>
                               

                                         
                                 
                                    <div className='car-page-slider-on-mobile' style={{width:'18.438rem', height:'12.563rem' }}>
                                     
                                        <Slider
                                        
                                          asNavFor={nav1 && nav2}
                                          ref={(slider3) => setNav3(slider3)}
                                          // slidesToShow={1}
                                          // swipeToSlide={true}
                                          // focusOnSelect={true}
                                          {...settingsMain2}
                                        >
                                        {getCarPics2()}
                                        </Slider>
                                   
                                    </div>
                                

                                
                                  
                                    <div className='car-page-div-slick-slider' style={{width:'38.75rem', height:'14.313rem' ,  marginLeft:'1.5vw', marginRight:'1.5vw'  }} >
                                      <Slider
                                      className='car-page-slick-slider'
                                      asNavFor={nav2 && nav3} 
                                      ref={(slider1) => 
                                      setNav1(slider1)} 
                                      {...settingsMain1}
                                      >
                                        {getCarPics()}
                                      </Slider>
                                    </div>
                                


                                 
                                 
                                    <div className='car-page-slider-on-mobile' style={{width:'18.438rem', height:'12.563rem',   }}>
                                      <Slider
                                        asNavFor={nav1 && nav3}
                                        ref={(slider2) => setNav2(slider2)}
                                        // slidesToShow={1}
                                        // swipeToSlide={true}
                                        // focusOnSelect={true}
                                        {...settingsMain2}
                                      >
                                      {getCarPics3()}
                                      </Slider>
                                    </div>
                                



                          


                                </div>












            </div>

        </div>
















































<div className='share-contact-enquire-print-main' style={{backgroundColor:'black', color:'white' , padding:'2.5%'}}>

      <div className='share-contact-enquire-print'  style={{display:'flex', justifyContent:"space-between"}}>



                  <div className='share-contactUs'>


                          <div className='share-main' >

                            <div className='share' style={{display:'flex', }}>
                                <p className="Share-this-vehicle" style={{fontSize: "1.0rem", lineHeight: "30px", marginRight:'2.5%' }}>Share this vehicle </p>
                                <span className=''>
                                <FacebookShareButton className='' url={shareUrl} quote={'Level One Auto'} hashtag="#leveloneauto" >
                                    <FacebookIcon size ={30} round={true} style={{marginRight:'2.5%'}}/>
                                </FacebookShareButton>&nbsp;&nbsp;&nbsp;

                                <TwitterShareButton className=''  url={shareUrl} quote={'Level One Auto'} hashtag="#leveloneauto" >
                                    <TwitterIcon size ={30} round={true}/>
                                </TwitterShareButton>&nbsp;&nbsp;&nbsp;

                                <WhatsappShareButton className=''  url={shareUrl} quote={'Level One Auto'} separator="::">
                                    <WhatsappIcon size ={30} round={true}/>
                                </WhatsappShareButton>&nbsp;&nbsp;&nbsp;

                                <EmailShareButton className=''  url={shareUrl} quote={'Level One Auto'} >
                                    <EmailIcon size ={30} round={true}/>
                                </EmailShareButton>&nbsp;&nbsp;&nbsp;  
                                </span> 
                            </div>

                              <div className='car-page-contactus' style={{display:'flex', marginTop:'1.5%'  }}>
                                <div className='car-page-call-us'  style={{display:'flex', }}> 
                                  <p className='car-page-call-us-paragraph'>Call Us : </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                                  <a href="tel:+000000000" className='car-page-call-us-paragraph'>
                                    <i className="fas fa-phone-alt fa-1x " style={{fontSize:'150%', color:'gray' ,  }}></i>
                                  </a>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p className='car-page-call-us-paragraph'>0000 000 000 </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                                </div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    
                                <div className='car-page-email-us'  style={{display:'flex', }}> 
                                <p className='car-page-call-us-paragraph'>Email Us : </p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                                  <a href="mailto:leveloneauto@email.com" target="blank" rel="noreferrer" className='car-page-call-us-paragraph'>
                                    <i className="fas fa-envelope  fa-1x footer-email" style={{fontSize:'150%'}}></i>
                                  </a>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p className='car-page-call-us-paragraph'>leveloneauto@email.com</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                                </div>

                              </div>



                          </div>



                  </div>                         






                  <div className='enquire-print' style={{display:'flex', width:'40%', justifyContent:'space-around' }}>

                      <div   className='enquire-main'>

                        <div >






                                  <Button 
                                    variant="contained"
                                    // onClick={handleOpen}

                                    onClick={() =>{
                                      setTimeout(() =>{
                                        setOpen(true) 
                                      }, 500)
                                    }}
                                    style={{'fontSize':'1.0rem', 'padding':'10px 50px 10px 50px',  letterSpacing:'0.15rem'}} 
                                    className='enquire-button-on-mobile enquire-button-hover'

                                   
                                  >
                                    Enqiure
                                  </Button>
                                  <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                  >
                                    <Fade in={open}>
                                      <Box sx={style2} className='modal-size-on-mobile'>







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






                                      <ContactForm car={car} carUrl={window.location.href} />
                                      </Box>
                                    </Fade>
                                  </Modal>





                         </div>

                      

                      </div> 























                   <div className='print-main' >
                                          <Button
                                             variant="contained"
                                             style={{'fontSize':'1.0rem', 'padding':'10px 50px 10px 50px', letterSpacing:'0.15rem',}} 
                                             className='print-button-on-mobile enquire-button-hover'
                                             onClick={() => window.print()}
                                          >
                                            
                                            Print Details
                                            
                                          </Button>
                      </div> 



                  </div>




      </div>



</div>








   









        <div style={{backgroundColor:'white', padding:'2.5%'}}   >
   
         

       
          <div className='vehicle-ovwerview'  style={{fontSize:'1.6rem', color:'maroon', textAlign:'center'}}>
           <p >Vehicle Overview</p> 
          </div>
        
           


                       <div className='vehicle-ovwerview-flex' style={{display:'flex', }}>
                                        <div className='vehicle-ovwerview-first-col' style={{width:'50%', paddingRight:'5%', paddingTop:'2.5%', paddingBottom:'2.5%'}}>

                                                        <div  style={{display:'flex', backgroundColor:'rgb(220,220,220)', padding:' 1.5%' }}>
                                                          <div style={{display:'flex', justifyContent:'flex-start', width:'50%',marginLeft:'2.5%' }}>

                                                              <p >
                                                                Make
                                                              </p>

                                                          </div>

                                                          <div style={{display:'flex', justifyContent:'flex-end', width:'50%', marginRight:'2.5%'}}>

                                                                <p >
                                                                  {car.make }
                                                                </p>

                                                          </div>
                                                          
                                                        </div>




                                                         <div style={{display:'flex', backgroundColor:'white', padding:' 1.5%' }}>
                                                            <div style={{display:'flex', justifyContent:'flex-start', width:'50%',marginLeft:'2.5%' }}>
                                                                  <p>
                                                                    Model
                                                                  </p>
                                                              </div>
                                                              <div style={{display:'flex', justifyContent:'flex-end', width:'50%', marginRight:'2.5%'}}>
                                                                  <p >
                                                                    {car.model }
                                                                  </p>
                                                              </div>
                                                         </div>






                                                         <div style={{display:'flex', backgroundColor:'rgb(220,220,220)', padding:' 1.5%' }}>
                                                          <div style={{display:'flex', justifyContent:'flex-start', width:'50%',marginLeft:'2.5%' }}>
                                                              <p >
                                                                Year
                                                              </p>
                                                            </div>
                                                            <div style={{display:'flex', justifyContent:'flex-end', width:'50%', marginRight:'2.5%'}}>
                                                                <p >
                                                                  {car.year }
                                                                </p>
                                                            </div>
                                                        </div>




                                                          <div style={{display:'flex', backgroundColor:'white', padding:' 1.5%' }} >
                                                              <div style={{display:'flex', justifyContent:'flex-start', width:'50%',marginLeft:'2.5%' }}>
                                                                  <p>
                                                                  Exterior Color
                                                                  </p>
                                                              </div>
                                                              <div style={{display:'flex', justifyContent:'flex-end', width:'50%', marginRight:'2.5%'}}>
                                                                  <p>
                                                                    {car.exteriorColor}
                                                                  </p>
                                                              </div>
                                                          </div>




                                                          <div style={{display:'flex', backgroundColor:'rgb(220,220,220)', padding:' 1.5%' }}>  
                                                          <div style={{display:'flex', justifyContent:'flex-start', width:'50%',marginLeft:'2.5%' }}>
                                                              <p >
                                                              Interior Trim
                                                              </p>

                                                          </div>
                                                              <div style={{display:'flex', justifyContent:'flex-end', width:'50%', marginRight:'2.5%'}}>
                                                                <p >
                                                                  {car.interiorTrim }
                                                                </p>
                                                              </div>
                                                          </div>

                                        </div>         




                                        <div className='vehicle-ovwerview-second-col' style={{width:'50%', paddingLeft:'5%', paddingTop:'2.5%', paddingBottom:'2.5%'}}>
                                                

                                                            <div style={{display:'flex', backgroundColor:'white', padding:' 1.5%' }} >
                                                              
                                                                <div style={{display:'flex', justifyContent:'flex-start', width:'50%', marginLeft:'2.5%' }}>

                                                                        <p >
                                                                        Body Type
                                                                        </p>

                                                                 </div>

                                                                    <div style={{display:'flex', justifyContent:'flex-end', width:'50%', marginRight:'2.5%'}}>

                                                                        <p>
                                                                          {car.bodyType }
                                                                        </p>

                                                                    </div> 

                                                             </div>





                                                              <div style={{display:'flex', backgroundColor:'rgb(220,220,220)', padding:' 1.5%' }}>
                                                                  <div style={{display:'flex', justifyContent:'flex-start', width:'50%',marginLeft:'2.5%' }}>
                                                                      <p >
                                                                      Fuel Type
                                                                      </p>
                                                                  </div>
                                                                  <div style={{display:'flex', justifyContent:'flex-end', width:'50%', marginRight:'2.5%'}}>
                                                                        <p >
                                                                          {car.fuelType}
                                                                        </p>
                                                                  </div>
                                                              </div>




                                                               <div style={{display:'flex', backgroundColor:'white', padding:' 1.5%' }} >
                                                                  <div style={{display:'flex', justifyContent:'flex-start', width:'50%',marginLeft:'2.5%' }}>
                                                                        <p >
                                                                        Engine Capacity
                                                                        </p>
                                                                  </div>
                                                                  <div style={{display:'flex', justifyContent:'flex-end', width:'50%', marginRight:'2.5%'}}>
                                                                      <p >
                                                                        {car.engineCapacity }
                                                                      </p>
                                                                  </div>
                                                               </div>




                                                                <div style={{display:'flex', backgroundColor:'rgb(220,220,220)', padding:' 1.5%' }}>
                                                                  <div style={{display:'flex', justifyContent:'flex-start', width:'50%',marginLeft:'2.5%' }}>
                                                                      <p >
                                                                      Gearbox
                                                                      </p>
                                                                  </div>
                                                                  <div style={{display:'flex', justifyContent:'flex-end', width:'50%', marginRight:'2.5%'}}>
                                                                      <p >
                                                                        {car.gearbox }
                                                                      </p>
                                                                    </div>
                                                                </div>

                                        </div>            

                       </div>


                                               







      <div style={{fontSize:'1.6rem', color:'maroon', textAlign:'center'}}>
        <p className='vehicle-details' >Vehicle Details</p> 
      </div>
              
        <div style={{textAlign:'center'}}>
          <ul className='' style={{listStyle:'none'}}>
            <li style={{padding:'2.5% 5% 2.5% 5%'}}>{car.vdOverview}</li>
            <li style={{padding:'2.5% 5% 2.5% 5%'}}>{car.vd1}</li>
            <li style={{padding:'2.5% 5% 2.5% 5%'}}>{car.vd2}</li>
            <li style={{padding:'2.5% 5% 2.5% 5%'}}>{car.vd3}</li>
            <li style={{padding:'2.5% 5% 2.5% 5%'}}>{car.vd4}</li>
            <li style={{padding:'2.5% 5% 2.5% 5%'}}>{car.vd5}</li>
          </ul>
        </div>




     </div>





     

            
     <div className='main-div-lastBannerHome'>


<div className='lastBannerHome' style={{"backgroundImage": "url(" +audi+ ") ", }}>
      <div className='lastBannerHome-background-cover'>

      


            <div className='lastBannerHome-card-width'>
              <div className='lastBannerHome-card-background'>

                    <div className='lastBannerHome-card-flex-column'>
                      <h4 style={{color:'rgb(178,34,34)', fontSize:'2.2rem', flex:'1'}}>Finance</h4>
                      <p  style={{color:'white', flex:'1', paddingBottom: '25%'}}>No matter what your requirements we have finance options that will suit you</p>
                      <div>
                        <p  style={{color:'white' , flex:'1'}}>More Info</p>
                        <DoubleArrowIcon style={{color:'rgb(178,34,34)'}}/>
                      </div>
                  </div>

              </div>

          </div>



          
        
          <div className='lastBannerHome-card-width'>
              <div className='lastBannerHome-card-background'>

                    <div className='lastBannerHome-card-flex-column'>
                      <h4 style={{color:'rgb(178,34,34)', fontSize:'2.2rem', flex:'1'}}>Sell Your Car</h4>
                      <p  style={{color:'white', flex:'1', paddingBottom: '25%'}}>A better offer than any other car buying service guaranteed.A lower sale on return commission fee than any other dealership guaranteed.A quick, secure and no hassle process whichever option you choose.</p>
                      <div>
                        <p  style={{color:'white' , flex:'1'}}>More Info</p>
                        <DoubleArrowIcon style={{color:'rgb(178,34,34)'}}/>
                      </div>
                  </div>

              </div>

          </div>


      



      
        
          <div className='lastBannerHome-card-width'>
              <div className='lastBannerHome-card-background'>

                    <div className='lastBannerHome-card-flex-column'>
                      <h4 style={{color:'rgb(178,34,34)', fontSize:'2.2rem', flex:'1'}}>Preparation</h4>
                      <p  style={{color:'white', flex:'1', paddingBottom: '25%'}}>We prepare all vehicles to our exacting standards using only the best products. We offer a ceramic coat service to ensure that your new car stays protected and looks it’s best for years to come.</p>
                      <div>
                        <p  style={{color:'white' , flex:'1'}}>More Info</p>
                        <DoubleArrowIcon style={{color:'rgb(178,34,34)'}}/>
                      </div>
                  </div>

              </div>

          </div>



      </div>


</div>


</div>








   
  </main>
  <Footer/>
</>
  )
}

export default Car