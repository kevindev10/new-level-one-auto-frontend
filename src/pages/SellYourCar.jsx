
import React from 'react'
import astonMartin from '../assets/stockPagePhotos/aston-martin-one-77X.jpg'
import Footer from '../components/Footer'
import './SellYourCar.css'



function SellYourCar() {
  return (
    <div className='category'>
                              <div className='main-div-sellYourCar-background'  >   

                            <div className='sellYourCar-div-background-photo' style={{"backgroundImage": "url(" +astonMartin+ ") "}}>

                            <div style={{textAlign:'center', paddingTop:'13.7%'}}>
                                    <p style={{fontSize:'2.0rem', color:'white', fontWeight:'bold', letterSpacing: '0.2rem'}}>Sell Your Car</p>
                                    </div>

                            </div>


                            </div>

                            <div className='main-div-sellYourCar-background-on-mobile'  >


                            <div className='sellYourCar-div-background-photo-on-mobile' style={{"backgroundImage": "url(" +astonMartin+ ") ", }}>

                            <div style={{textAlign:'center', paddingTop:'28%'}}>
                                    <p style={{fontSize:'1.4rem', color:'white', fontWeight:'bold', letterSpacing: '0.2rem'}}>Sell Your Car</p>
                                    </div>

                            </div>


                            </div>









                            <div style={{backgroundColor:'white', padding:'2.5%'}}   >
                                                              
                                  
                                            
                                      <div style={{textAlign:'center'}}>
                                        <ul className='' style={{listStyle:'none'}}>
                                          
                                        <div className='sell-your-car-sub-heading' style={{fontSize:'1.6rem', color:'maroon', textAlign:'center'}}>
                                          <p className='vehicle-details' >Here at Level One Auto we offer a number of options when it comes to selling your car.</p> 
                                        </div>
                                          <li style={{padding:'1.5% 5% 4.5% 5%'}}>Whatever method you choose we make quick decisions and offer a first class service which makes selling your car completely hassle-free and secure.</li>



                                          <div className='sell-your-car-sub-heading' style={{fontSize:'1.6rem', color:'maroon', textAlign:'center'}}>
                                            <p className='vehicle-details' >Outright Purchase</p> 
                                          
                                          </div>
                                          <li style={{padding:'1.5% 5% 1.5% 5%'}}>This is our preferred method. Not only is it the simplest way of selling your car it is also the quickest.</li>
                                          <li style={{padding:'1.5% 5% 1.5% 5%'}}>We will provide an immediate evaluation of your car, upon agreement we will then arrange a viewing followed by an instant bank transfer. If your vehicle has outstanding finance we will also clear this for you</li>
                                          <li style={{padding:'1.5% 5% 4.5% 5%'}}>We aim to take the car away the same day leaving you with cleared funds resulting in a completely hassle-free transaction.</li>



                                          <div className='sell-your-car-sub-heading' style={{fontSize:'1.6rem', color:'maroon', textAlign:'center'}}>
                                            <p className='vehicle-details' >Sale or return</p> 
                                          </div>
                                          <li style={{padding:'1.5% 5% 1.5% 5%'}}>If you think your car is worth more than what you have been offered or you are contemplating selling privately then this could be your better option.</li>
                                          <li style={{padding:'1.5% 5% 1.5% 5%'}}>It is always worth considering our brokerage service whereby we sell the car on your behalf. Our ability to offer finance, part-exchange, warranty and that after sales care that so many buyers want will take all the risks and hassle of selling privately away from you resulting in a quicker more secure sale.</li>
                                          <li style={{padding:'1.5% 5% 1.5% 5%'}}>Other dealerships offer similar services but here at Level One Auto your vehicle will get the treatment it deserves being handled as though it is one of our own. This includes preparation to the highest standard and professionally advertised across various platforms</li>
                                          <li style={{padding:'1.5% 5% 1.5% 5%'}}>We have a very competitive commission structure which is guaranteed to beat any other dealership.</li>
                                          <li style={{padding:'1.5% 5% 4.5% 5%'}}>Please contact us for a no obligation offer or if preferred fill out the online appraisal form below and someone will get in-touch with you shortly.</li>
                                        
                                        </ul>
                                      </div>




                             </div>










                            <Footer/>

    </div>
  )
}

export default SellYourCar