type Props = {
    label: string
    description?: string
}

const PageLabel = ({ label, description }: Props) => {
    return (
        <div className="flex flex-col mb-8 w-full max-w-screen-2xl">
            <h1 className="text-3xl font-bold">{label}</h1>
            <h3 className="text-gray-600 ">{description}</h3>
        </div>
    )
}

export default PageLabel
