import React from 'react'
import Spinner from '../Spinner/Spinner'

type Props = {
    size?: 'SM' | 'MD' | 'LG'
    loading?: boolean
    disabled?: boolean
    label: string
    onClick?: () => void
    className?: string
}

const CustomButton = ({
    size = 'MD',
    loading,
    disabled,
    label,
    onClick,
    className,
    ...rest
}: Props) => {
    return (
        <button
            {...rest}
            className={` bg-[#0B215A] hover:opacity-75 text-white rounded-md transition-all duration-300 cursor-pointer ${
                size === 'SM'
                    ? 'text-sm'
                    : size === 'MD'
                    ? 'text-base'
                    : 'text-lg'
            } ${
                disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
            } ${className}`}
            onClick={onClick}
            disabled={loading || disabled}
        >
            {loading ? <Spinner /> : label}
        </button>
    )
}

export default CustomButton
