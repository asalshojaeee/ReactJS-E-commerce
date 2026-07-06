import imageMobile from '../assests/banner/img1_mobile.jpg'
import img24 from '../assests/banner/img24.jpg'
import img21 from '../assests/banner/img21.jpg'
import img20 from '../assests/banner/img20.jpg'
import img19 from '../assests/banner/img19.jpg'

import image2Mobile from '../assests/banner/img2_mobile.webp'
import imgm23 from '../assests/banner/imgm23.jfif'
import imgm22 from '../assests/banner/imgm22.jfif'

import imgm20 from '../assests/banner/imgm20.jpg'



import img23 from '../assests/banner/img23.jpg'
import { useEffect, useState } from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import { FaAngleLeft } from 'react-icons/fa6'

const BanerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)
    const desktopImages = [
        img19, img20, img21, img23, img24
    ]
    const mobileImages = [
        imgm20,
        imgm22, imgm23, imgm22, imgm20
    ]
    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(preve => preve + 1)

        }

    }
    const preveiousImage = () => {
        if (currentImage != 0) {
            setCurrentImage(preve => preve - 1)

        }

    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImages.length - 1 > currentImage) {
                nextImage()

            }
            else (
                setCurrentImage(0)
            )
        }, 5000)

        return () => clearInterval(interval)

    }, [currentImage])
    return (
        <div className="containar mx-auto px-4 rounded ">

            <div className="h-56 md:h-72 w-full bg-slate-200 relative">
                <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
                    <div className=' flex justify-between w-full text-2xl'>
                        <button
                            onClick={preveiousImage}
                            className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>

                        <button
                            onClick={nextImage}
                            className='bg-white shadow-md rounded-full p-1'>
                            <FaAngleRight />
                        </button>
                    </div>



                </div>


                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {desktopImages.map((imageURL, index) => {
                        return (
                            <div style={{ transform: `translateX(-${currentImage * 100}%)` }} key={imageURL} className='w-full h-full min-h-full min-w-full transition-all'>
                                <img className='h-full w-full' src={imageURL} alt="" />

                            </div>

                        )

                    })}
                </div>
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {mobileImages.map((imageURL, index) => {
                        return (
                            <div style={{ transform: `translateX(-${currentImage * 100}%)` }} key={imageURL} className='w-full h-full min-h-full min-w-full transition-all'>
                                <img className='h-full w-full object-cover' src={imageURL} alt="" />

                            </div>

                        )

                    })}
                </div>


            </div>

        </div>
    )

}


export default BanerProduct