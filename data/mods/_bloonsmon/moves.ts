export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	
	dynamitethrow: {
		num: -1000,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Dynamite Throw",
		pp: 30,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},
	cannonblast: {
		num: -1001,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Cannon Blast",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "10% chance to lower target's defense by 1.",
	},
	shellshock: {
		num: -1002,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Shell Shock",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
		secondary: {
			chance: 50,
			status: 'par',
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "50% chance to paralyze the target.",
	},

	blademaelstrom:{
		num: -1003,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Blade Maelstrom",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		target: "allAdjacent",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},
	gluestrike:{
		num: -1004,
		accuracy: 120,
		basePower: 90,
		category: "Special",
		name: "Glue Strike",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		self: {
			boosts: {
				spa: -2,
			},
		},
		target: "allAdjacentFoes",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},
	relentlessglue:{
		num: -1005,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Relentless Glue",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		volatileStatus: 'partiallytrapped',
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},
	impalingicicle: {
		num: -1006,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Impaling Icicle",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, pulse: 1 },
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "10% chance to lower target's defense by 1.",
	},
	spikestorm: {
		num: -1007,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Spike Storm",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('spikes');
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('spikes');
				}
			}
		},
		secondary: {}, // Sheer Force-boosted
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "Sets a layer of Spikes on the opposing side.",
	},
	sacrificialtotem: {
		num: -1008,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sacrificial Totem",
		pp: 10,
		priority: 0,
		flags: { snatch: 1 },
		onTry(source) {
			if (source.hp <= source.maxhp / 2 || source.maxhp === 1) return false;
		},
		onTryHit(pokemon, target, move) {
			if (!this.boost(move.boosts!)) return null;
			delete move.boosts;
		},
		onHit(pokemon) {
			this.directDamage(pokemon.maxhp / 2);
		},
		boosts: {
			atk: 2,
			spa: 2,
			spe: 2,
		},
		target: "self",
		type: "Ghost",
		shortDesc: "+2 Attack, Sp. Attack, Speed for 1/2 user's max HP.",
	},
	// flurryofjustice: {
	// 	num: -1009,
	// 	accuracy: 100,
	// 	basePower: 80,
	// 	category: "Physical",
	// 	name: "Flurry of Justice",
	// 	pp: 15,
	// 	priority: 0,
	// 	flags: { protect: 1, mirror: 1, sound: 1, slicing: 1 },
	// 	onAfterMoveSecondarySelf(pokemon) {
	// 		if (pokemon.baseSpecies.baseSpecies === "Dan D'Monke" && !pokemon.transformed) {
	// 			const dandmonkeForme = pokemon.species.id === 'dandmonke' ? 'dandmonke' : 'themasquedmacaque';
	// 			pokemon.formeChange(dandmonkeForme, this.effect, false, '0', '[msg]');
	// 		}
	// 	},
	// 	target: "normal",
	// 	type: "Normal",
	// 	contestType: "Beautiful",
	// },
	superbolt: {
		num: -1010,
		accuracy: 95,
		basePower: 100,
		category: "Physical",
		name: "Super Bolt",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		critRatio: 2,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "High critical hit ratio.",
	},
	farwindarrow: {
		num: -1011,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Farwind Arrow",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 20,
			self: {
				boosts: {
					spa: 1
				},
			},
		},
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "20% chance to raise the user's Sp Atk.",
	},
	amperearrow: {
		num: -1012,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Ampere Arrow",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 20,
			self: {
				boosts: {
					spa: 1
				},
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Tough",
		shortDesc: "20% chance to raise the user's Sp. Atk.",
	},
	iceborearrow: {
		num: -1013,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Icebore Arrow",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 20,
			self: {
				boosts: {
					atk: 1
				},
			},
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "20% chance to raise the user's Attack.",
	},
	bombdrop: {
		num: -1014,
		accuracy: 95,
		basePower: 85,
		category: "Special",
		name: "Bomb Drop",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Sp. Def by 1.",
	},
	homingmissile: {
		num: -1015,
		accuracy: true,
		basePower: 90,
		category: "Special",
		name: "Homing Missile",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},
	clusterbombs: {
		num: -1016,
		accuracy: 90,
		basePower: 25,
		category: "Special",
		name: "Cluster Bombs",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
		multihit: [2, 5],
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "Hits 2-5 times in one turn.",
	},
	armageddon: {
		num: -1017,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Armageddon",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
		secondary: {
			chance: 10,
			status: 'tox',
		},
		self: {
			boosts: {
				spa: -2,
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Beautiful",
	},
	preemptivestrike: {
		num: -1018,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Pre-Emptive Strike",
		pp: 10,
		priority: 2,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Pre-Emptive Strike only works on your first turn out.");
				return false;
			}
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	stickybomb: {
		num: -1019,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Sticky Bomb",
		pp: 10,
		priority: 0,
		flags: { allyanim: 1, metronome: 1, futuremove: 1 },
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'stickybomb',
				source,
				moveData: {
					id: 'stickybomb',
					name: "Sticky Bomb",
					accuracy: 100,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: { allyanim: 1, metronome: 1, futuremove: 1 },
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Fire',
				},
			});
			this.add('-start', source, 'move: Sticky Bomb');
			return this.NOT_FAIL;
		},
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
}