function formatMessage(username, text) {
    return {
        username,
        text,
        timestamp: Date.now();
    };
};

function filterMessagesByUser(message, username) {
    return messages.filter((message) => message.username === username);
};

module.exports = {
    formatMessage,
    filterMessagesByUser
};