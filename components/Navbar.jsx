'use client'
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthModal from "./AuthModal";
import { logout } from "@/lib/features/auth/authSlice";
import { showSuccess, showError, showWarning } from "@/lib/toast";

const Navbar = () => {

    const router = useRouter();

    const [search, setSearch] = useState('')
    const [showAuthModal, setShowAuthModal] = useState(false)
    const cartCount = useSelector(state => state.cart.total)
    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)
    console.log(isAuthenticated)
    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
    }

    const dispatch = useDispatch()

    const handleLogout = async () => {
        const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`;
        try{
            const res = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if(res.ok){
                console.log(data.message || "Logout Successful");
                showWarning(data.message || "Logout Successful");
            }else {
                showError(data.message || "Login Failed");
            }

        }catch(err){
            console.error("Logout Failed:", err);
        }finally{
            dispatch(logout())
            router.push('/')
        }
    }

    return (
        <>
        <nav className="relative bg-white">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4  transition-all">

                    <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                        <span className="text-green-600">Root</span>
                        <span className="text-amber-700">Verda</span>
                        <span className="text-green-600 text-5xl leading-0">.</span>
                        <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
                            plus
                        </p>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
                        <Link href="/">Home</Link>
                        <Link href="/shop">Shop</Link>
                        <Link href="/about">About</Link>
                        <Link href="/gardening-accessories">Gardening Accessories</Link>

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full">
                            <Search size={18} className="text-slate-600" />
                            <input className="w-full bg-transparent outline-none placeholder-slate-600" type="text" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} required />
                        </form>

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
                            <ShoppingCart size={18} />
                            Cart
                            <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">{cartCount}</button>
                        </Link>

                        {!isAuthenticated && (
                        <button className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
                            onClick={()=> (setShowAuthModal(true), console.log('btn clicked'))}>
                            Login
                        </button>
                        )}

                        {isAuthenticated && (
                            <button
                                className="px-8 py-2 bg-red-500 hover:bg-red-600 transition text-white rounded-full"
                                // onClick={() => dispatch(logout())}
                                onClick={() => handleLogout()}
                            >
                                Logout
                            </button>
                         )}

                    </div>

                    {/* Mobile User Button  */}
                    {!isAuthenticated && (
                    <div className="sm:hidden"
                     onClick={() => router.push('/login')}>
                        <button className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full">
                            Login
                        </button>
                    </div>
                    )}
                </div>
            </div>
            <hr className="border-gray-300" />
        </nav>
        <AuthModal isOpen={showAuthModal} onClose={()=> setShowAuthModal(false)} />
        </>
    )
}

export default Navbar