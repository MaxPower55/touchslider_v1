let slider = document.querySelector('.slider'),
    sliderList = document.querySelector('.slider__list'),
    sliderTrack = document.querySelector('.slider__track'),
    slides = document.querySelectorAll('.slide'),
    arrows = document.querySelector('.slider__arrows'),
    prev = arrows.children[0],
    next = arrows.children[1],
    slideWidth = slides[0].offsetWidth,
    slideIndex = 0,
    posInit = 0,
    posX1 = 0,
    posX2 = 0,
    posFinal = 0,
    posTreshold = slideWidth * 0.35,
    trfRegExp = /[-0-9.]+(?=px)/,
    slide = function() {
        sliderTrack.style.transition = 'transform 0.5s';
        sliderTrack.style.transform = 'translate3d(' + -(slideIndex * slideWidth) + 'px, 0px, 0px)';
        // console.log(slideIndex * slideWidth);
        prev.classList.toggle('disabled', slideIndex === 0);
        next.classList.toggle('disabled', slideIndex === (slides.length - 1));
    },
    getEvent = function () {
        return event.type.search('touch') !== -1 ? event.touches[0] : event;
    },
    swipeStart = function() {
        let evt = getEvent();
        posInit = posX1 = evt.clientX;
        sliderTrack.style.transition = '';
        document.addEventListener('touchmove', swipeAction);
        document.addEventListener('touchend', swipeEnd);
        document.addEventListener('mousemove', swipeAction);
        document.addEventListener('mouseup', swipeEnd);
    },
    swipeAction = function() {
        let evt = getEvent(),
            style = sliderTrack.style.transform;
            transform = +style.match(trfRegExp)[0];
            // console.log('transform: ' + transform + ', posX1: ' + posX2);
        posX2 = posX1 - evt.clientX;
        posX1 = evt.clientX;
        sliderTrack.style.transform = 'translate3d(${transform - posX2}px, 0px, 0px)';
    },
    swipeEnd = function() {
        posFinal = posInit - posX1;
        // console.log('posFinal: ' + posFinal + ', posInit: ' + posInit + ', posX1: ' + posX1 + ', posTreshold: ' + posTreshold);
        document.removeEventListener('touchmove', swipeAction);
        document.removeEventListener('mousemove', swipeAction);
        document.removeEventListener('touchend', swipeEnd);
        document.removeEventListener('mouseup', swipeEnd);
        if (Math.abs(posFinal) > posTreshold) {
            if (posInit < posX1) {
                slideIndex--;
            } else if (posInit > posX1) {
                slideIndex++;
            }
        }
        if (posInit !== posX1) {
            slide();
        }
        // console.log('slideIndex: ' + slideIndex);
    };

    sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
    slider.addEventListener('touchstart', swipeStart);
    slider.addEventListener('mousedown', swipeStart);

    arrows.addEventListener('click', function() {
        let target = event.target;
        if (target === next) {
            slideIndex++;
        } else if (target === prev) {
            slideIndex--;
        } else {
            return;
        }
        slide();
    });



