export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	firearmsexpert: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				this.debug('Firearms Expert boost');
				return this.chainModify([4915, 4096]);
			}
		},
		flags: {},
		name: "Firearms Expert",
		rating: 3,
		num: -1000,
	},
	explosive: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				this.debug('Explosive boost');
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {},
		name: "Explosive",
		rating: 3,
		num: -1001,
	},
	nuclear: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				this.debug('Nuclear boost');
				return this.chainModify([6144, 4096]);
			}
		},
		flags: {},
		name: "Nuclear",
		rating: 3,
		num: -1002,
	},

	orbitingglaives: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		flags: {},
		name: "Orbiting Glaives",
		rating: 2.5,
		num: -1003,
	},
	razorrotors: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		flags: {},
		name: "Razor Rotors",
		rating: 2.5,
		num: -1004,
	},

	highacidity: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Poison'] = true;
			}

			move.onEffectiveness = (typeMod, target, type) => {
				if (move.type === 'Poison' && type === 'Steel') return 1;
			}
		},
		//    \/ Freeze-Dry Code DO NOT USE \/
		// onEffectiveness(typeMod, target, type) {
		// 	if (type === 'Water') return 1;
		// },
		flags: {},
		name: "High Acidity",
		rating: 3,
		num: -1005,
	},

	signalflare: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (move.category === "Special") {
				if (this.randomChance(3, 10)) {
					target.trySetStatus('brn', source);
				}
			}
		},
		flags: {},
		name: "Signal Flare",
		rating: 2,
		num: -1006,
	},

	berserkerbrew: {
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectState.target) {
				this.debug('Power Spot boost');
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {},
		name: "Berserker Brew",
		rating: 0,
		num: -1007,
	},

	freezeforce: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather(['hail', 'snowscape'])) {
				if (move.type === 'Ice' || move.type === 'Water') {
					this.debug('Freeze Force boost');
					return this.chainModify([6144, 4096]);
				}
			}
		},
		flags: {},
		name: "Freeze Force",
		rating: 2,
		num: -1008,
	},

	bloontrap: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				//this.damage(source.baseMaxhp / 8, source, target);
				if (target.isActive) source.addVolatile('trapped', target, move, 'trapper');
			}
		},
		flags: {},
		name: "Bloon Trap",
		rating: 2.5,
		num: -1009,
	},

	spikesetter: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				for (const side of pokemon.side.foeSidesWithConditions()) {
					side.addSideCondition('spikes');
				}
			}
			// if (pokemon.activeTurns) {
			// 	this.boost({ spe: 1 });
			// }
		},
		flags: {},
		name: "Spike Setter",
		rating: 4.5,
		num: -1010,
	},

	bigsuck: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['wind']) {
				this.debug('BIG SUCK boost');
				return this.chainModify([6144, 4096]);
			}
		},
		flags: {},
		name: "BIG SUCK",
		rating: 3,
		num: -1011,
	},

	freezeproof: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ice') {
				this.add('-immune', target, '[from] ability: Freezeproof');
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Freezeproof",
		rating: 3.5,
		num: -1012,
	},

	absorbenergy: {
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Electric' || move.type === 'Fire')) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Energy Absorb');
				}
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Energy Absorb",
		rating: 3.5,
		num: -1013,
	},

	recursivecluster: {
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.multihit || move.flags['noparentalbond'] || move.flags['charge'] ||
				move.flags['futuremove'] || move.spreadHit || move.isZ || move.isMax) return;
			move.multihit = 2;
			move.multihitType = 'parentalbond';
		},
		// Damage modifier implemented in BattleActions#modifyDamage()
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		flags: {},
		name: "Recursive Cluster",
		rating: 4.5,
		num: -1014,
	},

	piercingammo: {
		onHitProtect(source, target, move) {
			if (move.category == "Physical" || move.category == "Special") {
				target.getMoveHitData(move).bypassProtect = this.effect;
				return false;
			}
		},
		flags: {},
		name: "Piercing Ammo",
		rating: 2,
		num: -1015,
	},
}