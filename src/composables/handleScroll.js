/**
 * 리스트 스크롤 처리
 * @returns
 */
export const handleScroll = () => {
	if (window.innerHeight + window.scrollY + 50 >= document.body.scrollHeight) {
		return true;
	}
};
