import React from 'react'

type Props = {
    long_title: string
    content: string
    image_url: string
    created_at: string
    created_by: string
    onClick: () => void
}

const BlogDetails = ({
    long_title,
    content,
    image_url,
    created_at,
    created_by,
    onClick,
}: Props) => {
    return (
        <div
            onClick={onClick}
            className="rounded-md shadow-lg flex w-full border overflow-hidden h-64 cursor-pointer hover:shadow-xl transition-all duration-300 max-w-screen-2xl"
        >
            <img src={image_url} alt="" className="h-full" />
            <div className="flex flex-col p-8 ">
                <div className="text-2xl font-bold mb-4 ">{long_title}</div>
                <div className="h-20 overflow-hidden text-clip">
                    {content?.slice(0, 300)}
                </div>

                {/* creator */}
                <div className="flex flex-col items-end mt-4 text-sm text-gray-500">
                    <div>{created_at}</div>
                    <div>{created_by}</div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails
