import { PlusIcon, SquarePenIcon, XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import AddressModal from './AddressModal';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const OrderSummary = ({ totalPrice, items }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const router = useRouter();

    const addressList = useSelector(state => state.address.list);

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [couponCodeInput, setCouponCodeInput] = useState('');
    const [coupon, setCoupon] = useState('');

    const handleCouponCode = async (event) => {
        event.preventDefault();
        
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
            const options = {
                productId :1,
                amount: amount,
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/createOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(options)
            });
            console.log(res)
            const data = await res.json();
            console.log(data)
            if(!res.ok){
                throw new Error(data.message || 'Something went wrong');
            }
            console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY)
            const paymentObject = new window.Razorpay({
                key : process.env.NEXT_PUBLIC_RAZORPAY_KEY,
                // order_id : data.orderId,
                order_id : data.id,
                ...data,
                handler: async function(response){
                    console.log(response);
                    
                    const options2 = {
                        order_id : response.razorpay_order_id,
                        payment_id : response.razorpay_payment_id,
                        signature : response.razorpay_signature,
                    }

                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/verifyPayment`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(options2)
                    });
                    const data = await res.json();
                    if(!res.ok){
                        throw new Error(data.message || 'Something went wrong');
                    }

                    if(res?.data?.status === 'success'){
                    alert('Payment successful');
                    }else{
                    alert('Payment failed');
                    }
                }
            })
            paymentObject.open();

        }catch(err){
            console.log(err);
        }
    }
    
    useEffect(() => {
        loadScript('https://checkout.razorpay.com/v1/checkout.js');
    }, []);

    return (
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
    )
}

export default OrderSummary