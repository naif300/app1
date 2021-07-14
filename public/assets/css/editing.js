const editBtn = document.querySelectorAll('.editButton');
const deleteBtn = document.querySelectorAll('.deleteButton');
const updateBtn = document.querySelector('.updateButton');

for (const button of editBtn) {
  button.addEventListener('click', (e) => {
    document.getElementById('oldtitle').value = e.target.dataset.title;
    document.getElementById('oldtag').value = e.target.dataset.tag;
    document.getElementById('olddescrption').value = e.target.dataset.descrption;
 
    document.getElementById('newtitle').value = e.target.dataset.title;
    document.getElementById('newtag').value = e.target.dataset.tag;
    document.getElementById('newdescrption').value = e.target.dataset.descrption;
     
  });
}

for (const button of deleteBtn) {
  button.addEventListener('click', (e) => {
    fetch('/editt', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: e.target.dataset.title,
        tag: e.target.dataset.tag,
        descrption: e.target.dataset.descrption,
 
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
  fetch('/editt', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: document.querySelector('#newtitle').value,
      tag: document.querySelector('#newtag').value,
      descrption: document.querySelector('#newdescrption').value,
  
      oldtitle: document.querySelector('#oldtitle').value,
      oldtag: document.querySelector('#oldtag').value,
      olddescrption: document.querySelector('#olddescrption').value,
      
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then(() => {
      window.location.reload();
    });
});