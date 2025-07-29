async function login(req , res) {
    console.log(req.body)
    res.status(200).json({
        msg:"Successful"
    })
}

module.exports = {
    login
}