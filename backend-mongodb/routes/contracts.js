const express = require('express');
const Contract = require('../models/Contract');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/contracts
// @desc    Get user contracts
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const contracts = await Contract.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: contracts
    });

  } catch (error) {
    console.error('Get contracts error:', error);
    res.status(500).json({
      error: 'Failed to get contracts',
      message: 'An error occurred while fetching contracts'
    });
  }
});

// @route   GET /api/contracts/:id
// @desc    Get specific contract
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const contract = await Contract.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!contract) {
      return res.status(404).json({
        error: 'Contract not found',
        message: 'Contract not found or you do not have access to it'
      });
    }

    res.json({
      success: true,
      data: contract
    });

  } catch (error) {
    console.error('Get contract error:', error);
    res.status(500).json({
      error: 'Failed to get contract',
      message: 'An error occurred while fetching the contract'
    });
  }
});

module.exports = router;
