const { contactUsEmail } = require("../mail/templates/contactFormRes")
const { AdmincontactUsEmail } = require("../mail/templates/AdminContactForm")
const mailSender = require("../utils/mailSender")
require("dotenv").config();

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  console.log(req.body)
  try {
    const emailRes = await mailSender(
      email,
      "Thank You for Connecting with StudyHub",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    const adminMail = process.env.MAIL_USER;
    const ToAdmin = await mailSender(
      adminMail,
      "Client Contact You Sir",
      AdmincontactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )

    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}