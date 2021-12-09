mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleGlzZHVydSIsImEiOiJja3dydXk5NHIxMDl2MnRxbzc5enlobmM0In0.Ed0S5ioc8PQZXqPIfK2CEg';
const map = new mapboxgl.Map({
container: 'map', 
style: 'mapbox://styles/mapbox/streets-v11',
center: [-0.5662558, 44.8363327], 
zoom: 12
});


fetch('activities.json')
    .then(response => response.json())
    .then(data => {

        let test = document.querySelector('.activities')
        test.innerHTML = ""

        data.forEach(element => {

            new mapboxgl.Marker({
                color: "rgba(0,0,0,.4)"
            })
            .setLngLat([element.lng, element.lat])
            .addTo(map)

            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `
                <div class="row">
                    <div class="col-md-3">
                        <img src="${element.imageSrc}" alt=""></img>
                    </div>
                    <div class="col-md-9">
                        <h3>${element.title}</h3>
                        <p>${element.address} ${element.postalCode}, ${element.city}</p>
                        <p>${element.description}</p>
                    </div>
                </div>
            `

            card.addEventListener('mouseenter', function(){
                let cursor = document.getElementById('cursor')
                cursor.style.transform = `translateY(${this.offsetTop}px)`
                cursor.style.height = this.offsetHeight + "px"
                
                let markerHover = new mapboxgl.Marker({
                    color: "rgba(0,0,0,1)"
                })
                .setLngLat([element.lng, element.lat])
                .addTo(map)
    
                card.addEventListener('mouseleave', function(){
                    markerHover.remove()
                })
            })
            const activities = document.querySelector('.activities')
            activities.append(card)
        })
    })
.catch(error => console.log(error));




