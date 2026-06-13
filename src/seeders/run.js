// ============================================================
// Initial seed script — populates the database with the same
// data found in the front-end `lib/data.ts` (categories, drinks,
// themes, branding, cashiers, FX rate).
//
// Usage :  npm run seed
// ============================================================
const { sequelize } = require('../models');
const env = require('../config/env');

const CATEGORIES = [
    { label: 'All', slug: 'all' },
    { label: 'Water', slug: 'water' },
    { label: 'Energy', slug: 'energy' },
    { label: 'Other', slug: 'other' },
    { label: 'Whiskies', slug: 'whiskies' },
    { label: 'Vins', slug: 'vins' },
    { label: 'Champagnes', slug: 'champagnes' },
    { label: 'Vodka', slug: 'vodka' },
    { label: 'Cognacs', slug: 'cognacs' },
    { label: 'Tequilas', slug: 'tequilas' },
    { label: 'Liqueurs', slug: 'liqueurs' },
    { label: 'Bières', slug: 'bieres' },
    { label: 'Soft', slug: 'soft' },
];

const PRESET_THEMES = [
    { name: 'Royal Gold', primaryColor: '#D4AF37', secondaryColor: '#FFF8E1' },
    { name: 'Emerald', primaryColor: '#10B981', secondaryColor: '#D1FAE5' },
    { name: 'Ruby Lounge', primaryColor: '#B91C1C', secondaryColor: '#FEE2E2' },
    { name: 'Champagne', primaryColor: '#EAB308', secondaryColor: '#FEF9C3' },
    { name: 'Royal Purple', primaryColor: '#7C3AED', secondaryColor: '#EDE9FE' },
    { name: 'Sapphire', primaryColor: '#2563EB', secondaryColor: '#DBEAFE' },
    { name: 'Copper', primaryColor: '#B45309', secondaryColor: '#FEF3C7' },
    { name: 'Rose Gold', primaryColor: '#BE5672', secondaryColor: '#FCE7F3' },
    { name: 'Obsidian', primaryColor: '#111827', secondaryColor: '#F3F4F6' },
];

const DRINKS = [
    { id: 'sir-edwards', name: "Sir Edward's", category: 'whiskies', image: "/drinks/Sir Edward's.jpeg", price: 30 },
    { id: 'grants-75cl', name: "Grant's 75 cl", category: 'whiskies', image: "/drinks/Grant's.jpeg", price: 35 },
    { id: 'mouton-cadet', name: 'Mouton Cadet', category: 'vins', image: '/drinks/Mouton Cadet.jpeg', price: 35 },
    { id: 'red-label', name: 'Red Label', category: 'whiskies', image: '/drinks/red Label.jpeg', price: 40 },
    { id: 'black-label', name: 'Black Label', category: 'whiskies', image: '/drinks/Black Label.jpeg', price: 60 },
    { id: 'double-black', name: 'Double Black', category: 'whiskies', image: '/drinks/double Label.jpeg', price: 80 },
    { id: 'gold-label', name: 'Gold Label', category: 'whiskies', image: '/drinks/Gold Label.jpeg', price: 90 },
    { id: 'absolut-vodka-75cl', name: 'Absolut Vodka 75 cl', category: 'vodka', image: '/drinks/Absolut Vodka 75 cl.jpeg', price: 40 },
    { id: 'baileys', name: 'Baileys', category: 'liqueurs', image: '/drinks/Baileys.jpeg', price: 40 },
    { id: 'cointreau', name: 'Cointreau', category: 'liqueurs', image: '/drinks/Cointreau.jpeg', price: 70 },
    { id: 'jameson', name: 'Jameson', category: 'whiskies', image: '/drinks/Jameson.jpeg', price: 50 },
    { id: 'jagermeister-50cl', name: 'Jägermeister 50 cl', category: 'liqueurs', image: '/drinks/Jägermeister.jpeg', price: 50 },
    { id: 'jagermeister-1l', name: 'Jägermeister 1 L', category: 'liqueurs', image: '/drinks/Jägermeister.jpeg', price: 80 },
    { id: 'jack-daniels-70cl', name: "Jack Daniel's 70 cl", category: 'whiskies', image: "/drinks/Jack Daniel's.jpeg", price: 70 },
    { id: 'jack-daniels-honey-70cl', name: "Jack Daniel's Honey 70 cl", category: 'whiskies', image: "/drinks/Jack Daniel's Honey.jpeg", price: 75 },
    { id: 'chivas-12-75cl', name: 'Chivas 12 ans 75 cl', category: 'whiskies', image: '/drinks/Chivas.jpeg', price: 75 },
    { id: 'hennessy-vs', name: 'Hennessy VS', category: 'cognacs', image: '/drinks/Hennessy vs.jpeg', price: 80 },
    { id: 'hennessy-vsop', name: 'Hennessy VSOP', category: 'cognacs', image: '/drinks/Hennessy VSOP.jpeg', price: 150 },
    { id: 'martell-blue-swift', name: 'Martell Blue Swift', category: 'cognacs', image: '/drinks/Martell Blue Swift.jpeg', price: 100 },
    { id: 'camino-real-blanco-75cl', name: 'Camino Real Blanco 75 cl', category: 'tequilas', image: '/drinks/Camino Real Blanco.jpeg', price: 40 },
    { id: 'olmeca', name: 'Olmeca', category: 'tequilas', image: '/drinks/olmeca.jpeg', price: 50 },
    { id: 'don-julio-blanco', name: 'Don Julio Blanco', category: 'tequilas', image: '/drinks/Don Julio Blanco.jpeg', price: 100 },
    { id: 'baron-darignac', name: "Baron d'Arignac", category: 'vins', image: "/drinks/Baron d'Arignac.jpeg", price: 50 },
    { id: 'jp-chenet', name: 'JP. Chenet', category: 'vins', image: '/drinks/JP. Chenet.jpeg', price: 50 },
    { id: 'moet-brut', name: 'Moët Brut', category: 'champagnes', image: '/drinks/moet brut.jpeg', price: 100 },
    { id: 'moet-ice-imperial', name: 'Moët Ice Impérial', category: 'champagnes', image: '/drinks/moet ice.jpeg', price: 120 },
    { id: 'moet-nectar-imperial', name: 'Moët Nectar Impérial', category: 'champagnes', image: '/drinks/moét nectar imperial.jpeg', price: 150 },
    { id: 'veuve-clicquot', name: 'Veuve Clicquot', category: 'champagnes', image: '/drinks/moet brut.jpeg', price: 180 },
    { id: 'ruinart-blanc-de-blancs', name: 'Ruinart Blanc de Blancs', category: 'champagnes', image: '/drinks/ruinart.jpeg', price: 250 },
    { id: 'armand-de-brignac', name: 'Armand de Brignac', category: 'champagnes', image: '/drinks/moet brut.jpeg', price: 600 },
    { id: 'bavaria', name: 'Bavaria', category: 'bieres', image: '/drinks/bavaria.jpeg', price: 10000 },
    { id: 'savana', name: 'Savana', category: 'bieres', image: '/drinks/savana.jpeg', price: 10000 },
    { id: 'leffe', name: 'Leffe', category: 'bieres', image: '/drinks/leffe.jpeg', price: 14000 },
    { id: 'xxl', name: 'XXL', category: 'energy', image: '/drinks/energy.png', price: 4500 },
    { id: 'energy-malt', name: 'Energy Malt', category: 'energy', image: '/drinks/energy.png', price: 4500 },
    { id: 'red-bull', name: 'Red Bull', category: 'energy', image: '/drinks/red bull.jpeg', price: 10000 },
    { id: 'coca-cola', name: 'Coca Cola', category: 'soft', image: '/drinks/coca.jpeg', price: 4500 },
    { id: 'fanta', name: 'Fanta', category: 'soft', image: '/drinks/fanta.jpeg', price: 4500 },
    { id: 'maltina', name: 'Maltina', category: 'soft', image: '/drinks/maltina.jpeg', price: 4500 },
    { id: 'vitalo', name: 'Vitalo', category: 'soft', image: '/drinks/lemonade.png', price: 4500 },
    { id: 'tonic', name: 'Tonic', category: 'soft', image: '/drinks/tonic.jpeg', price: 4500 },
    { id: 'castel', name: 'Castel', category: 'bieres', image: '/drinks/castel.jpeg', price: 7000 },
    { id: 'beaufort-gd', name: 'Beaufort GD', category: 'bieres', image: '/drinks/beaufort.jpeg', price: 7000 },
    { id: 'tembo', name: 'Tembo', category: 'bieres', image: '/drinks/bavaria.jpeg', price: 10000 },
    { id: 'nkoyi', name: 'Nkoyi', category: 'bieres', image: '/drinks/bavaria.jpeg', price: 7000 },
    { id: 'primus', name: 'Primus', category: 'bieres', image: '/drinks/Primus.jpeg', price: 7000 },
    { id: 'turbo', name: 'Turbo', category: 'bieres', image: '/drinks/bavaria.jpeg', price: 6000 },
    { id: 'mutzing', name: 'Mutzing', category: 'bieres', image: '/drinks/bavaria.jpeg', price: 6000 },
    { id: 'heineken', name: 'Heineken', category: 'bieres', image: '/drinks/Heineken.jpeg', price: 6000 },
    { id: 'legend-gd', name: 'Legend GD', category: 'bieres', image: '/drinks/bavaria.jpeg', price: 7000 },
    { id: 'tiger', name: 'Tiger', category: 'bieres', image: '/drinks/tiger.jpeg', price: 6000 },
    { id: 'water', name: 'Water', category: 'water', image: '/drinks/water.png', price: 1000, stockQuantity: 500 },
];

const BRANDING = {
    id: 1,
    companyName: 'JOAC',
    tagline: 'Specialty drinks & more',
    logoText: 'J',
    primaryColor: '#f6905f',
    secondaryColor: '#fdebe1',
    idNat: '01-G4701-N25076X',
    rccm: 'CD/KNG/RCCM/17-A-03542',
    taxNumber: 'A1720894F',
    address: '03 Avenue Mbiloa / Ngaliema',
    phone: '+243974763940 / 819648854',
    email: 'zuiya.mambula@gmail.com',
};

const CASHIERS = [
    { code: 'AF666', fullName: 'Albert Flores', avatarUrl: '/cashier-avatar.png', role: 'admin', password: 'brikin2024' },
    { code: 'CESAR', fullName: 'cesar', role: 'manager', password: 'cesar2024' },
];

(async () => {
    try {
        await sequelize.authenticate();
        console.log('[seed] connected');

        // sync schema first
        await sequelize.sync({ alter: env.env !== 'production' });
        console.log('[seed] schema synced');

        // Models
        const {
            Category, Product, PresetTheme, Branding, Cashier, FxRate,
        } = require('../models');

        // --- Categories
        for (const c of CATEGORIES) {
            await Category.findOrCreate({ where: { slug: c.slug }, defaults: c });
        }
        console.log(`[seed] ${CATEGORIES.length} categories`);

        // --- Preset themes
        for (const t of PRESET_THEMES) {
            await PresetTheme.findOrCreate({ where: { name: t.name }, defaults: t });
        }
        console.log(`[seed] ${PRESET_THEMES.length} themes`);

        // --- Products (use slug to find category id)
        const catMap = Object.fromEntries(
            (await Category.findAll()).map((c) => [c.slug, c.id])
        );
        // The front-end uses the slug "all" as a "show all" marker, not a real category.
        for (const d of DRINKS) {
            const catId = catMap[d.category];
            if (!catId) continue;
            await Product.findOrCreate({
                where: { name: d.name },
                defaults: {
                    name: d.name,
                    price: d.price,
                    imageUrl: d.image,
                    categoryId: catId,
                    stockQuantity: d.stockQuantity || 100,
                },
            });
        }
        console.log(`[seed] ${DRINKS.length} products`);

        // --- Branding
        await Branding.upsert(BRANDING);
        console.log('[seed] branding upserted');

        // --- Cashiers (hash the password if provided)
        for (const c of CASHIERS) {
            const { password, ...rest } = c;
            const defaults = {
                ...rest,
                ...(password ? { passwordHash: Cashier.hashPassword(password) } : {}),
            };
            await Cashier.findOrCreate({ where: { code: c.code }, defaults });
        }
        console.log(`[seed] ${CASHIERS.length} cashiers`);

        // --- FX rate
        await FxRate.create({
            code: 'USD',
            rateToFc: env.business.fxRate,
            effectiveAt: new Date(),
        }).catch(() => null);
        console.log(`[seed] FX rate USD = ${env.business.fxRate} FC`);

        console.log('[seed] done');
        process.exit(0);
    } catch (err) {
        console.error('[seed][fatal]', err);
        process.exit(1);
    }
})();
