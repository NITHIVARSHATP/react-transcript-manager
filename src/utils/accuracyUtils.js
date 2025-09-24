// Utility functions for transcript accuracy evaluation

/**
 * Calculates Word Error Rate (WER) and Accuracy between reference and hypothesis.
 * @param {string} reference - The correct/original transcript
 * @param {string} hypothesis - The transcribed text to compare
 * @returns {{wer: number, accuracy: number}}
 */
export function calculateAccuracy(reference, hypothesis) {
  const refWords = reference.trim().split(/\s+/);
  const hypWords = hypothesis.trim().split(/\s+/);

  const rLen = refWords.length;
  const hLen = hypWords.length;

  // Dynamic Programming Table
  const dp = Array.from({ length: rLen + 1 }, () =>
    Array(hLen + 1).fill(0)
  );

  for (let i = 0; i <= rLen; i++) dp[i][0] = i;
  for (let j = 0; j <= hLen; j++) dp[0][j] = j;

  for (let i = 1; i <= rLen; i++) {
    for (let j = 1; j <= hLen; j++) {
      if (refWords[i - 1] === hypWords[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // No error
      } else {
        dp[i][j] =
          1 +
          Math.min(
            dp[i - 1][j],     // Deletion
            dp[i][j - 1],     // Insertion
            dp[i - 1][j - 1]  // Substitution
          );
      }
    }
  }

  const wer = (dp[rLen][hLen] / rLen) * 100; // percentage
  const accuracy = 100 - wer;

  return { wer: parseFloat(wer.toFixed(2)), accuracy: parseFloat(accuracy.toFixed(2)) };
}
