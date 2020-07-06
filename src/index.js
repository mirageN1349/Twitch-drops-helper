import './scss/index.scss'

const form = document.forms['select']
const inputLink = document.querySelector('.input-link')
const inputTime = document.querySelector('.minute')
const btnStop = document.querySelector('.button-stop')
let arrLink = []
let validInput = /^[0-9]+$/

form.addEventListener('submit', e => {
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

  if (!flag) return

  const timeToRestart = inputTime.value
  btnStop.classList.add('active')

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
