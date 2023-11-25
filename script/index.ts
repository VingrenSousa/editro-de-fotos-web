const newImg: any = document.getElementById('newImg');
const inputFile: any = document.querySelector('input[type=file]');
const img: any = document.querySelector('.img-content img')
const ButtonsFilter: any = document.querySelectorAll('.filters-content button')
const renge:any = document.querySelector('input[type=range]')
const spnRangeValue: any = document.getElementById('spanRangeValue')
const btnResetFilters: any = document.getElementById('resetFiltros');
const btnsalvar: any = document.getElementById('salvarImg');

let rotate: number;
let flipY: number;
let flipX: number;

let filterActive:string;
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

    filterActive = 'Brilho'

    spnRangeValue.innerHTML = 100
    renge.max = 200
    renge.value = 100

    img.style.transform = ''
    img.style.filter = ''

    document.querySelector('.active')?.classList.remove('active')
    document.getElementById('filterdefault')?.classList.add('active')
}
ButtonsFilter.forEach((element:any) => {
    element.onclick=()=>{
        document.querySelector('.active')?.classList.remove('active')

        element.classList.add('active')

        filterActive=element.innerHTML

        renge.max =filters[filterActive].max
        renge.value=filters[filterActive].value

        spnRangeValue.innerHTML=renge.value
    }
});


newImg.onclick = () =>inputFile.click();
inputFile.onchange = () =>loadNewImage();

function loadNewImage() {
    let file = inputFile.files[0];

    
    if (file) {
        img.src = URL.createObjectURL(file);
    }

    
    init();
}
renge.oninput =()=>{
   


    filters[filterActive].value = renge.value
    spnRangeValue.innerHTML=renge.value;

    img.style.filter=`
    brightness(${filters["Brilho"].value}%) 
    contrast(${filters["Contraste"].value}%) 
    saturate(${filters["Saturação"].value}%) 
    grayscale(${filters["Cinza"].value}%) 
    invert(${filters["Inversão"].value}%)
    `
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
btnsalvar.onclick = () => download();

function download() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  ctx.filter = `
    brightness(${filters["Brilho"].value}%) 
    contrast(${filters["Contraste"].value}%) 
    saturate(${filters["Saturação"].value}%) 
    grayscale(${filters["Cinza"].value}%) 
    invert(${filters["Inversão"].value}%)
  `;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotate !== 0) ctx.rotate((rotate * Math.PI) / 180);

  ctx.scale(flipY, flipX);
  ctx.drawImage(
    img,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );

  const link = document.createElement("a");
  link.download = "foto_editada.png";
  link.href = canvas.toDataURL();
  link.click();

