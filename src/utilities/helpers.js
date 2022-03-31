/**
 * Compares two date
 * @param {date} a First date
 * @param {date} b Second date
 * @returns (a > b) - (a < b) or NAN if either a or be is not in a good Date format
 */
export function dateCompare(a, b) {
	let x = a,
		y = b;
	x = new Date(x).valueOf();
	y = new Date(y).valueOf();
	return isFinite(x) && isFinite(y) ? (x > y) - (x < y) : NaN;
}

/**
 * Get the redirect string url from the current url
 * @returns The Url string	
 */
export const getLoginRedirectUrl = () => {
	// Retrieve the current url
	const href = window.location.href;
	const protocol = href.slice(0, href.indexOf("//") + 2); // Get the protocal (http:// or https://)
	// Split the rest of the url into array to find the hostname (the first element of the array)
	let baseUrl = href.slice(protocol.length).split(":"); 
	console.log(baseUrl);
	if (baseUrl.length <= 1) {
		baseUrl = href.slice(protocol.length).split("/");
	}
	console.log(baseUrl[0]);
	// Return the url string
	return protocol + baseUrl[0] + "/php";
};

/**
 * Reçoit un number et retourne le nombre formaté
 * @param {number} number The number to format
 * @returns formated number string
 */
export const formatNumber = (number) => {
	const str = number.toLocaleString("fr");
	return str
}

/**
 * Calcule le prix unitaire et retourn le prix unitaire formaté
 * @param {number} prixTotal Total price
 * @param {number} quantite quantity
 * @param {string} type type retourné
 * @returns P.U
 */
export const getPrixUnitaire = (prixTotal, quantite, type) => {
	const pu = prixTotal / quantite;
	if (type === "number") {
		return pu;
	}
	return formatNumber(pu);
}
