const prompts = require('prompts'); // Required to prompt for user input
const axios = require('axios');


/**
 * Fetching quotes & initialisation
 */

 const fetchQuotes = () => {
    const url = "https://type.fit/api/quotes";
    return axios.get(url);
}

var quoteList
fetchQuotes().then(
    function(response) {
        quoteList = response.data;
        askUser()
    }
)

// Return random quote
const randomQuote = () => {
    const randomQuoteNo = Math.floor(Math.random() * quoteList.length)
    const quote = quoteList[randomQuoteNo].text
    return quote
}


/**
 * User CLI prompt
 */

const askUser = async () => {
    // Prompt user for input
    const response = await prompts({
        type: 'text',
        name: 'prompt',
        message: "Hit 'Enter' for a new message, or 'e' to exit."
      });
    
    // Handle user input
    switch (response.prompt) {
        case 'e': // Exit app
            break;
        case '': // Display random quote
            const quote = randomQuote()
            console.log('\n' + '*'.repeat(quote.length) + '\n')
            console.log('\033[0;33m' + quote + '\033[0m');
            console.log('\n' + '*'.repeat(quote.length) + '\n')
            askUser()
            break;
        default: // If no input, ask again
            askUser()
      }
}