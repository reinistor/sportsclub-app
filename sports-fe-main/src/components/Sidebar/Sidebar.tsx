import React from 'react'
import SidebarOptions from './SidebarOptions'
import SidebarItem from './SidebarItem'
import { ReactComponent as CSMLogo } from './../../assets/logo.svg'
import { useLocation, useNavigate } from 'react-router'
import useAuth from '../../context/useAuth'

const Sidebar = () => {
    const { isLogged, logout, user } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const isCurrentRouteActive = (path: string) => {
        return location.pathname.includes(path) && path !== '/'
    }

    return (
        <nav className="bg-[#0B215A] flex flex-col items-center h-screen p-16 overflow-auto fixed left-0 top-0 bottom-0 w-72 sidebar">
            <CSMLogo
                className="mb-16 w-32 h-32 hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => navigate('/')}
            />

            <ul className="flex flex-col items-start gap-4">
                {SidebarOptions.map((sidebarOption, index) => (
                    <SidebarItem
                        key={index}
                        path={sidebarOption.path}
                        name={sidebarOption.name}
                        isActive={isCurrentRouteActive(sidebarOption.path)}
                        subroutes={sidebarOption?.subroutes}
                    />
                ))}
                <div
                    onClick={
                        isLogged
                            ? () => {
                                  logout()
                                  navigate('/')
                              }
                            : () => navigate('/login')
                    }
                    className="text-white hover:text-red-600 text-md font-bold transition-all duration-300 tracking-tight cursor-pointer"
                >
                    {isLogged ? 'LOG OUT' : 'LOGIN'}
                </div>
            </ul>

            {user && (
                <div className="text-white mt-12">
                    <div>User: {user?.name}</div>
                    <div>Role: {user?.role}</div>
                </div>
            )}
        </nav>
    )
}

export default Sidebar
