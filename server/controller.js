const fortune = require('./db.json')

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
        
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = ['Practice makes perfect.', 'Say hello to others. You will have a happier day.', 'Take the high road.', 'There is no wisdom greater than kindness.', 'You love chinese food.']

        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
      
        res.status(200).send(randomFortune);
    },

    getAllFortunes: (req, res) => {
        res.status(200).send(fortune)
    },

    createFortune: (req, res) => {
        const {name, price} = req.body

        let greatestId = -1
        for(let i = 0; i<fortune.length; i++){
            if(fortune[i].id > greatestId) {
                greatestId = fortune[i].id
            }
        }
        let nextId = greatestId + 1

        let newFortune = {
            id: nextId,
            name,
            price: +price
        }

        fortune.push(newFortune)
        res.status(200).send(fortune)
    },

    deleteFortune: (req, res) => {
        const deleteId = req.params.id
        let index = fortune.findIndex(el => el.id === +deleteId)
        fortune.splice(index, 1)
        res.status(200).send(fortune)
    },

    updateFortune: (req, res) => {
        let id = req.params.id
        let type = req.body.type
        let index = fortune.findIndex(el => el.id === +id)

        if (type === 'plus') {
            fortune[index].price ++
            res.status(200).send(fortune)
        }else if (type === 'minus') {
            fortune[index].price --
            res.status(200).send(fortune)
        }else{
            res.sendStatus(400)
        }
        }
}