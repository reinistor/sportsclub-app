import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import CustomButton from '../CustomButton/CustomButton'
import { PersonInterface } from '../../interfaces/PersonInterface'
import { personAPI } from '../../api/personAPI'
import { Types } from '../../interfaces/Person/Types'
import { toBase64 } from '../../utils/helper-functions'
import { ReactComponent as ImageIcon } from './../../assets/image.svg'

const positions = [
    'setter',
    'opposite',
    'middle blocker',
    'libero',
    'outside hitter',
]

const PersonForm = ({
    type,
    onSubmit,
}: {
    type: Types
    onSubmit?: () => void
}) => {
    const [person, setPerson] = useState<PersonInterface>({
        fullName: '',
        nationality: '',
        type: type as Types,
        position: '',
        height: 0,
        birthDate: '',
        image: undefined,
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)

    const areFieldsValid = () => {
        if (
            person.fullName &&
            person.nationality &&
            person.type &&
            person.position &&
            person.height &&
            person.birthDate
        ) {
            return true
        }
        return false
    }

    const onDeleteImage = () => {
        setImageUrl(undefined)
        setPerson({ ...person, image: undefined })
    }

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setPerson({
            ...person,
            [event.target.name]: event.target.value,
        })
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPerson({
            ...person,
            [event.target.name]: event.target.value,
        })
    }

    const addPlayer = async () => {
        try {
            setIsLoading(true)
            const response = await personAPI.addPerson(person)
            console.log(response)
            onSubmit?.()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSave = () => {
        addPlayer()
        setPerson({
            fullName: '',
            nationality: '',
            type: type as Types,
            position: '',
            height: 0,
            birthDate: '',
            image: undefined,
        })
        setImageUrl(undefined)
    }

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        onDrop: async (acceptedFiles: File[]) => {
            const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg']
            if (acceptedFileTypes.includes(acceptedFiles[0].type)) {
                const objectUrl = URL.createObjectURL(acceptedFiles[0])
                setImageUrl(objectUrl)
                setPerson({
                    ...person,
                    image: await toBase64(acceptedFiles[0]),
                })
            }
        },
    })

    return (
        <div>
            <div className="flex border p-5 shadow-lg rounded-md w-full h-60 hover:shadow-xl transition-all duration-300 justify-center items-center">
                <div className="w-[45%] h-48 mr-6 border flex items-center justify-center relative cursor-pointer hover:bg-gray-50 duration:100 transition-all rounded-md">
                    {imageUrl ? (
                        <>
                            <img
                                onClick={onDeleteImage}
                                className="object-cover w-full h-full cursor-pointer"
                                src={imageUrl}
                                alt={acceptedFiles[0].name}
                                width="100"
                                height="100"
                            />
                            <div
                                onClick={onDeleteImage}
                                className="absolute inset-0 flex items-center justify-center opacity-5 transition-all cursor-pointer hover:bg-gray-500 hover:opacity-50 hover:text-white"
                            >
                                Delete
                            </div>
                        </>
                    ) : (
                        <div
                            {...getRootProps()}
                            className="flex flex-col items-center"
                        >
                            <input {...getInputProps()} />
                            <p className="mx-4 flex text-center">
                                Plasează sau selectează o poză
                            </p>
                            <ImageIcon className="w-10 h-10 mt-4" />
                        </div>
                    )}
                </div>

                <div className="flex flex-col text-lg gap-1 w-full h-full justify-center">
                    <div className="flex items-center">
                        <div className="font-bold text-sm w-[38%]">
                            Numele:{' '}
                        </div>
                        <input
                            className="border w-[62%] p-1 ml-2 text-xs rounded-md"
                            type="text"
                            name="fullName"
                            id="fullName"
                            value={person.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <div className="font-bold text-sm w-[38%]">
                            Naționalitate:
                        </div>
                        <input
                            className="border w-[62%] p-1 ml-2 text-xs rounded-md"
                            type="text"
                            name="nationality"
                            id="nationality"
                            value={person.nationality}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <div className="font-bold text-sm w-[38%]">Post: </div>
                        <select
                            className="border w-[62%] p-1 ml-2 text-xs rounded-md"
                            name="position"
                            id="position"
                            value={person.position}
                            onChange={handleSelectChange}
                            required
                        >
                            <option value="" disabled>
                                Tip de post
                            </option>
                            {positions.map((position) => (
                                <option key={position} value={position}>
                                    {position}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center">
                        <div className="font-bold w-[38%] text-sm whitespace-nowrap">
                            Data nașterii:
                        </div>
                        <input
                            className="border w-[62%] p-1 ml-2 text-xs rounded-md"
                            type="date"
                            name="birthDate"
                            id="birthDate"
                            value={person.birthDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <div className="font-bold text-sm w-[38%]">
                            Înălțime(cm):
                        </div>
                        <input
                            className="border w-[62%] p-1 ml-2 text-xs rounded-md"
                            type="number"
                            name="height"
                            id="height"
                            value={person.height}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <CustomButton
                        className="self-end mt-2 px-2 py-1"
                        loading={isLoading}
                        disabled={!areFieldsValid()}
                        onClick={handleSave}
                        size="SM"
                        label="Salvează"
                    />
                </div>
            </div>
        </div>
    )
}

export default PersonForm
