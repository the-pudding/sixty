import { getScore } from './supabase.js';

const m = {
	"toss": 32.5,
	"roll": 36.62,
	"spot": 41.41,
}

const s = {
	"toss": 1.56,
	"roll": 1.04,
	"spot": 0.93,
}

const a = {
	"toss": 2,
	"roll": 6,
	"spot": 9,
}

const normalizeString = (str) => {
	const elements = str.split('');
	const unique_elements = elements
		.reduce((acc, curr) => acc.includes(curr) ? acc : acc + curr, "")
		.split('');
	const indices = elements.map((element) => unique_elements.indexOf(element));
	return indices.join('');
}

const computeScore = async (string, task) => {
	const normalized_string = normalizeString(string);
	const raw_score = await getScore(normalized_string, a[task]);

	if (!raw_score) {
		return null;
	}

	const normalized_score = (raw_score - m[task]) / s[task];

	return normalized_score;
}

export default async function computeCombinedScore(string_toss, string_roll, string_spot) {
	const [toss_score, roll_score, spot_score] = await Promise.all([
		computeScore(string_toss, "toss"),
		computeScore(string_roll, "roll"),
		computeScore(string_spot, "spot"),
	]);

	if (!toss_score) {
		return (roll_score + spot_score) / 2;
	}

	return [(toss_score + roll_score + spot_score) / 3, toss_score, roll_score, spot_score];
}