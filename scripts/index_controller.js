/* Main Controller: executes all Services onto the View */

/* 1. master module to compile in all sub-modules for embedding ng-app in HTML */
var app = angular.module('ITC', ['model', 'display', 'cookies','ngCookies'])
	.controller('viewControl', viewMethod);

/* 2. setting up controller */
viewMethod.$inject = ['systemModel', 'outputModel', 'experimentStatus', 'chartConfig', '$cookies', '$location','tableConfig']

function viewMethod(systemModel, outputModel, experimentStatus, chartConfig, $cookies, $location, tableConfig) {
	var view = this
	view.system = systemModel;
	view.output = outputModel;
	view.experiment = experimentStatus;
	view.chart = chartConfig;
	view.cookies = $cookies;
	view.table=tableConfig
	//view.chart = chartConfig;

	view.system.loadNewPair();

	view.cookiesData='hello'
	view.experimentTracking=true
	
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
		view.experiment.processDisabled=false;
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
		console.log(view.output.heatPlotData, view.output.heatData)
		view.output.checkExample(view.currentExample,newConcA/view.output.magnitudeAdjustA,newConcB/view.output.magnitudeAdjustB,newNumInj,newTBInj,newVInj/view.output.magnitudeAdjustVol);
	}

	view.process=function(){
		
		view.experiment.processDisabled=true;
		view.output.calcOutput();
		view.plotData('#flot',view.output.outputData, 'SigmaData',false);
		view.table.compileTableData(view.output.outputData);
	}
	
	
	view.runGameExperiment=function(newConcA,newConcB,newNumInj,newTBInj,newVInj,newMagnitudeA,newMagnitudeB,newMagnitudeVol){
		for (i in view.experiment.console){
			view.experiment.console[i].show=false
		}
		view.experiment.consoleTF(['GC8'],true)
		if (newConcA.buffer==newConcB.buffer){
			view.experiment.consoleTF(['GC6b'],true)
			view.experiment.checkPairs(newConcA.iD,newConcB.iD,newConcA.buffer);
			
		}else{
			view.experiment.checkPairs('a','b','');
			view.experiment.consoleTF(['GC6a'],true);
		}

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
		view.output.checkGameExample(view.currentExample,newConcA.concentration,newConcB.concentration,newNumInj,newTBInj,newVInj/view.output.magnitudeAdjustVol,newConcA.iD,newConcB.iD);
		view.experiment.gameComboCheck(newConcA,newConcB,newNumInj,newTBInj,newVInj/view.output.magnitudeAdjustVol);
		view.table.compileRunData(newConcA,newConcB,newNumInj,newTBInj,newVInj,newMagnitudeVol)
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
	}	

	//QUESTIONS
	view.mQuestion=function(answer,question){
		view.experiment.mQuestionConfirm(answer,question);
		view.compileCookieData();
		view.cookies.putObject('storedData', view.cookiesData);
		view.experiment.questionCount();
		view.table.compileAnswersTableData();
	}
	view.releaseQuestion=function(password,question){
		if (password==123456789){
			view.mQuestion(view.experiment.questions[question].answer,question);
		view.table.compileAnswersTableData();
		}
	}

	view.wQuestion=function(mAnswer,wAnswer,question){
		view.experiment.wQuestionConfirm(mAnswer,wAnswer,question);
		view.compileCookieData();
		view.cookies.putObject('storedData', view.cookiesData);
		view.experiment.questionCount();
		view.table.compileAnswersTableData();
	}
	//COOKIES
	view.compileCookieData=function(){
		view.cookiesData=view.experiment.questions;
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
	}

	view.runRecall=function(){
		$(window).load(function(){$('#overview2_modal').modal('show');});
		$('#overview2_modal').modal({backdrop: 'static',keyboard: false});
	}
	// IF THERE ARE COOKIES, LOAD THEM AND DISPLAY COOKIES MODAL. ELSE LOAD INITIALIZING MODAL
	if (view.cookies.getObject("storedData")){
		view.experiment.questions=view.cookies.getObject('storedData')
		$(window).load(function(){$('#cookies_modal').modal('show');});
		$('#cookies_modal').modal({backdrop: 'static',keyboard: false});
	}else{
		$(window).load(function(){$('#initialising_modal').modal('show');});
		$('#initialising_modal').modal({backdrop: 'static',keyboard: false});
	}
	view.table.compileAnswersTableData();

	//view.compileCookieData();
		//view.output.calcOutput(newVInj,newNumInj,newConcA,newConcB);
}
