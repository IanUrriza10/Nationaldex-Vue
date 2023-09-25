export const useObserver = (
	callback: IntersectionObserverCallback = () => {}
) => {
	const observer = new IntersectionObserver(callback, {
		root: null, // Use the viewport as the root
		rootMargin: "0px", // No margin
		threshold: 0.1, // 10% visibility triggers the callback
	});

	const footer = document.querySelector("#footer");
	footer ? observer.observe(footer) : undefined;
	return {
		observer,
	};
};
