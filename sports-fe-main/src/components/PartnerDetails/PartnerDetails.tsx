import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import useAuth from '../../context/useAuth'
import Spinner from '../Spinner/Spinner'

type Props = {
    name: string
    logo: string
    website: string
    onClick?: () => void
    onDelete?: () => void
    isDeleting?: boolean
    simple?: boolean
}

const PartnerDetails = ({
    name,
    logo,
    website,
    onDelete,
    isDeleting,
    simple,
}: Props) => {
    const { isAdmin } = useAuth()
    return (
        <div className=" relative group">
            {isAdmin && !simple && (
                <div
                    onClick={onDelete}
                    className="absolute top-0 right-0 w-6 h-6 rounded-full translate-x-3 -translate-y-3 bg-red-500 transition-all flex items-center justify-center hover:scale-110 z-10 hover:curosr-pointer cursor-pointer"
                >
                    {isDeleting ? (
                        <Spinner />
                    ) : (
                        <AiFillDelete className="text-white" />
                    )}
                </div>
            )}
            <a href={website} target="_blank" rel="noreferrer">
                <img
                    className="w-60 h-60 object-contain p-6 transition-all duration-100  rounded-md border  group-hover:opacity-75"
                    src={logo}
                    alt={name}
                />
            </a>
        </div>
    )
}

export default PartnerDetails
