const boxes = document.querySelectorAll('.box');
const fillers = document.querySelectorAll('.filler');
const taulukko = [];
const varasto = [];
const undraggable = [];

const allowDrop = (ev) => {
    ev.preventDefault();
}

const drag = (ev) => {
    // console.log(ev);
    ev.dataTransfer.setData('text', ev.currentTarget.id);
    ev.currentTarget.style.background = 'blue';
    taulukko.push(ev.target.parentNode);


}

const drop = (ev) => {
    ev.preventDefault();
    //  console.log(ev.target.id);
    let data = ev.dataTransfer.getData('text');
    ev.target.appendChild(document.getElementById(data));
    varasto.push(ev.target.id);


    ev.srcElement.childNodes['0'].style.background = 'red';


    console.log(ev);


    /* if(event.dataTransfer.dropEffect !== 'none'){
         ev.target.appendChild(ev.target.parentNode);
     } */

    if (ev.srcElement.childNodes['0'].id - 1 == ev.currentTarget.id) {
        ev.dataTransfer.dropEffect = 'move';
        alert('Just näin, nappiin meni!');
        taulukko.length = 0;
    } else {
        //   const back = ev.srcElement.childNodes[0];
        // ev.dataTransfer.dropEffect = 'none';
        taulukko[0].appendChild(ev.target.childNodes['0']);
        alert('No eihän se ihan näin mee');
        // ev.currentTarget.setAttribute('draggable', true);
        taulukko.length = 0;
        //  console.log(back);
        // append back to the original parent            
        // back.appendChild(ev.target);
    }
}

const dragStart = (ev) => {
    console.log('start');
    console.log(varasto);
}

const dragEnd = (ev) => {

    console.log(ev);

    console.log(varasto);
    console.log('LOOK: ' + (ev.target.id - 1));

    if (ev.dataTransfer.dropEffect == 'none') {
        console.log(ev.target.parentNode);
        ev.target.parentNode.appendChild(ev.target);
        console.log('Palautettu vanhemmalle!');
        ev.currentTarget.setAttribute('draggable', true);
        taulukko.length = 0;
        //varasto.length = 0;
    } else if (varasto[0] == ev.target.id - 1) {
        // ev.currentTarget.setAttribute('draggable', false);
        ev.currentTarget.setAttribute('draggable', false);
        ev.target.children['0'].setAttribute('draggable', false);
        console.log(ev.target.children['0'])
        console.log('SAMAT!');
        undraggable.push(ev.target.id);
    } else if (undraggable.includes(ev.target.id)) {
        ev.currentTarget.setAttribute('draggable', false);
        ev.target.children['0'].setAttribute('draggable', false);
    }
    console.log('end');
    console.log(taulukko);
    varasto.length = 0;
    console.log(undraggable);
}

for (filler of fillers) {
    filler.setAttribute('draggable', true);
    // filler.addEventListener('ondragstart', drag);
    filler.addEventListener('dragend', dragEnd);
    filler.addEventListener('dragstart', dragStart);
}

/*
for (box of boxes) {
    box.addEventListener('ondrop', drop);
    box.addEventListener('ondragover', allowDrop);
}
*/