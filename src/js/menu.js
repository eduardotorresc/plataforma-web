const menuFunctions = () => {
  let toggle = document.getElementById('toggle-menu'),
    nav = document.getElementById('nav')

  toggle.addEventListener('click', () => {
    nav.classList.toggle('show'),
      body.classList.toggle('show')
  })
}

menuFunctions()
