const CONTACT_US = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us</title>
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
            min-height: 12rem;
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
        .contact-section {
            background-color: #f0f0f0;
            border-radius: 8px;
            padding: 20px;
        }
        .contact-section h3 {
            font-size: 24px;
            margin-bottom: 10px;
            color: #333333;
        }
        .contact-section p {
            font-size: 16px;
            margin-bottom: 10px;
            color: #666666;
            line-height: 1.6;
        }
        small {
            font-size: 12px;
            color: #999999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-bg">
                <h2>New contact us message</h2>
                <small><strong>Date:</strong> March 5, 2024</small><br>
                <small><strong>Time:</strong> 10:30 AM</small><br>
                <small><strong>Browser:</strong> Chrome</small><br>
                <small><strong>Operating System:</strong> Windows 10</small>
            </div>
        </div>
        <div class="contact-section" style="line-break: anywhere;">
            <h3>Message:</h3>
            <p>{{message}}</p>
             <p><strong>Name:</strong> {{name}}</p>
                <p><strong>Email:</strong> {{email}}</p>
        </div>
    </div>
</body>
</html>
`;

export default CONTACT_US;
