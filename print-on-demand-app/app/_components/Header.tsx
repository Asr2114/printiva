'use client'
import { Button } from '@/components/ui/button'
import { CartContext } from '@/context/CartContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const menu = [
    {
        id: 1,
        name: "Home",
        path: '/'
    },
    {
        id: 2,
        name: "Products",
        path: '/products'
    },
    {
        id: 3,
        name: "About Us",
        path: '/about-us'
    },
    {
        id: 4,
        name: "Contact Us",
        path: '/contact-us'
    },
]

export type User = {
    email: string,
    name: string,
    picture: string
}

function Header() {
    const [user, setUser] = useState<User>();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const { cart, setCart } = useContext(CartContext);
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== undefined) {
            const storedToken = localStorage.getItem('tokenResponse');
            const tokenResponse = storedToken ? JSON.parse(storedToken) : null;
            if (tokenResponse) {
                GetUserProfile(tokenResponse?.access_token);
            }
        }
    }, []);

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            localStorage.setItem('tokenResponse', JSON.stringify(tokenResponse))
            await GetUserProfile(tokenResponse.access_token);
        },
        onError: errorResponse => console.log(errorResponse),
    });

    const GetUserProfile = async (access_token: string) => {
        try {
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: `Bearer ${access_token}` } }
            );

            console.log(userInfo);
            setUser(userInfo?.data);
            setUserDetail(userInfo?.data);
            SaveNewUser(userInfo?.data)
        }
        catch (e) {
            console.error("Error fetching user Profile:", e);
            localStorage.setItem('tokenResponse', '');
        }
    }

    const SaveNewUser = async (user: User) => {
        const result = await axios.post('/api/users', {
            name: user.name,
            email: user.email,
            picture: user.picture
        });
        console.log(result.data);
    }

    const handleLogout = () => {
        localStorage.removeItem('tokenResponse');
        setUser(undefined);
        setUserDetail(undefined);
        setCart([]);
    };

    useEffect(() => {
        user && GetCartList();
    }, [user])

    const GetCartList = async () => {
        const result = await axios.get('/api/cart?email=' + user?.email)
        console.log(result.data);
        setCart(result);
    }

    const isActive = (path: string) => pathname === path;

    return (
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href={'/'} className="flex-shrink-0">
                        <Image src={'/logo3.svg'} alt='Logo' width={160} height={36} className="transition-transform hover:scale-105" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {menu.map((item) => (
                            <Link
                                key={item.id}
                                href={item.path}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                    isActive(item.path)
                                        ? 'text-black bg-gray-100'
                                        : 'text-gray-600 hover:text-black hover:bg-gray-50'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side - Cart & User */}
                    <div className="flex items-center space-x-4">
                        {/* Cart */}
                        <Link href="/cart" className="relative group">
                            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <ShoppingCart className="h-6 w-6 text-gray-600 group-hover:text-black" />
                                <span className="bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                                    {cart?.length ?? 0}
                                </span>
                            </div>
                        </Link>

                        {/* User Menu */}
                        {!user ? (
                            <Button
                                onClick={() => googleLogin()}
                                className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                Sign In
                            </Button>
                        ) : (
                            <div className="relative group">
                                <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                    <Image
                                        src={user.picture}
                                        alt={user.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full border-2 border-gray-200"
                                    />
                                    <span className="hidden sm:block text-sm font-medium text-gray-700">{user.name}</span>
                                </div>
                                
                                {/* Dropdown Menu */}
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <div className="py-1">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4 mr-2" />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4">
                        <nav className="flex flex-col space-y-2">
                            {menu.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                        isActive(item.path)
                                            ? 'text-black bg-gray-100'
                                            : 'text-gray-600 hover:text-black hover:bg-gray-50'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header