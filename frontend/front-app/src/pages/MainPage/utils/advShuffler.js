import macanImg from '../assets/adv/macan.png';
import elenaImg from '../assets/adv/elena.jpg';
import babyImg from '../assets/adv/baby.png';
import donorImg from '../assets/adv/donor.png';
import wifeImg from '../assets/adv/wife.png';
import pergImg from '../assets/adv/perg.png';

function shuffle(array) {
        return array
            .map(v => ({ v, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(el => el.v);
}

export const ads = [
    { imgSrc: macanImg, details: "Военная служба по контракту. Выплаты до ₽1 млн. в месяц", btnLink: "https://itmo.ru" },
    { imgSrc: elenaImg, details: "Елена 400 метров от вас", btnLink: "https://my.itmo.ru/persons" },
    { imgSrc: babyImg, details: "Роды в Панаме с комфортом. Узнать подробнее", btnLink: "https://my.itmo.ru/requests/new/2786" },
    { imgSrc: donorImg, details: "Хотите стать донором яйцеклеток? Записаться сейчас", btnLink: "https://se.ifmo.ru/courses/web#labs" },
    { imgSrc: wifeImg, details: "Вернуть жену реально. Бывшая сама захочет вернуться", btnLink: "https://burgerkingrus.ru" },
    { imgSrc: pergImg, details: "Беременность по натальной карте. Узнать точные даты", btnLink: "https://www.random.org/" }
];

export function shuffleAds(setLeftAds, setRightAds) {
    const shuffled = shuffle(ads);
    const half = Math.ceil(shuffled.length / 2);

    setLeftAds(shuffled.slice(0, half));
    setRightAds(shuffled.slice(half));
}