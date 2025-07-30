async function input(req , res) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    let counter = -1;

    const data = [
        "Hey... !!",
        "Thanks for sending a message",
        "I am still in development",
        "But someday I will work",
        "Because I am a believer bot"
    ]

    const intervalId = setInterval(() => {
        counter++;
        const chunk = data[counter];
        res.write(chunk);

        if (counter === 4) {
        clearInterval(intervalId);
        res.end();
        }
    }, 3000);

    // if client closes the connection before finishing
    req.on('close', () => {
        clearInterval(intervalId);
        console.log('🔌 Client disconnected');
    });
}

module.exports = {
    input
}