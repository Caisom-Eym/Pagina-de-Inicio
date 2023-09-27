const input = document.getElementById("search-text")
const btnSearch = document.getElementById("search-btn")
const selectText = document.getElementById("select-text")
const selectImg = document.getElementById("select-img")

const fileInput = document.getElementById("input-file")

const createNote = document.getElementById("create-note")
const configBtn = document.getElementById("config-btn")

const modalConfigBg = document.getElementById("modal-bg")
const modalConfig   = document.getElementById("modal")
const modalClose    = document.getElementById("modal-close")

const textBtnImgBg      = document.getElementById("img-bg-none")
const selectBgSize      = document.getElementById("size")
const selectBgPositionX = document.getElementById("positionX")
const selectBgPositionY = document.getElementById("positionY")
const selectBgRepeat    = document.getElementById("repeat")
const inputColorBg      = document.getElementById("input-color-bg")

const inputRangeFont    = document.getElementById("range-font")
const selectFont        = document.getElementById("select-font")

const deleteNotesBtn    = document.getElementById("delete-notes")

let search = "text"
let type = ""
input.focus()

selectText.addEventListener("click",()=>{
    selectImg.classList.remove("active")
    selectText.classList.add("active")
    type = ""
})

selectImg.addEventListener("click",()=>{
    selectImg.classList.add("active")
    selectText.classList.remove("active")
    type = "&tbm=isch"
})

btnSearch.addEventListener("click",()=>{
    if (input.value == ''){

    } else window.open(`https://google.com/search?q=${input.value}${type}`)
})


input.addEventListener("keydown", e=>{
    if (e.key == "Enter"){
        if (input.value != '') {
            window.open(`https://google.com/search?q=${input.value}${type}`)
        }
    }  else input.focus()
})

fileInput.addEventListener("change",(e)=>{
    leerArchivo(fileInput.files[0],"body")
})


const leerArchivo  = (ar,target) =>{
    const reader = new FileReader()
    if (ar.type.includes("image")) {        
        reader.readAsDataURL(ar)
        reader.addEventListener("load",(e)=>{
            let url = e.currentTarget.result
            window.localStorage.setItem("bg-image", url)
            if (target == "body")document.body.style.backgroundImage = `url(${url})`
        }) 
    }else console.log("no es una imagen")
}
    let numero = 0

createNote.addEventListener("click",()=>{crearNota(1)})

if (window.localStorage.getItem("notas")){
    notas = window.localStorage.getItem("notas")
}else {
    notas = 0
}
let textHeight = 0
const crearNota = (num)=>{
    notas = window.localStorage.getItem("notas")
    for (let i = 0; i < num; i++){
        notas++
        const divNote = document.createElement("DIV")
            divNote.classList.add("note")
            divNote.setAttribute("draggable","true")
            divNote.setAttribute("nota",notas)

        const noteTitle = document.createElement("DIV")
            noteTitle.classList.add("title")
            noteTitle.setAttribute("contenteditable","")
        
        const foot = document.createElement("DIV")
            foot.classList.add("foot")

        const closeNote = document.createElement("DIV")
            closeNote.classList.add("close")

        const saveNote = document.createElement("DIV")
            saveNote.classList.add("save")

        const label = document.createElement("LABEL")
            label.setAttribute("for",`input-color-${notas}`)

        const colorNote = document.createElement("DIV")
            colorNote.classList.add("color")

        const change = document.createElement("DIV")
            change.classList.add("change")
            change.textContent = "a"
        
        const minimizar = document.createElement("DIV")
            minimizar.classList.add("minimizar")
            minimizar.textContent = "--"

        const relleno = document.createElement("DIV")
            relleno.classList.add("relleno")
        
        const noteText = document.createElement("TEXTAREA")
            noteText.classList.add("textarea")

        const inputColor = document.createElement("INPUT")
            inputColor.type = "color"
            inputColor.setAttribute("id",`input-color-${notas}`)
            inputColor.classList.add("none")

        divNote.appendChild(noteTitle)
        divNote.appendChild(noteText)
        divNote.appendChild(foot)
            foot.appendChild(closeNote)
            foot.appendChild(saveNote)
            foot.appendChild(relleno)
            foot.appendChild(minimizar)
            foot.appendChild(change)
            foot.appendChild(label)
                label.appendChild(colorNote)
        divNote.appendChild(inputColor)

        document.body.appendChild(divNote)

        let countColor = true
        divNote.addEventListener("dragend",(e)=>{
            moverNota(e.target,"",e.y,e.x)
            
            window.localStorage.setItem(`nota${divNote.getAttribute("nota")}`, JSON.stringify({
                "notaID"     : divNote.getAttribute("nota"),
                "title"      : noteTitle.textContent,
                "text"       : noteText.value,
                "min"        : countMin,
                "letter"     : countColor,
                "width"      : noteText.clientWidth,
                "contWidht"  : divNote.clientWidth,
                "height"     : noteText.clientHeight,
                "textHeight" : textHeight,
                "style"      : divNote.getAttribute(`style`,)

            }))
        })
        closeNote.addEventListener("click",(e)=>cerrarNota(e.target.parentElement.parentElement))
        saveNote.addEventListener("click",(e)=>{
            window.localStorage.setItem(`nota${divNote.getAttribute("nota")}`, JSON.stringify({
                "notaID"     : divNote.getAttribute("nota"),
                "title"      : noteTitle.textContent,
                "text"       : noteText.value,
                "min"        : countMin,
                "letter"     : countColor,
                "width"      : noteText.clientWidth,
                "contWidht"  : divNote.clientWidth,
                "height"     : noteText.clientHeight,
                "textHeight" : textHeight,
                "style"      : divNote.getAttribute(`style`,)

            }))
        })

        change.addEventListener("click",()=>{
            if(countColor){
            divNote.style.color = "#eee"
            countColor = false
            }else {
                divNote.style.color = "#000"
                countColor = true
            }
        })

        let countMin = false
        textHeight = noteText.clientHeight
        minimizar.addEventListener("click",()=>{
            if (countMin) {
                divNote.style.width = ``
                noteText.style.display = "block"
                textHeight = noteText.clientHeight
                countMin = false
            }else {
                divNote.style.width = `${divNote.clientWidth}px`
                textHeight = noteText.clientHeight
                noteText.style.display = "none"
                countMin = true            
            }
        })
        inputColor.value = "#010101"
        inputColor.addEventListener("change",()=>{
            divNote.style.backgroundColor = `${inputColor.value}`
        })
        
        window.localStorage.setItem(`nota${divNote.getAttribute("nota")}`, JSON.stringify({
            "notaID"     : divNote.getAttribute("nota"),
            "title"      : noteTitle.textContent,
            "text"       : noteText.value,
            "min"        : countMin,
            "width"      : noteText.clientWidth,
            "contWidht"  : divNote.clientWidth,
            "height"     : noteText.clientHeight,
            "textHeight" : textHeight,
            "style"      : divNote.getAttribute(`style`,)

        }))

        window.localStorage.setItem("notas", notas)
    }
}

const moverNota = (nota,hijo,y,x) => {
        nota.style.top = `${y}px`
        nota.style.left = `${x}px` 
}

const cerrarNota = (nota)=>{
    document.body.removeChild(nota)
    window.localStorage.removeItem(`nota${nota.attributes.nota.value}`)
}

const cerrarNotas = ()=>{
    let noteCount = document.querySelectorAll(".note")
    for (let i = 0; i < noteCount.length; i++){
        document.body.removeChild(noteCount[i])
        window.localStorage.removeItem(`nota${noteCount[i].attributes.nota.value}`)
    }
        window.localStorage.setItem("notas","0")
}

configBtn.addEventListener("click",()=>{
    modalConfigBg.style.display = "block"
})

modalConfigBg.addEventListener("click",(e)=>{
    if (e.target == modalConfigBg || e.target == modalClose){
        modalConfigBg.style.display = "none"
    }
})

selectBgSize.addEventListener("change",(e)=>{
    document.body.style.backgroundSize = `${e.target.value}`
    window.localStorage.setItem("bg-size",e.target.value)
})

selectBgPositionX.addEventListener("change",(e)=>{
    document.body.style.backgroundPositionX = `${e.target.value}`
    window.localStorage.setItem("bg-posX",e.target.value)
})

selectBgPositionY.addEventListener("change",(e)=>{
    document.body.style.backgroundPositionY = `${e.target.value}`
    window.localStorage.setItem("bg-posY",e.target.value)
})

selectBgRepeat.addEventListener("change",(e)=>{
    document.body.style.backgroundRepeat = `${e.target.value}`
    window.localStorage.setItem("bg-repeat",e.target.value)
})

textBtnImgBg.addEventListener("click",(e)=>{
    document.body.style.backgroundImage = "none" 
    window.localStorage.setItem("bg-image",e.target.value)
})

inputColorBg.addEventListener("change",(e)=>{
    document.body.style.backgroundColor = `${e.target.value}`
    window.localStorage.setItem("bg-color",e.target.value)
})

inputRangeFont.addEventListener("change",(e)=>{
    document.body.style.fontSize = `${e.target.value}px`
    window.localStorage.setItem("fuente-tamaño",e.target.value)
})

selectFont.addEventListener("change",(e)=>{
    document.body.style.fontFamily = `${e.target.value}`   
    window.localStorage.setItem("fuente-estilo",e.target.value)
})

deleteNotesBtn.addEventListener("click",(e)=>{
    cerrarNotas()
})


/* Leer localStorage */

document.body.style.fontFamily = `${window.localStorage.getItem("fuente-estilo")}`
selectFont.value = `${window.localStorage.getItem("fuente-estilo")}`

document.body.style.fontSize   = `${window.localStorage.getItem("fuente-tamaño")}px`
inputRangeFont.value = window.localStorage.getItem("fuente-tamaño")

document.body.style.backgroundImage = `url(${window.localStorage.getItem("bg-image")})`

document.body.style.backgroundColor = `${window.localStorage.getItem("bg-color")}`
inputColorBg.value = `${window.localStorage.getItem("bg-color")}`

document.body.style.backgroundRepeat = `${window.localStorage.getItem("bg-repeat")}`
selectBgRepeat.value = `${window.localStorage.getItem("bg-repeat")}`

document.body.style.backgroundPositionX = `${window.localStorage.getItem("bg-posX")}`
selectBgPositionX.value = `${window.localStorage.getItem("bg-posX")}`

document.body.style.backgroundPositionY = `${window.localStorage.getItem("bg-posY")}`
selectBgPositionY.value = `${window.localStorage.getItem("bg-posY")}`

document.body.style.backgroundSize = `${window.localStorage.getItem("bg-size")}`
selectBgSize.value = `${window.localStorage.getItem("bg-size")}`

const obtenerNota = (notaID,title,text,style,height,tHeight,width,contWidht,min,letter)=>{
    const divNote = document.createElement("DIV")
        divNote.classList.add("note")
        divNote.setAttribute("draggable","true")
        divNote.setAttribute("nota",notaID)
        divNote.setAttribute("style",style)
        if (!(min)){
            divNote.style.width = ""
            divNote.style.height =""
        }else divNote.style.width = `${contWidht}px`

    const noteTitle = document.createElement("DIV")
        noteTitle.classList.add("title")
        noteTitle.setAttribute("contenteditable","")
        noteTitle.textContent = title

    const noteText = document.createElement("TEXTAREA")
        noteText.classList.add("textarea")
        noteText.value = text
        noteText.setAttribute("style",`height: ${height}px;width: ${contWidht}px;`)
        if (min) noteText.setAttribute("style",`display: none;`)

    const foot = document.createElement("DIV")
        foot.classList.add("foot")

    const closeNote = document.createElement("DIV")
        closeNote.classList.add("close")

    const saveNote = document.createElement("DIV")
        saveNote.classList.add("save")

    const label = document.createElement("LABEL")
        label.setAttribute("for",`input-color-${notaID}`)

    const colorNote = document.createElement("DIV")
        colorNote.classList.add("color")

    const change = document.createElement("DIV")
        change.classList.add("change")
        change.textContent = "a"
    
    const minimizar = document.createElement("DIV")
        minimizar.classList.add("minimizar")
        minimizar.textContent = "--"

    const relleno = document.createElement("DIV")
        relleno.classList.add("relleno")
    

    const inputColor = document.createElement("INPUT")
        inputColor.type = "color"
        inputColor.setAttribute("id",`input-color-${notaID}`)
        inputColor.classList.add("none")

    divNote.appendChild(noteTitle)
    divNote.appendChild(noteText)
    divNote.appendChild(foot)
        foot.appendChild(closeNote)
        foot.appendChild(saveNote)
        foot.appendChild(relleno)
        foot.appendChild(minimizar)
        foot.appendChild(change)
        foot.appendChild(label)
            label.appendChild(colorNote)
    divNote.appendChild(inputColor)

    document.body.appendChild(divNote)

    
    divNote.addEventListener("dragend",(e)=>{
        moverNota(e.target,"",e.y,e.x)
        
        window.localStorage.setItem(`nota${divNote.getAttribute("nota")}`, JSON.stringify({
            "notaID"     : divNote.getAttribute("nota"),
            "title"      : noteTitle.textContent,
            "text"       : noteText.value,
            "min"        : countMin,
            "letter"     : countColor,
            "width"      : noteText.clientWidth,
            "contWidht"  : divNote.clientWidth,
            "height"     : noteText.clientHeight,
            "textHeight" : textHeight,
            "style"      : divNote.getAttribute(`style`,)

        }))
    })
    closeNote.addEventListener("click",(e)=>cerrarNota(e.target.parentElement.parentElement))
    saveNote.addEventListener("click",(e)=>{
        window.localStorage.setItem(`nota${divNote.getAttribute("nota")}`, JSON.stringify({
            "notaID"     : divNote.getAttribute("nota"),
            "title"      : noteTitle.textContent,
            "text"       : noteText.value,
            "min"        : countMin,
            "letter"     : countColor,
            "width"      : noteText.clientWidth,
            "contWidht"  : divNote.clientWidth,
            "height"     : noteText.clientHeight,
            "textHeight" : textHeight,
            "style"      : divNote.getAttribute(`style`,)

        }))
    })

    let countColor = letter
    change.addEventListener("click",()=>{
        if(countColor){
        divNote.style.color = "#eee"
        countColor = false
        }else {
            divNote.style.color = "#000"
            countColor = true
        }
    })

    let countMin = min
    textHeight = tHeight
    let textWidth = contWidht
    minimizar.addEventListener("click",()=>{
        if (countMin) {
            divNote.style.width = ``
            noteText.style.display = "block"
            noteText.style.height = textHeight + "px"
            noteText.style.width = textWidth + "px"
            countMin = false
        }else {
            divNote.style.width = `${divNote.clientWidth}px`
            textWidth = divNote.clientWidth
            textHeight = noteText.clientHeight
            noteText.style.display = "none"
            countMin = true            
        }
    })
    inputColor.value = "#010101"
    inputColor.addEventListener("change",()=>{
        divNote.style.backgroundColor = `${inputColor.value}`
    })
}


for (i = 1; i <= window.localStorage.getItem("notas"); i++) {
    if (window.localStorage.getItem(`nota`+[i]) == null) {
        console.log("no existe")
    }
    else {
        let objLocal = JSON.parse(window.localStorage.getItem("nota"+[i]))
        obtenerNota(objLocal.notaID,objLocal.title,objLocal.text,objLocal.style,objLocal.height,objLocal.textHeight,objLocal.width,objLocal.contWidht,objLocal.min,objLocal.letter)
    }
}

