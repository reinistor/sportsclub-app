import React, { useState, useRef } from 'react'
import CustomButton from '../CustomButton/CustomButton'
import useAuth from '../../context/useAuth'

type Props = {
    isLoading: boolean
    text: string
    onSave: () => void
    onUpdate: (text: string) => void
}

const DetailsForm = ({ isLoading, text, onSave, onUpdate }: Props) => {
    const { isAdmin } = useAuth()

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const onEditClick = () => {
        setIsEditing(true)
        textAreaRef.current?.focus()
    }

    const onSaveClick = () => {
        onSave()
        setIsEditing(false)
    }
    return (
        <div className="flex flex-wrap gap-4  w-full max-w-screen-2xl mt-6">
            <textarea
                ref={textAreaRef}
                disabled={!isAdmin || !isEditing || isLoading}
                onChange={(e) => onUpdate(e.target.value)}
                className="border w-full mb-4 p-4 resize-none h-[400px]"
                defaultValue={text}
            ></textarea>
            {isAdmin &&
                (isEditing ? (
                    <CustomButton
                        loading={isLoading}
                        onClick={onSaveClick}
                        label="Salveaza"
                    />
                ) : (
                    <CustomButton
                        loading={isLoading}
                        onClick={onEditClick}
                        label="Editeaza"
                        className="h-[42px] py-2 w-[100px]"
                    />
                ))}
        </div>
    )
}

export default DetailsForm
