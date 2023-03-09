'use strict'

const bomb = document.querySelector('.animation__bomb'),
	explosion1 = document.querySelector('.explosion-1'),
	explosion2 = document.querySelector('.explosion-2'),
	explosion3 = document.querySelector('.explosion-3'),
	play = document.querySelector('.play'),
	reset = document.querySelector('.reset');

let count = 0,
	activeDown = false,
	idDown;

const showExplosion = () => {
	if(count == 0) return;

	play.disabled = true;
	reset.disabled = true;

	play.innerHTML = 'stop';
	play.style.pointerEvents = 'none';

	explosion1.classList.add('active');

	let idTimer3 = setTimeout(() => {
		explosion3.classList.add('active');
	}, 300);

	let idTimer2 = setTimeout(() => {
		explosion2.classList.add('active');
	}, 700);

	setTimeout(() => {
		explosion1.classList.remove('active');
		explosion2.classList.remove('active');
		explosion3.classList.remove('active');

		play.disabled = false;
		reset.disabled = false;
	}, 1400);
}

const fallingDown = () => {
	activeDown = true;
	count++
	idDown = requestAnimationFrame(fallingDown);

	if(count < 100) {
		bomb.style.top = `${count}%`;
		bomb.style.transform = `rotate(${count * 5}deg)`;
	} else
	if(count == 100) {
		bomb.classList.add('inactive');

		showExplosion();

		cancelAnimationFrame(idDown);
	}
}

play.addEventListener('click', () => {
	if(!activeDown) {
		play.innerHTML = 'pause';
		fallingDown();
	} else {
		activeDown = false;

		cancelAnimationFrame(idDown);
	}
});

reset.addEventListener('click', () => {
	count = 0;
	activeDown = false;

	play.innerHTML = 'play';
	play.style.pointerEvents = 'auto';

	bomb.classList.remove('inactive');
	bomb.style.top = '0';
	bomb.style.transform = 'rotate(0deg)';

	explosion1.classList.remove('active');
	explosion2.classList.remove('active');
	explosion3.classList.remove('active');

	cancelAnimationFrame(idDown);
});