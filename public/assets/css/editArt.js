const editBtn = document.querySelectorAll('.editButton');
const deleteBtn = document.querySelectorAll('.deleteButton');
const updateBtn = document.querySelector('.updateButton');

for (const button of editBtn) {
  button.addEventListener('click', (e) => {
    document.getElementById('oldtitle').value = e.target.dataset.title;
    document.getElementById('oldshort_disc').value = e.target.dataset.short_disc;
    document.getElementById('oldfull_text').value = e.target.dataset.full_text;
    document.getElementById('oldimage').value = e.target.dataset.image;
    document.getElementById('newtitle').value = e.target.dataset.title;
    document.getElementById('newshort_disc').value = e.target.dataset.short_disc;
    document.getElementById('newfull_text').value = e.target.dataset.full_text;
    document.getElementById('newimage').value = e.target.dataset.image;
   
  });
}

for (const button of deleteBtn) {
  button.addEventListener('click', (e) => {
    fetch('/editarticles', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: e.target.dataset.title,
        short_disc: e.target.dataset.short_disc,
        full_text: e.target.dataset.full_text,
       
     
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then(() => {
        window.location.reload();
      });
  });
}

updateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  fetch('/editarticles', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: document.querySelector('#newtitle').value,
      short_disc: document.querySelector('#newshort_disc').value,
      full_text:document.querySelector('#newfull_text').value,
      oldtitle: document.querySelector('#oldtitle').value,
      oldshort_disc: document.querySelector('#oldshort_disc').value,
      oldfull_text:document.querySelector('#oldfull_text').value,
      
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then(() => {
      window.location.reload();
    });
});