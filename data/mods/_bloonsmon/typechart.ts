export const TypeChart: import('../../../sim/dex-data').ModdedTypeDataTable = {
	blast: {
		damageTaken: {
			Bug: 2, // 0 = neutral to; 1 = weak to; 2 = resists; 3 = immune to
			Dark: 0,
			Dragon: 0,
			Electric: 1,
			Fairy: 0,
			Fighting: 0,
			Fire: 2,
			Flying: 0,
			Ghost: 0,
			Grass: 2,
			Ground: 1,
			Ice: 2,
			Normal: 0,
			Poison: 0,
			Psychic: 0,
			Rock: 0,
			Steel: 2,
			Water: 1,
		},
	},

	// ---------------------------
	//        Weak To Blast       
	// ---------------------------
	steel: {
		inherit: true,
		damageTaken: {
			Blast: 1
		}
	},
	ice: {
		inherit: true,
		damageTaken: {
			Blast: 1
		}
	},
	rock: {
		inherit: true,
		damageTaken: {
			Blast: 1
		}
	},
	flying: {
		inherit: true,
		damageTaken: {
			Blast: 1
		}
	},

	// ---------------------------
	//        Resists Blast
	// ---------------------------
	water: {
		inherit: true,
		damageTaken: {
			Blast: 2
		}
	},
	ground: {
		inherit: true,
		damageTaken: {
			Blast: 2
		}
	},
	dark: {
		inherit: true,
		damageTaken: {
			Blast: 2
		}
	},
	psychic: {
		inherit: true,
		damageTaken: {
			Blast: 2
		}
	},
};