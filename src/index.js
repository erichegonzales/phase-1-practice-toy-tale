const addToyBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
let addToy = false;
const toyCollection = document.getElementById('toy-collection')

// GET request for toy data
const fetchToys = async () => {
  let response = await fetch('http://localhost:3000/toys')
  let toyObjects = await response.json()
  return toyObjects
}

// catch fetch error
fetchToys().catch(error => {
  console.log(error.message)
}) 

// POST request for new toy
const postToy = async (toyData) => {
  let response = await fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'name': toyData.name.value,
      'image': toyData.image.value,
      'likes': 0
    })
  })
  let toyObject = await response.json()
  newToy = renderToys(toyObject)
  toyCollection.append(newToy)
}

// add new like
const addLike = async (event) => {
  event.preventDefault()
  console.log(event.target``)
  console.log(event.target.previousElementSibling)
  let add = parseInt(event.target.previousElementSibling.innerText) + 1

  let response = await fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'likes': add
    })
  })
  let toyObject = response.json()
  event.target.previousElementSibling.innerText = `${add} likes`
}

// makes the elements of the toy card
const renderToys = async (toy) => {
  const div = document.createElement('div')
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const btn = document.createElement('button')
  
  div.setAttribute('class', 'card')
  h2.innerText = toy.name
  img.src = toy.image
  img.setAttribute('class', 'toy-avatar')
  p.innerText = `${toy.likes} Likes`
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = 'Like ❤️'
  
  div.append(h2, img, p, btn)
  toyCollection.append(div)  

  btn.addEventListener('click', (event) => {
    addLike(event)
  })
}

// opens up the create new toy form
addToyBtn.addEventListener("click", () => {
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
    toyFormContainer.addEventListener('submit', (event) => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyFormContainer.style.display = "none";
  }
})

// show all toys cards
const getToys = async () => {
  let toyObjects = await fetchToys()
  toyObjects.forEach((toy) => {
    renderToys(toy)
  })
}
getToys()