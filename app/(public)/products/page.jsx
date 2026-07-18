'use client'
import { Suspense } from "react"
import ProductCard from "@/components/ProductCard"
import { MoveLeftIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"

function ProductsContent() {

    // get query params ?search=abc
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const router = useRouter()

    const products = useSelector(state => state.product.list)

    // Filter products for gardening accessories
    const gardeningAccessories = products.filter(product =>
        product.name.toLowerCase().includes('tool') ||
        product.name.toLowerCase().includes('shovel') ||
        product.name.toLowerCase().includes('pot') ||
        product.name.toLowerCase().includes('garden') ||
        product.name.toLowerCase().includes('equipment') ||
        product.name.toLowerCase().includes('accessory') ||
        product.name.toLowerCase().includes('fertilizer') ||
        product.name.toLowerCase().includes('soil') ||
        product.name.toLowerCase().includes('seeds') ||
        product.category?.toLowerCase().includes('accessory') ||
        product.category?.toLowerCase().includes('tools')
    )

    const filteredProducts = search
        ? gardeningAccessories.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        : gardeningAccessories.length > 0 ? gardeningAccessories : products

    return (
        <div className="min-h-[70vh] mx-6">
            <div className=" max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="py-10 mb-8">
                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
                        Gardening <span className="text-green-600">Accessories</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-3xl">
                        Explore our complete range of premium gardening accessories and equipment. From essential tools to innovative solutions, find everything you need for a successful garden.
                    </p>
                </div>

                {/* Filter and Search Section */}
                <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h2 onClick={() => router.push('/products')} className="text-2xl text-slate-500 flex items-center gap-2 cursor-pointer hover:text-slate-700 transition">
                            {search && <MoveLeftIcon size={20} />}
                            <span className="text-slate-700 font-medium">
                                {search ? `Search Results for "${search}"` : "All Accessories"}
                            </span>
                        </h2>
                    </div>
                    <div className="text-sm text-slate-600">
                        {filteredProducts.length} products found
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto mb-32">
                        {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 mb-32">
                        <div className="text-center">
                            <p className="text-xl text-slate-600 mb-4">No accessories found</p>
                            <button
                                onClick={() => router.push('/products')}
                                className="text-green-600 hover:text-green-700 font-semibold transition"
                            >
                                View all accessories
                            </button>
                        </div>
                    </div>
                )}

                {/* Features Section */}
                <div className="bg-gradient-to-r from-green-50 to-slate-50 p-10 rounded-lg mb-16">
                    <h2 className="text-3xl font-bold text-slate-800 mb-8">Why Choose Our Accessories?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg">
                            <h4 className="text-lg font-semibold text-green-600 mb-2">Premium Quality</h4>
                            <p className="text-slate-600 text-sm">Durable and high-quality products built to last.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg">
                            <h4 className="text-lg font-semibold text-green-600 mb-2">Eco-Friendly</h4>
                            <p className="text-slate-600 text-sm">Environmentally conscious materials and manufacturing.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg">
                            <h4 className="text-lg font-semibold text-green-600 mb-2">Affordable</h4>
                            <p className="text-slate-600 text-sm">Competitive prices without compromising quality.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg">
                            <h4 className="text-lg font-semibold text-green-600 mb-2">Expert Tested</h4>
                            <p className="text-slate-600 text-sm">Recommended by experienced gardeners.</p>
                        </div>
                    </div>
                </div>

                {/* Categories Info */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-800 mb-8">Browse Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border border-slate-200 p-6 rounded-lg hover:shadow-lg transition cursor-pointer hover:border-green-600">
                            <h4 className="text-xl font-semibold text-green-600 mb-2">Hand Tools</h4>
                            <p className="text-slate-600 text-sm">Shovels, rakes, hoes, pruners, and more essential tools for every gardening task.</p>
                        </div>
                        <div className="border border-slate-200 p-6 rounded-lg hover:shadow-lg transition cursor-pointer hover:border-green-600">
                            <h4 className="text-xl font-semibold text-green-600 mb-2">Pots & Planters</h4>
                            <p className="text-slate-600 text-sm">Various sizes and styles of pots, planters, and raised beds for container gardening.</p>
                        </div>
                        <div className="border border-slate-200 p-6 rounded-lg hover:shadow-lg transition cursor-pointer hover:border-green-600">
                            <h4 className="text-xl font-semibold text-green-600 mb-2">Soil & Fertilizers</h4>
                            <p className="text-slate-600 text-sm">Organic soil, compost, fertilizers, and nutrients for healthy plant growth.</p>
                        </div>
                        <div className="border border-slate-200 p-6 rounded-lg hover:shadow-lg transition cursor-pointer hover:border-green-600">
                            <h4 className="text-xl font-semibold text-green-600 mb-2">Seeds & Plants</h4>
                            <p className="text-slate-600 text-sm">Quality seeds, seedlings, and plant saplings for vegetable and ornamental gardens.</p>
                        </div>
                        <div className="border border-slate-200 p-6 rounded-lg hover:shadow-lg transition cursor-pointer hover:border-green-600">
                            <h4 className="text-xl font-semibold text-green-600 mb-2">Watering Systems</h4>
                            <p className="text-slate-600 text-sm">Hoses, sprinklers, drip irrigation, and watering cans for efficient plant hydration.</p>
                        </div>
                        <div className="border border-slate-200 p-6 rounded-lg hover:shadow-lg transition cursor-pointer hover:border-green-600">
                            <h4 className="text-xl font-semibold text-green-600 mb-2">Protective Gear</h4>
                            <p className="text-slate-600 text-sm">Gloves, aprons, hats, and safety equipment for comfortable gardening.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Products() {
    return (
        <Suspense fallback={<div>Loading gardening accessories...</div>}>
            <ProductsContent />
        </Suspense>
    )
}
