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
				return this.chainModify([4915, 4096]);
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
				return this.chainModify([4915, 4096]);
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
		num: 143,
	},
}