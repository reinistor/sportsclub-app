import { useNavigate } from 'react-router'

type SidebarSubItemProps = {
    path: string
    name: string
}
type SidebarItemProps = {
    path: string
    name: string
    isActive: boolean
    subroutes?: SidebarSubItemProps[]
}

const SidebarSubItem = ({ path, name }: SidebarSubItemProps) => {
    const navigate = useNavigate()
    return (
        <div className="relative ml-6">
            <button
                onClick={() => navigate(path)}
                className={`text-[#aaaaaa] hover:text-red-600 text-md font-bold transition-all duration-300 tracking-tight `}
            >
                {name}
            </button>
        </div>
    )
}

const SidebarItem = ({ path, isActive, subroutes, name }: SidebarItemProps) => {
    const navigate = useNavigate()
    return (
        <div className="relative group">
            {!subroutes ? (
                <button
                    onClick={() => {
                        !subroutes && navigate(path)
                    }}
                    className={`text-white hover:text-red-600 text-md font-bold transition-all duration-300 tracking-tight  ${
                        isActive ? 'text-red-600' : ''
                    }`}
                >
                    {name}
                </button>
            ) : (
                <details>
                    <summary
                        className={`text-white hover:text-red-600 text-md font-bold transition-all duration-300 tracking-tight cursor-pointer ${
                            isActive ? 'text-red-600' : ''
                        }`}
                    >
                        {name}
                    </summary>
                    <p>
                        {subroutes.map((subroute: any) => (
                            <SidebarSubItem
                                key={subroute.name}
                                path={subroute.path}
                                name={subroute.name}
                            />
                        ))}
                    </p>
                </details>
            )}
        </div>
    )
}

export default SidebarItem
