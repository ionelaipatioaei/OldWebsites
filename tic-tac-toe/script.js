var owner = [];
var turn = "p1";
var moves = 0;
var score = [0, 0];
var gameOver = false;
var p1Col = $("#p1Color").val();
var p2Col = $("#p2Color").val();
var text = $("#cells h1").css("display", "none");

$("#reset").on("click", function() {
	gameOver = false;
	for(let i = 0; i < 9; i++) {
		owner[i] = undefined;
		$(".cell").css("background", "#b0bec5");
	}
	p1Col = $("#p1Color").val();
	p2Col = $("#p2Color").val();
	turn = "p1";
	moves = 0;
	text.css("display", "none");
});

$("#cells").on("click", ".cell", function() {
	let clickedCell = Number($(this).text());

	if(owner[clickedCell] === undefined && turn === "p1" && !gameOver) {
		$(this).css("background", p1Col);
		owner[clickedCell] = "p1";
		turn = "p2";
		moves++;
	} else if(owner[clickedCell] === undefined && turn === "p2" && !gameOver){
		$(this).css("background", p2Col);
		owner[clickedCell] = "p2";
		turn = "p1";
		moves++;
	}
	checkWin();
});

$(".cell").on("mouseover", function() {
	if(owner[Number($(this).text())] === undefined && turn === "p1" && !gameOver) {
		$(this).css("background", p1Col);
	} else if(owner[Number($(this).text())] === undefined && !gameOver) {
		$(this).css("background", p2Col);
	}
});

$(".cell").on("mouseleave", function() {
	if(owner[Number($(this).text())] === undefined) {
		$(this).css("background", "#b0bec5");
	}
});

function checkWin() {
	let cell1 = [0, 3, 6, 0, 1, 2, 0, 2];
	let cell2 = [1, 4, 7, 3, 4, 5, 4, 4];
	let cell3 = [2, 5, 8, 6, 7, 8, 8, 6];

	for(let i= 0; i < 9; i++) {
		if(owner[cell1[i]] === "p1" && owner[cell2[i]] === "p1" && owner[cell3[i]] === "p1" && !gameOver) {
			text.css("display", "block");
			text.text("Player one wins!");
			gameOver = true;
			score[0]++;
			$("#p1Score").text(score[0]);
		} 
		if(owner[cell1[i]] === "p2" && owner[cell2[i]] === "p2" && owner[cell3[i]] === "p2" && !gameOver) {
			text.css("display", "block");
			text.text("Player two wins!");
			gameOver = true;
			score[1]++;
			$("#p2Score").text(score[1]);
		}
		if(moves === 9 && !gameOver) {
			text.css("display", "block");
			text.text("Draw!");
			gameOver = true;
		}
	}
}