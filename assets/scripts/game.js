class Game {
	constructor(screen) {
		this.screen = screen;

		this.goalKeeperJump = [];
		this.zonesIdArray = [];
		this.roundsCounter = 0;
		this.playerScoreArray = []; // suma de reduccion
		this.computerScoreArray = []; // suma de reduccion, revisar dsps

		this.scorePrintPlayer = [];
		this.scorePrintComputer = [];
		this.printPlayer = printPlayer;
		this.printComputer = printComputer;

		this.level = 1;
		this.status = "";
		this.message = "";
	}

	createGoalZones() {
		for (let i = 0; i < 6; i++) {
			this.goalZones = document.createElement("div");
			this.goalZones.setAttribute("class", "grid1");
			this.goalZones.setAttribute("id", i + 1);
			this.goalZones.innerText = i + 1;
			this.screen.appendChild(this.goalZones);
			this.zonesIdArray.push(i + 1); // almacena el ID de las zonas creadas en la matriz
			// console.log(this.zonesIdArray)  console log, siempre en mi equipo
		}
	}

	computerLevel1() {
		for (let i = 0; i < 10; i++) {
			this.rng = Math.floor(Math.random() * 6 + 1); // RNG
			this.goalKeeperJump.push(this.rng);
		}
	}

	kicks(e) {
		this.kick = Number(e.currentTarget.id);
		this.roundsCounter = this.roundsCounter + 1;     //revisar xq esta basura no anda
		this.parent = e.currentTarget.parentElement;

		this.kickCompare(this.roundsCounter);
	}

	kickCompare(round) {
		if (round === 10) {
			if (this.kick !== this.goalKeeperJump[round - 1]) {
				this.message = `RONDA ${this.roundsCounter} - Jugador pateó en ${this.kick} y PC saltó en ${this.goalKeeperJump[this.roundsCounter - 1]}`;
				this.computerScoreArray.push(true);
				this.scorePrintComputer.push("O");
	
				console.log(`PUNTUACIÓN DEL JUGADOR - ${this.playerScoreArray}`);
				console.log(`PUNTUACIÓN DE LA PC - ${this.computerScoreArray}`);
				this.winnerResult();
			} else {
				this.message = `RONDA ${this.roundsCounter} - ¡PARADA!`;
				this.computerScoreArray.push(false);
				this.scorePrintComputer.push("X");
	
				console.log(`PUNTUACIÓN DEL JUGADOR - ${this.playerScoreArray}`);
				console.log(`PUNTUACIÓN DE LA PC - ${this.computerScoreArray}`);
				this.winnerResult();
			}
			// RONDA IMPAR
		} else if (this.kick !== this.goalKeeperJump[round - 1] && round % 2 !== 0) {
			this.message = `RONDA ${this.roundsCounter} - Jugador pateó en ${this.kick} y PC saltó en ${this.goalKeeperJump[this.roundsCounter - 1]}`;
			this.playerScoreArray.push(true);
			this.scorePrintPlayer.push("O");
			// this.removePrintBug () comentario linea 121
		} else if (this.kick === this.goalKeeperJump[round - 1] && round % 2 !== 0) {
			this.message = `RONDA ${this.roundsCounter} - ¡PARADA!`;
			this.playerScoreArray.push(false);
			this.scorePrintPlayer.push("X");
			// this.removePrintBug () comentario linea 121
	
			// RONDA PAR
		} else if (this.kick !== this.goalKeeperJump[round - 1] && round % 2 === 0) {
			this.message = `RONDA ${this.roundsCounter} - PC pateó en ${this.goalKeeperJump[this.roundsCounter - 1]} y Jugador saltó en ${this.kick}`;
			this.computerScoreArray.push(true);
			this.scorePrintComputer.push("O");
		} else if (this.kick === this.goalKeeperJump[round - 1] && round % 2 === 0) {
			this.message = `RONDA ${this.roundsCounter} - ¡PARADA!`;
			this.computerScoreArray.push(false);
			this.scorePrintComputer.push("X");
		}
	}
	winnerResult() {
		this.playerTotal = this.playerScoreArray.reduce((a, b) => a + b, 0);
		this.computerTotal = this.computerScoreArray.reduce((c, d) => c + d, 0);

		if (this.playerTotal > this.computerTotal) {
			this.playerScoreArray = [];
			this.computerScoreArray = [];
			this.scorePrintPlayer = ["-"];
			this.scorePrintComputer = ["-"];
			this.goalKeeperJump = [];
			this.roundsCounter = 1;
			this.computerLevel1();
			console.log("GANASTE!!!");
			this.level += 1;
			this.status = "nextlevel";
			this.removeAllChild(this.parent);
		} else if (this.playerTotal === this.computerTotal) {
			console.log("EMPATE TECNICO :P");
			this.roundsCounter = 8;
			this.status = "tie";
			this.kickCompare(8);
		} else {
			console.log("GANA LA COMPU, DEDICATE A OTRA COSA");
			this.removeAllChild(this.parent);
			this.status = "computerwon";
		}
	}

	// intentanto poner "-" en la matriz de cambio de fase y luego se apaga/borra

	// removePrintBug () {
	// 	if (this.scorePrintComputer[0] === "-") {
	// 		this.scorePrintComputer[0].shift()
	// 	}
	// }
	// zhulek bot

	removeAllChild(parent) {
		while (parent.firstChild) {
			parent.removeChild(parent.firstChild);
		}
		this.parent.remove();
	}
}
