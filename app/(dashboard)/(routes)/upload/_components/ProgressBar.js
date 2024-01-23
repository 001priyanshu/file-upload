import React from 'react'

const ProgressBar = ({ progress }) => {
    return (
        <div className='bg-grey-400 w-full h-4 mt-3 rounded-full'>
            <div className=' bg-primary h-4 text-white rounded-full text-[10px]' style={{ width: `${progress}%` }}>
                {`${Number(progress).toFixed(0)}%`}
            </div>
        </div>
    )
}

export default ProgressBar