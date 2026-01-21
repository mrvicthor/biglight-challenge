
import mobileImage from '../assets/card-mobile.svg'
import desktopImage from '../assets/card-desktop.svg'

export type ContactCardSize = 'mobile' | 'desktop'

export interface ContactCardProps {
    size?: ContactCardSize;
    alt?: string;
}

const ContactCard = ({ size = 'mobile', alt = 'Contact card' }: ContactCardProps) => {
    const image = size === 'desktop' ? desktopImage : mobileImage


    return (
        <img
            className='w-full object-cover rounded-lg'
            alt={alt}
            src={image}
        />
    );
}

export default ContactCard;