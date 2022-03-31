import axios from 'axios';
import { dateCompare } from '../../../utilities/helpers';

/**
 * La function qui recupere les donnees du client
 * @param {string} numDef Le num def du client
 * @param {function} cb Callback function. Params: loading, client, error
 * @returns null if no numDef oththerwise void;
 */
export const getClientData = async (numDef, assujetti, cb) => {
    let nD = numDef;
    if (!nD || nD === '' || nD.length < 5) return;
    if (compareNumDef(nD, assujetti.num_def)) return;

    nD = nD.replaceAll('/', '').replaceAll('-', '');

    cb(true);
    axios
    .post(`/api/assujetti/by_def/${nD}`, {numero_def: numDef})
    .then(res => {
        const d = res.data;
        if (!d.numero_def) {
            cb(false, null, d.message);
        } else {
            cb(false, d, null);
        }
    })
    .catch((error) => {
        cb(false, null, error);
    }); 
}

/**
 * Compare two num def
 * @param {string} def1 
 * @param {string} def2 
 * @returns true if equal false if not equal
 */
export const compareNumDef = (def1, def2) => {
    if ((def1 === def2)) return true;
    return false;
}

/**
 * Methode Fifo pour la gestion des stocks 
 * @param {array} entrees 
 * @param {number} qSortie 
 * @returns object {
		prixTotal,
		entreeSortie,
		newEntrees,
	}
 */
export function fifo(entrees = [], qSortie) {
	let i = 0,
		qSparEntree = 0,
		qS = qSortie,
		es = [],
		entreeSortie = [],
		pT = 0;

	let sorted = [...entrees].sort((a, b) =>
		dateCompare(a.createdAt, b.createdAt)
	);

	while (qS > 0 && i < entrees.length) {
		const e = sorted[i];
		qS = qS - e.quantite_entree;
		entreeSortie = entreeSortie.filter((es) => es.entreeId !== e.id);
		if (qS < 0) {
			const reste = Math.abs(qS);
			qSparEntree = qSortie;
			entreeSortie.push({
				entreeId: e.id,
				q_sortie: qSparEntree,
				q_entree: reste,
			});
		} else {
			qSparEntree = e.quantite_entree;
			entreeSortie.push({
				entreeId: e.id,
				q_sortie: qSparEntree,
				q_entree: 0,
			});
			es = entrees.filter((entree) => entree.id !== e.id);
		}

		pT = pT + qSparEntree * e.pv_unitaire;

		i++;
	}

	return {
		prixTotal: pT,
		entreeSortie,
		newEntrees: es,
	};
}

/**
 * Calcule la facture
 * @param {array} produits Tableaux des produits
 * @param {number} remise La remise appliquée 
 * @returns object of {q, sousTotal, tva, netAPayer}
 */
export function calculeFacture(produits = [], remise) {
	let q = 0;
	let st = 0;
	produits.forEach((p) => {
		q = p.quantiteSortie + q;
		st = st + p.prixTot;
	});

	if (remise && !isNaN(+remise)) {
		st = st * (1 - +remise / 100);
	}
	const tva = st * 0.16;
	const netAPayer = st + tva;

	return {
		q,
		sousTotal: st,
		tva,
		netAPayer,
	};
}