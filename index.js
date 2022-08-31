const card = document.querySelector(".cards");

async function uploadingData(){

    const date = await fetch("./datos.json")
    const json = await date.json();
    let html =""
    for (let i = 0; i < json.posts.length; i++) {
        const post = json.posts[i];
        const [URLAvatar, URLContenido]= await Promise.all([
            uploadImage(post.avatar),
            uploadImage(post.imagen),
        ])
        html += `<div class="cards">
<div class="card2 entry">
   <div class="infor">
    <div class="logo">
        <img src="${URLAvatar}" alt="" class="fadeIn">
    </div>
    <p class="d fadeIn">${post.name}</p>
   </div>
    <p class="description_time fadeIn">
    ${post.description}
    </p>
    <div class="imagenPublic">
        <img src="${URLContenido}" alt="" class="fadeIn">
    </div>
</div>`

        
    }
    card.innerHTML=html
}


async function uploadImage(url){
    
    const response = await fetch(`https://klayngo.github.io/skeleton/imagenes/${url}`)
    const blob = await response.blob();
    const urlImagenes =  URL.createObjectURL(blob)
    return urlImagenes;
}

uploadingData()

let content = [...document.querySelectorAll(".content")]
let btn_atras = [...document.querySelectorAll(".btn_atras")];
let btn_adelante = [...document.querySelectorAll(".btn_adelante")]

content.forEach((item, i)=>{

    const containerWirdth = item.getBoundingClientRect();
    const itemContainer = containerWirdth.width;
    btn_adelante[i].addEventListener("click",()=>{
        item.scrollLeft += itemContainer
    })
    btn_atras[i].addEventListener("click",()=>{
        item.scrollLeft -= itemContainer
    })


})
