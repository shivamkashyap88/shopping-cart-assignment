import '../style/crousal.scss';
export default class Crousals {
    slideIndex = 0;
    renderHTML() {
        return `
        <div class="slideshow-container">
        </div>
        <br>
        <div id="crousal-dots" style="text-align:center">
        </div>
        `;
    }

    addSlides(imgSrc) {
        var template = `<div class="mySlides fade">
                <img src="${imgSrc}" style="width:100%">
            </div>`;
        var crousalDots = `
        <span class="dot"></span>
        `;
        document.getElementsByClassName('slideshow-container')[0].insertAdjacentHTML('beforeend', template);
        document.getElementById('crousal-dots').insertAdjacentHTML('beforeend', crousalDots);
    }
    changeSlides () {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            var dots = document.getElementsByClassName("dot");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            this.slideIndex++;
            if (this.slideIndex > slides.length) { this.slideIndex = 1 }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[this.slideIndex - 1].style.display = "block";
            dots[this.slideIndex - 1].className += " active";
    }
    showSlides() {
        this.changeSlides(); 
        setInterval(this.changeSlides.bind(this) , 3000);

    }
}