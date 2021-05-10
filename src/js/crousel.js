import '../style/crousel.scss';
export default class Crousals {
    slideIndex = 0;
    renderHTML() {
        return `
        <section class="crousel-container">
            <a class="prev" onclick="plusSlides(-1)">PREV</a>
            <a class="next" onclick="plusSlides(1)">NEXT</a>
            <article class="crousel_dots" id="crousal-dots">
            </article>
        </section>
        <br>
        `;
    }

    addSlides(imgSrc) {
        var template = `<div class="slides fade">
                <img src="${imgSrc}" style="width:100%">
            </div>`;
        var crousalDots = `
        <span class="dot"></span>
        `;
        document.getElementsByClassName('crousel-container')[0].insertAdjacentHTML('afterbegin', template);
        document.getElementById('crousal-dots').insertAdjacentHTML('beforeend', crousalDots);
    }

    changeSlides() {
        var i;
        var slides = document.getElementsByClassName("slides");
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
        setInterval(this.changeSlides.bind(this), 3000);
    }

    plusSlides(n) {
        var slides = document.getElementsByClassName("slides");
        if (n > 0) {
            this.slideIndex += 1;
            if (this.slideIndex > slides.length) {
                this.slideIndex = 1;
            }
        } else {
            this.slideIndex -= 2;
            if (this.slideIndex < 0) {
                this.slideIndex = slides.length;
            }
        }
        this.changeSlides();
    }
}