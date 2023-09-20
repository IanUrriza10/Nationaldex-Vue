export const padDexNumber = (id: number) => {
	return id.toString().padStart(4, "0");
};

export const idToImgRoute = (id: number) => {
	return `/sprites/pokemon/other/official-artwork/${id}.png`;
};
// export const debounce = (fn = () => {}, delay = 500) => {
// 	let timeout: NodeJS.Timeout;
// 	return (...args: []) => {
// 		clearTimeout(timeout);
// 		timeout = setTimeout(() => {
// 			fn(...args);
// 		}, delay);
// 	};
// };
