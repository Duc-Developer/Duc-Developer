import { classNames } from '@/lib/utils';
import React from 'react';

const NoData = ({ wrapperClassName }: { wrapperClassName?: string; }) => {
    return (
        <div className={classNames(
            "mx-auto flex flex-col items-center justify-center h-full text-center p-6 bg-gray-100 rounded-lg shadow-lg border border-gray-300",
            wrapperClassName
        )}>
            <svg
                className="w-24 h-24 text-red300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Data Available</h2>
            <p className="text-gray-600">There is currently no data to display. Please check back later.</p>
        </div>
    );
};

export default NoData;