document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chatBox');
  const chatForm = document.getElementById('chatForm');
  const userInput = document.getElementById('userInput');
  const sendButton = document.getElementById('sendButton');
  
  // Chat state
  let currentState = 'main';
  let userInfo = {};
  
  // Function to add message to the chat UI
  function addMessageToChat(content, isUser) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message');
      messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
      
      const messageContent = document.createElement('p');
      messageContent.classList.add('pre-wrap');
      messageContent.textContent = content;
      
      messageDiv.appendChild(messageContent);
      chatBox.appendChild(messageDiv);
      
      // Scroll to bottom
      chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  // Function to add options list
  function addOptionsToChat(options) {
      const optionsDiv = document.createElement('div');
      optionsDiv.classList.add('message', 'bot-message');
      
      const optionsList = document.createElement('ul');
      optionsList.classList.add('options-list');
      
      options.forEach((option, index) => {
          const optionItem = document.createElement('li');
          optionItem.innerHTML = `<span class="option-number">${index + 1}</span> ${option.text}`;
          optionItem.addEventListener('click', () => {
              // Add user's choice to chat
              addMessageToChat(`${index + 1}. ${option.text}`, true);
              
              // Process the selected option
              processUserInput(`${index + 1}`);
          });
          optionsList.appendChild(optionItem);
      });
      
      optionsDiv.appendChild(optionsList);
      chatBox.appendChild(optionsDiv);
      
      // Scroll to bottom
      chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  // Function to process user input based on current state
  function processUserInput(input) {
      switch(currentState) {
          case 'main':
              handleMainMenu(input);
              break;
          case 'package':
              handlePackageCheck(input);
              break;
          case 'signup':
              handleSignup(input);
              break;
          case 'payment':
              handlePaymentAssistance(input);
              break;
          case 'customerID':
              handleCustomerIDInput(input);
              break;
          case 'signupName':
              handleSignupNameInput(input);
              break;
          case 'signupEmail':
              handleSignupEmailInput(input);
              break;
          case 'signupPhone':
              handleSignupPhoneInput(input);
              break;
          case 'signupAddress':
              handleSignupAddressInput(input);
              break;
          case 'signupPackage':
              handleSignupPackageInput(input);
              break;
          case 'paymentOption':
              handlePaymentOptionInput(input);
              break;
          case 'paymentAmount':
              handlePaymentAmountInput(input);
              break;
          case 'technical':
              handleTechnicalSupport(input);
              break;
          case 'feedback':
              handleFeedback(input);
              break;
          default:
              showMainMenu();
      }
  }
  
  // Main menu handler
  function handleMainMenu(input) {
      switch(input) {
          case '1':
              // Check Package Status
              currentState = 'package';
              addMessageToChat("You've selected Package Check.", false);
              setTimeout(() => {
                  addMessageToChat("Please enter your Customer ID:", false);
                  currentState = 'customerID';
              }, 500);
              break;
          case '2':
              // New WiFi Registration
              currentState = 'signup';
              addMessageToChat("You've selected WiFi Package Registration.", false);
              setTimeout(() => {
                  addMessageToChat("Let's get you set up with a new WiFi package. Please enter your full name:", false);
                  currentState = 'signupName';
              }, 500);
              break;
          case '3':
              // Payment Options
              currentState = 'payment';
              addMessageToChat("You've selected Payment Options.", false);
              setTimeout(() => {
                  addOptionsToChat([
                      { text: "Make a payment" },
                      { text: "Check payment status" },
                      { text: "View payment methods" },
                      { text: "Back to main menu" }
                  ]);
                  currentState = 'paymentOption';
              }, 500);
              break;
          case '4':
              // Technical Support
              currentState = 'technical';
              addMessageToChat("You've selected Technical Support.", false);
              setTimeout(() => {
                  addOptionsToChat([
                      { text: "WiFi not working" },
                      { text: "Slow connection" },
                      { text: "Router issues" },
                      { text: "Account login problems" },
                      { text: "Back to main menu" }
                  ]);
              }, 500);
              break;
          case '5':
              // Feedback
              currentState = 'feedback';
              addMessageToChat("We value your feedback! Please share your thoughts or suggestions about our WiFi services:", false);
              break;
          default:
              addMessageToChat("I didn't understand that option. Please select a valid option.", false);
              setTimeout(showMainMenu, 500);
      }
  }
  
  // Package check handlers
  function handleCustomerIDInput(input) {
      userInfo.customerId = input;
      
      // Mock package check response
      addMessageToChat(`Checking WiFi package status for Customer ID: ${userInfo.customerId}...`, false);
      
      setTimeout(() => {
          // This would normally be fetched from a database
          const packageStatus = Math.random() > 0.3 ? "Active" : "Inactive";
          const packageDetails = {
              name: "Fibre Lite 50Mbps",
              price: "R499 per month",
              dataLimit: "Unlimited",
              speed: "50Mbps download / 25Mbps upload",
              contract: "Month-to-month",
              nextBillingDate: "15 May 2025"
          };
          
          addMessageToChat(`Package Status: ${packageStatus}`, false);
          if (packageStatus === "Active") {
              addMessageToChat(`Package Details:
- Package Name: ${packageDetails.name}
- Monthly Cost: ${packageDetails.price}
- Data: ${packageDetails.dataLimit}
- Speed: ${packageDetails.speed}
- Contract: ${packageDetails.contract}
- Next Billing Date: ${packageDetails.nextBillingDate}`, false);
          } else {
              addMessageToChat("Your WiFi package appears to be inactive. Would you like to reactivate it or sign up for a new package?", false);
              addOptionsToChat([
                  { text: "Reactivate existing package" },
                  { text: "Sign up for a new package" },
                  { text: "Back to main menu" }
              ]);
              return;
          }
          
          setTimeout(() => {
              addMessageToChat("Is there anything else you'd like to check?", false);
              showMainMenu();
          }, 1000);
      }, 1500);
  }
  
  // Registration handlers
  function handleSignupNameInput(input) {
      userInfo.name = input;
      addMessageToChat(`Thank you, ${userInfo.name}. Please enter your email address:`, false);
      currentState = 'signupEmail';
  }
  
  function handleSignupEmailInput(input) {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(input)) {
          userInfo.email = input;
          addMessageToChat("Great! Now please enter your phone number:", false);
          currentState = 'signupPhone';
      } else {
          addMessageToChat("That doesn't appear to be a valid email address. Please try again:", false);
      }
  }
  
  function handleSignupPhoneInput(input) {
      // Basic phone validation (just checking if it has numbers)
      const phoneRegex = /\d/;
      if (phoneRegex.test(input)) {
          userInfo.phone = input;
          addMessageToChat("Thank you. Please enter your installation address:", false);
          currentState = 'signupAddress';
      } else {
          addMessageToChat("That doesn't appear to be a valid phone number. Please try again:", false);
      }
  }
  
  function handleSignupAddressInput(input) {
      userInfo.address = input;
      addMessageToChat("Thank you. Please select a WiFi package:", false);
      addOptionsToChat([
          { text: "Basic WiFi (20Mbps) - R299/month" },
          { text: "Standard WiFi (50Mbps) - R499/month" },
          { text: "Premium WiFi (100Mbps) - R799/month" },
          { text: "Ultra WiFi (200Mbps) - R999/month" },
          { text: "Back to main menu" }
      ]);
      currentState = 'signupPackage';
  }
  
  function handleSignupPackageInput(input) {
      if (input === '5') {
          showMainMenu();
          return;
      }
      
      const packages = [
          "Basic WiFi (20Mbps) - R299/month",
          "Standard WiFi (50Mbps) - R499/month",
          "Premium WiFi (100Mbps) - R799/month",
          "Ultra WiFi (200Mbps) - R999/month"
      ];
      
      if (input >= 1 && input <= 4) {
          userInfo.package = packages[input - 1];
          
          // Mock registration confirmation
          addMessageToChat("Processing your WiFi package registration...", false);
          
          setTimeout(() => {
              const installationDate = new Date();
              installationDate.setDate(installationDate.getDate() + 5);
              const formattedDate = installationDate.toLocaleDateString('en-ZA', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
              });
              
              addMessageToChat(`Thank you for registering with us, ${userInfo.name}!`, false);
              addMessageToChat(`Registration Summary:
- Name: ${userInfo.name}
- Email: ${userInfo.email}
- Phone: ${userInfo.phone}
- Address: ${userInfo.address}
- Package: ${userInfo.package}`, false);
              
              addMessageToChat(`Your installation is scheduled for ${formattedDate}.`, false);
              addMessageToChat("A technician will contact you 24 hours before arrival to confirm.", false);
              
              setTimeout(() => {
                  addMessageToChat("You will receive a confirmation email shortly with your account details.", false);
                  addMessageToChat("Is there anything else we can help you with today?", false);
                  showMainMenu();
              }, 1000);
          }, 1500);
      } else {
          addMessageToChat("Please select a valid option (1-5).", false);
      }
  }
  
  // Payment assistance handlers
  function handlePaymentOptionInput(input) {
      switch(input) {
          case '1':
              addMessageToChat("You've selected to make a payment.", false);
              addMessageToChat("Please enter the payment amount in Rands:", false);
              currentState = 'paymentAmount';
              break;
          case '2':
              addMessageToChat("Checking payment status...", false);
              setTimeout(() => {
                  addMessageToChat("Your last payment of R499.00 was received on 10 April 2025.", false);
                  addMessageToChat("Your next payment of R499.00 is due on 15 May 2025.", false);
                  setTimeout(showMainMenu, 1000);
              }, 1500);
              break;
          case '3':
              addMessageToChat("Here are the available payment methods:", false);
              setTimeout(() => {
                  addMessageToChat(`1. Debit Order
2. EFT (Electronic Funds Transfer)
3. Credit Card
4. Instant EFT via PayFast
5. SnapScan
6. Cash Payment at Pick n Pay, Checkers, or Shoprite`, false);
                  addMessageToChat("Our banking details for EFT payments:\nAccount Name: WiFi Services\nBank: FNB\nAccount Number: 62123456789\nBranch Code: 250655\nReference: Your Customer ID", false);
                  setTimeout(showMainMenu, 1000);
              }, 1000);
              break;
          case '4':
              showMainMenu();
              break;
          default:
              addMessageToChat("Please select a valid option (1-4).", false);
              addOptionsToChat([
                  { text: "Make a payment" },
                  { text: "Check payment status" },
                  { text: "View payment methods" },
                  { text: "Back to main menu" }
              ]);
      }
  }
  
  function handlePaymentAmountInput(input) {
      // Check if input is a number
      const amount = parseFloat(input.replace(/[^0-9.-]+/g, ""));
      
      if (!isNaN(amount) && amount > 0) {
          addMessageToChat(`Processing payment of R${amount.toFixed(2)}...`, false);
          
          setTimeout(() => {
              // Mock payment confirmation
              const confirmationNumber = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
              addMessageToChat(`Payment successful! Your confirmation number is: ${confirmationNumber}`, false);
              addMessageToChat("A receipt has been sent to your email address.", false);
              
              setTimeout(() => {
                  addMessageToChat("Is there anything else we can help you with today?", false);
                  showMainMenu();
              }, 1000);
          }, 1500);
      } else {
          addMessageToChat("Please enter a valid payment amount (numbers only):", false);
      }
  }
  
  // Technical support handler
  function handleTechnicalSupport(input) {
      const issues = [
          "WiFi not working",
          "Slow connection",
          "Router issues",
          "Account login problems"
      ];
      
      const solutions = [
          `Here are some steps to fix your WiFi connection:
1. Restart your router by unplugging it, waiting 30 seconds, and plugging it back in
2. Check that all cables are securely connected
3. Ensure the router's lights are on (especially the internet light)
4. Try connecting with a different device to see if the issue persists
5. Check if there's a service outage in your area on our website or app

If none of these solutions work, please call our technical support line at 086 100 1234.`,

          `To improve your WiFi speed:
1. Move your router to a central location in your home
2. Reduce the number of devices connected to your network
3. Check for interference from other electronics
4. Try using the 5GHz network instead of 2.4GHz if your router supports it
5. Run a speed test at www.speedtest.net and send us the results

We can perform a remote diagnostic if these steps don't help. Would you like us to do that?`,

          `For router issues:
1. Check if the power light is on
2. Perform a factory reset by pressing the small reset button for 10 seconds
3. Make sure the router is not overheating
4. Check if all necessary lights are on (power, internet, WiFi)

If your router is provided by us and appears to be faulty, we can arrange for a replacement. Would you like us to check if you're eligible for a replacement?`,

          `To fix account login problems:
1. Try resetting your password using the "Forgot Password" link
2. Clear your browser cache and cookies
3. Try using a different browser
4. Make sure you're using the correct username (usually your email address)

If you're still having trouble, I can help reset your password now or connect you with an account specialist. What would you prefer?`
      ];
      
      if (input === '5') {
          showMainMenu();
          return;
      }
      
      if (input >= 1 && input <= 4) {
          const selectedIssue = parseInt(input) - 1;
          addMessageToChat(`You're experiencing issues with: ${issues[selectedIssue]}`, false);
          
          setTimeout(() => {
              addMessageToChat(solutions[selectedIssue], false);
              
              setTimeout(() => {
                  addMessageToChat("Did this solution help resolve your issue?", false);
                  addOptionsToChat([
                      { text: "Yes, it's resolved" },
                      { text: "No, I still need help" },
                      { text: "Back to main menu" }
                  ]);
                  
                  // Set up one-time event handler for this specific response
                  const handleResolutionResponse = (e) => {
                      e.preventDefault();
                      const response = userInput.value.trim();
                      
                      if (response === '1' || response.toLowerCase().includes('yes')) {
                          addMessageToChat(response, true);
                          addMessageToChat("Great! Glad we could help. Is there anything else you need assistance with?", false);
                          showMainMenu();
                      } else if (response === '2' || response.toLowerCase().includes('no')) {
                          addMessageToChat(response, true);
                          addMessageToChat("I understand this can be frustrating. Let me connect you with a technical support specialist. Please call 086 100 1234 and provide your customer ID. Our specialists are available 24/7.", false);
                          showMainMenu();
                      } else if (response === '3') {
                          addMessageToChat(response, true);
                          showMainMenu();
                      }
                      
                      // Remove this event handler after processing
                      chatForm.removeEventListener('submit', handleResolutionResponse);
                      userInput.value = '';
                  };
                  
                  // Add temporary event handler
                  chatForm.addEventListener('submit', handleResolutionResponse);
              }, 1000);
          }, 1000);
      } else {
          addMessageToChat("Please select a valid option (1-5).", false);
          addOptionsToChat([
              { text: "WiFi not working" },
              { text: "Slow connection" },
              { text: "Router issues" },
              { text: "Account login problems" },
              { text: "Back to main menu" }
          ]);
      }
  }
  
  // Feedback handler
  function handleFeedback(input) {
      addMessageToChat("Thank you for your feedback about our WiFi services! We'll use your comments to improve our offerings.", false);
      setTimeout(showMainMenu, 1000);
  }
  
  // Show main menu options
  function showMainMenu() {
      currentState = 'main';
      addOptionsToChat([
          { text: "Check WiFi Package Status" },
          { text: "Sign Up for WiFi" },
          { text: "Payment Options" },
          { text: "Technical Support" },
          { text: "Provide Feedback" }
      ]);
  }
  
  // Handle form submission
  function handleSubmit(e) {
      e.preventDefault();
      const userMessage = userInput.value.trim();
      
      if (!userMessage) return;
      
      addMessageToChat(userMessage, true);
      userInput.value = '';
      processUserInput(userMessage);
  }
  
  // Event listeners
  chatForm.addEventListener('submit', handleSubmit);
  
  // Start the chat with welcome message and main menu
  addMessageToChat("Welcome to our WiFi Services Chat! How can we assist you today?", false);
  showMainMenu();
});