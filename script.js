const addBT = document.getElementById('ad');
const notes = JSON.parse(localStorage.getItem('notes'));

console.log(notes);
if(notes){
    notes.forEach((note) => {
        addNewNote(note);
    })
}

addBT.addEventListener('click', () => addNewNote());

function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML =`
    <div class="tool">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `
    
    const editBT = note.querySelector('.edit');
    const deleteBT = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    textarea.value = text;
    main.innerHTML = marked(text);



    deleteBT.addEventListener('click', () => {
        note.remove();
        updateLS();
    })
    editBT.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })

    textarea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLS();
    })
    document.body.appendChild(note);
}

//localStorage.setItem('name', JSON.stringify());
//JSON.parse(localStorage.getItem('name'));
//localStorage.removeItem('name')

function updateLS() {
    const noteText = document.querySelectorAll('textarea');

    const notes = [];
    noteText.forEach(note => notes.push(note.value));
    //console.log(notes);
    localStorage.setItem('notes', JSON.stringify(notes))
}