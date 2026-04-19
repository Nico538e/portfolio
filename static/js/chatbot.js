// Simple string similarity function (Levenshtein distance)
function levenshteinDistance(str1, str2) {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(0));

  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }

  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }

  return track[str2.length][str1.length];
}

// Calculate similarity score (0-1)
function calculateSimilarity(str1, str2) {
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
  const maxLength = Math.max(str1.length, str2.length);
  return 1 - distance / maxLength;
}

// Simple keyword matching
function findRelevantContent(query, contentIndex) {
  const queryTerms = query.toLowerCase().split(/\s+/);
  const results = [];

  for (const doc of contentIndex) {
    let score = 0;
    let matches = 0;

    // Check title
    if (doc.title) {
      queryTerms.forEach((term) => {
        if (doc.title.toLowerCase().includes(term)) {
          score += 5;
          matches++;
        }
      });
    }

    // Check content
    if (doc.content) {
      queryTerms.forEach((term) => {
        const count = (doc.content.toLowerCase().match(new RegExp(term, "g")) || []).length;
        score += count;
        if (count > 0) matches++;
      });
    }

    // Check summary
    if (doc.summary) {
      queryTerms.forEach((term) => {
        if (doc.summary.toLowerCase().includes(term)) {
          score += 3;
          matches++;
        }
      });
    }

    // Check section
    if (doc.section) {
      queryTerms.forEach((term) => {
        if (doc.section.toLowerCase().includes(term)) {
          score += 2;
        }
      });
    }

    if (score > 0) {
      results.push({ ...doc, score, matches });
    }
  }

  // Sort by score
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 3); // Return top 3 results
}

// Generate answer from search results
function generateAnswer(query, searchResults) {
  if (searchResults.length === 0) {
    return "I couldn't find relevant information about that on this site. Try asking about projects, posts, skills, or background.";
  }

  const topResult = searchResults[0];
  let answer = "";

  // Build contextual answer
  if (topResult.title) {
    answer += `Based on "${topResult.title}": `;
  }

  if (topResult.summary) {
    answer += topResult.summary;
  } else if (topResult.content) {
    const excerpt = topResult.content.substring(0, 200).trim();
    answer += excerpt + (topResult.content.length > 200 ? "..." : "");
  }

  if (searchResults.length > 1) {
    answer += "\n\nOther relevant pages: ";
    answer += searchResults
      .slice(1)
      .map((r) => r.title)
      .join(", ");
  }

  return answer;
}

// Chatbot initialization
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("chatbot-toggle");
  const chatWindow = document.getElementById("chatbot-window");
  const messagesContainer = document.getElementById("chatbot-messages");
  const inputField = document.getElementById("chatbot-input");
  const sendBtn = document.getElementById("chatbot-send");

  // Store for site content
  let contentIndex = [];

  // Load content index from embedded JSON
  function loadContentIndex() {
    try {
      const indexScript = document.getElementById("chatbot-content-index");
      if (indexScript && indexScript.textContent) {
        contentIndex = JSON.parse(indexScript.textContent);
      }
    } catch (error) {
      console.error("Failed to parse content index:", error);
    }
  }

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

    // Search and generate response
    const searchResults = findRelevantContent(message, contentIndex);
    const answer = generateAnswer(message, searchResults);

    // Add bot response with small delay
    setTimeout(() => {
      const botDiv = document.createElement("div");
      botDiv.className = "chatbot-message-bot";
      const answerText = formatAnswer(answer);
      botDiv.innerHTML = `<div class="chatbot-bubble-bot">${answerText}</div>`;
      messagesContainer.appendChild(botDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 300);

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

  // Load content on page load
  loadContentIndex();
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
