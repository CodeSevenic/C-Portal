const { generateUniqueID } = require('../utils/idGenerator');
const { comparePassword, hashPassword } = require('../utils/password-util');
const {
  db,
  getUserByEmail,
  getUserById,
  getAppTokens,
  createUserInFirebase,
  createCustomTokenInFirebase,
  verifyUserInFirebase,
  verifyIdTokenInFirebase,
} = require('../firebase/firebaseAdmin');
const { sendWelcomeEmail } = require('../utils/sendgrid');

exports.getUserAuths = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);

    res.status(200).json({
      message: 'Successfully retrieved user auths',
      appAuths: user.appAuths ? user.appAuths : {},
    });
  } catch (error) {
    res.status(500).json({ message: "Couldn't  get user auths", error: error.message });
  }
};

exports.logout = async (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Logout successfully');
      req.session = null;
      res.status(200).json({ message: 'User logged out successfully' });
    }
  });
};

// Function for user registration API
exports.register = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    // Create user in Firebase Auth
    const userRecord = await createUserInFirebase(email, password);

    console.log('Firebase User ID: ', userRecord.uid);

    // Save user info to Firestore
    await db.collection('users').doc(userRecord.uid).set({
      username: username,
      email: email,
      phone: phone,
    });

    // Get user data
    const userData = await db.collection('users').doc(userRecord.uid).get();

    res.status(200).json({
      message: 'User registered successfully',
      userId: userData.id,
      isAdmin: userData.data().isAdmin ? userData.data().isAdmin : false,
      isLoggedIn: true,
      username: userData.data().username,
      appAuths: userData.data().appAuths ? userData.data().appAuths : {},
      features: userData.data().features ? userData.data().features : {},
    });
    // sendWelcomeEmail(email);
  } catch (error) {
    res
      .status(400)
      .json({ status: false, message: 'User registration failed', error: error.message });
  }
};

// Function for user login API
exports.login = async (req, res) => {
  try {
    const idToken = req.body.idToken;

    // Verify the Firebase ID token in the request
    const verifiedToken = await verifyIdTokenInFirebase(idToken);
    // const decodedToken = await admin.auth().verifyIdToken(idToken);
    // const uid = decodedToken.uid; // The Firebase user ID

    // Get user data from Firestore
    const userData = await db.collection('users').doc(verifiedToken).get();

    if (!userData.exists) {
      throw new Error('No user data found in Firestore');
    }
    console.log('Login successfully');
    res.status(200).json({
      message: 'User logged in successfully',
      userId: userData.id,
      isAdmin: userData.data().isAdmin ? userData.data().isAdmin : false,
      email: userData.data().email,
      isLoggedIn: true,
      username: userData.data().username,
    });
  } catch (error) {
    if (error.code === 'auth/id-token-expired') {
      res.status(401).json({ message: 'Token expired. Please log in again.' });
    } else if (error.code === 'auth/id-token-revoked') {
      res.status(401).json({ message: 'Token has been revoked. Please log in again.' });
    } else if (error.code === 'auth/argument-error') {
      res.status(400).json({ message: 'Invalid ID token.' });
    } else {
      res.status(500).json({ message: 'User login failed', error: error.message });
    }
  }
};
