


import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import {  useParams, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import Spinner from '../components/Spinner'
import './AddCar.css'
import Footer from '../components/Footer'






function EditCar() {
    // eslint-disable-next-line
 
    const [loading, setLoading] = useState(false)
    const [car, setCar] = useState(false)
    const [formData, setFormData] = useState({
     sold: false,
     title: '',
     description:'',
     offer: false,
     regularPrice: 0,
     discountedPrice: 0,
     make:'',
     model:'',
     year:2000,
     engineCapacity: 4.5,
     exteriorColor:'',
     interiorTrim:'',
     bodyType:'',
     fuelType:'',
     gearbox:'',
     vdOverview: '',
     vd1: '',
     vd2: '',
     vd3: '',
     vd4: '',
     vd5: '',
     images: {}

    })
  
    const {
      sold,
      title,
      description,
      offer,
      regularPrice,
      discountedPrice,
      make,
      model,
      year,
      engineCapacity,
      exteriorColor,
      interiorTrim,
      bodyType,
      fuelType,
      gearbox,
      vdOverview,
      vd1,
      vd2,
      vd3,
      vd4,
      vd5,
      images,
    } = formData
  
    const auth = getAuth()
    // const navigate = useNavigate()
    const history = useHistory()
    const params = useParams()
    const isMounted = useRef(true)
  
    // Redirect if listing is not user's
    useEffect(() => {
      if (car && car.userRef !== auth.currentUser.uid) {
        toast.error('You can not edit that listing')
        history.push('/')
      }
    })
  
    // Fetch listing to edit
    useEffect(() => {
      setLoading(true)
      const fetchCarListing = async () => {
        const docRef = doc(db, 'cars', params.carId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setCar(docSnap.data())
          setFormData({ ...docSnap.data() })
          setLoading(false)
        } else {
          history.push('/')
          toast.error('Car does not exist')
        }
      }
  
      fetchCarListing()
    }, [params.carId, history])
  
    // Sets userRef to logged in user
    useEffect(() => {
      if (isMounted) {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setFormData({ ...formData, userRef: user.uid })
          } else {
            history.push('/sign-in')
          }
        })
      }
  
      return () => {
        isMounted.current = false
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])
  
    const onSubmit = async (e) => {
      e.preventDefault()
  
      setLoading(true)
  
      if (discountedPrice >= regularPrice) {
        setLoading(false)
        toast.error('Discounted price needs to be less than regular price')
        return
      }
  
    
      // Store image in firebase
      const storeImage = async (image) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage()
          const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
  
          const storageRef = ref(storage, 'images/' + fileName)
  
          const uploadTask = uploadBytesResumable(storageRef, image)
  
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              console.log('Upload is ' + progress + '% done')
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused')
                  break
                case 'running':
                  console.log('Upload is running')
                  break
                default:
                  break
              }
            },
            (error) => {
              reject(error)
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL)
              })
            }
          )
        })
      }
  
      const imageUrls = await Promise.all(
        [...images].map((image) => storeImage(image))
      ).catch(() => {
        setLoading(false)
        toast.error('Images not uploaded')
        return
      })
  
      const formDataCopy = {
        ...formData,
        imageUrls,
       // geolocation,
        timestamp: serverTimestamp(),
      }
  
     // formDataCopy.location = address
      delete formDataCopy.images
    //  delete formDataCopy.address
      !formDataCopy.offer && delete formDataCopy.discountedPrice


      delete formDataCopy.make
      delete formDataCopy.regularPrice


      const formDataCopy2 = {
        ...formDataCopy, 
        make: formData.make.toLocaleLowerCase(),
        regularPrice: parseInt(formData.regularPrice)
  
       }
  


  
      // Update listing
      const docRef = doc(db, 'cars', params.carId)
      await updateDoc(docRef, formDataCopy2)
      setLoading(false)
      toast.success('Car Listing Saved')
      history.push(`/car/${docRef.id}`)
    }
  
    const onMutate = (e) => {
      let boolean = null
  
      if (e.target.value === 'true') {
        boolean = true
      }
      if (e.target.value === 'false') {
        boolean = false
      }
  
      // Files
      if (e.target.files) {
        setFormData((prevState) => ({
          ...prevState,
          images: e.target.files,
        }))
      }
  
      // Text/Booleans/Numbers
      if (!e.target.files) {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: boolean ?? e.target.value,
        }))
      }
    }
  
    if (loading) {
      return <Spinner />
    }
  return (

    <div>






    <div className='ios-overflow' style={{padding:'2.5%'}}>
        <header style={{ textAlign:'center', letterSpacing:'0.25rem', }}>
          <p className='add-car' style={{color:'maroon',fontSize:'2.2rem', }}>Edit Car</p>
          <p className='edit-car-title-on-mobile' style={{color:'mblack',fontSize:'1.6rem', }}>{car.title}</p>
        </header>

        <main>
          <form onSubmit={onSubmit}>
            <label className='formLabel'> For Sale / Sold</label>
            <div className='forSale-sold' style={{display:'flex'}}>
              <button
                type='button'
                className={sold=== false ? 'formButtonActive' : 'formButton'}
                id='sold'
                value={false}
                onClick={onMutate}
              >
                For Sale
              </button>
              <button
                type='button'
                className={sold === true ? 'formButtonActive' : 'formButton'}
                id='sold'
                value= {true}
                onClick={onMutate}
              >
                Sold
              </button>
            </div>



            <label className='formLabel'>Title</label>
            <input
              className='formInputName'
              type='text'
              id='title'
              value={title}
              onChange={onMutate}
              required
            />



          <label className='formLabel'>Short Description</label>
            <textarea
              className='formInputLargeData'
              type='text'
              id='description'
              value={description}
              onChange={onMutate}
              required
              rows="1" 
            />


        
          
          <label className='formLabel'>Offer</label>
            <div className='formButtons'>
              <button
                className={offer ? 'formButtonActive' : 'formButton'}
                type='button'
                id='offer'
                value={true}
                onClick={onMutate}
              >
                Yes
              </button>
              <button
                className={
                  !offer && offer !== null ? 'formButtonActive' : 'formButton'
                }
                type='button'
                id='offer'
                value={false}
                onClick={onMutate}
              >
                No
              </button>
            </div>

            <label className='formLabel'>Regular Price</label>
            <div className='formPriceDiv'>
              <input
                className='formInputSmall'
                type='number'
                id='regularPrice'
                value={regularPrice}
                onChange={onMutate}
                min='50'
                max='750000000'
                required
              />
              {sold === 'sold' && <p className='formPriceText'>$ / Month</p>}
            </div>

            {offer && (
              <>
                <label className='formLabel'>Discounted Price</label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='discountedPrice'
                  value={discountedPrice}
                  onChange={onMutate}
                  min='50'
                  max='750000000'
                  required={offer}
                />
              </>
            )}



          <label className='formLabel'>Make</label>
            <input
              className='formInputName'
              type='text'
              id='make'
              value={make}
              onChange={onMutate}
              required
            />
    


          <label className='formLabel'>Model</label>
            <input
              className='formInputName'
              type='text'
              id='model'
              value={model}
              onChange={onMutate}
              required
            />



              
            <div className='year-engineCapacity' style={{display:'flex'}}>
              <div>
                <label className='formLabel'>Year</label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='year'
                  value={year}
                  placeholder = '2000'
                  onChange={onMutate}
                  required
                />
              </div>
              <div>
                <label className='formLabel'>Engine Capacity</label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='engineCapacity'
                  value={engineCapacity}
                  placeholder='4.5'
                  onChange={onMutate}
                  required
                />
              </div>
            </div>



            <label className='formLabel'>Exterior Color</label>
            <input
              className='formInputName'
              type='text'
              id='exteriorColor'
              value={exteriorColor}
              onChange={onMutate}
              required
            />
            
            <label className='formLabel'>Interior Trim</label>
            <input
              className='formInputName'
              type='text'
              id='interiorTrim'
              value={interiorTrim}
              onChange={onMutate}
              required
            />
            
            <label className='formLabel'>Body Type</label>
            <input
              className='formInputName'
              type='text'
              id='bodyType'
              value={bodyType}
              onChange={onMutate}
              required
            />
            
            <label className='formLabel'>Fuel Type</label>
            <input
              className='formInputName'
              type='text'
              id='fuelType'
              value={fuelType}
              onChange={onMutate}
              required
            />
            
            <label className='formLabel'>Gear box</label>
            <input
              className='formInputName'
              type='text'
              id='gearbox'
              value={gearbox}
              onChange={onMutate}
              required
            />
            








            <label className='formLabel'>Vehicle Descirpion Overview</label>
            <textarea
              className='formInputLargeData'
              type='text'
              id='vdOverview'
              value={vdOverview}
              onChange={onMutate}
              required
              rows="10" 
            />

          <label className='formLabel'>Vehicle Description One</label>
            <textarea
              className='formInputLargeData'
              type='text'
              id='vd1'
              value={vd1}
              onChange={onMutate}
              required
              rows="5" 
            />

            <label className='formLabel'>Vehicle Description Two</label>
            <textarea
              className='formInputLargeData'
              type='text'
              id='vd2'
              value={vd2}
              onChange={onMutate}
              required
              rows="5" 
            />


            <label className='formLabel'>Vehicle Description Three</label>
            <textarea
              className='formInputLargeData'
              type='text'
              id='vd3'
              value={vd3}
              onChange={onMutate}
              required
              rows="5" 
            />

            <label className='formLabel'>Vehicle Description Four</label>
            <textarea
              className='formInputLargeData'
              type='text'
              id='vd4'
              value={vd4}
              onChange={onMutate}
              required
              rows="5" 
            />

            <label className='formLabel'>Vehicle Description Five</label>
            <textarea
              className='formInputLargeData'
              type='text'
              id='vd5'
              value={vd5}
              onChange={onMutate}
              required
              rows="5" 
            />
      

    



      <label className='formLabel'>Images</label>
            <p className='imagesInfo'>
              The first image will be the cover.
            </p>
            <input
              className='formInputFile'
              type='file'
              id='images'
              onChange={onMutate}
              accept='.jpg,.png,.jpeg'
              multiple
              required
            />





            <button type='submit' className='primaryButton createListingButton'>
              Edit Car Listing
            </button>
          </form>
        </main>
      </div>

    <Footer/>


    </div>

  )
}

export default EditCar