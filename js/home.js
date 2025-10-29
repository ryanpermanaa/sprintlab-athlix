// *
// *  HORIZONTAL PARALLAX SCROLL ANIMATION
// *

// content duplication
const scrollParallaxElements = document.querySelectorAll("[data-scroll-parallax]");
scrollParallaxElements.forEach(el => {
    const children = Array.from(el.children);
    const repeatCount = Math.ceil(window.innerWidth / 350);

    for (let i = 0; i < repeatCount - 1; i++) {
        children.forEach(child => {
            const copy = child.cloneNode(true);
            el.appendChild(copy);
        });
    }
});

// functioning parallax
const sportlifeParallax = document.querySelector("#sportlife-parallax");
const gamereadyParallax = document.querySelector("#gameready-parallax");

const slPositionTop = sportlifeParallax.getBoundingClientRect().top + window.scrollY;
const slHeight = sportlifeParallax.offsetHeight;

const grPositionTop = gamereadyParallax.getBoundingClientRect().top + window.scrollY;
const grHeight = gamereadyParallax.offsetHeight;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const isVisible_sl = scrollY + windowHeight > slPositionTop && scrollY < slPositionTop + slHeight;
    const isVisible_gr = scrollY + windowHeight > grPositionTop && scrollY < grPositionTop + grHeight;

    if (isVisible_sl) {
        const offset_sl = (scrollY - slPositionTop) * -0.3;
        sportlifeParallax.style.transform = `translateX(calc(${offset_sl}px - 20%))`;
    }

    if (isVisible_gr) {
        const offset_gr = (scrollY - grPositionTop) * 0.3;
        gamereadyParallax.style.transform = `translateX(${offset_gr}px)`;
    }
});


// *
// *  FAQ BUTTON FUNCTIONALITY
// *
const faqBtn = document.querySelectorAll('.faq-btn');

toggleFaq(faqBtn[0]);

function toggleFaq(button) {
    // when triggered by event, `button` will be the Event object
    if (button instanceof Event) {
        button = button.currentTarget;
    }

    // collapse other FAQs
    faqBtn.forEach(btn => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('svg');

        if (btn !== button) {
            content.style.maxHeight = null;
            icon.classList.remove('rotate-180');
        }
    });

    const content = button.nextElementSibling;
    const icon = button.querySelector('svg');

    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
    }

    icon.classList.toggle('rotate-180');
}

faqBtn.forEach(btn => {
    btn.addEventListener('click', toggleFaq);
});


// *
// *  TESTIMONIAL SLIDER FUNCTIONALITY
// *

//? For testimonial section
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialPrevBtn = document.getElementById('prevBtnTestimonial');
const testimonialNextBtn = document.getElementById('nextBtnTestimonial');
const testimonialItems = testimonialTrack.children;
let currentTestimonialIndex = 0;

testimonialPrevBtn.addEventListener('click', () => {
    if (currentTestimonialIndex > 0) {
        currentTestimonialIndex--;
        updateSlider(testimonialItems, testimonialTrack, currentTestimonialIndex);
    }
});

testimonialNextBtn.addEventListener('click', () => {
    const maxIndex = testimonialItems.length - itemsPerView;
    if (currentTestimonialIndex < maxIndex) {
        currentTestimonialIndex++;
        updateSlider(testimonialItems, testimonialTrack, currentTestimonialIndex);
    }
});

updateSlider(testimonialItems, testimonialTrack, currentTestimonialIndex);

// Handle resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateSlider(testimonialItems, testimonialTrack, currentTestimonialIndex);
    }, 100);
});
