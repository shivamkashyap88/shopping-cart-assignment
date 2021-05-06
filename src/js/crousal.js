import '../style/crousal.scss';
export default class Crousals {
    slideIndex = 0;
    renderHTML() {
        return `
        <div class="slideshow-container">
        <a class="prev" onclick="plusSlides(-1)">PREV</a>
        <a class="next" onclick="plusSlides(1)">NEXT</a>
        </div>
        <br>
        <div class="crousal_dots" id="crousal-dots" style="text-align:center">
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
        document.getElementsByClassName('slideshow-container')[0].insertAdjacentHTML('afterbegin', template);
        document.getElementById('crousal-dots').insertAdjacentHTML('beforeend', crousalDots);
    }
    changeSlides (n) {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            var dots = document.getElementsByClassName("dot");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            if (n > slides.length) {this.slideIndex = 1}    
            if (n < 1) {this.slideIndex = slides.length}
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
    plusSlides(n) {
        clearInterval(this.changeSlides.bind(this));
        this.showSlides(this.slideIndex += n);
    }
}