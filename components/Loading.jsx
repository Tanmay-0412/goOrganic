'use client'

const Loading = ({
    title = 'Loading...',
    subtitle = 'Please wait while we prepare everything for you.',
    fullScreen = true,
}) => {
    return (
        <div className={`flex items-center justify-center ${fullScreen ? 'min-h-screen w-full' : 'w-full py-8'}`}>
            <div className='flex flex-col items-center justify-center rounded-2xl border border-emerald-100 bg-white/95 px-8 py-8 text-center shadow-[0_20px_60px_-18px_rgba(16,185,129,0.35)] backdrop-blur-sm'>
                <div className='relative flex h-16 w-16 items-center justify-center'>
                    <div className='absolute inset-0 rounded-full border-4 border-emerald-100'></div>
                    <div className='absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-600 animate-spin'></div>
                    <div className='h-3.5 w-3.5 rounded-full bg-emerald-600'></div>
                </div>
                <p className='mt-5 text-base font-semibold text-slate-700'>{title}</p>
                <p className='mt-1 text-sm text-slate-500'>{subtitle}</p>
            </div>
        </div>
    )
}

export default Loading