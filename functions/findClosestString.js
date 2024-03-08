/**
 * Searches an array of strings for the string that is closest to a given target string,
 * based on the Levenshtein distance.
 *
 * @param {string<array>} target - The target string.
 * @param {string<array>} array - The array of strings to search.
 * @returns {{score: number, closestString: string}} An object containing the score
 *   (between 0 and 1) and the closest string to the target string.
 */
export function findClosestString(target, array) {
  try {
    let minDistance = Infinity;
    let closestString = "";

    if (typeof array !== "object") array = Array(array);
    if (typeof target !== "object") target = Array(target);

    target.forEach((target) => {
      array.forEach((str) => {
        const distance = computeLevenshteinDistance(target, str);
        if (distance < minDistance) {
          minDistance = distance;
          closestString = str;
        }
      });
    });

    // Normalize the distance to a score between 0 and 1
    const maxLen = Math.max(
      target.length,
      array.reduce((max, str) => Math.max(max, str.length), 0)
    );
    const score = 1 - minDistance / maxLen;

    return { score, closestString };
  } catch (e) {
    console.log(e);
    throw new Error(
      "An error occurred while computing the distance. Are you trying to give an object instead?, We don't support that yet."
    );
  }
}

/**
 * Calculates the Levenshtein distance between two strings.
 *
 * @param {string} a - The first string.
 * @param {string} b - The second string.
 * @returns {number} The Levenshtein distance between the two strings.
 */
function computeLevenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  let i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  let j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // Substitution
          matrix[i][j - 1] + 1, // Insertion
          matrix[i - 1][j] + 1 // Deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}
