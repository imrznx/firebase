function doPost(e) {
    var name = e.parameter.name;
    var email = e.parameter.email;
    var phone = e.parameter.phone;
    var message = e.parameter.message;

    var spreadsheet = SpreadsheetApp.openById("13fs3RJeeSvSKbQrSZxC5pRVQMREvJH1qoFyTZm35z1I");
    var sheet = spreadsheet.getSheetByName("test");

    sheet.appendRow([name, email, phone, message]);

    var adminEmail = "xrecapz@gmail.com";
    var senderName = "Rizwan Shaikh";

    var subjectAdmin = "New Contact Form Submission";
    var messageAdmin = "New Contact Form Submission\n\nName: " + name + "\nEmail: " + email + "\nPhone: " + phone + "\nMessage: " + message;

    MailApp.sendEmail({
        to: adminEmail,
        subject: subjectAdmin,
        body: messageAdmin,
        name: senderName
    });

    var subjectApplicant = "Application Confirmation";

    // HTML email body for the applicant
    var messageApplicant = '<!DOCTYPE html>' +
'<html>' +
'<head>' +
'    <style>' +
'        @media only screen and (max-width: 600px) {' +
'            .container {' +
'                width: 100% !important;' +
'            }' +
'        }' +
'    </style>' +
'</head>' +
'<body style="background: #fff;">' +
'    <table class="container" align="center" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px;">' +
'        <tr>' +
'            <td align="center">' +
'                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMLCKO03LmI0wtdbf2zps00wOCe2wsAYY4SPrQr-0ZqFBfQ7rtuePfFKJ9vKYrCOAUSWE&usqp=CAU" alt="" style="max-width: 100%;">' +
'            </td>' +
'        </tr>' +
'        <tr>' +
'            <td align="center">' +
'                <hr style="width: 100%; max-width: 600px;">' +
'            </td>' +
'        </tr>' +
'        <tr>' +
'            <td align="center">' +
'                <h3 style="color: #000; margin: 14px; font-size: 30px; font-weight: bold; font-family: Comic Sans MS, cursive, sans-serif; text-align: center;">THANK YOU FOR CONTACT US!</h3>' +
'            </td>' +
'        </tr>' +
'        <tr>' +
'            <td align="center">' +
'                <p style="color: #272727; margin: 10px; font-size: 18px; font-family: Comic Sans MS, cursive, sans-serif; text-align: center;">WE\'LL CONTACT YOU AS SOON AS POSSIBLE</p>' +
'            </td>' +
'        </tr>' +
'        <tr>' +
'            <td align="center">' +
'                <p style="color: #585858; margin: 15px; font-size: 18px; font-family: Comic Sans MS, cursive, sans-serif; text-align: center;">In case you get busy or change your mind, please inform us 24 hours before your appointment. Otherwise, we will have to charge you 25% of the price of the service you booked</p>' +
'            </td>' +
'        </tr>' +
'    </table>' +
'</body>' +
'</html>';


    MailApp.sendEmail({
        to: email,
        subject: subjectApplicant,
        body: "This email does not support HTML content. Please enable HTML in your email client to view the message.",
        htmlBody: messageApplicant,
        name: senderName
    });

    return ContentService.createTextOutput("Data added successfully to Google Sheets, and emails sent to admin and applicant.");
}
