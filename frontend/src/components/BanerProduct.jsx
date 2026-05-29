import imageMobile from '../assests/banner/img1_mobile.jpg'
import image2 from '../assests/banner/img2.webp'
import image3 from '../assests/banner/img3.jpg'
import image4 from '../assests/banner/img4.jpg'
import image5 from '../assests/banner/img5.webp'

import image2Mobile from '../assests/banner/img2_mobile.webp'
import image3Mobile from '../assests/banner/img3_mobile.jpg'
import image4Mobile from '../assests/banner/img4_mobile.jpg'

import image5Mobile from '../assests/banner/img5_mobile.png'



import image1 from '../assests/banner/img1.webp'
const BanerProduct = () => {
    const desktopImages = [
        image1, image2, image3, image4, image5
    ]
    const mobileImages = [
        imageMobile,
        image2Mobile, image3Mobile, image4Mobile, image5Mobile
    ]
    return (
        <div className="containar mx-auto px-4 rounded ">

            <div className="h-72 w-full">
                <div className='flex '>
                    {desktopImages.map((imageURL, index) => {
                        return (
                            <div key={imageURL} className='w-full h-full min-h-full min-w-full'>
                                <img className='h-full w-full' src={image1} alt="" />

                            </div>

                        )

                    })}
                </div>


            </div>

        </div>
    )

}


export default BanerProduct