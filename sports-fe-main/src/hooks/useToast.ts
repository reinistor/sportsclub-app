import React from 'react'
import { toast } from 'react-toastify'

const useToast = () => {
    const errorToast = (message: string) => {
        toast.error(message)
    }

    const successToast = (message: string) => {
        toast.success(message)
    }

    const infoToast = (message: string) => {
        toast.info(message)
    }
    return {
        errorToast,
        successToast,
        infoToast,
    }
}

export default useToast
