import { useTranslation } from '@/hooks/useTranslation';
import { classNames } from '@/lib/utils';
import React from 'react';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
    const { t } = useTranslation('common');
    return (
        <>
            <div
                className={classNames(
                    'fixed z-[1000] top-4 right-4 h-full w-1/2 h-[calc(100vh_-_2rem)] rounded',
                    'bg-white100 text-black100 transform transition-transform duration-300 ease-in-out',
                    isOpen ? 'translate-x-0' : 'translate-x-[calc(100%+2rem)]',
                )}
            >
                <div className="p-4 flex flex-col">
                    <button
                        className="mb-4 p-2 bg-primary100 text-white100 rounded self-end"
                        onClick={onClose}
                    >
                        {t('close')}
                    </button>
                    <div className='grow'>{children}</div>
                </div>
            </div>
            <div
                className={`fixed z-[999] inset-0 bg-black100 bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />
        </>
    );
};

export default Drawer;
