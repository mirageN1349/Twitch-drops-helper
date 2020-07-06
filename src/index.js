import './scss/index.scss'

const form = document.forms['select']
const inputLink = document.querySelector('.input-link')
const inputTime = document.querySelector('.minute')
const btnStop = document.querySelector('.button-stop')
const counterMinute = document.querySelector('.counter-minute span')
const counterRedirect = document.querySelector('.counter-redirect span')

let arrLink = []
let openedArr = []
let countOpenWindow = 0
let countMinutes = 0
let timeToRestart = 0
let stopOpen = true
let validInput = /^[0-9]+$/

//Events
form.addEventListener('submit', checkForDrops)
btnStop.addEventListener('click', btnStopClick)

//events function
function checkForDrops(e) {
  e.preventDefault()
  if (!inputLink.value || !inputTime.value) {
    confirm(`введите ссылки или время!`)
    return
  }

  if (!validInput.test(inputTime.value)) {
    alert(`${inputTime.value} не является временем`)
    return
  }

  arrLink = inputLink.value.split(',')

  let flag = true
  arrLink.forEach(link => {
    let check = /((http|https):\/\/(www\.)?[a-zа-я0-9-]+\.[a-zа-я0-9-]{2,6})/i.exec(
      link
    )
    if (!check) {
      alert(`${link} не является ссылкой!`)
      flag = false
    }
  })

  if (!flag) {
    arrLink = []
    return
  }

  timeToRestart = inputTime.value
  btnStop.classList.add('active')
  stopOpen = true
  dropsStart(timeToRestart, arrLink)
}

function btnStopClick() {
  stopOpen = false
  closeWindow()
  arrLink = []
  btnStop.classList.remove('active')
}

// logic function
function closeWindow() {
  openedArr.forEach(openedWindow => {
    openedWindow.close()
  })
}

function openWindow() {
  arrLink.forEach((link, index) => {
    setTimeout(() => {
      if (!stopOpen) return
      countOpenWindow++
      openedArr.push(window.open(link))

      counterRedirectPlus(countOpenWindow)
      countMinutes += parseInt(timeToRestart)
      countMinutesPlus(countMinutes)
    }, 3000 * index)
  })
}

function counterRedirectPlus(index) {
  counterRedirect.textContent = index
}

function countMinutesPlus(index) {
  counterMinute.textContent = index / arrLink.length
}

function dropsStart(timeToRestart) {
  if (!openedArr.length) openWindow()

  setInterval(() => {
    countOpenWindow === 3 ? closeWindow() : false
    openWindow()
    setTimeout(() => {
      closeWindow()
    }, timeToRestart * 60000)
  }, timeToRestart * 60000 + 5000)
}
