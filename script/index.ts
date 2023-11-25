const newImg: any = document.getElementById('newImg');
const inputFile: any = document.querySelector('input[type=file]');
const img: any = document.querySelector('.img-content img')
const ButtonsFilter: any = document.querySelectorAll('.filters-content button')
const renge: any = document.querySelector('input[type=range]')
const spnRangeValue: any = document.getElementById('spanRangeValue')
const btnResetFilters: any = document.getElementById('resetFiltros');
const btnsalvar: any = document.getElementById('salvarImg');

let rotate: number;
let flipY: number;
let flipX: number;

let filterActive;
interface propsFilter {
    Brilho: { value: number, max: number }
    Contraste: { value: number, max: number }
    Saturação: { value: number, max: number }
    Inversão: { value: number, max: number }
    Cinza: { value: number, max: number }
}
let filters: propsFilter;

btnResetFilters.onclick = () => init()

init()

function init(): void {
    filters = {
        Brilho: { value: 100, max: 200 },
        Contraste: { value: 100, max: 200 },
        Saturação: { value: 100, max: 200 },
        Cinza: { value: 0, max: 200 },
        Inversão: { value: 0, max: 100 },

    }
    rotate = 0
    flipX = 1
    flipY = 1

    filterActive = 'brilho'

    spnRangeValue.innerHTML = 100
    renge.max = 200
    renge.value = 100

    img.style.transform = ''
    img.style.filter = ''

    document.querySelector('.active')?.classList.remove('active')
    document.getElementById('filterdefault')?.classList.add('active')
}
newImg.onclick = () =>inputFile.click();
inputFile.onchange = () =>loadNewImage();

function loadNewImage() {
    let file = inputFile.files[0];

    
    if (file) {
        img.src = URL.createObjectURL(file);
    }

    
    init();
}


function handleDirection(type: string): void {
    if (type === "rotateRight") {
        rotate += 90
    } else if (type === "rotateLeft") {
        rotate -= 90
    } else if (type === "reflectY") {
        flipY = flipY === 1 ? -1 : 1
    } else {
        flipX = flipX === 1 ? -1 : 1
    }
    console.log(rotate)
    console.log(flipY)

    img.style.transform = `rotate(${rotate}deg) scale(${flipY},${flipX})`;
}


