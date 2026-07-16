import { PlusIcon, SquarePenIcon, XIcon, CheckCircle2, CircleAlert, ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import AddressModal from './AddressModal';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const OrderSummary = ({ totalPrice, items }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const router = useRouter();
    const addressList = useSelector(state => state.address.list);
    const apiBaseUrl = (process.env.NEXT_PUBLIC_BASE_URL || '').trim().replace(/^['"]|['"]$/g, '').replace(/\/$/, '');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [couponCodeInput, setCouponCodeInput] = useState('');
    const [coupon, setCoupon] = useState('');
    const [loading, setLoading] = useState(false);
    const [paymentModal, setPaymentModal] = useState(null);

    const handleCouponCode = async (event) => {
        event.preventDefault();
        setLoading(true);
    }

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        onPayment(coupon ? (totalPrice - (coupon.discount / 100 * totalPrice)).toFixed(2) : totalPrice.toLocaleString());
        // pass the amount with function 
        // router.push('/orders')
    }

    const loadScript = (src)=>{
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve(true);
            }
            script.onerror = () => {
                resolve(false);
            }   
            document.body.appendChild(script);
        })
    }

    const onPayment = async (amount) => { 
        // create order
        try{
            setLoading(true);
            const options = {
                productId :1,
                amount: amount,
            }
            const res = await fetch(`${apiBaseUrl}/api/payment/createOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(options)
            });
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.message || 'Something went wrong');
            }
            const paymentObject = new window.Razorpay({
                key : process.env.NEXT_PUBLIC_RAZORPAY_KEY,
                order_id : data.id,
                ...data,
                handler: async function(response){
                    const options2 = {
                        order_id : response.razorpay_order_id,
                        payment_id : response.razorpay_payment_id,
                        signature : response.razorpay_signature,
                    }

                    const verificationResponse = await fetch(`${apiBaseUrl}/api/payment/verifyPayment`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(options2)
                    });
                    const verificationData = await verificationResponse.json();
                    if(!verificationResponse.ok){
                        throw new Error(verificationData.message || 'Something went wrong');
                    }
                    debugger;
                    if(verificationData?.success || verificationData?.status === 'success'){
                        setPaymentModal({
                            type: 'success',
                            title: 'Payment Successful',
                            message: 'Your order has been placed successfully. A confirmation will be sent shortly.'
                        });
                    }else{
                        setPaymentModal({
                            type: 'error',
                            title: 'Payment Failed',
                            message: 'We could not confirm your payment. Please try again or choose another payment method.'
                        });
                    }
                }
            })
            paymentObject.open();
        }catch(err){
            console.log(err);
            setPaymentModal({
                type: 'error',
                title: 'Payment Failed',
                message: err.message || 'We could not initialize payment. Please try again.'
            });
            toast.error(err.message || 'Payment could not be initialized');
        }finally{
            setLoading(false);
        }
    }
    
    useEffect(() => {
        loadScript('https://checkout.razorpay.com/v1/checkout.js');
    }, []);

    return (
        <>
        <div className='w-full max-w-lg lg:max-w-[340px] bg-slate-50/30 border border-slate-200 text-slate-500 text-sm rounded-xl p-7'>
            <h2 className='text-xl font-medium text-slate-600'>Payment Summary</h2>
            <p className='text-slate-400 text-xs my-4'>Payment Method</p>
            <div className='flex gap-2 items-center'>
                <input type="radio" id="COD" onChange={() => setPaymentMethod('COD')} checked={paymentMethod === 'COD'} className='accent-gray-500' />
                <label htmlFor="COD" className='cursor-pointer'>COD</label>
            </div>
            <div className='flex gap-2 items-center mt-1'>
                <input type="radio" id="STRIPE" name='payment' onChange={() => setPaymentMethod('STRIPE')} checked={paymentMethod === 'STRIPE'} className='accent-gray-500' />
                <label htmlFor="STRIPE" className='cursor-pointer'>Stripe Payment</label>
            </div>
            <div className='my-4 py-4 border-y border-slate-200 text-slate-400'>
                <p>Address</p>
                {
                    selectedAddress ? (
                        <div className='flex gap-2 items-center'>
                            <p>{selectedAddress.name}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.zip}</p>
                            <SquarePenIcon onClick={() => setSelectedAddress(null)} className='cursor-pointer' size={18} />
                        </div>
                    ) : (
                        <div>
                            {
                                addressList.length > 0 && (
                                    <select className='border border-slate-400 p-2 w-full my-3 outline-none rounded' onChange={(e) => setSelectedAddress(addressList[e.target.value])} >
                                        <option value="">Select Address</option>
                                        {
                                            addressList.map((address, index) => (
                                                <option key={index} value={index}>{address.name}, {address.city}, {address.state}, {address.zip}</option>
                                            ))
                                        }
                                    </select>
                                )
                            }
                            <button className='flex items-center gap-1 text-slate-600 mt-1' onClick={() => setShowAddressModal(true)} >Add Address <PlusIcon size={18} /></button>
                        </div>
                    )
                }
            </div>
            <div className='pb-4 border-b border-slate-200'>
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-1 text-slate-400'>
                        <p>Subtotal:</p>
                        <p>Shipping:</p>
                        {coupon && <p>Coupon:</p>}
                    </div>
                    <div className='flex flex-col gap-1 font-medium text-right'>
                        <p>{currency}{totalPrice.toLocaleString()}</p>
                        <p>Free</p>
                        {coupon && <p>{`-${currency}${(coupon.discount / 100 * totalPrice).toFixed(2)}`}</p>}
                    </div>
                </div>
                {
                    !coupon ? (
                        <form onSubmit={e => toast.promise(handleCouponCode(e), { loading: 'Checking Coupon...' })} className='flex justify-center gap-3 mt-3'>
                            <input onChange={(e) => setCouponCodeInput(e.target.value)} value={couponCodeInput} type="text" placeholder='Coupon Code' className='border border-slate-400 p-1.5 rounded w-full outline-none' />
                            <button className='bg-slate-600 text-white px-3 rounded hover:bg-slate-800 active:scale-95 transition-all'>Apply</button>
                        </form>
                    ) : (
                        <div className='w-full flex items-center justify-center gap-2 text-xs mt-2'>
                            <p>Code: <span className='font-semibold ml-1'>{coupon.code.toUpperCase()}</span></p>
                            <p>{coupon.description}</p>
                            <XIcon size={18} onClick={() => setCoupon('')} className='hover:text-red-700 transition cursor-pointer' />
                        </div>
                    )
                }
            </div>
            <div className='flex justify-between py-4'>
                <p>Total:</p>
                <p className='font-medium text-right'>{currency}{coupon ? (totalPrice - (coupon.discount / 100 * totalPrice)).toFixed(2) : totalPrice.toLocaleString()}</p>
            </div>
            <button onClick={e => toast.promise(handlePlaceOrder(e), { loading: 'placing Order...' })} 
            className='w-full bg-slate-700 text-white py-2.5 rounded hover:bg-slate-900 active:scale-95 transition-all'>
                Place Order</button>

            {showAddressModal && <AddressModal setShowAddressModal={setShowAddressModal} />}

        </div>
        {loading && (
            <div className='fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm'>
                <div className='w-full max-w-md'>
                    <Loading
                        title='Preparing secure payment...'
                        subtitle='Please keep this window open while we initialize your checkout.'
                        fullScreen={false}
                    />
                </div>
            </div>
        )}
        {paymentModal && (
            <div className='fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm'>
                <div className='w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/20'>
                    <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${paymentModal.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                        {paymentModal.type === 'success' ? <CheckCircle2 size={32} /> : <CircleAlert size={32} />}
                    </div>
                    <h3 className='mt-4 text-center text-xl font-semibold text-slate-800'>{paymentModal.title}</h3>
                    <p className='mt-2 text-center text-sm text-slate-500'>{paymentModal.message}</p>
                    <div className='mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center'>
                        <button
                            onClick={() => {
                                setPaymentModal(null);
                                if (paymentModal.type === 'success') {
                                    router.push('/orders');
                                }
                            }}
                            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-medium text-white transition-all ${paymentModal.type === 'success' ? 'bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-700 hover:to-lime-600' : 'bg-slate-800 hover:bg-slate-900'}`}
                        >
                            {paymentModal.type === 'success' ? 'View Orders' : 'Try Again'}
                            <ArrowRight size={16} />
                        </button>
                        <button
                            onClick={() => setPaymentModal(null)}
                            className='rounded-xl border border-slate-200 px-4 py-2.5 font-medium text-slate-600 transition-all hover:bg-slate-100'
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default OrderSummary