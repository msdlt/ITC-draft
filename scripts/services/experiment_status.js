angular.module('experiment_status', ['system_model',])
	.service('experimentStatus', ['systemModel', experimentTrack]);

function experimentTrack(systemModel) { 
	var experiment = this;
	var system = systemModel;

	

//EXPERIMENT TIME TRACKING 
	experiment.startOfDay = 0;
	experiment.timeOfDay = experiment.startOfDay
	experiment.endOfDay = 24.0; // total runs per day = 23
		// creating tracked variables
	experiment.steps = 0;
	experiment.timeOfDay = 0;
	experiment.processDisabled = true;

	experiment.timeOfDayCounter = function(numInj) {
		experiment.steps++;
		experiment.timeForRun = (Math.ceil(numInj/5)*5)/10;
		experiment.timeOfDay += experiment.timeForRun;
			
		
	};
	experiment.degassDialyse=function(){
		experiment.timeOfDay+=0.5;
	}


experiment.gameMode=true
experiment.solutionPrep=0
experiment.recallActive=false
experiment.isNoise=false

	//ANSWER TRACKING--------->
	//initializes counts for answer tracking
	experiment.wrong=0;
	experiment.right=0;
	experiment.beenWrongCount=0;

	
	experiment.questions=[
		//1
		{
			id:0,
			question:'What is the definition of \'ISOTHERMAL change\'?',
			1:'A - a change of a system in which temperature remains constant',
			2:'B - a change of a system in which temperature changes ',
			3:'',
			4:'',
			isCorrect:'',
			ifWrong:'',
			answer:1,
			IsCorrect:null,
			beenWrong:0,
			mAnswer:null,
			wAnswer:null,
		},
		{
			id:1,
			question:'Calculate the reaction entropy change in kJ per mole, quoting your answer to 2dp.',
			isCorrect:'',
			ifWrong:'',
			answer:0.12,
			IsCorrect:null,
			beenWrong:0,
			mAnswer:null,
			wAnswer:null,
		},
		{
			id:2,
			question:'Briefly discuss the main factors that affect these theormodynamic parameters in an association reaction.',
			IsCorrect:null,
			beenWrong:0,
			answer:null,
			mAnswer:null,
			wAnswer:null,
		},
		{
			id:3,
			question:'Is the reaction in the example endothermic or exothermic?',
			1:'A - Exothermic',
			2:'B - Endothermic',
			3:'',
			4:'',
			ifCorrect:'Because the calorimeter is compensating for changes in temperature, a increase in power is attributed to an endothermic reaction and visa versa for exothermic ',
			ifWrong:'',
			answer:'2',
			IsCorrect:null,
			beenWrong:0,
			mAnswer:null,
			wAnswer:null,
		},
		{
			id:4,
			question:'What are the units of the equilibrium constant for this reaction?',
			1:'A - moldm⁻³',
			2:'B - mol⁻¹dm³',
			3:'C - Unitless',
			4:'',
			ifCorrect:'',
			ifWrong:'',
			answer:2,
			IsCorrect:null,
			beenWrong:0,
			mAnswer:null,
			wAnswer:null,
		},
		{
			id:5,
			question:'Calculate a suitable concentration for the macromolecule solution.',
			ifCorrect:'',
			ifWrong:'',
			answer:0.000000025,
			IsCorrect:null,
			beenWrong:0,
			mAnswer:null,
			wAnswer:null,
		},
		{
			id:6,
			question:' Calculate a suitable concentration for the ligand solution.',
			ifCorrect:'',
			ifWrong:'',
			answer:0.000000198800,
			IsCorrect:null,
			beenWrong:0,
			mAnswer:null,
			wAnswer:null,
		},
		{
			id:7,
			question:'Calculate a suitable concentration for the ligand solution with stoichiometry n = 3. ',
			ifCorrect:'',
			ifWrong:'',
			answer:0.000000596400,
			IsCorrect:null,
			beenWrong:0,
			mAnswer:null,
			wAnswer:null,
		},
		{
			id:8,
			question:'Do you think this experiment would provide suitable results?',
			1:'A - Yes',
			2:'B - No',
			
			ifCorrect:'',
			ifWrong:'',
			answer:2,
			IsCorrect:null,
			beenWrong:0,
			mAnswer:null,
			wAnswer:null,
		},
		{
			id:9,
			question:'Last cell from (F)',
			
			ifCorrect:'',
			ifWrong:'',
			answer:0.0000002,
			IsCorrect:null,
			beenWrong:0,
			mAnswer:null,
			wAnswer:null,
		},
		
		{
			id:10,
			question:'First cell from (H)',
			1:'',
			2:'',
			3:'',
			4:'',
			ifCorrect:'',
			ifWrong:'',
			answer:31500,
			IsCorrect:null,
			beenWrong:0,
			mAnswer:null,
			wAnswer:null,
		},
		{
			id:11,
			question:'First cell from (K)',
			ifCorrect:'',
			ifWrong:'',
			answer:99.97,
			IsCorrect:null,
			beenWrong:0,
			mAnswer:null,
			wAnswer:null,
		},
		{
			id:12,
			question:'Last cell from (O)',
			1:'',
			2:'',
			3:'',
			4:'',
			ifCorrect:'',
			ifWrong:'',
			answer:0.000000000007008,
			IsCorrect:null,
			beenWrong:0,
			mAnswer:null,
			wAnswer:null,
		},
		{
			id:13,
			question:'Last cell from (V)',
			1:'',
			2:'',
			3:'',
			4:'',
			ifCorrect:'',
			ifWrong:'',
			answer:0.0000242,
			IsCorrect:null,
			beenWrong:0,
			mAnswer:null,
			wAnswer:null,
		},
		{
			id:14,
			question:'Last cell from (W)',
			1:'',
			2:'',
			3:'',
			4:'',
			ifCorrect:'',
			ifWrong:'',
			answer:0.0004744,
			IsCorrect:null,
			beenWrong:0,
			mAnswer:null,
			wAnswer:null,
		}
	];
	experiment.examples=[
		//Double injection
		{
			id:0,
			example:'',
			numInj:2,
			vInj:0.00001,
			concA:0.0003,
			concB:0.00003,
			tBInj:100,
			isComplete:false,
		},
		{
			id:1,
			example:'',
			numInj:2,
			vInj:0.00001,
			concA:0.0003,
			concB:0.00003,
			tBInj:500,
			isComplete:false,
		},
		//c calculation #1
		{
			id:2,
			example:'',
			numInj:25,
			vInj:0.00001,
			concA:0.00000199,
			concB:0.00000025,
			tBInj:50,
			isComplete:false,
		},
		{
			id:3,
			example:'',
			numInj:25,
			vInj:0.00001,
			concA:0.0000199,
			concB:0.0000025,
			tBInj:50,
			isComplete:false,
		},
		{
			id:4,
			example:'',
			numInj:25,
			vInj:0.00001,
			concA:0.000199,
			concB:0.000025,
			tBInj:50,
			isComplete:false,
		},
		{
			id:5,
			example:'',
			numInj:25,
			vInj:0.00001,
			concA:0.00199,
			concB:0.00025,
			tBInj:50,
			isComplete:false,
		},
		//c calculation #2
		{
			id:6,
			example:'',
			numInj:25,
			vInj:0.00001,
			concA:0.00000000398,
			concB:0.0000000005,
			tBInj:50,
			isComplete:false,
		},
		{
			id:7,
			example:'',
			numInj:25,
			vInj:0.00001,
			concA:0.0000000398,
			concB:0.000000005,
			tBInj:50,
			isComplete:false,
		},
		{
			id:8,
			example:'',
			numInj:25,
			vInj:0.00001,
			concA:0.000000398,
			concB:0.00000005,
			tBInj:50,
			isComplete:false,
		},
		{
			id:9,
			example:'',
			numInj:25,
			vInj:0.00001,
			concA:0.00000398,
			concB:0.0000005,
			tBInj:50,
			isComplete:false,
		},
		//noise examples
		{
			id:10,
			example:'',
			numInj:25,
			vInj:0.00001,
			concA:0.00000398,
			concB:0.0000005,
			tBInj:50,
			isComplete:false,
		},
		{
			id:11,
			example:'',
			numInj:25,
			vInj:0.00001,
			concA:0.000000398,
			concB:0.00000005,
			tBInj:50,
			isComplete:false,
		},
		//solution prep example
		{
			id:12,
			example:'',
			numInj:25,
			vInj:0.00001,
			concA:0.000018072,
			concB:0.0000022727,
			tBInj:50,
			isComplete:false,
		},
		//solution prep with background
		{
			id:13,
			example:'',
			numInj:25,
			vInj:0.00001,
			concA:0.000018072,
			concB:0.0000022727,
			tBInj:50,
			isComplete:false,
		},

		{
			id:14,
			example:'',
			numInj:25,
			vInj:0.00001,
			concA:0.000000398,
			concB:0.00000005,
			tBInj:5,
			isComplete:false,
		},
		//first 'running example'
		{
			id:15,
			example:'',
			numInj:25,
			vInj:0.00001,
			concA:0.000000398,
			concB:0.00000005,
			tBInj:5,
			isComplete:false,
			ligand:'EDTA',
			sample: 'Ca'
		},
		//second 'running' example
		{
			id:16,
			example:'',
			numInj:25,
			vInj:0.00001,
			concA:0.000000398,
			concB:0.00000005,
			tBInj:5,
			isComplete:false,
			ligand:'EDTA',
			sample: 'Ca'
		}
	];
	experiment.worked=[
		{
			id:0,
			stage:1
		},
		{
			id:1,
			stage:0
		},
		{
			id:2,
			stage:0
		},
		{
			id:3,
			stage:0
		}
	];
	experiment.console=[
		//double injection
		{
			id:'0a',
			show:false,
			text:'Injection Concentration: 300μM, Sample Cell Concentration: 30μM, Number of Injections: 2, Time Between Injections: 100 seconds, Volume of Injections: 10μL',
		},
		{
			id:'0b',
			show:false,
			text:'Success! Time Between Injections: 1 seconds.In this experiment, the cell is not allowed to equilibrate before the second injection. On addition of the second aliquot, the signal jumps because ligand from both the first and second injections are reacting. '
		},
		{
			id:'1a',
			show:false,
			text:'Injection Concentration: 300μM, Sample Cell Concentration: 30μM, Number of Injections: 2, Time Between Injections: 500 seconds, Volume of Injections: 10μL',
		},
		{
			id:'1b',
			show:false,
			text:'Success: Time Between Injections: 5 seconds. In this experiment, the cell is given sufficient time to equilibrate before the second injection. On addition of the second aliquot, the heat output is ONLY due to the addition, and not previous additions.'
		},
		//c experiments 1-4
		{
			id:'2a',
			show:false,
			text:'To Do: c = 1, Number of injections: 25, Volume of Injections: 10μl, Time bewtween injections: 50s'
		},
		{
			id:'2b',
			show:false,
			text:'Success: c = 1'
		},
		{
			id:'3a',
			show:false,
			text:'To Do: c = 10, Number of injections: 25, Volume of Injections: 10μl, Time bewtween injections: 50s'
		},
		{
			id:'3b',
			show:false,
			text:'Success: c = 10'
		},
		{
			id:'4a',
			show:false,
			text:'To Do: c = 100, Number of injections: 25, Volume of Injections: 10μl, Time bewtween injections: 50s'
		},
		{
			id:'4b',
			show:false,
			text:'Success: c = 100'
		},
		{
			id:'5a',
			show:false,
			text:'To Do: c = 1000, Number of injections: 25, Volume of Injections: 10μl, Time bewtween injections: 50s'
		},
		{
			id:'5b',
			show:false,
			text:'Success: c = 1000'
		},
		//c experiments 5-8
		{
			id:'6a',
			show:false,
			text:'To Do: c = 1, Number of injections: 25, Volume of Injections: 10μl, Time bewtween injections: 50s'
		},
		{
			id:'6b',
			show:false,
			text:'Success: c = 1'
		},
		{
			id:'7a',
			show:false,
			text:'To Do: c = 10, Number of injections: 25, Volume of Injections: 10μl, Time bewtween injections: 50s'
		},
		{
			id:'7b',
			show:false,
			text:'Success: c = 10'
		},
		{
			id:'8a',
			show:false,
			text:'To Do: c = 100, Number of injections: 25, Volume of Injections: 10μl, Time bewtween injections: 50s'
		},
		{
			id:'8b',
			show:false,
			text:'Success: c = 100'
		},
		{
			id:'9a',
			show:false,
			text:'To Do: c = 1000, Number of injections: 25, Volume of Injections: 10μl, Time bewtween injections: 50s'
		},
		{
			id:'9b',
			show:false,
			text:'Success: c = 1000'
		},
		//noise
		{
			id:'10a',
			show:false,
			text:'To Do: c = 1000, Number of injections: 25, Volume of Injections: 10μl, Time bewtween injections: 50s'
		},
		{
			id:'10b',
			show:false,
			text:'Success: c = 1000'
		},

		{
			id:'11a',
			show:false,
			text:'To Do: c = 100, Number of injections: 25, Volume of Injections: 10μl, Time bewtween injections: 50s'
		},
		{
			id:'11b',
			show:false,
			text:'Success: c = 100'
		},
		//first solution prep
		{
			id:'12a',
			show:false,
			text:'c = 100, K = 44000000, Number of Injections: 25, Time Between Injections: 50 seconds, Volume of Injections: 10μL',
		},
		{
			id:'12b',
			show:false,
			text:'Success: Return to the Running overlay'
		},
		//second solution prep with background
		{
			id:'13a',
			show:false,
			text:'c = 100, K = 44000000, Number of Injections: 25, Time Between Injections: 50 seconds, Volume of Injections: 10μL',
		},
		{
			id:'13b',
			show:false,
			text:'Success: Return to the Running overlay'
		},
		//first 'running' eg 
		{
			id:'14a',
			show:false,
			text:'Injection Concentration: 300μM, Sample Cell Concentration: 30μM, Number of Injections: 2, Time Between Injections: 5 seconds, Volume of Injections: 10μL',
		},
		{
			id:'14b',
			show:false,
			text:'Success: Time Between Injections: 5 seconds. In this experiment, the cell is not allowed to equilibrate before the second injection. On addition of the second aliquot, the signal jumps as ligand from both the first and second injection are reacting.'
		},
		//Second 'running' eg
		{
			id:'14a',
			show:false,
			text:'Injection Concentration: 300μM, Sample Cell Concentration: 30μM, Number of Injections: 2, Time Between Injections: 5 seconds, Volume of Injections: 10μL',
		},
		{
			id:'14b',
			show:false,
			text:'Success: Time Between Injections: 5 seconds. In this experiment, the cell is not allowed to equilibrate before the second injection. On addition of the second aliquot, the signal jumps as ligand from both the first and second injection are reacting.'
		},
		//WRONG BUFFERS FOR BACKGROUND READING
		{
			id:'NB',
			show:false,
			text:'You used different buffers in your background reading! ',
		},
		
		//gamecombo1: selecction of c
		{
			id:'GC1a',
			show:false,
			text:'HINT 1: C VALUE - Your value of c is not within the correct bounds (10<c<1000)',
		},
		{
			id:'GC1c',
			show:false,
			text:'SUCCESS 1: C VALUE - Your value of c was within the acceptable range (10<c<1000).',
		},
		{
			id:'GC2a',
			show:false,
			text:'HINT 2: Signal to Noise ratio - Your signal to noise ratio is too low, try using higher concentrations',
		},
		{
			id:'GC2b',
			show:false,
			text:'SUCCESS 2: Signal to Noise ratio - Your signal to nise ratio is high enough for correct characterisation',
		},
		//gamecombo3: eqiuilibration time
		{
			id:'GC3a',
			show:false,
			text:'HINT 3: INJECTION INTERVAL - The length of time between injections (for equilibration) is not long enough.',
		},
		{
			id:'GC3b',
			show:false,
			text:'SUCCESS 3: INJECTION INTERVAL - You provided long enough between injections for equilibration.',
		},
		//gamecombo4: molar ratio range
		{
			id:'GC4a',
			show:false,
			text:'HINT 4a: MOLAR RATIO - The molar ratio range across the experiment is not sithin correct bounds, the infection point will give you an idea of the stoichiometry. If you use too much ligand the molar ratio will be high.',
		},
		{
			id:'GC4b',
			show:false,
			text:'HINT 4b: MOLAR RATIO - The molar ratio range across the experiment is low.',
		},
		{
			id:'GC4c',
			show:false,
			text:'SUCCESS 4: MOLAR RATIO - The molar ratio range across the experiment is acceptable.',
		},
		//gamecombo5: number of injections
		{
			id:'GC5a',
			show:false,
			text:'HINT 5: NUMBER OF INJECTIONS - You have used either too many injections or too few injections to achieve accurate characterisation.',
		},
		{
			id:'GC5b',
			show:false,
			text:'SUCCESS 5: NUMBER OF INJECTIONS - You have used an acceptable number of injections to acheive accurate characterisation.',
		},
		//Gamecombo6 - buffers
		{
			id:'GC6a',
			show:false,
			text:'HINT 6: BUFFER - Make sure that the buffers of both the sample and ligand are exactly the same. Failure to use the same buffers results in large heats of dilution and incorrect results.',
		},
		{
			id:'GC6b',
			show:false,
			text:'SUCCESS 6: BUFFER - You used the same buffer for both species. Heat of dilution minimised.',
		},

		//gamecombo7
		{
			id:'GC7',
			show:false,
			text:'SUCCESS 7: BACKGROUND -  You took background readings to account for heats of dilution - these are automatically applied.',
		}
		
	];
	//SETS A QUESTION TO BEING CORRECT
	experiment.makeTrue = function(question){
		for (i in experiment.questions){
			if (experiment.questions[i].id == question){
				experiment.questions[i].IsCorrect=true;
			}
		}
	}

	//CHECKS MULTIPLE CHOICE QUESTIONS
	experiment.mQuestionConfirm = function(thisAnswer,question){
		for (i in experiment.questions){
			if (experiment.questions[i].id == question){
				console.log(i)
				console.log(thisAnswer)
				console.log(experiment.questions[i].answer)
				if (thisAnswer == experiment.questions[i].answer){

					experiment.questions[i].IsCorrect = true;
					
				} else {
					experiment.questions[i].IsCorrect=false;
					experiment.questions[i].beenWrong += 1;
				}
				experiment.questions[i].mAnswer=experiment.questions[i][thisAnswer]
				
			}	
		}
	}
	//CHECKS WRITTEN ANSWER QUESTION
	experiment.wQuestionConfirm = function(thismAnswer, thiswAnswer, question){
		for (i in experiment.questions){
			if (experiment.questions[i].id == question){
				if (thismAnswer == experiment.questions[i].answer){
					experiment.questions[i].IsCorrect=true;
					
				} else{
					experiment.questions[i].IsCorrect=false;
					experiment.questions[i].beenWrong += 1;
				}
				experiment.questions[i].wAnswer=thiswAnswer
				experiment.questions[i].mAnswer=experiment.questions[i][thismAnswer]
			}
		}
	}
	experiment.cQuestionConfirm = function(thisAnswer,question){
		for (i in experiment.questions){
			if (experiment.questions[i].id == question){
				console.log(i)
				console.log(thisAnswer)
				console.log(experiment.questions[i].answer)
				if (thisAnswer == experiment.questions[i].answer){
					experiment.questions[i].IsCorrect = true;
					
				} else {
					experiment.questions[i].IsCorrect=false;
					experiment.questions[i].beenWrong += 1;
				}
				experiment.questions[i].mAnswer=thisAnswer
				
			}	
		}
	}

	//COUNTS NUMBER OF CORRECT/INCORRECT QUSIONS
	experiment.questionCount=function(){
		experiment.wrong=0
		experiment.right=0
		experiment.beenWrongCount=0
		
		for (i=0; i<experiment.questions.length;i++){
			if (experiment.questions[i].IsCorrect==true){
				experiment.right++;
			}
			if (experiment.questions[i].IsCorrect==false){
				experiment.wrong++;
			}
		}
		for (i=0;i<experiment.questions.length;i++){
			experiment.beenWrongCount += experiment.questions[i].beenWrong;
		}	
	}

	//CONSOLE--------->
	//CHANGES BOOLEAN VALUE OF CONSOLE ENTRY WITH ID==ID TO OPPOSITE
	experiment.consoleChange = function(iD){
		for (n=0;n<iD.length;n++){
			for (i=0; i<experiment.console.length;i++){
				if (experiment.console[i].id==iD[n]){
					experiment.console[i].show = !experiment.console[i].show;
				}
			}	
		}
	}
	experiment.consoleTF = function(iD,boolean){
		for (n=0;n<iD.length;n++){
			for (i=0; i<experiment.console.length;i++){
				if (experiment.console[i].id==iD[n]){
					experiment.console[i].show = boolean;
				}
			}	
		}
	}


	//SOLUTION HANDLING---------->
	//Ligands available by default
	experiment.ligand=
		[
			{
				mW:292.24,
				iD:'EDTA',
				mass:100
			}
			
		];
	//samples available by default
	experiment.sample=
		[{
			mW:40.1,
			iD:'Ca2+',
			K:100,
			mass:100
		}
		];
	experiment.ligandSample=[experiment.ligand,experiment.sample]
	//Buffers available by default
	experiment.buffer=[
		{
			iD:'HEPES',
		}
		
	]
	//Contains the deltH and K values for ligand-sample-buffer triads - checked by checkPairs()
	experiment.pairs=[
		//for buffer inquiry
		// (first for both)
		{
			iD:'EDTACa2+HEPES',
			dH:-25,
			kD:100,
			kOn:44000000,
			kOff:1,
			stoichiometry:1
		},
		{
			iD:'EDTACa2+TRIS',
			dH:-50,
			kD:100,
			kOn:198000000,
			kOff:1,
			stoichiometry:1
		},
		{
			iD:'EDTACa2+MOPS',
			dH:-24,
			kD:100,
			kOn:235000000,
			kOff:100,
			stoichiometry:1
		},
		{
			iD:'EDTACa2+PIPES',
			dH:-13.9,
			kD:100,
			kOn:104000000,
			kOff:1,
			stoichiometry:1
		},
		//for m2+ inquiry
		{
			iD:'EDTAZn2+HEPES',
			dH:-18.6,
			kD:100,
			kOn:23809523,
			kOff:1,
			stoichiometry:1
		},
		{
			iD:'EDTAPb2+HEPES',
			dH:-10.8,
			kD:100,
			kOn:2222222,
			kOff:1,
			stoichiometry:1
		},
		{
			iD:'EDTAMn2+HEPES',
			dH:-0.52,
			kD:100,
			kOn:18181818,
			kOff:1,
			stoichiometry:1
		},
		{
			iD:'EDTAMg2+HEPES',
			dH:19.3,
			kD:100,
			kOn:595238,
			kOff:1,
			stoichiometry:1
		},
		{
			iD:'EDTABa2+HEPES',
			dH:-18,
			kD:100,
			kOn:924214,
			kOff:1,
			stoichiometry:1
		},
		{
			iD:'EDTACe3+HEPES',
			dH:-1.75,
			kD:100,
			kOn:1980,
			kOff:1,
			stoichiometry:1
		},
		{
			iD:'ab',
			dH:1000,
			kD:2000000,
			kOn:100,
			kOff:100,
			stoichiometry:1
		}
	]

	//defaiult ligand solutions 
	experiment.ligandSolutions=[{iD:'HEPES', concentration:0, volume:100, isDialysed:true,isDegassed:true,buffer:'HEPES'}];
	//default sample solutions
	experiment.sampleSolutions=[{iD:'HEPES', concentration:0, volume:100, isDialysed:true,isDegassed:true,buffer:'HEPES'}];
	
	//SETS system VALUES BASED ON STRING INPUTS (ligand,sample,buffer) OF iD VALUE OF OBJECT IN ligandSolutions AND sampleSolutions
	experiment.checkPairs=function(ligand,sample,buffer){
		a = ligand+sample+buffer;
		for (i in experiment.pairs){
			if (experiment.pairs[i].iD==a){
				system.dH=experiment.pairs[i].dH;
				system.kOn=experiment.pairs[i].kOn;
				system.kOff=experiment.pairs[i].kOff;
				system.calc_kd();
				system.stoichiometry=experiment.pairs[i].stoichiometry;
			}
		}
	}
	
	//CREATES SOLUTION ONJECT IN EITHER ligandSolutions OR sampleSolutions
	experiment.concentrations=function(thisMass,thisVolume,whichSolution,ligandOrSample, thisBuffer){
		if (ligandOrSample==1){
			experiment.concentration=(thisMass/experiment.ligand[whichSolution].mW)/thisVolume
			experiment.ligandSolutions.push({concentration: experiment.concentration, iD:experiment.ligand[whichSolution].iD, isDialysed:false, isDegassed:false, volume:thisVolume, buffer:thisBuffer, background:false})
			
			experiment.ligand[whichSolution].mass = experiment.ligand[whichSolution].mass - thisMass;	
		}
		if (ligandOrSample==2){
			experiment.concentration=(thisMass/experiment.sample[whichSolution].mW)/thisVolume
			experiment.sampleSolutions.push({concentration: experiment.concentration, iD:experiment.sample[whichSolution].iD, isDialysed:false, isDegassed:false, volume:thisVolume, buffer:thisBuffer, background:false})
			experiment.sample[whichSolution].mass = experiment.sample[whichSolution].mass - thisMass
		}
	}
	//REDUCES volume VALUE IN EITHER ligandSolutions OR sampleSolutions
	experiment.reduceVolumes=function(reduceVol, ligandSolution, sampleSolution){
		ligandSolution.volume = ligandSolution.volume - reduceVol;
		sampleSolution.volume = sampleSolution.volume - 0.000994

	}
	
	//GAMEFICATION ELEMENTS-------->
	//checks game combo 1-5; GC 6,7 set in runGameExpt
	experiment.gameComboCheck=function(concA, concB,numInj, tBInj, vInj, ratio){
		experiment.considerations=0;
		experiment.gameCombo1(concB);
		experiment.gameCombo2();
		experiment.gameCombo3();
		experiment.gameCombo4(ratio);
		experiment.gameCombo5(numInj);
		experiment.gameCombo7(concA,concB);
	}
	//checks that c is within reasonable range
	experiment.gameCombo1=function(concB){
		console.log(concB.concentration*system.kd);
		console.log
		if (concB.concentration*system.kd>1000 || concB.concentration*system.kd<10){
			//'c is too large'
			experiment.consoleTF(['GC1a'],true);
			
		}
		
		if (concB.concentration*system.kd>10 && concB.concentration*system.kd<1000){
			//c is within range
			experiment.consoleTF(['GC1c'],true);
			experiment.considerations++;
		}
	}
	//checks signal to noise ratio - noise set by gaussian, signal set by experiment.maxHeat
	experiment.gameCombo2=function(){
		if (experiment.maxHeat>10*experiment.stdDev_Default){
			experiment.consoleTF(['GC2b'], true)
			experiment.considerations++;
		}else{
			experiment.consoleTF(['GC2a'], true)
		}
	}
	//checks equilibration time based on experiment.minHeat
	experiment.gameCombo3=function(){
		if (experiment.minHeat<0.0000001){
			experiment.consoleTF(['GC3b'],true);
			experiment.considerations++;
		}else{
			experiment.consoleTF(['GC3a'],true);
		}
	}
	//checks molar ratio range is correct for stoichiometry (2x stoichiometry) - molar ratio from experiment.ratio, stoichiometry from experiment.pairs then system.stoichiometry
	experiment.gameCombo4=function(ratio){
		if (1.5 < ratio && 2.5>ratio){
			experiment.consoleTF(['GC4c'],true);
			experiment.comsiderations++;
		}
		if (2.5<ratio || 1.5>ratio){
			experiment.consoleTF(['GC4a'],true);
		}
		

	}
	//checks if number of injections is less than 30 - for time management
	experiment.gameCombo5=function(numInj){
		if (30>=numInj && numInj>=15){
			experiment.consoleTF(['GC5b'],true)
			experiment.considerations++;
		}else{
			experiment.consoleTF(['GC5a'],true)
		}

	}
	//checks if background have been run
	experiment.gameCombo7=function(concA,concB){
		console.log(concA.background)
		if (concA.background==true && concB.background==true){
			experiment.consoleTF(['GC7'],true);
			experiment.considerations++;
		}
	}

	//INQUIRY LOADING
	// loads m2+ inquiry
	experiment.load0=function(){
		experiment.ligand=[
			{
				iD:'EDTA',
				mW: 292.24,
				mass: 2
			}
		]
		experiment.sample=[
			{
				iD: 'Ca2+',
				mW: 40.1,
				mass: 2
			},
			{
				iD: 'Zn2+',
				mW: 65.4,
				mass: 2
			},
			{
				iD: 'Pb2+',
				mW: 207.2,
				mass: 2
			},
			{
				iD: 'Mg2+',
				mW: 24.3,
				mass: 2
			},
			{
				iD: 'Ba2+',
				mW: 137.3,
				mass: 2
			},
			{
				iD: 'Ce+',
				mW: 140.1,
				mass: 2
			},
			{
				iD: 'K+',
				mW: 39.1,
				mass: 2
			},

		]

		experiment.ligandSolutions=[
			{iD:'HEPES', concentration:0, volume:10, isDialysed:true,isDegassed:true,buffer:'HEPES'}
		]
		experiment.sampleSolutions=[
			{iD:'HEPES', concentration:0, volume:10, isDialysed:true,isDegassed:true,buffer:'HEPES'}
		]

		experiment.buffer=[
			{
				iD: 'HEPES'
			}
		]
	}

	//loads buffer inquiry
	experiment.load1=function(){
		experiment.ligand=[
			{
				iD:'EDTA',
				mW: 292.24,
				mass: 2
			}
		]
		experiment.sample=[
			{
				iD: 'Ca2+',
				mW: 40,
				mass: 2
			}
		]

		experiment.ligandSolutions=[
			{iD:'HEPES', concentration:0, volume:10, isDialysed:true,isDegassed:true,buffer:'HEPES'},
			{iD:'TRIS', concentration:0, volume:10, isDialysed:true,isDegassed:true,buffer:'TRIS'},
			{iD:'MOPS', concentration:0, volume:10, isDialysed:true,isDegassed:true,buffer:'MOPS'},
			{iD:'PIPES', concentration:0, volume:10, isDialysed:true,isDegassed:true,buffer:'PIPES'},
		]
		experiment.sampleSolutions=[
			{iD:'HEPES', concentration:0, volume:10, isDialysed:true,isDegassed:true,buffer:'HEPES'},
			{iD:'TRIS', concentration:0, volume:10, isDialysed:true,isDegassed:true,buffer:'TRIS'},
			{iD:'MOPS', concentration:0, volume:10, isDialysed:true,isDegassed:true,buffer:'MOPS'},
			{iD:'PIPES', concentration:0, volume:10, isDialysed:true,isDegassed:true,buffer:'PIPES'},
		]

		experiment.buffer=[
			{
				iD: 'HEPES',
				iD: 'TRIS',
				iD: 'MOPS',
				iD: 'PIPES'
			}
		]
	}



	

	//LOGIC FOR VIEW
	//TRUE IF EXAMPLES 1 TO 4 ARE COMPLETE
	experiment.firstExampleLogic=function(){
		n=0
		for (i=1; i<5; i++){
			if (experiment.examples[i].isComplete == true){
				n++;
				
			}
		}
		if (n>3){
			return true
		}else{
			return false
		}		
	}
	//INPUT ARRAY OF NUMBERS [EXAMPLES] REETURN TRUE IS ALL EXAMPLES COMPLETE
	experiment.exampleLogic=function(arrExamples){
		maxN = arrExamples.length;
		
		n=0;
		for (i in arrExamples){	
			if (experiment.examples[arrExamples[i]].isComplete == true){

				n++;
				console.log(n)
			}
		}
		if (n==maxN){
			console.log('bitch')
			return true
		}else{
			return false
		}		
	}
	//INPUT ARRAY OF NUMBERS [QUESTIONS] REETURN TRUE IS ALL QUESTIONS COMPLETE
	experiment.questionLogic=function(arrQuestions){
		maxN = arrQuestions.length;
		n=0;
		for (i in arrQuestions){
			if (experiment.quesions[arrQuestions[i]].isComplete == true){
				n++;
				
			}
		}
		if (n==maxN){
			return true
		}else{
			return false
		}		
	}
	experiment.consoleLogic=function(){
		x=1
		for (i in experiment.console){
			
			if (experiment.console[i].show==true){
				x++;
			}
		}
		if (x>1){
			return false;
		}else{
			return true;
		}
	}
	experiment.secondExampleLogic=function(){
			n=0
			for (i=5; i<9; i++){
				if (experiment.examples[i].isComplete == true){
					n++;
					
				}
			}
			if (n>3){
				return true
			}else{
				return false
			}
			
		}
	experiment.tQuestionLogic=function(areNull,areTrue,areFalse){
		a=0;
		b=0;
		c=0;
		for (i in areNull){
			if (experiment.questions[areNull[i]].IsCorrect==null){
				a++
			}
		}
		for (i in areTrue){
			if (experiment.questions[areTrue[i]].IsCorrect==true){
				b++
			}
		}
		for (i in areFalse){
			if (experiment.questions[areFalse[i]].IsCorrect==false){
				c++
			}
		}
		if (a==areNull.length && b==areTrue.length && c==areFalse.length){
			return true;
		}
	}
	
		
		
	
	

	
	

	//ERROR--------->
	experiment.stdDev_Default = 0.00000000025; // Need to figure out the right level of variation for concentration; currently default variation is at nM level
	experiment.stdDev_Absolute = experiment.stdDev_Default; // starting with default level and increase as it passes different time point
	experiment.stdDev_Gaussian_absolute = 0;

	experiment.relativeError = function(out_fLC) {
			// calculating standard deviation of relative error from coefficient of variance
		experiment.stdDev_relative = experiment.CV_Now*out_fLC; // CV = coefficient of variance; CV = stdDev/mean, taking mean as the input value (out_fLC)
			// adjusting stdDev against normal distribution
		experiment.stdDev_Gaussian_relative = ((Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1))*experiment.stdDev_relative; // variance = 1.0, therefore, expected result from sampling normal distribution is between +/-3
			// deciding if stdDev will add or subtract the mean
		experiment.flip_plusOrMinus = Math.random()*2;
		if (experiment.flip_plusOrMinus > 1) {
			experiment.plusOrMinus = 1;
		} else {
			experiment.plusOrMinus = -1;
		}
			// modify final result with the measurement error (note: relative error can be negative since it is an error as a result of inaccurate measure of volume of solute)
		if (out_fLC === 0) {
			return out_fLC; // if user is creating output for background, no relative error is suffered
		} else {
			return Math.abs(out_fLC+experiment.plusOrMinus*experiment.stdDev_Gaussian_relative);
		}
	}

	experiment.absoluteError = function(out_fLC) {
			// adjusting stdDev against normal distribution
		experiment.stdDev_Gaussian_absolute = Math.abs(((Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1))*experiment.stdDev_Absolute);
			// modify final result with the measurement error (note: absolute error is never negative since it is an error as a result of loss in solution during transfer by pipetting)
		experiment.flip_plusOrMinus = Math.random()*2;
		if (experiment.flip_plusOrMinus > 1) {
			experiment.plusOrMinus = 1;
		} else {
			experiment.plusOrMinus = -1;
		}
		
		return (out_fLC+experiment.plusOrMinus*experiment.stdDev_Gaussian_absolute);
	
	};

	//LOGIC - redundant atm
	// experiment.panel = function(){
	// 	if (experiment.IsCorrect[1] && experiment.IsCorrect[2] && experiment.IsCorrect[3]){
	// 		return true;
	// 	}else{
	// 		return false;
	// 	}

	// }
	
}