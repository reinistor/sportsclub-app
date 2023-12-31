import {
    AiOutlineInstagram,
    AiOutlineFacebook,
    AiOutlineTwitter,
    AiOutlineYoutube,
    AiOutlineMail,
    AiOutlinePhone,
} from 'react-icons/ai'

const Footer = () => {
    return (
        <div className="h-40 bg-gray-100 flex flex-col items-center justify-center px-8 py-4 text-gray-600 absolute left-0 right-0 bottom-0 w-full pl-11">
            <div className="flex w-full justify-between max-w-screen-2xl contacts">
                {/* contact */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center text-xl hover:text-blue-600 cursor-pointer duration-300 transition-all">
                        <AiOutlineMail className="text-3xl mr-4" />
                        <span>contact@csm.ro</span>
                    </div>
                    <div className="flex items-center text-xl hover:text-blue-600 cursor-pointer duration-300 transition-all">
                        <AiOutlinePhone className="text-3xl mr-4" />
                        <span>+40 123 456 789</span>
                    </div>
                </div>

                {/* social */}
                <div className="flex flex-col gap-2 w-[195px] items-center pr-7">
                    <div className="flex items-center text-xl hover:text-blue-600 cursor-pointer duration-300 transition-all">
                        <AiOutlineInstagram className="text-3xl mr-4" />
                        <span>Instagram</span>
                    </div>
                    <div className="flex items-center text-xl hover:text-blue-600 cursor-pointer duration-300 transition-all">
                        <AiOutlineFacebook className="text-3xl mr-4" />
                        <span>Facebook</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-[160px]">
                    <div className="flex items-center text-xl hover:text-blue-600 cursor-pointer duration-300 transition-all">
                        <AiOutlineTwitter className="text-3xl mr-4" />
                        <span>Twitter</span>
                    </div>
                    <div className="flex items-center text-xl hover:text-blue-600 cursor-pointer duration-300 transition-all">
                        <AiOutlineYoutube className="text-3xl mr-4" />
                        <span>Youtube</span>
                    </div>
                </div>
            </div>
            <div className="text-sm mt-10">
                {new Date().getFullYear()} USV. All rights reserved.
            </div>
        </div>
    )
}

export default Footer
