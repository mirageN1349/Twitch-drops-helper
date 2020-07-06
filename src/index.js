import './scss/index.scss'

const form = document.forms['select']
const inputLink = document.querySelector('.input-link')
const inputTime = document.querySelector('.minute')
const btnStop = document.querySelector('.button-stop')
let arrLink = []

form.addEventListener('submit', e => {
  e.preventDefault()
  if (!inputLink.value || !inputTime.value) {
    confirm(`введите ссылки или время!`)
    return
  }
  btnStop.classList.add('active')
  arrLink = inputLink.value.split(',')
  const timeToRestart = inputTime.value

  drops(timeToRestart, arrLink)
})

btnStop.addEventListener('click', () => {
  arrLink = []
  btnStop.classList.remove('active')
})

let drops = timeToRestart => {
  let openedArr = []
  function openWindow(link) {
    const data = window.open(link)
    openedArr.push(data)
  }

  function closeWindow() {
    openedArr.forEach(openedWindow => {
      openedWindow.close()
    })
  }

  if (!openedArr.length) {
    arrLink.forEach((link, index) => {
      setTimeout(() => {
        openWindow(link)
      }, 3000 * index)
    })
  }

  setInterval(() => {
    arrLink.forEach((link, index) => {
      setTimeout(() => {
        openWindow(link)
      }, 3000 * index)
    })
    setTimeout(() => {
      arrLink.forEach(() => {
        closeWindow()
      })
    }, timeToRestart * 60000)
  }, timeToRestart * 60000 + 3000)
}
