import React from 'react'

type Props = {
    ourTeam: string
    ourTeamScore?: number
    ourTeamLogo: string
    opponentTeam: string
    opponentTeamScore?: number
    opponentTeamLogo: string
    date: string
    time: string
    location: string
    isInFuture?: boolean
}

const MatchDetails = ({
    ourTeam,
    ourTeamScore,
    ourTeamLogo,
    opponentTeam,
    opponentTeamScore,
    opponentTeamLogo,
    date,
    time,
    location,
    isInFuture,
}: Props) => {
    return (
        <div className="rounded-md shadow-lg flex w-full border overflow-hidden h-32 hover:shadow-xl transition-all duration-300 justify-between items-center p-8 max-w-screen-2xl">
            {/* team */}
            <div className="flex flex-col items-center justify-center  h-[120px] w-[160px] rounded-md p-2">
                <div className="mb-4 font-semibold text-lg text-gray-600 text-center">
                    {ourTeam}
                </div>
                <img
                    className="w-12 h-12 mx-8 object-contain"
                    src={ourTeamLogo}
                    alt=""
                />
            </div>

            {/* details */}
            <div className="flex flex-col items-center">
                {!isInFuture && (
                    <span className="text-4xl font-bold mb-4">
                        {ourTeamScore} - {opponentTeamScore}
                    </span>
                )}

                <span
                    className={`flex flex-col items-center text-gray-600 gap-2 text-lg ${
                        isInFuture && 'text-xl'
                    }`}
                >
                    <div>{date}</div>
                </span>
            </div>
            {/* team */}
            <div className="flex flex-col items-center justify-center h-[120px] w-[160px] rounded-md p-2">
                <div className="mb-4 font-semibold text-lg text-gray-600 text-center">
                    {opponentTeam}
                </div>
                <img
                    className="w-12 h-12 mx-8 object-contain"
                    src={opponentTeamLogo}
                    alt=""
                />
            </div>
        </div>
    )
}

export default MatchDetails
