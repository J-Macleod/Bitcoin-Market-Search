function searchForMarketPrice() {
	let searchInput = $("#searchInput").val();
	if (searchInput.length == 3) { 
		if (searchInput.toLowerCase() == 'usd' || searchInput.toLowerCase() == 'eur' || searchInput.toLowerCase() == 'gbp') {
			'use strict';
			$('#results').effect('clip');
			$('#timeArea').effect('clip');
			
			let inputLowerCase = searchInput.toLowerCase();
			let inputUpperCase = searchInput.toUpperCase();
			let curSymbol = '';
			
			if (inputLowerCase == 'usd') {
				curSymbol = '$';
			} else if (inputLowerCase == 'eur') { 
				curSymbol = '€';
			} else if (inputLowerCase == 'gbp') { 
				curSymbol = '£';
			}
			
			let ajax = new XMLHttpRequest();
			
			ajax.onreadystatechange = function() {

				if (ajax.readyState == 4) {

					if ( (ajax.status >= 200 && ajax.status < 300) || (ajax.status == 304) ) {
						let data = JSON.parse(ajax.responseText);
						let bpi = data['bpi'];
						
						let currentTime = new Date();
						let curYear = currentTime.getFullYear();
						let curMonth = currentTime.getMonth()+1;
						let curDay = currentTime.getDate();
						let curTime = currentTime.toTimeString();
						let curDateTimeString = "You did this search on "+curDay+"/"+curMonth+"/"+curYear+" at "+curTime;

						let resultsHTML = '';

						let tableStyle = "style='border: 1px solid black;'";
						let detailButton1 = "<input type='button' id='btnDetails1' value='Details'>";
						let detailButton2 = "<input type='button' id='btnDetails2' value='Details'>";
						
						resultsHTML = "<tr><td "+tableStyle+">Price</td><td "+tableStyle+">"+curSymbol+bpi[inputUpperCase]['rate']+"</td></tr>";
						resultsHTML += "<tr><td "+tableStyle+">Updated (UK Time)</td><td "+tableStyle+">"+detailButton1+"</td></tr>";
						resultsHTML += "<tr><td "+tableStyle+">Description</td><td "+tableStyle+">"+detailButton2+"</td></tr>";
						
						$("#results").html(resultsHTML);
						
						let checkBoxDateTimeChecked = $('#checkBoxDateTime').is(":checked");
						if (checkBoxDateTimeChecked == true) {
							$("#timeArea").html(curDateTimeString);
						}
						else {
							$("#timeArea").html('');
						}
						
						$('#results').effect('slide');
						$('#timeArea').effect('slide');
			
						$('#btnDetails1').click(showDetails1);
						$('#btnDetails2').click(function() { showDetails2(inputUpperCase) });
					}
				}
			}
			
			ajax.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json', true);
			ajax.send();
		}
	}
}

function showDetails1() {
	
	let ajaxDetails1 = new XMLHttpRequest();
			
	ajaxDetails1.onreadystatechange = function() {

		if (ajaxDetails1.readyState == 4) {

			if ( (ajaxDetails1.status >= 200 && ajaxDetails1.status < 300) || (ajaxDetails1.status == 304) ) {
				let dataDetails1 = JSON.parse(ajaxDetails1.responseText);
				let dataTime = dataDetails1['time'];
				alert(dataTime['updateduk']);
			}
		}
	}
	
	ajaxDetails1.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json', true);
	ajaxDetails1.send();
}

function showDetails2(inputLetters) {
	let ajaxDetails2 = new XMLHttpRequest();
			
	ajaxDetails2.onreadystatechange = function() {

		if (ajaxDetails2.readyState == 4) {

			if ( (ajaxDetails2.status >= 200 && ajaxDetails2.status < 300) || (ajaxDetails2.status == 304) ) {
				let dataDetails2 = JSON.parse(ajaxDetails2.responseText);
				let bpi = dataDetails2['bpi'];
				alert(bpi[inputLetters]['description']);
			}
		}
	}
	
	ajaxDetails2.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json', true);
	ajaxDetails2.send();
}

$(document).ready( function () {
	$('#btnSubmit').click(searchForMarketPrice);
})