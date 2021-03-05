// Importing the libraries
const express = require("express");
const router = express.Router();

// Use nodemailer to send a template html
const smtpTransport = require("nodemailer-smtp-transport");
const nodemailer = require("nodemailer");

// Set nodemailer service to gmail, set user and pass with which the email will be send
let transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "medicalgeek1@gmail.com",
      pass: "medicalgeek123",
    },
  })
);
// Create the endpoint to consume a post petition
router.post("/send_mail", (req, res) => {
  try {
    // Set data for the destination user from the body of the petition
    let { to, subject, username, password } = req.body;
    // Set template for the email
    contentHTML = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
	<meta charset="UTF-8">
	<meta content="width=device-width, initial-scale=1" name="viewport">
	<meta name="x-apple-disable-message-reformatting">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta content="telephone=no" name="format-detection">
	<title></title>
	<!--[if (mso 16)]>
	<style type="text/css">
	a {text-decoration: none;}
	</style>
	<![endif]-->
	<!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
	<!--[if gte mso 9]>
<xml>
	<o:OfficeDocumentSettings>
	<o:AllowPNG></o:AllowPNG>
	<o:PixelsPerInch>96</o:PixelsPerInch>
	</o:OfficeDocumentSettings>
</xml>
<![endif]-->
	<!--[if !mso]><!-- -->
	<link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i" rel="stylesheet">
	<!--<![endif]-->
</head>

<body>
	<div class="es-wrapper-color">
		<!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#f4f4f4"></v:fill>
			</v:background>
		<![endif]-->
		<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
			<tbody>
				<tr class="gmail-fix" height="0">
					<td>
						<table width="600" cellspacing="0" cellpadding="0" border="0" align="center">
							<tbody>
								<tr>
									<td cellpadding="0" cellspacing="0" border="0" style="line-height: 1px; min-width: 600px;" height="0"><img src="https://esputnik.com/repository/applications/images/blank.gif" style="display: block; max-height: 0px; min-height: 0px; min-width: 600px; width: 600px;" alt width="600" height="1"></td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
				<tr>
					<td class="esd-email-paddings" valign="top">
						<table class="es-content esd-header-popover" cellspacing="0" cellpadding="0" align="center">
							<tbody>
								<tr>
									<td class="esd-stripe" align="center">
										<table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" align="center">
											<tbody>
												<tr>
													<td class="esd-structure es-p15t es-p15b es-p10r es-p10l" align="left">
														<!--[if mso]><table width="580" cellpadding="0" cellspacing="0"><tr><td width="282" valign="top"><![endif]-->
														<table class="es-left" cellspacing="0" cellpadding="0" align="left">
															<tbody>
																<tr>
																	<td class="esd-container-frame" width="282" align="left">
																		<table width="100%" cellspacing="0" cellpadding="0">
																			<tbody>
																				<tr>
																					<td class="es-infoblock esd-block-text es-m-txt-c" align="left">
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
														<!--[if mso]></td><td width="20"></td><td width="278" valign="top"><![endif]-->
														<table class="es-right" cellspacing="0" cellpadding="0" align="right">
															<tbody>
																<tr>
																	<td class="esd-container-frame" width="278" align="left">
																		<table width="100%" cellspacing="0" cellpadding="0">
																			<tbody>
																				<tr>
																					<td class="es-infoblock esd-block-text es-m-txt-c" align="right">
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
														<!--[if mso]></td></tr></table><![endif]-->
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						<table class="es-header" cellspacing="0" cellpadding="0" align="center">
							<tbody>
								<tr>
									<td class="esd-stripe" style="background-color: #409efe;" bgcolor="#409efe" align="center">
										<table class="es-header-body" width="600" cellspacing="0" cellpadding="0" align="center">
											<tbody>
												<tr>
													<td class="esd-structure es-p20t es-p10b es-p10r es-p10l" align="left">
														<table width="100%" cellspacing="0" cellpadding="0">
															<tbody>
																<tr>
																	<td class="esd-container-frame" width="580" valign="top" align="center">
																		<table width="100%" cellspacing="0" cellpadding="0">
																			<tbody>
																				<tr>
																					<td class="esd-block-image es-p25t es-p25b es-p10r es-p10l" style="font-size:0" align="center"><a href target="_blank"><img src="https://ngzxbe.stripocdn.email/content/guids/CABINET_3df254a10a99df5e44cb27b842c2c69e/images/7331519201751184.png" alt style="display: block;" width="40"></a></td>
																				</tr>
																			</tbody>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						<table class="es-content" cellspacing="0" cellpadding="0" align="center">
							<tbody>
								<tr>
									<td class="esd-stripe" style="background-color: #409efe;" bgcolor="#409efe" align="center">
										<table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" align="center">
											<tbody>
												<tr>
													<td class="esd-structure" align="left">
														<table width="100%" cellspacing="0" cellpadding="0">
															<tbody>
																<tr>
																	<td class="esd-container-frame" width="600" valign="top" align="center">
																		<table style="background-color: #ffffff; border-radius: 4px; border-collapse: separate;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
																			<tbody>
																				<tr>
																					<td class="esd-block-text es-p35t es-p5b es-p30r es-p30l" align="center">
																						<h1>Welcome to Medical Geek!</h1>
																					</td>
																				</tr>
																				<tr>
																					<td class="esd-block-spacer es-p5t es-p5b es-p20r es-p20l" style="font-size:0" bgcolor="#ffffff" align="center">
																						<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
																							<tbody>
																								<tr>
																									<td style="border-bottom: 1px solid #ffffff; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td>
																								</tr>
																							</tbody>
																						</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						<table class="es-content" cellspacing="0" cellpadding="0" align="center">
							<tbody>
								<tr>
									<td class="esd-stripe" style="background-color: #409efe;" bgcolor="#409efe" align="center">
										<table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" align="center">
											<tbody>
												<tr>
													<td class="esd-structure" align="left">
														<table width="100%" cellspacing="0" cellpadding="0">
															<tbody>
																<tr>
																	<td class="esd-container-frame" width="600" valign="top" align="center">
																		<table style="border-radius: 4px; border-collapse: separate; background-color: #ffffff;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
																			<tbody>
																				<tr>
																					<td class="esd-block-text es-p20t es-p20b es-p30r es-p30l es-m-txt-l" bgcolor="#ffffff" align="left">
																						<p>We're excited to have you get started.</p>
																					</td>
																				</tr>
																				<tr>
																					<td class="esd-block-button es-p35t es-p35b es-p10r es-p10l" align="center"><span class="es-button-border" style="background: #409efe none repeat scroll 0% 0%;"><a href="https://google.com" class="es-button" target="_blank" style="border-width: 15px 30px; background: #409efe none repeat scroll 0% 0%; border-color: #409efe; font-weight: bold;">Go to the site</a></span></td>
																				</tr>
																				<tr>
																					<td class="esd-block-text es-p20t es-p20b es-p30r es-p30l es-m-txt-l" bgcolor="#ffffff" align="left">
																						<p>Here are your credential to the login!</p>
																					</td>
																				</tr>
																				<tr>
																					<td class="esd-block-text es-p20t es-p30r es-p30l es-m-txt-l" align="left">
																						<p style="color: #010000;">User: ${username}<br>Password: ${password}<br></p>
																					</td>
																				</tr>
																				<tr>
																					<td class="esd-block-text es-p20t es-p30r es-p30l es-m-txt-l" align="left">
																						<p>If you have any questions, just reply to this email—we're always happy to help out.</p>
																					</td>
																				</tr>
																				<tr>
																					<td class="esd-block-text es-p20t es-p40b es-p30r es-p30l es-m-txt-l" align="left">
																						<p><br></p>
																						<p>The Medical Geek Team.<br></p>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						<table class="es-content esd-footer-popover" cellspacing="0" cellpadding="0" align="center">
							<tbody>
								<tr>
									<td class="esd-stripe" style="background-color: #409efe;" bgcolor="#409efe" align="center">
										<table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" align="center">
											<tbody>
												<tr>
													<td class="esd-structure" align="left">
														<table width="100%" cellspacing="0" cellpadding="0">
															<tbody>
																<tr>
																	<td class="esd-container-frame" width="600" valign="top" align="center">
																		<table width="100%" cellspacing="0" cellpadding="0">
																			<tbody>
																				<tr>
																					<td class="esd-block-spacer es-p10t es-p20b es-p20r es-p20l" style="font-size:0" align="center">
																						<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
																							<tbody>
																								<tr>
																									<td style="border-bottom: 1px solid #f4f4f4; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td>
																								</tr>
																							</tbody>
																						</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</body>

</html>`;
    //
    // Set the mail options for the sending with nodemailer
    const mailOptions = {
      from: "medicalgeek1@gmail.com",
      to: to,
      subject: subject,
      html: contentHTML,
    };
    // Seding email with nodemailer and responding tiwh a json
    transporter.sendMail(mailOptions, (err, info) => {
      console.log({ sent: info.response });
      res.json({ message: "Main send" });
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
