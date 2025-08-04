async function input(req , res) {
    console.log(req.body)
    const prompt = req.body.prompt;
    const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt:prompt.text
        })
    });
    const data = await response.json();
    if(data.err){
        toast.error("Invalid login")
    }
    else{
        res.status(200).json({
            result:data.response
        })
    }
}

module.exports = {
    input
}