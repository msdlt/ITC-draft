angular.module('output_model', ['experiment_status'])
	.service('outputModel', ['experimentStatus', outputMethod]);

function outputMethod(experimentStatus) { 
	var output = this;
	var experiment = experimentStatus;
	

	//CONSTANTS!
	output.timeStep = 0.001 // time between calculation
	output.defaultvCell = 0.000994
	output.vCell=output.defaultvCell //volume of the cell (l)
	
	//MAGNITUDE ADJUSTING PARAMETERS
	output.magnitudePool = [1000, 1000000, 1000000000];
	output.mangitudeAdjustA = null
	output.magnitudeAdjustB = null
	output.magnitudeAdjustVol = null 

	output.plotData = []

	output.concATable = [];
	output.concBTable =[];
	output.numInjTable=[];
	output.vInjTable=[];
	output.tBInjTable=[];

	//ADDING INPUTS TO TABLES
	output.addConcA=function(user_concA){
		output.concATable.push(user_concA);
	}
	output.addConcB=function(user_concB){
		output.concBTable.push(user_concB);
	}
	output.addNumInj=function(numInj){
		output.numInjTable.push(numInj);
	}
	output.addVolInj=function(vInj){
		output.vInjTable.push(vInj);
	}
	output.addTBInj=function(tBInj){
		output.tBInjTable.push(tBInj);
	}
	output.addToTable=function(user_concA,user_concB,numInj,vInj,tBInj){
		output.addConcA(user_concA);
		output.addConcB(user_concB);
		output.addNumInj(numInj);
		output.addVolInj(vInj);
		output.addTBInj(tBInj);
	}
	
	//EXAMPLE CHECKER

	
	output.checkExample=function(example,newConcA,newConcB,newNumInj,newTBInj,newVInj){
		for (n in example){
			i = example[n]

			if (experiment.examples[i].concA == newConcA && experiment.examples[i].concB==newConcB && experiment.examples[i].numInj==newNumInj && experiment.examples[i].vInj==newVInj && experiment.examples[i].tBInj==newTBInj){
				experiment.examples[i].isComplete=true;
				for (n=0;n<experiment.console.length;n++){
					if (experiment.console[n].id==i+'b'){
						
						experiment.console[n].show=true;
						experiment.console[n-1].show=false;
					}
				}
			}
		}
	}
	output.checkGameExample=function(example,newConcA,newConcB,newNumInj,newTBInj,newVInj,ligand,sample){
		for (n in example){
			i = example[n]
			
			
			if ((experiment.examples[i].concA - experiment.examples[i].concA*0.05<= newConcA && experiment.examples[i].concA + experiment.examples[i].concA*0.05>= newConcA) && (experiment.examples[i].concB - experiment.examples[i].concB*0.05<= newConcB && experiment.examples[i].concB + experiment.examples[i].concB*0.05>= newConcB) && experiment.examples[i].numInj==newNumInj && experiment.examples[i].vInj==newVInj && experiment.examples[i].tBInj==newTBInj){
				
				experiment.examples[i].isComplete=true;
				console.log(experiment.examples[i].isComplete)
				for (n=0;n<experiment.console.length;n++){
					if (experiment.console[n].id==i+'b'){
						experiment.console[n].show=true;
						experiment.console[n-1].show=false;
					}
				}
			}
		}
	}
	//&& (experiment.examples[i].concB - experiment.examples[i].concB*0.1<= newConcB && experiment.examples[i].concB + experiment.examples[i].concB*0.1>= newConcB))

	//RUNNING THE EXPERIMENT

	//calculate time for experiment, total steps for experiment, steps between injection
	
	output.steps = function (tBInj,numInj){
		output.maxTime = tBInj*numInj + tBInj;
		output.numSteps = Math.round(output.maxTime/output.timeStep);
		output.stepBInj = tBInj/output.timeStep;
		
		//console.log(output.stepBInj)

	}

	output.createArrays = function (numSteps){
		
		output.dataA = new Array(numSteps);
		output.dataB = new Array(numSteps);
		output.dataC = new Array(numSteps);
	}
	output.calcConc = function (user_concA, user_concB, vInj, k_on, k_off) {
		//initialise arrays + variables
		
		
		output.totInj = 0

		output.concA = new Array;
		output.concA.push(0);
		output.concB = new Array;
		output.concB.push(user_concB);
		output.concC = new Array;
		//set concentration of C to 0
		output.concC.push(0)
		
		
		//write first data set [time,concentration] to dataX
		output.dataA[0] = [output.timeStep*0, output.concA[output.concA.length-1]];
		output.dataB[0] = [output.timeStep*0, output.concB[output.concB.length-1]];
		output.dataC[0] = [output.timeStep*0, output.concC[output.concC.length-1]];
		
		//within this for loop: the last loops data are written to dataX first, then the new data is calculated. The output is: that the injection occurs the step after the time (i.e if set to inject every 2s the first occurs just after 2.0s before 2.1s)
		for (i = 0; i < output.numSteps; i++) {
			//bc first data point already in exclude i=0
			if (i!=0){
				output.dataA[i] = [output.timeStep*i, output.concA[output.concA.length-1]];
				output.dataB[i] = [output.timeStep*i, output.concB[output.concB.length-1]];
				output.dataC[i] = [output.timeStep*i, output.concC[output.concC.length-1]];
				
			}
			//console.log(output.dataA[i])
			
			//modulate concentration and append to end of concentration array
			
			//check if we are at an injection time
			if (i% output.stepBInj == 0 && i!==0){ 
				
				output.totInj++; 
				
				//now modulate concentrations based on rate equations
				output.oldConcA = output.concA[output.concA.length -1]; 
				output.oldConcB = output.concB[output.concB.length -1];
				output.oldConcC = output.concC[output.concC.length -1];
				
				output.concA.push(-(output.timeStep*k_on*output.oldConcA*output.oldConcB) + (output.timeStep*k_off*output.oldConcC) + (output.oldConcA));
				output.concB.push(-(output.timeStep*k_on*output.oldConcA*output.oldConcB) + (output.timeStep*k_off*output.oldConcC) + (output.oldConcB));
				output.concC.push((output.timeStep*k_on*output.oldConcA*output.oldConcB) - (output.timeStep*k_off*output.oldConcC) + (output.oldConcC));
				
				//now modulate concentrations based on injection - 
				//?increase vCell here?
				output.concA[output.concA.length-1] = (output.vCell*output.concA[output.concA.length-1]+vInj*user_concA)/output.vCell;
				output.vCell=output.vCell+vInj
				
			}
			//if not time of injection
			else{
				//modulate concentrations based on rate equations
				output.oldConcA = output.concA[output.concA.length -1]; 
				output.oldConcB = output.concB[output.concB.length -1];
				output.oldConcC = output.concC[output.concC.length -1];
				
				output.concA.push(-(output.timeStep*k_on*output.oldConcA*output.oldConcB) + (output.timeStep*k_off*output.oldConcC) + (output.oldConcA));
				output.concB.push(-(output.timeStep*k_on*output.oldConcA*output.oldConcB) + (output.timeStep*k_off*output.oldConcC) + (output.oldConcB));
				output.concC.push((output.timeStep*k_on*output.oldConcA*output.oldConcB) - (output.timeStep*k_off*output.oldConcC) + (output.oldConcC));
				
			}
		output.vCell=output.defaultvCell
		}
	}

	output.calcRate=function(k_on,k_off,deltH, noise){
		

		output.fRateData = new Array(output.numSteps);
		output.rRateData = new Array(output.numSteps);
		output.heatPlotData=[];
		//find forward rate at time timestep*i
		for (i = 0; i<output.numSteps; i++){
			output.fRateData[i] = [output.timeStep*i, k_on*output.dataA[i][1]*output.dataB[i][1]];
			output.rRateData[i] = [output.timeStep*i, k_off*output.dataC[i][1]];
		}
		
		output.diffRateData = new Array (output.numSteps);
		for (i=0; i<output.numSteps; i++){
			output.diffRateData[i] = [output.timeStep*i, (output.fRateData[i][1]-output.rRateData[i][1])];
		}

		output.heatData = new Array (output.numSteps);
		for (i=0; i<output.numSteps; i++){
			if (experiment.isNoise==true){
			output.heatData[i]=[output.timeStep*i, experiment.absoluteError((output.diffRateData[i][1]*deltH*output.vCell))];
			}else{
			output.heatData[i]=[output.timeStep*i, (output.diffRateData[i][1]*deltH*output.vCell)];
			}
			if (i%10==0){
				output.heatPlotData.push(output.heatData[i])
			}
			//if (i%output.stepBInj==0){
				//output.vCell=output.vCell+output.vInjTable[output.vInjTable.length-1]
				
			//}
		}
		for (i=0; i<output.numSteps; i++){
			if (i%output.stepBInj==0 && i!==0){
				experiment.minHeat=output.heatData[i][1];
				experiment.maxHeat=output.heatData[i+1][1];
				
			}
		}
	output.vCell=output.defaultvCell
	}

	output.calcOutput=function(){
		//grab Data From Tables
		output.vInj=output.vInjTable[output.vInjTable.length-1];
		
		output.numInj=output.numInjTable[output.numInjTable.length-1];
		output.userConcA=output.concATable[output.concATable.length-1];
		output.userConcB=output.concBTable[output.concBTable.length-1];
		
		
		
		output.outputData = new Array (output.numInj);
		output.totInj = 0
		output.cumHeat = 0

	
		for (i=0; i<output.numSteps; i++){
			
			output.cumHeat = output.cumHeat + output.heatData[i][1]*output.timeStep;
			if ((i%output.stepBInj==0 && i!==0 && i!==output.stepBInj) ||i==output.numSteps-1){
				output.ratio = (output.totInj*output.vInj*output.userConcA) /  (output.userConcB*output.vCell);
				experiment.ratio=output.ratio
				
				output.outputData[output.totInj] = [output.ratio, output.cumHeat];
				console.log(output.outputData)
				output.cumHeat = 0;
				output.totInj++;
				
			}
		}
		
		//output.outputData.shift();
		
	}

	

	output.compileData=function(thisLabel,dataset){
		output.compileLabel = {
			label: thisLabel,
			data: angular.copy(dataset)
			}
		//output.plotData.push(angular.copy(output.compileLabel));
		output.plotData[0] = angular.copy(output.compileLabel)
	}
	
}