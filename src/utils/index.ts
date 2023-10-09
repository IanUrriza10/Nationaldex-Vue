export const padDexNumber = (id: number) => {
	return id.toString().padStart(4, "0");
};

export const idToPokemonImgRoute = (id: number) => {
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

export const stringToPosInt = (id: string) => {
	const result = parseInt(id);
	return isNaN(result) ? 0 : Math.abs(result);
};

export const dashToSpace = (text: string) => {
	return text.replace(/-/g, " ");
};
