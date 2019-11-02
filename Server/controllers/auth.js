const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const { transport } = require('./mail');

const User = require('../models/auth/User');

process.env.SECRET_KEY = 'secret';

exports.postRegisterUser = (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       const error = new Error('Validation failed.');
       error.statusCode = 422;
       error.data = errors.array();
       throw error;
   }
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const token = crypto.randomBytes(20).toString('hex');
    const accountType = "284695743215";

    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User ({
                firstName: firstName,
                lastName:lastName,
                email: email,
                password: hashedPassword,
                verifiedEmail: false,
                verifiedToken: token,
                accountType: accountType
            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({ message: 'User created'});
            
            let mailOptions = {
                from: "rightdecision2019@gmail.com",
                to: `${email}`,
                subject: "Link to verify Email",
                text: `You are receiving this because you have to verify your email before getstarted.\n\n` +
                        `Please click the following link to verify your email ` + 
                        ` http://localhost:3000/verify?token=${token}\n\n`
                
            }

            transport.sendMail(mailOptions, (error, res) => {
                if (error) {
                    console.log("there was an error" + error);
                } else {
                    console.log("Verify email sent");
                    res.status(200).json("Verify email sent");
                }
            });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
               const error = new Error('A user with this email could not be found.');
               error.statusCode = 402;
               throw error; 
            }
            loadedUser = user;
            if(user.verifiedEmail !== true) {
                console.log('User is not verified');
                return res.json({ message: 'User is not verified'});
            }
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password');
                error.statusCode = 401;
                throw error; 
            }
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                'somesupersecret',
                { expiresIn: '1h'}
            );
            res.status(200).json({ token: token, userId:loadedUser._id.toString(), accountType:loadedUser.accountType});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getVerifyEmail = (req, res, next) => {
    const verifyToken = req.query.verifiedToken;
    console.log(verifyToken);
    User.findOne({ 
        verifiedToken: verifyToken 
    })
    .then(user => {
        if (user === null) {
            console.log('email verification link is not valid');
            res.json('email verification link is not valid');
        } else {
            user.update({
                verifiedEmail: true
            }) 
            .then(() => {
                res.status(200).send({
                    userEmail: user.email,
                    message: 'email was verified successfully'
                });
            }) 
        }
    
    })
};

exports.getProfile = (req, res, next) => {
    const userId = req.query.userId;
    console.log(userId);

    User.findById(userId)
        .then(user => {
            if (!user) {
                const error = new Error('Provided user id can be harmed!');
               error.statusCode = 402;
               throw error; 
            } else {
                res.status(200).json({
                    userName:user.firstName + " " + user.lastName,
                    email: user.email, 
                    accountType:user.accountType,
                    address: user.address,
                    worksAt: user.worksAt,
                    as: user.as,
                    contactMe: user.contactMe
                    });
            }
        })
        .catch(err => {
            console.log(err);
        })
};

exports.postProfile = (req, res, next) => {
    const userId = req.body.userId;
    const address = req.body.address;
    const worksAt = req.body.worksAt;
    const as = req.body.as;
    const contactMe = req.body.contactMe;

    User.findById(userId)
        .then(user => {
            if (!user) {
                const error = new Error('Provided user id can be harmed!');
               error.statusCode = 402;
               throw error; 
            } else {
                user.update({
                    address: address,
                    worksAt: worksAt,
                    as: as,
                    contactMe: contactMe
                })
                .then(() => {
                    res.status(200).json({
                        message: 'Profile updated successfully'
                    });
                })
                .catch(err => {
                    console.log('Error while updating profile' + err);
                })
            }

        })
        .catch(err => {
            console.log(err);
        });

}


