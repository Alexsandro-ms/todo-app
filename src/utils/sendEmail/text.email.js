function generateEmailBody(userName) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
      <title>Welcome to the TodoList App</title>
      <style>
      </style>
      </head>
      <body>
      <div class="container">
      <img src="https://i.ibb.co/DtVPfjq/title.png" alt="title" border="0" style={{width: 100%}} />
      <h2>Welcome to the TodoList App</h2>
      <p>Hi ${userName},</p>
      <p>Welcome to TodoList, the application that will help you organize your tasks and appointments in a simple and efficient way.</p>
      <p>Get started right now and improve your productivity!</p>
      <p>TodoList Team</p>
      <p>
      <a href="https://www.seusite.com/app" class="btn">Go to</a>
      </p>
      </div>
      </body>
      </html>
    `;
  }
  
  module.exports = generateEmailBody;