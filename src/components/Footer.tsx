import { starShieldFontSans } from '@/conf';
import Link from 'next/link';

export const Footer = () => {
    return (
        <div className="flex w-full justify-center text-xs mb-10">
            <Link href={'/'} className="mx-3">
                <span className={`${starShieldFontSans.className} antialiased font-bold`}>
                    SUPERHEROES{' '}
                </span>

                <span> © {new Date().getFullYear()}</span>
            </Link>
            <Link href={'/'} className="mx-3">
                Terminos y Condiciones
            </Link>
            <Link href={'/'} className="mx-3">
                Políticas de privacidad y Tratamiento de datos
            </Link>
            <Link href={'/'} className="mx-3">
                Contactenos
            </Link>
        </div>
    );
};
