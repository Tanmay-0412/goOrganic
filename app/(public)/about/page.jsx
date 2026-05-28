'use client'
import { Suspense } from 'react'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import { useSelector } from 'react-redux'
import { Users, Leaf, Target, Award, TrendingUp, MapPin } from 'lucide-react'

function AboutContent() {
    const products = useSelector(state => state.product.list)
    const featuredProducts = products.slice(0, 6)

    return (
        <div className="min-h-screen mx-6">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
                            About <span className="text-green-600">goOrganic</span>
                        </h1>
                        <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                            We bridge the gap between urban and rural communities by connecting city dwellers with farmers and rural gardeners. Our mission is to promote sustainable gardening and organic farming practices accessible to everyone, regardless of location.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Founded with a passion for organic living and community support, goOrganic empowers farmers in rural areas while helping urban gardeners cultivate their green spaces.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-lg p-8 flex items-center justify-center min-h-72">
                        <div className="text-center">
                            <Leaf className="w-24 h-24 text-green-600 mx-auto mb-4" />
                            <p className="text-green-700 font-semibold text-xl">Growing Together</p>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 py-8 border-y border-slate-200">
                    <div className="bg-slate-50 p-8 rounded-lg">
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Target className="w-6 h-6 text-green-600" />
                            Our Mission
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            To promote sustainable organic farming and gardening by connecting rural farmers with urban enthusiasts, providing quality products, knowledge, and tools that make gardening accessible and rewarding for everyone.
                        </p>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-lg">
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Users className="w-6 h-6 text-green-600" />
                            Our Vision
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            A world where every household, whether urban or rural, can grow their own food organically. We envision a thriving community that values sustainability, supports local farmers, and celebrates the joy of gardening.
                        </p>
                    </div>
                </div>

                {/* Who We Are */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                        <Users className="w-8 h-8 text-green-600" />
                        Who We Are
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white border border-slate-200 p-6 rounded-lg hover:shadow-lg transition">
                            <h4 className="text-xl font-semibold text-green-600 mb-3">Farmers Network</h4>
                            <p className="text-slate-600">We connect directly with farmers in rural and semi-urban areas, supporting their livelihoods and promoting organic practices.</p>
                        </div>
                        <div className="bg-white border border-slate-200 p-6 rounded-lg hover:shadow-lg transition">
                            <h4 className="text-xl font-semibold text-green-600 mb-3">Urban Gardeners</h4>
                            <p className="text-slate-600">Empowering city dwellers with knowledge, tools, and resources to create beautiful, productive gardens in limited spaces.</p>
                        </div>
                        <div className="bg-white border border-slate-200 p-6 rounded-lg hover:shadow-lg transition">
                            <h4 className="text-xl font-semibold text-green-600 mb-3">Sustainability Advocates</h4>
                            <p className="text-slate-600">Committed to environmental responsibility and promoting practices that benefit both people and planet.</p>
                        </div>
                    </div>
                </div>

                {/* Experience & Achievements */}
                <div className="mb-16 bg-gradient-to-r from-green-50 to-slate-50 p-10 rounded-lg">
                    <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                        <Award className="w-8 h-8 text-green-600" />
                        Our Experience & Achievements
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                <TrendingUp className="w-8 h-8 text-green-600" />
                            </div>
                            <h4 className="font-bold text-2xl text-slate-800">5000+</h4>
                            <p className="text-slate-600">Active Farmers & Gardeners</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Leaf className="w-8 h-8 text-green-600" />
                            </div>
                            <h4 className="font-bold text-2xl text-slate-800">10000+</h4>
                            <p className="text-slate-600">Products Delivered</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                <MapPin className="w-8 h-8 text-green-600" />
                            </div>
                            <h4 className="font-bold text-2xl text-slate-800">25+</h4>
                            <p className="text-slate-600">States Covered</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Award className="w-8 h-8 text-green-600" />
                            </div>
                            <h4 className="font-bold text-2xl text-slate-800">95%</h4>
                            <p className="text-slate-600">Customer Satisfaction</p>
                        </div>
                    </div>
                </div>

                {/* Work Implemented */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-800 mb-8">Work Implemented</h2>
                    <div className="space-y-6">
                        <div className="flex gap-6 items-start">
                            <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                            <div>
                                <h4 className="text-xl font-semibold text-slate-800 mb-2">Farmer Training Programs</h4>
                                <p className="text-slate-600">Conducted workshops and training sessions for rural farmers on organic farming methods, soil conservation, and modern gardening techniques.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                            <div>
                                <h4 className="text-xl font-semibold text-slate-800 mb-2">Urban Gardening Initiatives</h4>
                                <p className="text-slate-600">Launched successful urban gardening campaigns promoting terrace gardens, balcony gardens, and container gardening in metropolitan areas.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                            <div>
                                <h4 className="text-xl font-semibold text-slate-800 mb-2">Community Garden Projects</h4>
                                <p className="text-slate-600">Established over 50 community gardens in various neighborhoods, creating spaces for collective learning and sustainable food production.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                            <div>
                                <h4 className="text-xl font-semibold text-slate-800 mb-2">Product Quality Standards</h4>
                                <p className="text-slate-600">Implemented rigorous quality checks and certification processes ensuring all products meet organic and sustainability standards.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold">5</div>
                            <div>
                                <h4 className="text-xl font-semibold text-slate-800 mb-2">Supply Chain Optimization</h4>
                                <p className="text-slate-600">Built efficient logistics network connecting rural producers directly with urban consumers, reducing intermediaries and costs.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Products */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-800 mb-8">Our Featured Products</h2>
                    <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="mb-16 bg-slate-50 p-10 rounded-lg">
                    <h2 className="text-3xl font-bold text-slate-800 mb-8">Why Choose goOrganic?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex gap-4">
                            <Leaf className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">100% Organic</h4>
                                <p className="text-slate-600 text-sm">All our products are certified organic and sustainably sourced.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Users className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">Community Focused</h4>
                                <p className="text-slate-600 text-sm">We directly support rural farmers and urban gardeners.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Award className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">Quality Assured</h4>
                                <p className="text-slate-600 text-sm">Rigorous testing and certification for peace of mind.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">Expert Guidance</h4>
                                <p className="text-slate-600 text-sm">Access to expert tips and gardening knowledge.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <MapPin className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">Wide Coverage</h4>
                                <p className="text-slate-600 text-sm">Nationwide delivery to rural and urban areas.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Users className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">Customer Support</h4>
                                <p className="text-slate-600 text-sm">24/7 assistance and personalized recommendations.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommended Sites */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-800 mb-8">Recommended Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <a href="https://www.nais.gov.in/" target="_blank" rel="noopener noreferrer" className="border border-slate-200 p-6 rounded-lg hover:shadow-lg hover:border-green-600 transition">
                            <h4 className="text-lg font-semibold text-green-600 mb-2">National Agricultural Institute</h4>
                            <p className="text-slate-600 text-sm">Quality research and agricultural education resources.</p>
                        </a>
                        <a href="https://www.icrisat.org/" target="_blank" rel="noopener noreferrer" className="border border-slate-200 p-6 rounded-lg hover:shadow-lg hover:border-green-600 transition">
                            <h4 className="text-lg font-semibold text-green-600 mb-2">ICRISAT</h4>
                            <p className="text-slate-600 text-sm">International research for sustainable agriculture.</p>
                        </a>
                        <a href="https://www.fao.org/" target="_blank" rel="noopener noreferrer" className="border border-slate-200 p-6 rounded-lg hover:shadow-lg hover:border-green-600 transition">
                            <h4 className="text-lg font-semibold text-green-600 mb-2">FAO - Food & Agriculture Organization</h4>
                            <p className="text-slate-600 text-sm">Global agricultural knowledge and resources.</p>
                        </a>
                        <a href="https://www.worldwildlife.org/" target="_blank" rel="noopener noreferrer" className="border border-slate-200 p-6 rounded-lg hover:shadow-lg hover:border-green-600 transition">
                            <h4 className="text-lg font-semibold text-green-600 mb-2">World Wildlife Fund</h4>
                            <p className="text-slate-600 text-sm">Environmental sustainability and conservation tips.</p>
                        </a>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-12 rounded-lg text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
                    <p className="text-lg mb-6 max-w-2xl mx-auto">
                        Whether you're a rural farmer or an urban gardener, there's a place for you in the goOrganic community. Start your organic journey today!
                    </p>
                    <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-slate-100 transition">
                        Get Started Today
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function About() {
    return (
        <Suspense fallback={<div>Loading about page...</div>}>
            <AboutContent />
        </Suspense>
    )
}
