import localFont from 'next/font/local';
import { Inter, Bangers, Fredericka_the_Great, Comic_Neue, Anton, Oswald } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '800'] });
const bangers = Bangers({ subsets: ['latin'], weight: '400' });
const fredericka_the_great = Fredericka_the_Great({ subsets: ['latin'], weight: '400' });
const comic_neue = Comic_Neue({ subsets: ['latin'], weight: '400' });
const anton = Anton({ subsets: ['latin'], weight: '400' });
const oswald = Oswald({ subsets: ['latin'], weight: '400' });

const geistSans = localFont({
    src: '../../public/assets/fonts/geist/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: '../../public/assets/fonts/geist/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

const starShieldFontSans = localFont({
    src: '../../public/assets/fonts/star-shield-font/StarShieldRegular-K7DjW.ttf',
    variable: '--font-start-sans',
    weight: '100 900',
});

export {
    inter,
    bangers,
    fredericka_the_great,
    comic_neue, // style by paper comic 
    anton,      //  with bold
    oswald,     // regular    
    geistSans,
    geistMono,
    starShieldFontSans,
};
