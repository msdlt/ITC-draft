	/* Creating table using ui-grid API */

/* 1. registering modules, services and constants */
angular.module('table_config', ['output_model', 'experiment_status', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter'])
	.service('tableConfig', ['outputModel', 'experimentStatus', tableCreate]);

/* 2. creating sub-methods as part of the function object that can be called */
function tableCreate(outputModel, experimentStatus) {
	var table = this;
	var output = outputModel;
	var experiment = experimentStatus;
	
	table.data=[]

	
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



}