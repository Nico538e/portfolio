// Send message to Vercel API (som proxy til Dify)
async function sendToDify(message) {
  try {
    const response = await fetch('https://portfolio-jet-rho-19.vercel.app/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.answer || 'Jeg kunne ikke få et svar. Prøv igen senere.';
  } catch (error) {
    console.error('Chatbot API error:', error);
    return 'Der skete en fejl ved forbindelsen til AI\'en. Prøv igen senere.';
  }
}

// Chatbot initialization
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("chatbot-toggle");
  const chatWindow = document.getElementById("chatbot-window");
  const messagesContainer = document.getElementById("chatbot-messages");
  const inputField = document.getElementById("chatbot-input");
  const sendBtn = document.getElementById("chatbot-send");

  // Toggle window
  toggleBtn.addEventListener("click", function () {
    chatWindow.classList.toggle("hidden");
    if (!chatWindow.classList.contains("hidden")) {
      inputField.focus();
    }
  });

  // Handle message sending
  function sendMessage() {
    const message = inputField.value.trim();
    if (!message) return;

    // Add user message
    const userDiv = document.createElement("div");
    userDiv.className = "chatbot-message-user";
    userDiv.innerHTML = `<div class="chatbot-bubble-user">${escapeHtml(message)}</div>`;
    messagesContainer.appendChild(userDiv);

    // Clear input
    inputField.value = "";
    inputField.disabled = true;

    // Show loading indicator
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "chatbot-message-bot";
    loadingDiv.id = "loading-indicator";
    loadingDiv.innerHTML = `<div class="chatbot-bubble-bot"><span class="typing-dots">Tænker</span></div>`;
    messagesContainer.appendChild(loadingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Send to Dify API
    sendToDify(message).then(answer => {
      // Remove loading indicator
      const loadingEl = document.getElementById("loading-indicator");
      if (loadingEl) loadingEl.remove();

      // Add bot response
      const botDiv = document.createElement("div");
      botDiv.className = "chatbot-message-bot";
      const answerText = formatAnswer(answer);
      botDiv.innerHTML = `<div class="chatbot-bubble-bot">${answerText}</div>`;
      messagesContainer.appendChild(botDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Re-enable input
      inputField.disabled = false;
      inputField.focus();
    }).catch(error => {
      console.error('Error:', error);
      // Remove loading indicator
      const loadingEl = document.getElementById("loading-indicator");
      if (loadingEl) loadingEl.remove();

      // Add error message
      const errorDiv = document.createElement("div");
      errorDiv.className = "chatbot-message-bot";
      errorDiv.innerHTML = `<div class="chatbot-bubble-bot">Der skete en fejl. Prøv igen.</div>`;
      messagesContainer.appendChild(errorDiv);

      // Re-enable input
      inputField.disabled = false;
      inputField.focus();
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Send button
  sendBtn.addEventListener("click", sendMessage);

  // Enter key
  inputField.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Escape key to close
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !chatWindow.classList.contains("hidden")) {
      chatWindow.classList.add("hidden");
    }
  });
});

// Utility: Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Utility: Format answer text (line breaks)
function formatAnswer(text) {
  return escapeHtml(text).replace(/\n/g, "<br>");
}
