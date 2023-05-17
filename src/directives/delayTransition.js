function createPopDelay(direction, startValue, delay) {
	return {
		initial: {
			opacity: 0,
			[direction]: startValue,
		},
		enter: {
			opacity: 1,
			[direction]: 0,
			transition: {
				delay,
			},
		},
	};
}
function createPopDelaylist(startDelay, endDelay, direction, startValue) {
	const popBottomDelays = {};
	let delay = startDelay;
	while (delay <= endDelay) {
		popBottomDelays[`pop${direction.toUpperCase()}Delay${delay}`] =
			createPopDelay(direction, startValue, delay);
		delay += 500;
	}
	return popBottomDelays;
}

export default {
	createPopDelay,
	createPopDelaylist,
};
