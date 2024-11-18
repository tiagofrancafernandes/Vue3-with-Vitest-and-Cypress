import { v4 as uuidv4 } from 'uuid';

import { ifObjectOr } from '@/helpers/helpers';

export const types = [
    { value: 'MUDANCA', label: 'Mudança' },
    { value: 'ICAMENTO', label: 'Içamento' },
    { value: 'FRETE', label: 'Frete' },
];

export const locations = [
    'Curitiba/PR',
    'São José dos Pinhais/PR',
    'Londrina/PR',
    'Maringá/PR',
    'Foz do Iguaçu/PR',
    'Cascavel/PR',
    'Ponta Grossa/PR',
    'Guarapuava/PR',
    'Paranaguá/PR',
    'Toledo/PR',
];

export const names = [
    'Fulano de Tal',
    'Ciclano de Souza',
    'Beltrano da Silva',
    'Maria das Dores',
    'João Ninguém',
];

export const generateRandomBoolean = () => Math.random() < 0.5;

export const generateContactData = () => {
    return {
        phones: [
            {
                phone: '41 99999-8888',
                contactName: names[Math.floor(Math.random() * names.length)],
                wa: generateRandomBoolean(),
                sms: generateRandomBoolean(),
                call: generateRandomBoolean(),
            },
        ],
        emails: ['fulano@site.com'],
    };
};

export const generateItems = (count = 1, mergeData = {}) => {
    const items = [];
    count = !isNaN(parseInt(count)) && parseInt(count) > 0 ? parseInt(count) : 1;
    mergeData = ifObjectOr(mergeData, {});

    for (let i = 0; i < count; i++) {
        const fromIndex = Math.floor(Math.random() * locations.length);
        let toIndex = Math.floor(Math.random() * locations.length);

        // Ensure 'from' and 'to' are different
        while (toIndex === fromIndex) {
            toIndex = Math.floor(Math.random() * locations.length);
        }

        const from = locations[fromIndex];
        const to = locations[toIndex];
        const type = types[Math.floor(Math.random() * types.length)];

        items.push({
            uid: uuidv4(),
            type: type,
            title: `${type.label} de ${from} para ${to}`,
            from: from,
            to: to,
            description: `${type.label} | ${from} para ${to}`,
            contactPrice: Math.floor(Math.random() * 4) + 1,
            contactData: (i < 5) ? generateContactData() : null, // Only first 5 have contact data
            urgent: generateRandomBoolean(),
            featured: generateRandomBoolean(),
            ...mergeData,
        });
    }

    return items;
};

export const staticFakeItems = [
    {
        uid: '1a2b3c4d5e6f7g8h9i0j',
        type: { value: 'MUDANCA', label: 'Mudança' },
        title: 'Mudança de Curitiba/PR para São José dos Pinhais/PR',
        from: 'Curitiba/PR',
        to: 'São José dos Pinhais/PR',
        description: 'Mudança doméstica de Curitiba/PR para São José dos Pinhais/PR',
        contactPrice: 3,
        contactData: null,
        urgent: true,
        featured: false,
    },
    {
        uid: '2b3c4d5e6f7g8h9i0j1a',
        type: { value: 'IACAMENTO', label: 'Içamento' },
        title: 'Içamento de Londrina/PR para Maringá/PR',
        from: 'Londrina/PR',
        to: 'Maringá/PR',
        description: 'Içamento doméstico de Londrina/PR para Maringá/PR',
        contactPrice: 2,
        contactData: null,
        urgent: false,
        featured: true,
    },
    {
        uid: '3c4d5e6f7g8h9i0j1a2b',
        type: { value: 'FRETE', label: 'Frete' },
        title: 'Frete de Foz do Iguaçu/PR para Cascavel/PR',
        from: 'Foz do Iguaçu/PR',
        to: 'Cascavel/PR',
        description: 'Frete doméstico de Foz do Iguaçu/PR para Cascavel/PR',
        contactPrice: 1,
        contactData: null,
        urgent: true,
        featured: true,
    },
    {
        uid: '4d5e6f7g8h9i0j1a2b3c',
        type: { value: 'MUDANCA', label: 'Mudança' },
        title: 'Mudança de Ponta Grossa/PR para Guarapuava/PR',
        from: 'Ponta Grossa/PR',
        to: 'Guarapuava/PR',
        description: 'Mudança doméstica de Ponta Grossa/PR para Guarapuava/PR',
        contactPrice: 4,
        contactData: null,
        urgent: false,
        featured: false,
    },
    {
        uid: '5e6f7g8h9i0j1a2b3c4d',
        type: { value: 'IACAMENTO', label: 'Içamento' },
        title: 'Içamento de Paranaguá/PR para Toledo/PR',
        from: 'Paranaguá/PR',
        to: 'Toledo/PR',
        description: 'Içamento doméstico de Paranaguá/PR para Toledo/PR',
        contactPrice: 3,
        contactData: {
            phones: [
                {
                    phone: '41 99999-8888',
                    contactName: 'Fulano de Tal',
                    wa: true,
                    sms: false,
                    call: true,
                },
            ],
            emails: ['fulano@site.com'],
        },
        urgent: true,
        featured: false,
    },
    {
        uid: '6f7g8h9i0j1a2b3c4d5e',
        type: { value: 'FRETE', label: 'Frete' },
        title: 'Frete de Curitiba/PR para Londrina/PR',
        from: 'Curitiba/PR',
        to: 'Londrina/PR',
        description: 'Frete doméstico de Curitiba/PR para Londrina/PR',
        contactPrice: 2,
        contactData: {
            phones: [
                {
                    phone: '41 99999-7777',
                    contactName: 'Ciclano de Souza',
                    wa: false,
                    sms: true,
                    call: false,
                },
            ],
            emails: ['ciclano@site.com'],
        },
        urgent: false,
        featured: true,
    },
    {
        uid: '7g8h9i0j1a2b3c4d5e6f',
        type: { value: 'MUDANCA', label: 'Mudança' },
        title: 'Mudança de Maringá/PR para Foz do Iguaçu/PR',
        from: 'Maringá/PR',
        to: 'Foz do Iguaçu/PR',
        description: 'Mudança doméstica de Maringá/PR para Foz do Iguaçu/PR',
        contactPrice: 1,
        contactData: {
            phones: [
                {
                    phone: '41 99999-6666',
                    contactName: 'Beltrano da Silva',
                    wa: true,
                    sms: true,
                    call: false,
                },
            ],
            emails: ['beltrano@site.com'],
        },
        urgent: true,
        featured: false,
    },
    {
        uid: '8h9i0j1a2b3c4d5e6f7g',
        type: { value: 'IACAMENTO', label: 'Içamento' },
        title: 'Içamento de Cascavel/PR para Ponta Grossa/PR',
        from: 'Cascavel/PR',
        to: 'Ponta Grossa/PR',
        description: 'Içamento doméstico de Cascavel/PR para Ponta Grossa/PR',
        contactPrice: 4,
        contactData: {
            phones: [
                {
                    phone: '41 99999-5555',
                    contactName: 'Maria das Dores',
                    wa: false,
                    sms: false,
                    call: true,
                },
            ],
            emails: ['maria@site.com'],
        },
        urgent: false,
        featured: true,
    },
    {
        uid: '9i0j1a2b3c4d5e6f7g8h',
        type: { value: 'FRETE', label: 'Frete' },
        title: 'Frete de Guarapuava/PR para Paranaguá/PR',
        from: 'Guarapuava/PR',
        to: 'Paranaguá/PR',
        description: 'Frete doméstico de Guarapuava/PR para Paranaguá/PR',
        contactPrice: 3,
        contactData: {
            phones: [
                {
                    phone: '41 99999-4444',
                    contactName: 'João Ninguém',
                    wa: true,
                    sms: true,
                    call: true,
                },
            ],
            emails: ['joao@site.com'],
        },
        urgent: true,
        featured: false,
    },
    {
        uid: '0j1a2b3c4d5e6f7g8h9i',
        type: { value: 'MUDANCA', label: 'Mudança' },
        title: 'Mudança de Toledo/PR para Curitiba/PR',
        from: 'Toledo/PR',
        to: 'Curitiba/PR',
        description: 'Mudança doméstica de Toledo/PR para Curitiba/PR',
        contactPrice: 2,
        contactData: null,
        urgent: false,
        featured: true,
    },
    {
        uid: '1b2c3d4e5f6g7h8i9j0k',
        type: { value: 'IACAMENTO', label: 'Içamento' },
        title: 'Içamento de São José dos Pinhais/PR para Londrina/PR',
        from: 'São José dos Pinhais/PR',
        to: 'Londrina/PR',
        description: 'Içamento doméstico de São José dos Pinhais/PR para Londrina/PR',
        contactPrice: 1,
        contactData: null,
        urgent: true,
        featured: false,
    },
    {
        uid: '2c3d4e5f6g7h8i9j0k1b',
        type: { value: 'FRETE', label: 'Frete' },
        title: 'Frete de Maringá/PR para Cascavel/PR',
        from: 'Maringá/PR',
        to: 'Cascavel/PR',
        description: 'Frete doméstico de Maringá/PR para Cascavel/PR',
        contactPrice: 4,
        contactData: null,
        urgent: false,
        featured: true,
    },
    {
        uid: '3d4e5f6g7h8i9j0k1b2c',
        type: { value: 'MUDANCA', label: 'Mudança' },
        title: 'Mudança de Foz do Iguaçu/PR para Ponta Grossa/PR',
        from: 'Foz do Iguaçu/PR',
        to: 'Ponta Grossa/PR',
        description: 'Mudança doméstica de Foz do Iguaçu/PR para Ponta Grossa/PR',
        contactPrice: 3,
        contactData: null,
        urgent: true,
        featured: false,
    },
    {
        uid: '4e5f6g7h8i9j0k1b2c3d',
        type: { value: 'IACAMENTO', label: 'Içamento' },
        title: 'Içamento de Guarapuava/PR para Toledo/PR',
        from: 'Guarapuava/PR',
        to: 'Toledo/PR',
        description: 'Içamento doméstico de Guarapuava/PR para Toledo/PR',
        contactPrice: 2,
        contactData: null,
        urgent: false,
        featured: true,
    },
    {
        uid: '5f6g7h8i9j0k1b2c3d4e',
        type: { value: 'FRETE', label: 'Frete' },
        title: 'Frete de Paranaguá/PR para São José dos Pinhais/PR',
        from: 'Paranaguá/PR',
        to: 'São José dos Pinhais/PR',
        description: 'Frete doméstico de Paranaguá/PR para São José dos Pinhais/PR',
        contactPrice: 1,
        contactData: null,
        urgent: true,
        featured: false,
    },
];

const PostItemFactory = {
    types,
    locations,
    names,
    generateRandomBoolean,
    generateContactData,
    generateItems,
};

export default PostItemFactory;
