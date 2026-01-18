
import mobileImage from '../assets/card-mobile.svg'
import desktopImage from '../assets/card-desktop.svg'

export type ContactCardSize = 'mobile' | 'desktop'

export interface ContactCardProps {
    size?: ContactCardSize;
    alt?: string;
}

const ContactCard = ({ size = 'mobile', alt = 'Contact card' }: ContactCardProps) => {
    const image = size === 'desktop' ? desktopImage : mobileImage
    const sizeStyles = {
        mobile: "w-[18.4375rem] h-[8.625rem]",
        desktop: "w-[24.625rem] h-[12.125rem]",
    };

    return (
        <img
            className={`${sizeStyles[size]} object-cover rounded-lg`}
            alt={alt}
            src={image}
        />
    );
}

export default ContactCard;