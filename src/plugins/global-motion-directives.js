import delayTransition from '@/directives/delayTransition';

const popYDelayObj = delayTransition.createPopDelaylist(500, 5000, 'y', 100);
const popXDelayObj = delayTransition.createPopDelaylist(500, 5000, 'x', -100);

const mergedObj = Object.assign({}, popXDelayObj, popYDelayObj);

export default {
	directives: mergedObj,
};
