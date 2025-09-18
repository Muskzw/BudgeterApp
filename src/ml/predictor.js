// Simple monthly spending predictor
// Tries to use @tensorflow/tfjs for a quick linear regression on monthly totals.
// If TFJS is unavailable, falls back to a naive average of past months.

let tf;
try {
  // Optional dependency: user can install with `npm i @tensorflow/tfjs` if desired
  // eslint-disable-next-line import/no-extraneous-dependencies
  tf = require('@tensorflow/tfjs');
} catch (e) {
  tf = null;
}

function groupByMonth(expenses) {
  const map = new Map(); // key: YYYY-MM, value: sum
  for (const e of expenses) {
    const d = new Date(e.date);
    if (Number.isNaN(d.getTime())) continue;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const amt = Number(e.amount) || 0;
    map.set(key, (map.get(key) || 0) + amt);
  }
  // Sort by key chronological
  const entries = Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? -1 : 1));
  return entries.map(([, total]) => total);
}

export async function predictNextMonth(expenses) {
  const monthlyTotals = groupByMonth(expenses);
  if (monthlyTotals.length === 0) return 0;
  if (monthlyTotals.length === 1) return monthlyTotals[0];

  // Fallback naive average if TF isn't available
  if (!tf) {
    const avg = monthlyTotals.reduce((a, b) => a + b, 0) / monthlyTotals.length;
    return avg;
  }

  // Prepare simple linear regression: y = a*x + b
  const xs = tf.tensor1d(monthlyTotals.map((_, i) => i + 1));
  const ys = tf.tensor1d(monthlyTotals);

  const a = tf.scalar(Math.random());
  const b = tf.scalar(Math.random());

  const learningRate = 0.05;
  const optimizer = tf.train.sgd(learningRate);

  function predict(x) {
    return a.mul(x).add(b);
  }

  function loss(pred, labels) {
    return pred.sub(labels).square().mean();
  }

  for (let i = 0; i < 200; i += 1) {
    optimizer.minimize(() => loss(predict(xs), ys));
    await tf.nextFrame?.();
  }

  const nextX = tf.scalar(monthlyTotals.length + 1);
  const pred = predict(nextX).dataSync()[0];
  xs.dispose();
  ys.dispose();
  a.dispose();
  b.dispose();
  nextX.dispose();

  if (!Number.isFinite(pred)) {
    const avg = monthlyTotals.reduce((a2, b2) => a2 + b2, 0) / monthlyTotals.length;
    return avg;
  }
  return pred;
}
