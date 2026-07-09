'use client'
import { Suspense } from 'react'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import { useSelector } from 'react-redux'
import { Users, Leaf, Target, Award, TrendingUp, MapPin, UserCircle, UserCircle2, BookOpen, Globe } from 'lucide-react'
import { assets } from '@/assets/assets'

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
                            About <span className="text-green-600">RootVerda</span>
                        </h1>
                        <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                            RootVerda was established with a simple yet powerful belief — nature has already gifted humanity everything required to create healthy life, balanced ecosystems, and sustainable growth. Pure soil, clean air, abundant water, sunlight, natural minerals, and living energy together create the invisible foundation that supports every form of life around us. Yet in today’s rapidly changing world, both people and nature are slowly losing this balance.
                        </p>
                        {/* <p className="text-lg text-slate-600 leading-relaxed">
                            Customers spend money on products, but many still fail to understand why their plants remain weak, unhealthy, or unable to grow naturally.
                        </p> */}
                        <p className="text-lg text-slate-600 leading-relaxed">
                           This understanding gave birth to RootVerda.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-lg p-8 flex items-center justify-center min-h-72">
                        <div className="text-center">
                            <Leaf className="w-24 h-24 text-green-600 mx-auto mb-4" />
                            <p className="text-green-700 font-semibold text-xl">Science Behind Healthy Plants</p>
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
                            At RootVerda, we recognized a deeper reality. Despite thousands of agricultural and plant-care products available in the market, people continue struggling to keep their plants healthy. Farmers continue working hard but often do not receive the true value of their natural resources. Customers spend money on products, but many still fail to understand why their plants remain weak, unhealthy, or unable to grow naturally.
                        </p>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-lg">
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Users className="w-6 h-6 text-green-600" />
                            Our Vision
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            We are not a company created merely to sell soil, compost, or agricultural products. We are building a long-term ecosystem where science, nature, people, and farming communities work together in complete balance. We believe plants are not decorative objects sitting quietly in balconies or gardens. Plants carry living energy. They improve emotional well-being, purify the air we breathe, create peace within homes, and silently contribute toward healthier lives.
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

                <div className="mb-16 bg-gradient-to-r from-green-50 to-slate-50 p-10 rounded-lg">
                <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                    <Leaf className="w-8 h-8 text-green-600" />
                    Meet Our Organic Farming Specialist
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Specialist Card */}
                    <div className="group bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                    <img 
                        src="http://kvksindhudurg.com/wp-content/uploads/2024/06/vys-150x150.jpg"
                        alt="Organic Farming Specialist" 
                        className="w-full h-80 object-cover group-hover:opacity-90 transition duration-300"
                    />
                    <div className="p-6 text-center">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Dr. Vilas Yashwant Sawant</h3>
                        <p className="text-slate-600 mb-4">Subject Matter Specialist</p>
                        <p className="text-slate-600 mb-4">Discipline: Extension Education</p>
                        <div className="flex justify-center gap-4">
                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium group-hover:bg-green-200 transition">
                            15+ Years Experience
                        </span>
                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium group-hover:bg-green-200 transition">
                            Global Recognition
                        </span>
                        </div>
                    </div>
                    </div>
                    <div className="group bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                    <img 
                        src="http://kvksindhudurg.com/wp-content/uploads/2024/06/vys-150x150.jpg"
                        alt="Organic Farming Specialist" 
                        className="w-full h-80 object-cover group-hover:opacity-90 transition duration-300"
                    />
                    <div className="p-6 text-center">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Dr. Vilas Yashwant Sawant</h3>
                        <p className="text-slate-600 mb-4">Subject Matter Specialist</p>
                        <p className="text-slate-600 mb-4">Discipline: Extension Education</p>
                        <div className="flex justify-center gap-4">
                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium group-hover:bg-green-200 transition">
                            15+ Years Experience
                        </span>
                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium group-hover:bg-green-200 transition">
                            Global Recognition
                        </span>
                        </div>
                    </div>
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
                                <p className="text-slate-600">Launched successful urban gardening campaigns promoting Rootce gardens, balcony gardens, and container gardening in metropolitan areas.</p>
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
                    <h2 className="text-3xl font-bold text-slate-800 mb-8">Why Choose RootVerda?</h2>
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
