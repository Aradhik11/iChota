const Form = require('../models/Form');

exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, coverLetter } = req.body;
        
        // Check if CV file was uploaded
        if (!req.file) {
          return res.status(400).json({ message: 'CV is required' });
        }
    
      
    
        const newUser = new Form({
          firstName,
          lastName,
          email,
          phoneNumber,
          cvPath: req.file.path,
          coverLetter
        });

    await newUser.save();

    res.status(201).json({
      message: 'User profile created successfully',
      user: newUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await Form.findById(req.params.id).select('-cvPath -coverLetterPath');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};