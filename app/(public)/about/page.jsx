'use client'
import { Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import { useSelector } from 'react-redux'
import { Users, Leaf, Target, Award, TrendingUp, MapPin, BookOpen, Globe } from 'lucide-react'

const sectionOptions = [
    { label: 'Advisor & Expertise', value: 'expertise' },
    { label: 'Founder Story', value: 'founder' },
]

function AboutContent() {
    const [activeSection, setActiveSection] = useState('expertise')
    const [carouselIndex, setCarouselIndex] = useState(0)
    const products = useSelector(state => state.product.list)
    const featuredProducts = products.slice(0, 6)
    const carouselItems = featuredProducts.filter(product => product.images?.length)
    const maxCarouselIndex = Math.max(carouselItems.length - 1, 0)
    const currentCarousel = carouselItems[carouselIndex] || carouselItems[0]

    const handlePrev = () => {
        if (!carouselItems.length) return
        setCarouselIndex((prevIndex) => (prevIndex <= 0 ? maxCarouselIndex : prevIndex - 1))
    }

    const handleNext = () => {
        if (!carouselItems.length) return
        setCarouselIndex((prevIndex) => (prevIndex >= maxCarouselIndex ? 0 : prevIndex + 1))
    }

    useEffect(() => {
        if (!carouselItems.length) return

        const intervalId = setInterval(() => {
            setCarouselIndex((prevIndex) => (prevIndex >= maxCarouselIndex ? 0 : prevIndex + 1))
        }, 3000)

        return () => clearInterval(intervalId)
    }, [carouselItems.length, maxCarouselIndex])

    return (
        <div className="min-h-screen mx-6">
            <div className="max-w-7xl mx-auto py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
                            About <span className="text-green-600">RootVerda</span>
                        </h1>
                        <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                            RootVerda was founded on the belief that smart organic farming begins with real expertise and practical, science-backed solutions. We support gardeners, farmers, and communities with trusted products and guidance that honor the balance between people and nature.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            From farming communities to urban gardeners, our mission is to help every customer grow stronger plants, healthier soil, and more resilient ecosystems.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-3xl p-10 flex items-center justify-center min-h-72">
                        <div className="text-center">
                            <Leaf className="w-24 h-24 text-green-600 mx-auto mb-4" />
                            <p className="text-green-700 font-semibold text-xl">Science, People, and Organic Growth</p>
                        </div>
                    </div>
                </div>

                <div className="mb-12 bg-slate-50 p-6 rounded-3xl shadow-sm border border-slate-200">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-green-600 font-semibold mb-2">About Us Sections</p>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">We Are Always Connected With Nature — And With You</h2>
                        </div>
                        <div className="w-full md:w-auto">
                            <div className="hidden md:flex gap-3">
                                {sectionOptions.map((item) => (
                                    <button
                                        key={item.value}
                                        type="button"
                                        onClick={() => setActiveSection(item.value)}
                                        className={`rounded-full px-5 py-3 text-sm font-medium transition ${activeSection === item.value ? 'bg-green-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:border-green-600'}`}>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                            <div className="md:hidden">
                                <label htmlFor="section" className="sr-only">Select About Section</label>
                                <select
                                    id="section"
                                    value={activeSection}
                                    onChange={(e) => setActiveSection(e.target.value)}
                                    className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm"
                                >
                                    {sectionOptions.map((item) => (
                                        <option key={item.value} value={item.value}>{item.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        {activeSection === 'founder' ? (
                            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                                <div className="space-y-6">
                                    <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
                                        <p className="text-sm uppercase tracking-[0.3em] text-green-600 font-semibold mb-3">Founder</p>
                                        <h3 className="text-3xl font-bold text-slate-800 mb-4">Our Founder is a visionary leader for organic growth.</h3>
                                        <p className="text-slate-600 leading-relaxed">
                                           At RootVerda, every customer relationship begins with trust and continues through genuine support, honest communication, and our commitment to helping both people and plants grow healthier together.Whether you are a home gardener caring deeply for your balcony plants, a nature lover building greener spaces around your family, a farmer looking to understand the larger value of natural agricultural products, or someone simply seeking honest guidance for healthier plant growth — we are always ready to listen.
                                        </p>
                                        <p className="text-slate-600 leading-relaxed mt-4">
                                            This section showcases real product innovation, hands-on leadership, and a passion for connecting every customer to healthier soil, better harvests, and trusted expert support.
                                        </p>
                                    </div>
                                    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                                        <div className="relative overflow-hidden rounded-3xl bg-slate-100">
                                            {currentCarousel ? (
                                                <Image
                                                    src={currentCarousel.images[0]}
                                                    alt={currentCarousel.name}
                                                    width={1200}
                                                    height={800}
                                                    className="w-full max-h-[420px] object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-72 items-center justify-center text-slate-500">Loading product preview...</div>
                                            )}
                                        </div>
                                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="text-sm text-slate-500">
                                                {currentCarousel ? `${currentCarousel.name} — slide ${carouselIndex + 1} of ${carouselItems.length}` : 'No featured images available yet.'}
                                            </div>
                                            <div className="flex gap-2">
                                                <button type="button" onClick={handlePrev} className="rounded-full px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 transition disabled:cursor-not-allowed disabled:opacity-50" disabled={!carouselItems.length}>
                                                    Previous
                                                </button>
                                                <button type="button" onClick={handleNext} className="rounded-full px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition disabled:cursor-not-allowed disabled:opacity-50" disabled={!carouselItems.length}>
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
                                        <p className="text-sm uppercase tracking-[0.3em] text-green-600 font-semibold mb-3">Founder Video</p>
                                        <h4 className="text-2xl font-bold text-slate-800 mb-4">A short story behind the brand</h4>
                                        <div className="aspect-video overflow-hidden rounded-3xl border border-slate-200">
                                            <iframe
                                                className="h-full w-full"
                                                src="https://www.youtube.com/embed/ScMzIvxBSi4"
                                                title="Founder Story Video"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-4">
                                        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                                            <h5 className="text-xl font-semibold text-slate-800 mb-3">Product-led leadership</h5>
                                            <p className="text-slate-600 leading-relaxed">We believe that every question deserves attention because behind every plant stands a person who genuinely cares about life, growth, and the beauty that nature quietly creates around us.Our team remains available to help customers understand product suitability, discuss plant health concerns, provide guidance related to natural agricultural products, and assist with product selection based on your individual plant care requirements.</p>
                                        </div>
                                        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                                            <h5 className="text-xl font-semibold text-slate-800 mb-3">Built for modern growers</h5>
                                            <p className="text-slate-600 leading-relaxed">For local sourcing operations, farmer coordination, and product collection activities from the Konkan region, our ground operations are supported through our local network managed from Sindhudurg by our operational representative Rupesh Sawant, who helps us stay closely connected with local agricultural communities and regional product sourcing activities.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                             <div className="mb-16 bg-gradient-to-r from-green-50 to-slate-50 p-10 rounded-lg">
                    <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                        <Leaf className="w-8 h-8 text-green-600" />
                        Meet Our Organic Farming Specialist
                    </h2>
                    <div className="flex justify-center">
                        <div className="group w-full max-w-2xl bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                            <img
                                src="http://kvksindhudurg.com/wp-content/uploads/2024/06/vys-150x150.jpg"
                                alt="Organic Farming Specialist"
                                className="w-100 h-100 object-cover group-hover:opacity-90 transition duration-300 justify-center items-center mx-auto "
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
                            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                                <div className="space-y-6">
                                    <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
                                        <p className="text-sm uppercase tracking-[0.3em] text-green-600 font-semibold mb-3">Expertise</p>
                                        <h3 className="text-3xl font-bold text-slate-800 mb-4">Guidance backed by experience</h3>
                                        <p className="text-slate-600 leading-relaxed">
                                           Dr. Vilas Sawant is recognized for his work as a Subject Matter Specialist in Extension Education, actively participating in field-based agricultural research activities focused on improving farming practices under real-world conditions. His expertise includes on-farm testing programs where agricultural technologies are tested directly on farmers’ fields to evaluate their effectiveness under different soil types, climatic conditions, local farming systems, and regional agricultural environments.
                                        </p>
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-1">
                                        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                                            <h5 className="text-xl font-semibold text-slate-800 mb-3">Science-backed formulas</h5>
                                            <p className="text-slate-600 leading-relaxed">His work follows a highly practical scientific approach where technologies developed through agricultural universities and research institutes are tested, refined, modified where necessary, and then implemented for wider adoption after successful evaluation.For more than five years, continuous discussions around agriculture, natural farming opportunities, soil science, sustainable farming practices, and long-term agricultural business development gradually shaped the early vision of RootVerda.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
                                        <h4 className="text-2xl font-bold text-slate-800 mb-4">How expertise helps you</h4>
                                        <ul className="space-y-4 text-slate-600">
                                            <li className="flex gap-3">
                                                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white font-semibold">1</span>
                                                <span>Understand product benefits clearly, from soil health to plant strength.</span>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white font-semibold">2</span>
                                                <span>Get practical application tips that reduce waste and maximize results.</span>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white font-semibold">3</span>
                                                <span>Gain confidence with advice that’s field-tested and farmer-approved.</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                                        <h5 className="text-xl font-semibold text-slate-800 mb-3">Expert backing</h5>
                                        <div className="space-y-3 text-slate-600">
                                            <p>• Research from soil science and organic farming best practices.</p>
                                            <p>• Direct feedback from growers and specialist advisors.</p>
                                            <p>• Easy-to-follow guidance for both new and experienced growers.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>
                        )}
                    </div>
                </div>

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

                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-800 mb-8">Our Featured Products</h2>
                    <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>

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

                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-12 rounded-3xl text-center mb-16">
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
