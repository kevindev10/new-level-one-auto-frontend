
import faq from '../assets/stockPagePhotos/faqs.jpg'
import Footer from '../components/Footer'
import contactUs from '../assets/stockPagePhotos/Contact_Us.jpg'
import './ContactUs.css';
import { Form, Field } from "react-final-form";
import Button from '@mui/material/Button';


import { useState, useRef, useEffect } from 'react';



import ReCAPTCHA from "react-google-recaptcha";




const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const required = value => (value ? undefined : "*Required");
const mustBeNumber = value => (isNaN(value) ? "Must be a number" : undefined);

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);




function ContactUs() {



  
  const [reCaptcha, setRecaptcha] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiResponseMessage, setApiResponseMessage] = useState('')
  const [sent, setSent] = useState(false)


  let captchaRef = useRef();
  let captchaMsgResRef = useRef();
  let captchaMsgResRef2 = useRef();



  const  onReCaptureChange = (value) =>{
      setRecaptcha(value)
	
	}


  // process.env.REACT_APP_OPENWEATHER_GEOCODE_API_KEY

  // REACT_APP_ PORT

  // process.env.REACT_APP_ PORT

  const FETCHPORT =  process.env.REACT_APP_PORT || 3001 ;
 


 const handleSubmit = async values =>{
  await sleep(300);


    setLoading(true)
    fetch(`http://192.168.100.4:${FETCHPORT}/contactUs`, {
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
      
      email: values.email,
      phone: values.phone,
      message: values.message,
      yourName: values.name,
      captcha:reCaptcha
      
     
      })
    })

    .then(response =>response.json())

    .then(data => {
     
      setLoading(false)
      if (data.success===false){
        setSent(false)
       setApiResponseMessage(data.msg)
        

       captchaMsgResRef.current.scrollIntoView({ behavior: 'smooth',block: 'center',	inline: 'center'})
 
       
     }else if(data.success===true){
      setSent(true)
      setApiResponseMessage(data.msg)
       
        setTimeout(() =>{
          captchaMsgResRef2.current.scrollIntoView({ behavior: 'smooth',block: 'center',	inline: 'center'})
        }, 500)
   
    }
    
    })


    //   console.log(car)

    // console.log( values.email, values.phone, values.message,  values.name, car.title, car.description, carUrl, reCaptcha )





     captchaRef.reset();

  };















  return (
   
                  <div className='category'>
                      <div className='main-div-sellYourCar-background'  >   

                    <div className='sellYourCar-div-background-photo' style={{"backgroundImage": "url(" +contactUs+ ") "}}>

                    <div style={{textAlign:'center', paddingTop:'13.7%'}}>
                            <p style={{fontSize:'2.0rem', color:'white', fontWeight:'bold', letterSpacing: '0.2rem'}}></p>
                            
                            </div>

                    </div>


                    </div>

                    <div className='main-div-sellYourCar-background-on-mobile'  >


                    <div className='sellYourCar-div-background-photo-on-mobile' style={{"backgroundImage": "url(" +contactUs+ ") ", }}>

                    <div style={{textAlign:'center', paddingTop:'28%'}}>
                            <p style={{fontSize:'1.4rem', color:'white', fontWeight:'bold', letterSpacing: '0.2rem'}}></p>
                            </div>

                    </div>


                    </div>









                    <main style={{backgroundColor:'white',  paddingBottom:'5%'}}>
                  <div className=' contact-main-flex contact-form-main-flex' style={{'width':'82.4%' ,'marginLeft':'8.8%', 'marginRight':'8.8%', display:'flex', paddingTop:'5%', paddingBottom:'5', }}>
      
                        <article className='contact-getintouch-width' style={{'width':'40%'}}>
                                      
                        <h2 className=" contact-headings-on-mobile" style={{'fontSize':'1.8rem', marginBottom:'3%' , marginTop:'4%', textAlign:'left'}}>
                          CONTACT US
      
                        </h2>
                        <h2 className="  " style={{'color':'#3F1717', 'fontSize':'1.4rem', marginBottom:'4%' , marginTop:'4%',}}>
                          
                          Telephone <i className="fas fa-phone fa-1x " style={{marginLeft:'3%', color:'#ADD8E6'}}></i>
                        </h2>
                        
                        <a href="tel:0789563415" className='instead-of-gray  ' style={{ 'fontSize':'1.0rem', textDecoration:'none'}}> (+254) 0789563415</a><br />
      
                        <a href="tel:0721490923" className='instead-of-gray ' style={{ 'fontSize':'1.0rem' , textDecoration:'none'}}>(+254) 0721490923</a><br/>
      
      
                        <div style={{'borderTop':'1px solid #B8B8B8 ', marginBottom:'4%' , marginTop:'4%', marginRight:'5%'}}  className='linez'/>
      
      
      
      
                        <h2 className=" " style={{'color':'#3F1717', 'fontSize':'1.4rem', marginTop:'0%', marginBottom:'4%'}}>
                          
                          WhatsApp <i className=" fab fa-whatsapp-square fa-1x "  style={{marginLeft:'3%', color:'green'}}></i>
                        </h2>
                        
                        <a href="https://wa.me/254789563415" target="blank" rel="noreferrer" className='instead-of-gray'  style={{ 'fontSize':'1.0rem', textDecoration:'none'}}>	(+254) 0789563415  </a>
      
      
                        <div style={{'borderTop':'1px solid #B8B8B8 ', marginBottom:'4%' , marginTop:'4%', marginRight:'5%'}}  className=' linez'/>
      
      
      
      
                        <h2 className="   " style={{'color':'#3F1717',  'fontSize':'1.4rem' , marginTop:'0%', marginBottom:'4%'}}>
                          Email <i className="fa fa-envelope fa-1x" aria-hidden="true" style={{marginLeft:'3%', color:'#ADD8E6'}}></i>
                          </h2>
                          <p className='pv3 email-us'>
                          <a href="mailto:sales@flexdevske.co.ke"  className=' instead-of-gray   '  style={{"wordWrap": "breakWord", 'fontSize':'1.0rem', textDecoration:'none'}} >sales@flexdevske.co.ke </a>	<br />						
                        </p>
      
                        <a href="mailto:flexdevske@gmail.com"  className=' instead-of-gray  '  style={{"wordWrap": "breakWord", 'fontSize':'1.0rem', textDecoration:'none'}} >flexdevske@gmail.com </a>		
                          
                        
      
      
                        <div style={{'borderTop':'1px solid #B8B8B8 ', marginBottom:'4%' , marginTop:'4%', marginRight:'5%'}}  className=' linez'/>
      
      
      
      
                        <h2 className=" mid-instead-of-gray "  style={{'color':'#3F1717', 'fontSize':'1.4rem', marginTop:'0%', marginBottom:'4%'}}>
                          Address <i className="fa fa-map-marker fa-1x " aria-hidden="true" style={{marginLeft:'3%', color:'red'}}></i>
                        </h2>
                        <p className="f4   instead-of-gray  "  style={{"wordWrap": "breakWord", 'fontSize':'1.0rem'}}> 
                        P.O BOX 26560 00504, </p><br/>
                        <p className="f4   instead-of-gray  "  style={{"wordWrap": "breakWord", 'fontSize':'1.0rem'}}> Nairobi, Kenya. </p>
                        <div style={{ marginBottom:'4%' , marginTop:'4%', marginRight:'5%'}}  className='linez'/>
                          
                        
                        
      
                      </article>
      
      
      
                      <div className='contact-getfreequote-width' style={{'width':'60%'}} >
                    

                      <div>















                                                  
            { !sent ?
               (




                          
                  <article  style={{'backgroundColor':'#FBFBFB', padding:'5.5%', marginTop:'12%',  }} className='contact-form-form-section-bgcolor' >
                                                    <main >

                                                    <span style={{paddingLeft:'2.5%', marginTop:'2.5%'}} className='form-label-on-mobile'> Name </span><span style={{color:'red', fontWeight:'bold'}}  className='form-label-on-mobile'> * </span>
                                                        <Form
                                                      
                                                      onSubmit={handleSubmit}
                                                      render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                                        <form   onSubmit={handleSubmit}>
                                                      

                                                        

                                                    
                                                          <Field name="name" validate={required}  >
                                                            {({ input, meta }) => (
                                                              <div  style={{paddingLeft:'2.5%', paddingRight:'2.5%', paddingTop:'1.0%', paddingBottom:'2.5%'}} className='form-field-div-padding-on-mobile'>
                                  
                                                                <label
                                                                htmlFor="yourName"
                                                                style={{'color':'#3F1717',  'fontSize':'1.0rem'}}>
                                                              
                                                                </label>
                                  
                                                                <input {...input} 
                                                                type="text" 
                                                                
                                                                className='input-box-styling'
                                                                style={{ 'fontSize':'1.0rem', width:'80%', padding:'2.0%', boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )'}}
                                                                />
                                                                {meta.error && meta.touched && <span className='meta-era'>{meta.error}</span>}
                                                              </div>
                                                            )}
                                                          </Field>
                                  
                                                          <span style={{paddingLeft:'2.5%', marginTop:'2.5%'}} className='form-label-on-mobile'>Email </span><span style={{color:'red', fontWeight:'bold'}} className='form-label-on-mobile'> * </span>
                                                          <Field name="email" validate={required}  >
                                                            {({ input, meta }) => (
                                                              <div style={{paddingLeft:'2.5%', paddingRight:'2.5%', paddingTop:'1.0%', paddingBottom:'2.5%'}} className='form-field-div-padding-on-mobile'>
                                  
                                                                <label 
                                                                htmlFor="email-address" 
                                                                style={{'color':'#3F1717',  'fontSize':'1.0rem'}}>
                                                                
                                                                </label>
                                  
                                                                <input {...input} 
                                                                type="text" 
                                                                className='input-box-styling'
                                                                style={{ 'fontSize':'1.0rem', width:'80%', padding:'2.0%', boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )'}}
                                                                
                                                                />
                                                                {meta.error && meta.touched && <span className='meta-era'>{meta.error}</span>}
                                                              </div>
                                                            )}
                                                          </Field>
                                                          
                                  
                                  
                                  
                                                          <span style={{paddingLeft:'2.5%', marginTop:'2.5%'}} className='form-label-on-mobile'>Phone Number</span> <span style={{color:'red', fontWeight:'bold'}} className='form-label-on-mobile'> * </span>      
                                                        <Field  name="phone" validate={composeValidators(required, mustBeNumber)}
                                                        >
                                  
                                                          {({ input, meta }) => (
                                                            <div style={{paddingLeft:'2.5%', paddingRight:'2.5%', paddingTop:'1.0%', paddingBottom:'2.5%'}} className='form-field-div-padding-on-mobile' >
                                  
                                                              <label
                                                              
                                                              htmlFor="phone"
                                                              style={{'color':'#3F1717',  'fontSize':'1.0rem'}}>
                                                            
                                                              </label>
                                                              <input {...input}
                                                              type="text" 
                                                              className='input-box-styling'
                                                              style={{ 'fontSize':'1.0rem', width:'80%', padding:'2.0%', boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )'}}
                                                            
                                                              />
                                                              {meta.error && meta.touched && <span className='meta-era'>{meta.error}</span>}
                                                            </div>
                                                          )}
                                                        </Field>





                                                        <span style={{paddingLeft:'2.5%', marginTop:'2.5%'}} className='form-label-on-mobile'>Message</span> <span style={{color:'red', fontWeight:'bold'}} className='form-label-on-mobile'> * </span>
                                                        <Field name="message" validate={required} >
                                                          {({ input, meta }) => (
                                                            <div  style={{paddingLeft:'2.5%', paddingRight:'2.5%', paddingTop:'1.0%', paddingBottom:'2.5%'}} className='form-field-div-padding-on-mobile'>
                                  
                                                              <label 
                                                              htmlFor="message" 
                                                              style={{'color':'#3F1717',  'fontSize':'1.0rem'}}>
                                                            
                                                              </label>
                                                            <textarea {...input}
                                                             
                                                              type="text"
                                                              placeholder="Your message"
                                                              className='input-box-styling'
                                                              style={{ 'fontSize':'1.0rem', width:'80%', padding:'2.0%', boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )'}}
                                                              rows="10" 
                                                              cols="50" />
                                                              {meta.error && meta.touched && <span className='meta-era'>{meta.error}</span>}
                                                            </div>
                                                          )}
                                                        </Field>
                            
                                  
                                  
                                                      
                                                    

                            
                            
                            
                                                        
                                                        <p  style={{ 'fontSize':'1.0rem', paddingLeft:'2.5%', marginTop:'2.5%', color:'red',fontWeight:'bold' }}>* Fill in all details before sending.</p>
                                                        <h2 ref={captchaMsgResRef}   style={{'fontSize':'1.0rem', paddingLeft:'2.5%', marginTop:'2.5%', color:'orange',fontWeight:'bold'}}>{apiResponseMessage}</h2>	
                                                        
                                                        <div  style={{  paddingLeft:'2.5%', marginTop:'2.5%'}} className='reCaptcha-on-mobile' >
                                                          
                                                            <ReCAPTCHA
                                                             
                                                              key="normal-recaptcha"
                                                              size="normal"
                                                              sitekey="6LegIIMcAAAAAOC219gt52xjBR1lzsdDDHTyzP4o"
                                                              onChange={onReCaptureChange}
                                                              ref={e => (captchaRef = e)}
                                                              theme="dark"

                                                            />
                            
                                                        </div>
                                                            
                                                        
                                                      
                            
                            
                                      
                                                            <div style={{  paddingLeft:'2.5%', marginTop:'2.5%'}}>
                                                              <Button variant="contained"  
                                                              type="submit"
                                                              disabled={submitting}
                                                              className='button-links-on-mobile ' 
                                                              style={{'backgroundColor':'black', 'color':'white', 'fontSize':'1.0rem', 'padding':'10px 30px 10px 30px', }} 
                                                              >

                                                                {loading && <i className="fas fa-spinner fa-spin fa-2x "></i>}
                                                                {loading && <span>SENDING......</span>}
                                                                {!loading && <span>SEND</span>}

                                                              

                                                              </Button>
                                                              
                                                            </div>
                                                            
                                                                </form>
                                                              )}
                                                          />
                                                        </main>
                  </article>




                ):
               (
                  

                   
                  <div style={{'backgroundColor':'#FBFBFB', padding:'5.5%'}}>
                      <div style={{paddingLeft:'2.5%', paddingRight:'2.5%', paddingTop:'1.0%', paddingBottom:'2.5%'}}>
                      <h2 ref={captchaMsgResRef2}   style={{'fontSize':'1.2rem', color:'orange',fontWeight:'bold'}}>{apiResponseMessage}</h2>
                      </div >
                    
                      <div style={{paddingLeft:'2.5%', paddingRight:'2.5%', paddingTop:'1.0%', paddingBottom:'2.5%'}}>
                        <Button  variant="contained"
                      
                        style={{'backgroundColor':'black', 'color':'white', 'fontSize':'1.0rem', 'padding':'10px 30px 10px 30px', }}
                        onClick={()=> window.location.reload()}
                        >
                        SEND NEW ENQUIRY
                        </Button>

                      </div>
                      
                            
                
                  </div>	

          
                 


                  
       






              )}












                      </div>

                      
      
              </div>  
              </div>
              
              </main>







                    <Footer />

              </div>
  );
}

export default ContactUs;
