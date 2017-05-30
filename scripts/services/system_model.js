/* System Mathematical Model: contain functions to ouput values of ligand-macromolecule system */

angular.module('system_model', [])
	.service('systemModel', [systemMethod]);

function systemMethod() { // creating master function object that encapsulate all methods to inject into service
	var system = this;
	system.dH_possible = [-12.3];
	system.kOff_possible = [0.001]; // note that this is an absolute value of kOff, real value must be negative
	system.kOn_possible = [390]

/* 2. creating sub-methods as part of the function object that can be called */
system.examples=[
	//double injection
	{
		id:0,
		dH:300,
		kOff:1,
		kOn:10
	},
	{
		id:1,
		dH:300,
		kOff:1,
		kOn:10
	},
	//first research c
	{
		id:2,
		dH:-10,
		kOff:1,
		kOn:4000000
	},
	{
		id:3,
		dH:-10,
		kOff:1,
		kOn:4000000
	},
	{
		id:4,
		dH:-10,
		kOff:1,
		kOn:4000000
	},
	{
		id:5,
		dH:-10,
		kOff:1,
		kOn:4000000
	},
	//2nd research c 
	{
		id:6,
		dH:-10,
		kOff:1,
		kOn:2000000000
	},
	{
		id:7,
		dH:-10,
		kOff:1,
		kOn:2000000000
	},
	{
		id:8,
		dH:-10,
		kOff:1,
		kOn:2000000000
	},
	{
		id:9,
		dH:-10,
		kOff:1,
		kOn:2000000000
	},
	//noise 
	{
		id:10,
		dH:-10,
		kOff:1,
		kOn:2000000000
	},
	{
		id:11,
		dH:-10,
		kOff:1,
		kOn:2000000000
	},
	//PLACEHOLDERS - first solution prep - real reactions - set in experiment.pairs 
	//need to set
	{
		id:12,
		dH:-10,
		kOff:1,
		kOn:2000000000
	},
	{
		id:13,
		dH:-10,
		kOff:1,
		kOn:2000000000
	},
]
	system.setExample=function(example){
		thisExample = example[0];
		
		system.dH = system.examples[thisExample].dH;
		system.kOff = system.examples[thisExample].kOff;
		system.kOn = system.examples[thisExample].kOn;
		system.calc_kd();
		console.log(system.kd)
		
	}
//assign deltH - constant
	system.set_dH = function() {
		system.flip_dH = function() {
			system.dH_chance = Math.floor(system.dH_possible.length*Math.random());
		};
		system.flip_dH();

		if (system.dH_chance == system.dH_possible.length) {
			system.flip_dH();
		} else {
			system.dH = system.dH_possible[system.dH_chance];
		}
	};
//assign K_on - constant 
	system.set_kOn = function() {
		system.flip_kOn = function() {
			system.kOn_chance = Math.floor(system.kOn_possible.length*Math.random());
		};
		system.flip_kOn();

		if (system.kOn_chance == system.kOn_possible.length) {
			system.flip_kOn();
		} else {
			system.kOn = system.kOn_possible[system.kOn_chance];
		}
	};
//assign K_off - constant
	system.set_kOff = function() {
		system.flip_kOff = function() {
			system.kOff_chance = Math.floor(system.kOff_possible.length*Math.random());
		};
		system.flip_kOff();

		if (system.kOff_chance == system.kOff_possible.length) {
			system.flip_kOff();
		} else {
			system.kOff = system.kOff_possible[system.kOff_chance];
		}
	};
//calculate K_eq - constant
	system.calc_kd = function() {
		system.kd = system.kOn/system.kOff
		console.log('KD: ',system.kd)
		
	}
//load pair and calculate constants
	system.loadNewPair = function(){
		system.set_dH();
		system.set_kOn();
		system.set_kOff();
		system.calc_kd();
	}

}