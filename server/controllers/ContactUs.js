const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  console.log(req.body)
  try {
    const emailRes = await mailSender(
      email,
      "Thank You for Connecting with StudyHub",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    const adminMail = "mail.dilshad.acc@gmail.com";
    const ToAdmin = await mailSender(
      adminMail,
      "Client Contact You Sir",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    console.log("Email Res ", emailRes)
    console.log("Email to admin ", ToAdmin)
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