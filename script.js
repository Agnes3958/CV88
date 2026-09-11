// script.js — 简单可扩展的交互逻辑（包含 modal 与打印功能）
document.addEventListener('DOMContentLoaded',()=>{
  // fade-in with IntersectionObserver
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('visible')
    })
  },{threshold:0.12})
  document.querySelectorAll('.fade-in').forEach(el=>io.observe(el))

  // Timeline expand on click (toggle)
  document.querySelectorAll('.timeline-item').forEach(item=>{
    item.addEventListener('click',()=>{
      item.classList.toggle('expanded')
    })
  })

  // animate skill bars when skills section visible
  const skillsSection = document.querySelector('#skills')
  if(skillsSection){
    const skillObserver = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          document.querySelectorAll('.bar').forEach(bar=>{
            const p = bar.getAttribute('data-percent')||bar.dataset.percent||80
            const fill = bar.querySelector('.fill')
            fill.style.width = p + '%'
          })
          skillObserver.disconnect()
        }
      })
    },{threshold:0.25})
    skillObserver.observe(skillsSection)
  }

  // download CV button — trigger print
  const dl = document.getElementById('download-cv')
  if(dl) dl.addEventListener('click',()=>{
    window.print()
  })

  // portfolio demo
  const portBtn = document.getElementById('open-portfolio')
  if(portBtn) portBtn.addEventListener('click',()=>{
    alert('演示：这里可以跳转到完整作品集页面或打开 modal 展示项目样例。')
  })

  // projects modal logic
  const modal = document.getElementById('project-modal')
  const modalImg = document.getElementById('modal-img')
  const modalTitle = document.getElementById('modal-title')
  const modalDesc = document.getElementById('modal-desc')
  const closeBtn = modal && modal.querySelector('.modal-close')

  function openModal(card){
    const title = card.dataset.title || ''
    const desc = card.dataset.desc || ''
    const img = card.dataset.img || ''
    modalTitle.textContent = title
    modalDesc.textContent = desc
    modalImg.src = img
    modalImg.alt = title
    modal.setAttribute('aria-hidden','false')
    modal.classList.add('open')
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true')
    modal.classList.remove('open')
  }

  document.querySelectorAll('.project-card').forEach(card=>{
    card.addEventListener('click',()=>openModal(card))
  })

  if(closeBtn) closeBtn.addEventListener('click',closeModal)
  if(modal) modal.addEventListener('click',e=>{ if(e.target === modal) closeModal() })
  document.addEventListener('keydown',e=>{ if(e.key === 'Escape') closeModal() })

})
