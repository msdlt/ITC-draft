	/* Creating table using ui-grid API */

/* 1. registering modules, services and constants */
angular.module('table_config', ['output_model', 'experiment_status', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.autoResize'])
	.service('tableConfig', ['outputModel', 'experimentStatus', tableCreate]);

/* 2. creating sub-methods as part of the function object that can be called */
function tableCreate(outputModel, experimentStatus) {
	var table = this;
	var output = outputModel;
	var experiment = experimentStatus;
	
	table.data=[]
	table.answerData=[]
	table.runData=[];

	
	table.options = {
			data: table.data,
				// defining header name
			columnDefs: [
					{
						field: "injNum",
						displayName: "Injection Number",
						width: "150",
						enableSorting: false
					},
					{
						field: "value",
						displayName: "Value",
						width: "120",
						enableSorting: false // ui-grid have sort column issue when different columns have both strings and text, so currently allow only sort by trial number
					}
				],
				// miscellaneous
			enableHorizontalScrollbar: 0,
			enableColumnMenus: false,
				// exporting
			enableGridMenu: true,
			exporterMenuCsv: true,
			exporterMenuPdf: false,
			exporterEnableExporting: true,
    		exporterCsvFilename: 'ITC_Data.csv'
		};

	table.answerOptions = {
			data: table.answerData,
				// defining header name
			columnDefs: [
					{
						field: "questNum",
						displayName: "Question",
						width: "50",
						enableSorting: false
					},
					{
						field: "boolean",
						displayName: "Status",
						width: "70",
						enableSorting: false // ui-grid have sort column issue when different columns have both strings and text, so currently allow only sort by trial number
					},
					{
						field: "question",
						displayName: "Question",
						width: "200",
						enableSorting: false // ui-grid have sort column issue when different columns have both strings and text, so currently allow only sort by trial number
					},
					{
						field: "mAnswer",
						displayName: "Multiple Choice",
						width: "248",
						enableSorting: false // ui-grid have sort column issue when different columns have both strings and text, so currently allow only sort by trial number
					},
					{
						field: "wAnswer",
						displayName: "Written Answer",
						width: "248",
						enableSorting: false // ui-grid have sort column issue when different columns have both strings and text, so currently allow only sort by trial number
					}

				],
				// miscellaneous
			enableHorizontalScrollbar: 0,
			enableColumnMenus: false,
			enableColumnResizing: true,
				// exporting
			enableGridMenu: true,
			exporterMenuCsv: false,
			exporterMenuPdf: true,
			exporterEnableExporting: true,
    		exporterCsvFilename: 'answers.csv'

    		
		};

		table.runOptions = {
			data: table.runData,
				// defining header name
			columnDefs: [
					{
						field: "runNum",
						displayName: "Run",
						width: "50",
						enableSorting: false
					},
					{
						field: "identityB",
						displayName: "Macromolecule",
						width: "100",
						enableSorting: false // ui-grid have sort column issue when different columns have both strings and text, so currently allow only sort by trial number
					},
					{
						field: "concB",
						displayName: "[Macromolecule]",
						width: "110",
						enableSorting: false // ui-grid have sort column issue when different columns have both strings and text, so currently allow only sort by trial number
					},
					
					{
						field: "identityA",
						displayName: "Ligand",
						width: "100",
						enableSorting: false // ui-grid have sort column issue when different columns have both strings and text, so currently allow only sort by trial number
					},
					{
						field: "concA",
						displayName: "[Ligand]",
						width: "110",
						enableSorting: false // ui-grid have sort column issue when different columns have both strings and text, so currently allow only sort by trial number
					},
					
					{
						field: "buffer",
						displayName: "Buffer",
						width: "80",
						enableSorting: false // ui-grid have sort column issue when different columns have both strings and text, so currently allow only sort by trial number
					},
					{
						field: "numInj",
						displayName: "Number Inj.",
						width: "100",
						enableSorting: false // ui-grid have sort column issue when different columns have both strings and text, so currently allow only sort by trial number
					},
					{
						field: "tBInj",
						displayName: "Inj. Int. (s)",
						width: "80",
						enableSorting: false // ui-grid have sort column issue when different columns have both strings and text, so currently allow only sort by trial number
					},
					{
						field: "volInj",
						displayName: "Volume Inj.",
						width: "100",
						enableSorting: false // ui-grid have sort column issue when different columns have both strings and text, so currently allow only sort by trial number
					}
					

				],
				// miscellaneous
			enableHorizontalScrollbar: 1,
			enableColumnMenus: false,
				// exporting
			enableGridMenu: true,
			exporterMenuCsv: true,
			exporterMenuPdf: false,
			exporterEnableExporting: true,
    		exporterCsvFilename: 'ITC_Data.csv'
		};


	table.compileTableData=function(outputData){
		table.data.length=0
		for (i=0;i<outputData.length;i++){
			console.log(i,outputData[i][1])
			table.compiledSet={
				'injNum':i+1,

				'value': outputData[i][1]
			}
			table.data.push(angular.copy(table.compiledSet))
			console.log(table.data)
		}
	}
	table.compileAnswersTableData=function(){
		table.answerData.length=0
		for (i=0;i<experiment.questions.length;i++){
			if (experiment.questions[i].IsCorrect==null){
				a='Incomplete';
			}if(experiment.questions[i].IsCorrect==true){
				a='Correct';
			}if (experiment.questions[i].IsCorrect==false){
				a='Incorrect';
			}
			
			if (experiment.questions[i].mAnswer!=null){
				b=experiment.questions[i].mAnswer;
			}else{
				b='';
			}
			if (experiment.questions[i].wAnswer!=null){
				c=experiment.questions[i].wAnswer;
			}else{
				c='';
			}

			
			table.compiledSet={
				'questNum':experiment.questions[i].id,
				'boolean':a,
				'question':experiment.questions[i].question,
				'mAnswer':b,
				'wAnswer':c
			}
			
			table.answerData.push(angular.copy(table.compiledSet))
		}
	}
	x=1;
	table.compileRunData=function(newConcA,newConcB,newNumInj,newTBInj,newVInj,newMagnitudeVol){
		if (newMagnitudeVol==0){
			y='mM';
		}if (newMagnitudeVol==1){
			y='μM';
		}if(newMagnitudeVol==2){
			y='nM'
		}
		
		table.compiledSet={
			runNum:x,
			identityB:newConcB.iD,
			concB:newConcB.concentration*1000000+'μM',
			identityA:newConcA.iD,
			concA:newConcA.concentration*1000000+'μM',
			buffer:newConcA.buffer,
			numInj:newNumInj,
			tBInj:newTBInj,
			volInj:newVInj+y,
		}
		x++;
		table.runData.push(angular.copy(table.compiledSet))
	}



}