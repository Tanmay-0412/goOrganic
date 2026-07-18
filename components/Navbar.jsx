'use client'
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthModal from "./AuthModal";
import { logout } from "@/lib/features/auth/authSlice";
import { showError, showWarning } from "@/lib/toast";

const Navbar = () => {
    const router = useRouter();

    const [search, setSearch] = useState('')
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const cartCount = useSelector(state => state.cart.total)
    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)
    const dispatch = useDispatch()

    const handleSearch = (e) => {
        e.preventDefault()
        if (search.trim()) {
            router.push(`/shop?search=${encodeURIComponent(search.trim())}`)
            setSearch('')
            setSidebarOpen(false)
        }
    }

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
        <nav className="relative bg-white shadow-sm">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">

                    <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                        <span className="text-green-600">Root</span>
                        <span className="text-amber-700">Verda</span>
                        <span className="text-green-600 text-5xl leading-0">.</span>
                        <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
                            plus
                        </p>
                    </Link>

                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
                        <Link href="/">Home</Link>
                        <Link href="/shop">Shop</Link>
                        <Link href="/about">About</Link>
                        <Link href="/products">Products</Link>

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full">
                            <Search size={18} className="text-slate-600" />
                            <input className="w-full bg-transparent outline-none placeholder-slate-600" type="text" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </form>

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
                            <ShoppingCart size={18} />
                            Cart
                            <span className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 rounded-full px-1">{cartCount}</span>
                        </Link>

                        {!isAuthenticated ? (
                            <button className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full" onClick={() => setShowAuthModal(true)}>
                                Login
                            </button>
                        ) : (
                            <button className="px-8 py-2 bg-red-500 hover:bg-red-600 transition text-white rounded-full" onClick={handleLogout}>
                                Logout
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-3 sm:hidden">
                        <Link href="/cart" className="relative inline-flex items-center justify-center text-slate-600 hover:text-slate-900">
                            <ShoppingCart size={20} />
                            <span className="sr-only">Cart</span>
                            <span className="absolute -top-1 left-4 text-[8px] text-white bg-slate-600 rounded-full px-1">{cartCount}</span>
                        </Link>
                        {!isAuthenticated ? (
                            <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm" onClick={() => setShowAuthModal(true)}>
                                Login
                            </button>
                        ) : (
                            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 transition text-white rounded-full text-sm" onClick={handleLogout}>
                                Logout
                            </button>
                        )}
                        <button className="p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100" onClick={() => setSidebarOpen(true)}>
                            <Menu size={22} />
                            <span className="sr-only">Open navigation</span>
                        </button>
                    </div>
                </div>
            </div>
            <hr className="border-gray-300" />
        </nav>

        {sidebarOpen && (
            <div className="fixed inset-0 z-50 flex">
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
                <aside className="relative ml-auto w-full max-w-xs bg-white shadow-2xl ring-1 ring-black/5 border-l border-slate-200 p-6 overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-green-600 font-semibold">Menu</p>
                            <h2 className="text-xl font-semibold text-slate-900">Navigation</h2>
                        </div>
                        <button className="p-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100" onClick={() => setSidebarOpen(false)}>
                            <X size={20} />
                            <span className="sr-only">Close</span>
                        </button>
                    </div>

                    <nav className="space-y-4">
                        <Link href="/" onClick={() => setSidebarOpen(false)} className="block rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 hover:bg-slate-50">Home</Link>
                        <Link href="/shop" onClick={() => setSidebarOpen(false)} className="block rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 hover:bg-slate-50">Shop</Link>
                        <Link href="/about" onClick={() => setSidebarOpen(false)} className="block rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 hover:bg-slate-50">About</Link>
                        <Link href="/products" onClick={() => setSidebarOpen(false)} className="block rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 hover:bg-slate-50">Products</Link>
                        <Link href="/cart" onClick={() => setSidebarOpen(false)} className="block rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 hover:bg-slate-50">Cart</Link>
                    </nav>

                    <form onSubmit={handleSearch} className="mt-6 flex items-center gap-2 bg-slate-100 px-4 py-3 rounded-full">
                        <Search size={18} className="text-slate-600" />
                        <input
                            className="w-full bg-transparent outline-none placeholder-slate-600"
                            type="text"
                            placeholder="Search products"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>

                    <div className="mt-6 space-y-3">
                        {!isAuthenticated ? (
                            <button type="button" onClick={() => { setShowAuthModal(true); setSidebarOpen(false); }} className="w-full rounded-full bg-indigo-500 px-4 py-3 text-white text-sm font-semibold hover:bg-indigo-600 transition">
                                Login
                            </button>
                        ) : (
                            <button type="button" onClick={handleLogout} className="w-full rounded-full bg-red-500 px-4 py-3 text-white text-sm font-semibold hover:bg-red-600 transition">
                                Logout
                            </button>
                        )}
                    </div>
                </aside>
            </div>
        )}

        <AuthModal isOpen={showAuthModal} onClose={()=> setShowAuthModal(false)} />
        </>
    )
}

export default Navbar