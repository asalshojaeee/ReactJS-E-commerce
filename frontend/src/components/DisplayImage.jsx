import { IoMdClose } from "react-icons/io";

const DisplayImage = ({ imgUrl, onClose }) => {

    return (
        <div className="fixed bottom-0 left-0 right-0 top-0 flex justify-center items-center">

            <div className="bg-white shadow-lg rounded max-w-5xl mx-auto p-4">
                <div
                    onClick={onClose}
                    className="w-fit ml-auto text-2xl hover:text-orange-400 cursor-pointer">
                    <IoMdClose />

                </div>

                <div className="flex justify-center p-4 max-w-[80vh] max-h-[80vh]">
                    <img src={imgUrl} alt="" className="h-full w-full" />
                </div>
            </div>

        </div>
    )

}
export default DisplayImage