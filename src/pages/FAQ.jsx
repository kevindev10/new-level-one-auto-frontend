
import React from 'react'
import faq from '../assets/stockPagePhotos/faqs.jpg'
import Footer from '../components/Footer'

function FAQ() {
  return (
                      <div className='category'>
                      <div className='main-div-sellYourCar-background'  >   

                    <div className='sellYourCar-div-background-photo' style={{"backgroundImage": "url(" +faq+ ") "}}>

                    <div style={{textAlign:'center', paddingTop:'13.7%'}}>
                            <p style={{fontSize:'2.0rem', color:'white', fontWeight:'bold', letterSpacing: '0.2rem'}}>FAQS</p>
                            </div>

                    </div>


                    </div>

                    <div className='main-div-sellYourCar-background-on-mobile'  >


                    <div className='sellYourCar-div-background-photo-on-mobile' style={{"backgroundImage": "url(" +faq+ ") ", }}>

                    <div style={{textAlign:'center', paddingTop:'28%'}}>
                            <p style={{fontSize:'1.4rem', color:'white', fontWeight:'bold', letterSpacing: '0.2rem'}}>FAQS</p>
                            </div>

                    </div>


                    </div>









                    <div style={{backgroundColor:'white', padding:'2.5%'}}   >
                                                      
                          
                                    
                              <div style={{textAlign:'center'}}>
                                <ul className='' style={{listStyle:'none'}}>
                                  
                                <div className='sell-your-car-sub-heading' style={{fontSize:'1.6rem', color:'maroon', textAlign:'center'}}>
                                  <p className='vehicle-details' >Is a used vehicle reliable or am I inheriting problems that the previous handlers were unable to fix?</p> 
                                </div>
                                  <li style={{padding:'1.5% 5% 4.5% 5%'}}>Whereas we have many good quality vehicles in our lot, we strongly encourage our clients to ensure that specialists perform a detailed mechanical check to prevent them from purchasing rejects.</li>



                                  <div className='sell-your-car-sub-heading' style={{fontSize:'1.6rem', color:'maroon', textAlign:'center'}}>
                                    <p className='vehicle-details' >What determines the re-sale value of a car?</p> 
                                  
                                  </div>
                                  <li style={{padding:'1.5% 5% 4.5% 5%'}}>Resale value of a vehicle depends on, among other things, the condition of the vehicle, availability of spares, fuel efficiency and the brand presence in the market.</li>
                            


                                  <div className='sell-your-car-sub-heading' style={{fontSize:'1.6rem', color:'maroon', textAlign:'center'}}>
                                    <p className='vehicle-details' >What should I consider when buying a second hand vehicle?</p> 
                                  </div>
                                  <li style={{padding:'1.5% 5% 4.5% 5%'}}>We recommend that buyers have an idea of the vehicle that they want to purchase, as well as what they can afford. If they opt to finance their vehicle, we urge our clients to ensure that the repayments are affordable.</li>
                                 
                                </ul>
                              </div>




                    </div>










                    <Footer/>

                  </div>
  )
}

export default FAQ