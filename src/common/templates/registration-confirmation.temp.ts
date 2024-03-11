const REGISTRATION_CONFIRMATION = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmation</title>
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
            min-height: 12rem
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
        .plans-container {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }
        .plan {
            flex-grow: 1;
            width: calc(30% - 20px);
            margin-bottom: 20px;
            margin-right: 10px; /* Added right margin for space between plans */
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
            transition: transform 0.3s ease-in-out;
        }
        .plan:last-child {
            margin-right: 0; /* Remove right margin for the last plan */
        }
        .plan:hover {
            transform: translateY(-5px);
        }
        .plan h4 {
            font-size: 20px;
            margin-bottom: 10px;
            color: #333333;
        }
        .plan p {
            font-size: 16px;
            color: #666666;
            margin-bottom: 15px;
        }
        .plan ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .plan ul li {
            margin-bottom: 5px;
        }
        .cta-button {
            display: inline-block;
            background-color: #6e8636; /* Updated button color */
            color: #ffffff;
            text-decoration: none;
            padding: 6px 10px; /* Adjusted padding to make the button smaller */
            border-radius: 5px;
            transition: background-color 0.3s ease-in-out;
            margin-top: 1rem
        }
        .cta-button:hover {
            background-color: #44612c; /* Darker shade for hover effect */
        }


        ul {
            list-style-type: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-bg">
                <h2>Registration Confirmation</h2>
                <p>Hello <strong>{{firstName}}</strong></p>
                <p>Welcome to our platform! Your registration has been successful.</p>
            </div>
        </div>
        <div class="plans-container">
            <div class="plan">
                <h4>Basic</h4>
                <p>Price: $10/month</p>
                <p>Features:</p>
                <ul>
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                </ul>
                <a href="#" class="cta-button">Choose Plan</a>
            </div>
            <div class="plan">
                <h4>Standard</h4>
                <p>Price: $20/month</p>
                <p>Features:</p>
                <ul>
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                </ul>
                <a href="#" class="cta-button">Choose Plan</a>
            </div>
            <div class="plan">
                <h4>Premium</h4>
                <p>Price: $30/month</p>
                <p>Features:</p>
                <ul>
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                </ul>
                <a href="#" class="cta-button">Choose Plan</a>
            </div>
        </div>
        <p>We're excited to have you as a member of our community. If you have any questions or need assistance, feel free to
contact us.</p>
        <p>Best regards,<br>
        <strong>Agri Sens Team.</strong>
        </p>
    </div>
</body>
</html>
`;

export default REGISTRATION_CONFIRMATION;
