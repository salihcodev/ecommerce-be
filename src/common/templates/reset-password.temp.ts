const RESET_PASSWORD = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
    <style>
        body {
            font-family: 'monospace', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            position: relative;
            border-radius: 8px 8px 0 0;
            overflow: hidden;
            main-height: 12rem;
        }
        .header-bg {
            background: #ddd;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            padding: 30px 0; /* Adjusted padding to make the header shorter */
            text-align: center;
            color: #222;
            position: relative;
            z-index: 0;
        }
        .header h2 {
            font-size: 32px;
            margin-bottom: 10px;
        }
        .header p {
            font-size: 18px;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        .logo {
            max-height: 60px; /* Adjust the max-height of the logo */
            width: auto; /* Ensure the width adjusts automatically to maintain aspect ratio */
        }
        .message-section {
            background-color: #f0f0f0;
            border-radius: 8px;
            padding: 20px;
        }
        .message-section h3 {
            font-size: 24px;
            margin-bottom: 10px;
            color: #333333;
        }
        .message-section p {
            font-size: 16px;
            margin-bottom: 10px;
            color: #666666;
            line-height: 1.6;
        }
        .cta-button {
            display: inline-block;
            background-color: #6e8636; /* Button color */
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            transition: background-color 0.3s ease-in-out;
        }
        .cta-button:hover {
            background-color: #44612c; /* Darker shade for hover effect */
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-bg">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHXPluq6GtTRPDIHRv5kJPy86uFjp5sO7hg&usqp=CAU" alt="Logo" class="logo"> <!-- Add your logo image here -->
                <h2>Forgot Password</h2>
            </div>
        </div>
        <div class="message-section">
            <h3>Password Reset Instructions:</h3>
            <p>Hi {{name}}, To reset your password, please click on the following button:</p>
            <a href="https://agri-asst.vercel.app/reset-password?token={{token}}" target="_blank" class="cta-button">Reset Password</a>
            <p>If you didn't request this, you can safely ignore this email. Your password will not be changed unless you click the button above to reset it.</p>
        </div>
    </div>
</body>
</html>

`;

export default RESET_PASSWORD;
