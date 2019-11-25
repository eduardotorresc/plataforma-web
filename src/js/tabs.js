const tabsFunctions = () => {
  let tabs = Array.prototype.slice.apply(document.querySelectorAll('.tabs__item'))
  let panels = Array.prototype.slice.apply(document.querySelectorAll('.panels__item'))
  if (document.getElementById('tabs')) {
    document.getElementById('tabs').addEventListener('click', e => {
      if (e.target.tagName == 'LI') {
        let i = tabs.indexOf(e.target)
        tabs.map(tab => tab.classList.remove('active'))
        tabs[i].classList.add('active')
        panels.map(panels => panels.classList.remove('active'))
        panels[i].classList.add('active')
      }
    })
  }
}

tabsFunctions()
