import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { PersonInterface } from '../../interfaces/PersonInterface'
import useAuth from '../../context/useAuth'
import moment from 'moment'
import Spinner from '../Spinner/Spinner'

interface Props extends PersonInterface {
    onClick?: () => void
    onDelete?: () => void
    isDeleting?: boolean
    simple?: boolean
}

const PersonDetails = ({
    image,
    fullName,
    nationality,
    position,
    type,
    birthDate,
    height,
    onClick,
    onDelete,
    isDeleting,
    simple,
}: Props) => {
    const { isAdmin } = useAuth()

    // date to age
    return (
        <div
            onClick={onClick}
            className="flex border p-4 shadow-lg rounded-md w-full h-60 hover:shadow-xl transition-all duration-300 cursor-pointer relative"
        >
            {isAdmin && !simple && (
                <div
                    onClick={onDelete}
                    className="absolute top-0 right-0 w-6 h-6 rounded-full translate-x-3 -translate-y-3 bg-red-500 transition-all flex items-center justify-center hover:scale-110"
                >
                    {isDeleting ? (
                        <Spinner />
                    ) : (
                        <AiFillDelete className="text-white" />
                    )}
                </div>
            )}
            <img
                className="w-32 h-48 object-cover mr-8 border"
                src={image}
                alt={fullName}
            />
            <div className="flex flex-col text-lg gap-1">
                <div className="text-2xl">{fullName}</div>
                <div>
                    <span className="font-bold text-sm">Nationalitate: </span>
                    {nationality}
                </div>
                {type !== 'coach' && (
                    <div>
                        <span className="font-bold text-sm">Post: </span>
                        {position}
                    </div>
                )}

                <div>
                    <span className="font-bold text-sm">Varsta: </span>
                    {moment().diff(birthDate, 'years')}
                </div>

                {type !== 'coach' && (
                    <div>
                        <span className="font-bold text-sm">Inaltime: </span>
                        {height}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PersonDetails
