export interface Powerstats {
    intelligence: string;
    strength: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
}

export interface Biography {
    'full-name': string;
    'alter-egos': string;
    aliases: string[];
    'place-of-birth': string;
    'first-appearance': string;
    publisher: string;
    alignment: string;
}

export interface Appearance {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    'eye-color': string;
    'hair-color': string;
}

export interface Work {
    occupation: string;
    base: string;
}

export interface Connections {
    'group-affiliation': string;
    relatives: string;
}

export interface Superhero {
    id: string;
    name: string;
    biography: {
        'full-name': string;
        'alter-egos': string;
        aliases: string[];
        'place-of-birth': string;
        'first-appearance': string;
        publisher: string;
        alignment: string;
    };
    image: {
        url: string;
    };
}

export interface ApiResponse {
    response: string;
    'results-for': string;
    results: Superhero[];
}

export interface IronmanProps {
    hero: string;
    fullName: string;
    placeOfBirth: string;
    firstAppearance: string;
    publisher: string;
    alignment: string;
}

export interface CounterState {
    like: number;
    unlike: number;
    sumar: (value: number, voteType: string) => void;
}



export interface CardVotedProps {
    voteType: 'like' | 'unlike';
}
