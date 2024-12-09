const express = require('express');
const router = new express.Router();

function parseNumbers(numsStr) {
  if (!numsStr) {
    throw { status: 400, message: "nums are required" };
  }
  const nums = numsStr.split(',').map((n) => {
    const num = parseFloat(n);
    if (isNaN(num)) {
      throw { status: 400, message: `${n} is not a number` };
    }
    return num;
  });
  return nums;
}

function calculateMean(nums) {
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function calculateMedian(nums) {
  nums.sort((a, b) => a - b);
  const mid = Math.floor(nums.length / 2);
  return nums.length % 2 !== 0
    ? nums[mid]
    : (nums[mid - 1] + nums[mid]) / 2;
}

function calculateMode(nums) {
  const freq = {};
  nums.forEach((n) => (freq[n] = (freq[n] || 0) + 1));
  let maxFreq = 0;
  let mode = null;
  for (let key in freq) {
    if (freq[key] > maxFreq) {
      maxFreq = freq[key];
      mode = Number(key);
    }
  }
  return mode;
}

router.get('/mean', (req, res, next) => {
  try {
    const nums = parseNumbers(req.query.nums);
    const mean = calculateMean(nums);
    return res.json({ operation: "mean", value: mean });
  } catch (err) {
    next(err);
  }
});

router.get('/median', (req, res, next) => {
  try {
    const nums = parseNumbers(req.query.nums);
    const median = calculateMedian(nums);
    return res.json({ operation: "median", value: median });
  } catch (err) {
    next(err);
  }
});

router.get('/mode', (req, res, next) => {
  try {
    const nums = parseNumbers(req.query.nums);
    const mode = calculateMode(nums);
    return res.json({ operation: "mode", value: mode });
  } catch (err) {
    next(err);
  }
});

module.exports = router;