/* Main Controller: executes all Services onto the View */

/* 1. master module to compile in all sub-modules for embedding ng-app in HTML */
var app = angular.module('ITC', ['model', 'display', 'cookies','ngCookies', 'LocalStorageModule'])
	.controller('viewControl', viewMethod);

/* 2. setting up controller */
viewMethod.$inject = ['systemModel', 'outputModel', 'experimentStatus', 'chartConfig', '$cookies', '$location','tableConfig', 'localStorageService']

function viewMethod(systemModel, outputModel, experimentStatus, chartConfig, $cookies, $location, tableConfig, localStorageService) {
	var view = this
	view.system = systemModel;
	view.output = outputModel;
	view.experiment = experimentStatus;
	view.chart = chartConfig;
	view.cookies = $cookies;
	view.table=tableConfig;
	view.local=localStorageService;
	//view.chart = chartConfig;

	view.system.loadNewPair();

	//initialize tracking features
	//when true, experiment tracking is showm
	view.experimentTracking=false;
	//when true, change system box enabled
	view.changeSystem=false;
	//when tru, conosle prompts enabled
	view.showConsole=false;
	
	//RUNNING THE EXPERIMENT
	//plotData - adds label then binds the data from compile to the chart dataset then calls replot
	//placeholder and label must be string and have # infront eg '#flot'
	//dataset must be compiled w label
	view.plotData = function(placeholder,dataset,label,lines){
		//console.log(dataset);
		view.output.compileData(label,dataset);
		view.chart.dataset = view.output.plotData;
		view.chart.replot(placeholder,lines);
	}

	view.runExperiment = function(newConcA,newConcB,newNumInj,newTBInj,newVInj,newMagnitudeA,newMagnitudeB,newMagnitudeVol){
		$(window).load(function(){$('#calculating_modal').modal('show');});
		$('#calculating_modal').modal({backdrop: 'static',keyboard: false});
		
		// setTimeout( function(){
		
		view.experiment.timeOfDayCounter(newNumInj);
		view.output.magnitudeAdjustA = view.output.magnitudePool[newMagnitudeA];
		view.output.magnitudeAdjustB = view.output.magnitudePool[newMagnitudeB];
		view.output.magnitudeAdjustVol = view.output.magnitudePool[newMagnitudeVol];
		view.output.addToTable(newConcA/view.output.magnitudeAdjustA,newConcB/view.output.magnitudeAdjustB,newNumInj,newVInj/view.output.magnitudeAdjustVol,newTBInj);
		view.output.steps(newTBInj,newNumInj);
		view.output.createArrays(view.output.numSteps);
		view.output.calcConc(newConcA/view.output.magnitudeAdjustA,newConcB/view.output.magnitudeAdjustB,newVInj/view.output.magnitudeAdjustVol,view.system.kOn,view.system.kOff);
		view.output.calcRate(view.system.kOn,view.system.kOff,view.system.dH);	
		view.plotData('#flot',view.output.heatPlotData,'HeatData',true);
		
		view.output.checkExample(view.currentExample,newConcA/view.output.magnitudeAdjustA,newConcB/view.output.magnitudeAdjustB,newNumInj,newTBInj,newVInj/view.output.magnitudeAdjustVol);
		view.compileCookieData();
		view.experiment.processDisabled=false;
		
	// },200);
		$('#calculating_modal').modal('hide');

	}

	view.process=function(){
		view.experiment.processDisabled=true;
		view.output.calcOutput();
		view.plotData('#flot',view.output.outputData, 'SigmaData',false);
		view.table.compileTableData(view.output.outputData);
	}
	
	view.openCalc=function(){
		console.log('WTF')
		$(window).load(function(){$('#calculating_modal').modal('show');});
		$('#calculating_modal').modal({backdrop: 'static',keyboard: false});
	}
	view.runGameExperiment=function(newConcA,newConcB,newNumInj,newTBInj,newVInj,newMagnitudeA,newMagnitudeB,newMagnitudeVol){
		view.experiment.processDisabled=false;
		view.experiment.timeOfDayCounter(newNumInj);
		view.output.magnitudeAdjustA = view.output.magnitudePool[newMagnitudeA];
		view.output.magnitudeAdjustB = view.output.magnitudePool[newMagnitudeB];
		view.output.magnitudeAdjustVol = view.output.magnitudePool[newMagnitudeVol];

		view.experiment.reduceVolumes((newNumInj*newVInj/view.output.magnitudeAdjustVol),newConcA,newConcB);
		view.output.addToTable(newConcA.concentration,newConcB.concentration,newNumInj,newVInj/view.output.magnitudeAdjustVol,newTBInj);
		view.output.steps(newTBInj,newNumInj);
		view.output.createArrays(view.output.numSteps);
		view.output.calcConc(newConcA.concentration,newConcB.concentration,newVInj/view.output.magnitudeAdjustVol,view.system.kOn,view.system.kOff);
		view.output.calcRate(view.system.kOn,view.system.kOff,view.system.dH);	
		view.plotData('#flot',view.output.heatData,'HeatData',true);
		console.log(view.currentExample)
		view.output.checkGameExample(view.currentExample,newConcA.concentration,newConcB.concentration,newNumInj,newTBInj,newVInj/view.output.magnitudeAdjustVol,newConcA.iD,newConcB.iD);
		if (view.showConsole==true){
			for (i in view.experiment.console){
				view.experiment.console[i].show=false
			}

			view.experiment.consoleTF(['GC8'],true)
			if (newConcA.buffer==newConcB.buffer){
				view.experiment.consoleTF(['GC6b'],true)
				view.experiment.considerations++;
				view.experiment.checkPairs(newConcA.iD,newConcB.iD,newConcA.buffer);
				
			}else{
				view.experiment.checkPairs('a','b','');
				view.experiment.consoleTF(['GC6a'],true);
			}
			view.experiment.gameComboCheck(newConcA,newConcB,newNumInj,newTBInj,newVInj/view.output.magnitudeAdjustVol,view.output.ratio);
			}
		
		view.table.compileRunData(newConcA,newConcB,newNumInj,newTBInj,newVInj,newMagnitudeVol);
		view.compileCookieData();
		$('#calculating_modal').modal('hide');
	}

	view.loadGame=function(game){
		if (game==0){
			view.experiment.load0();
			view.changeSystem=false
		}

		if (game==1){
			view.experiment.load1();
			view.changeSystem=false

		}
		if (game==2){
			view.system.loadNewPair();
			view.changeSystem=true
		}
		view.experiment.timeOfDay=0.0;
		view.experimentTracking=true;
		view.experiment.steps=0
		view.compileCookieData();
		
	}

	view.runBackground=function(newConcA,newConcB,newNumInj,newTBInj,newVInj,newMagnitudeA,newMagnitudeB,newMagnitudeVol){
		view.experiment.consoleTF(['NB'],false)
		if (newConcA.buffer == newConcB.buffer){
			if (newConcA.concentration==0){
				newConcB.background=true;	
				view.currentBackground = newConcB;
			}
			if (newConcB.concentration==0){
				newConcA.background=true;
				view.currentBackground = newConcA;
			}
			$(window).load(function(){$('#background_modal').modal('show');});
			$('#background_modal').modal();
		}else{
			view.experiment.consoleTF(['NB'],true)
		}
		view.output.magnitudeAdjustVol = view.output.magnitudePool[newMagnitudeVol];
		view.experiment.reduceVolumes((newNumInj*newVInj/view.output.magnitudeAdjustVol),newConcA,newConcB);
		view.compileCookieData();
	}	

	//QUESTIONS
	view.mQuestion=function(answer,question){
		view.experiment.mQuestionConfirm(answer,question);
		view.compileCookieData();
		view.experiment.questionCount();
		view.table.compileAnswersTableData();
	}
	view.releaseQuestion=function(password,question){
		if (password==123456789){
			view.mQuestion(view.experiment.questions[question].answer,question);
		view.table.compileAnswersTableData();
		}
	}
	view.releaseFirstQuestion=function(password,question){
		if (password=='ITC'){
			view.mQuestion(view.experiment.questions[question].answer,question);
		view.table.compileAnswersTableData();
		}
	}

	view.wQuestion=function(mAnswer,wAnswer,question){
		view.experiment.wQuestionConfirm(mAnswer,wAnswer,question);
		view.compileCookieData();
		view.experiment.questionCount();
		view.table.compileAnswersTableData();
	}
	view.cQuestion=function(answer,question){
		view.experiment.cQuestionConfirm(answer,question);
		view.compileCookieData();
		view.experiment.questionCount();
		view.table.compileAnswersTableData();
	}

	
	//EXAMPLES
	view.runExample=function(example){
		view.currentExample = example
		view.system.setExample(example);
		for (n in example){
			for (i=0;i<view.experiment.console.length;i++){
			if (view.experiment.console[i].id==example[n]+'a'){
				view.experiment.console[i].show=true;
			}
		}
		}
		view.compileCookieData();
		console.log(view.experiment.isNoise)
	}
	
	

	view.runRecall=function(){
		$(window).load(function(){$('#overview2_modal').modal('show');});
		$('#overview2_modal').modal({backdrop: 'static',keyboard: false});
		view.compileCookieData();
	}
	//complileCookieData saves all status data to local storage on most buttton clicks
	view.compileCookieData=function(){
		view.storageData={
			questions: view.experiment.questions,
			examples: view.experiment.examples,
			worked: view.experiment.worked,
			experimentTracking: view.experimentTracking,
			console: view.experiment.console,
			recall: view.experiment.recallActive,
			noise: view.experiment.isNoise,
			solutionPrep: view.experiment.solutionPrep,
			steps: view.experiment.steps,
			timeOfDay: view.experiment.timeOfDay,
			ligand: view.experiment.ligand,
			sample: view.experiment.sample,
			buffer: view.experiment.buffer,
			pairs: view.experiment.pairs,
			ligandSolutions: view.experiment.ligandSolutions,
			sampleSolutions: view.experiment.sampleSolutions,
			changeSystem: view.changeSystem
		}
		view.local.set('localData',view.storageData);
	}
	//reload stored data from local storage
	view.reload=function(){
		view.data=view.local.get('localData')
		view.experiment.questions=view.data.questions;
		view.experiment.examples=view.data.examples;
		view.experiment.worked=view.data.worked;
		view.experimentTracking=view.data.experimentTracking;
		view.experiment.console=view.data.console;
		view.experiment.recallActive=view.data.recall;
		view.experiment.isNoise=view.data.noise;
		view.experiment.solutionPrep=view.data.solutionPrep;
		view.experiment.steps=view.data.steps;
		view.experiment.timeOfDay=view.data.timeOfDay;
		view.experiment.ligand=view.data.ligand;
		view.experiment.sample=view.data.sample;
		view.experiment.buffer=view.data.buffer;
		view.experiment.pairs=view.data.pairs;
		view.experiment.ligandSolutions=view.data.ligandSolutions;
		view.experiment.sampleSolutions=view.data.sampleSolutions;
		view.changeSystem=view.data.changeSystem;
		view.experiment.questionCount();
		view.table.compileAnswersTableData();
		console.log(view.experiment.solutionPrep)
		
	}
	

	// IF THERE ARE COOKIES, LOAD THEM AND DISPLAY COOKIES MODAL. ELSE LOAD INITIALIZING MODAL
	console.log(view.local.get("localData"))
	if (view.local.get("localData")){
		$(window).load(function(){$('#cookies_modal').modal('show');});
		$('#cookies_modal').modal({backdrop: 'static',keyboard: false});
	}else{
		$(window).load(function(){$('#initialising_modal').modal('show');});
		$('#initialising_modal').modal({backdrop: 'static',keyboard: false});
	}
	
	view.initialize=function(){

		$(window).load(function(){$('#initialising_modal').modal('show');});
		$('#initialising_modal').modal({backdrop: 'static',keyboard: false});
		$('#cookies_modal').modal('hide');
	}

	
	view.table.compileAnswersTableData();

	//view.compileCookieData();
		//view.output.calcOutput(newVInj,newNumInj,newConcA,newConcB);
}
