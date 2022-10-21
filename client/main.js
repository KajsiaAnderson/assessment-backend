const fortuneContainer = document.querySelector('#fortune-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/fortune`

function clearList() {
    fortuneContainer.innerHTML = ``}
 clearList()

const fortuneCallback = ({ data: fortune }) => displayFortune(fortune)
const errCallback = err => console.log(err)


    const complimentBtn = document.getElementById("complimentButton")
    
    const getCompliment = () => {
        axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
    };
    
    complimentBtn.addEventListener('click', getCompliment)
    
    
    const fortuneBtn = document.getElementById("fortuneButton")
    
    const getFortune = () => {
        console.log('button clicked')
        axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            console.log("res.data", res.data)
            const fortuneData = res.data;
            console.log('forutneData', fortuneData)
            let newElement = document.createElement('div')
            newElement.textContent= res.data
            const section = document.querySelector('.fortuneClass')
            section.appendChild(newElement)
        });
    };
    
    fortuneBtn.addEventListener('click', getFortune)
    
    
    
const getAllFortunes = () => axios.get(baseURL).then(fortuneCallback).catch(errCallback)
const createFortune = body => axios.post(baseURL, body).then(fortuneCallback).catch(errCallback)
const deleteFortune = id => axios.delete(`${baseURL}/${id}`).then(fortuneCallback).catch(errCallback)
const updateFortune = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(fortuneCallback).catch(errCallback)



function submitHandler(e) {
    e.preventDefault()

    let name = document.querySelector('#name')
    let price = document.querySelector('#price')

    let bodyObj = {
        name: name.value,
        price: price.value
    }

    createFortune(bodyObj)

    name.value = ''
    price.value = ''
}

function createFortuneCard(fortune) {
    const fortuneCard = document.createElement('div')
    fortuneCard.classList.add('fortune-card')

    fortuneCard.innerHTML = `
    <p class="name">${fortune.name}</p>
    <div class="btns-container">
        <button onclick="updateFortune(${fortune.id}, 'minus')">-</button>
        <p class="fortune-price">$${fortune.price}</p>
        <button onclick="updateFortune(${fortune.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteFortune(${fortune.id})">delete</button>
    `


    fortuneContainer.appendChild(fortuneCard)
}

function displayFortune(arr) {
    fortuneContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createFortuneCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllFortunes()