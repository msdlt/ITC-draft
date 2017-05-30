

//INITIALIZING
var dataA = new Array(numSteps)
var dataB = new Array(numSteps)
var dataC = new Array(numSteps)

var totInj = 0

var baseLine = 14
var deltH = -100 // joules per mole
var k_on = 1
var k_off = 1
var concA = [0] // concentration ligand in cell 
var concB = [] // concentration macro in cell
var concC = [0] //concentration in cell

//USER INPUTS
var numInj = 100 //seconds
var tBInj = 1 //secconds
var vInj = 1 //dm^-3

var userConcB = 4 //concentration in cell
concB.push(userConcB)
var userConcA = 10 //concentration in syringe




//SYSTEM INPUTS
var timeStep = 0.01 //seconds
var maxTime = numInj*tBInj + tBInj //seconds
var numSteps = maxTime/timeStep
var stepBInj = tBInj/timeStep

var vCell = 10 //ml
var D = 1 - vInj/vCell



function calcConc() {

	for (i = 0; i < numSteps; i++) {
		//add current concentration of all to data set [time,concentration]
		dataA[i] = [timeStep*i, concA[concA.length-1]];
		//console.log('DA ' + dataA[i])
		dataB[i] = [timeStep*i, concB[concB.length-1]];
		dataC[i] = [timeStep*i, concC[concC.length-1]];
		
		//now modulate concentration and append to end of concentration array
		
		//check if we are at an injection time, if yes, modulate conc
		if (i%stepBInj == 0 && i!=0){ 
			//console.log(i)
			totInj++ 
			
		//push the concentrations after injction into array
			//concA.push((vCell*concA[concA.length-1]+vInj*userConcA)/vCell);
			//console.log('IF: ' + concA[i])
			//concB.push(concB[concB.length-1])
			//console.log(concB)
			//concC.push(concC[concC.length-1])
			//now modulate these concentrations based on equations
			var oldConcA = concA[concA.length -1]; 
			var oldConcB = concB[concB.length -1];
			var oldConcC = concC[concC.length -1];
			
			concA.push(-timeStep*k_on*oldConcA*oldConcB + timeStep*k_off*oldConcC + oldConcA);
			//console.log('ELSE: ' + concA[i])
			concB.push(-timeStep*k_on*oldConcA*oldConcB + timeStep*k_off*oldConcC + oldConcB);
			//console.log(concA)
			concC.push(timeStep*k_on*oldConcA*oldConcB - timeStep*k_off*oldConcC + oldConcC);
			
			concA[concA.length-1] = (vCell*concA[concA.length-1]+vInj*userConcA)/vCell
			//concB[concB.length-1] = 
			//concC[concC.length-1]

			//concA[concA.length-1] = (-timeStep*k_on*oldConcA*oldConcB + timeStep*k_off*oldConcC + oldConcA);
			//concB[concB.length-1] = (-timeStep*k_on*oldConcA*oldConcB + timeStep*k_off*oldConcC + oldConcB);
			//concC[concC.length-1] = (timeStep*k_on*oldConcA*oldConcB - timeStep*k_off*oldConcC + oldConcC);
		}
		else{
			var oldConcA = concA[concA.length -1]; 
			var oldConcB = concB[concB.length -1];
			var oldConcC = concC[concC.length -1];
			//just push the calculated new concentration staright into the array
			concA.push(-timeStep*k_on*oldConcA*oldConcB + timeStep*k_off*oldConcC + oldConcA);
			//console.log('ELSE: ' + concA[i])
			concB.push(-timeStep*k_on*oldConcA*oldConcB + timeStep*k_off*oldConcC + oldConcB);
			//console.log(concA)
			concC.push(timeStep*k_on*oldConcA*oldConcB - timeStep*k_off*oldConcC + oldConcC);
		}
	}
}

		

function calcRate(){
	fRateData = new Array(numSteps);
	rRateData = new Array(numSteps);
	for (i = 0; i<numSteps; i++){
		fRateData[i] = [timeStep*i, k_on*dataA[i][1]*dataB[i][1]];
		rRateData[i] = [timeStep*i, k_off*dataC[i][1]];
	}
}

function calcRateDiff(){
	diffRateData = new Array (numSteps);
	for (i=0; i<numSteps; i++){
		diffRateData[i] = [timeStep*i, (fRateData[i][1]-rRateData[i][1])];
	}
}

function calcHeat(){
	heatData = new Array (numSteps);
	for (i=0; i<numSteps; i++){
		heatData[i]=[timeStep*i, (diffRateData[i][1]*deltH)]
		//console.log(heatData[i])
	}
}


function calcOutput(){
	outputData = new Array (numInj);
	totInj = 0
	cumHeat = 0

	
	for (i=0; i<numSteps; i++){
		//console.log('heat: ' + heatData[i][1])
		cumHeat = cumHeat + heatData[i][1]
		//console.log(cumHeat)
		if (i%stepBInj==0 && i!==0){
			//console.log('--------------');
			ratio = (totInj*vInj*userConcA) /  (userConcB*vCell)
			outputData[totInj] = [ratio, cumHeat/(vInj*userConcA)]
			cumHeat = 0
			//console.log(outputData[totInj]);
			//console.log('--------------');
			totInj++
		}
	}
}



function plotData(){
	$(document).ready(function(){
		$.plot($('#placeholder'),[{data: dataA, label: 'A'},{data: dataB, label: 'B'},{data: dataC, label: 'C'}]);
	});	
}
		//console.log(concData)
	
function plotRate(){
	$(document).ready(function(){
		$.plot($('#placeholder2'),[{data:fRateData, label: 'fRate'},{data:rRateData, label: 'rRate'}]);
	});	
}	
function plotRateDiff(){
	$(document).ready(function(){
		$.plot($('#placeholder3'),[{data:diffRateData, label: 'diff Rate'}]);
	});	
}

function plotHeat(){
	$(document).ready(function(){
		$.plot($('#placeholder4'),[{data:heatData, label: 'Heat Data'}]);
	});	
}

function plotOutput(){
	$(document).ready(function(){
		$.plot($('#placeholder5'),
			[{data:outputData, label: 'Output'}],
			{
				series:{
					lines: {show: false},
					points: {show: true}
				}
			}
				);
				
	});	
}

function plotAll(){
	 calcConc();
	 plotData();
	 calcRate();
	 plotRate();
	 calcRateDiff();
	 plotRateDiff();
	 calcHeat();
	 //console.log(heatData)
	 plotHeat();
	 calcOutput();
	 plotOutput();
}

