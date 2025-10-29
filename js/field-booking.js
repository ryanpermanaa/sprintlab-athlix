// *
// *  VENUE SLIDER FUNCTIONALITY
// *

const venueTrack = document.getElementById('venueTrack');
const venuePrevBtn = document.getElementById('venuePrevBtn');
const venueNextBtn = document.getElementById('venueNextBtn');
const venueIndicators = document.getElementById('venueIndicators');
const venueItems = venueTrack.children;
let currentVenueIndex = 0;

venuePrevBtn.addEventListener('click', () => {
    if (currentVenueIndex > 0) {
        currentVenueIndex--;
        updateSlider(venueItems, venueTrack, currentVenueIndex, venueIndicators, [venuePrevBtn, venueNextBtn]);
    }
});

venueNextBtn.addEventListener('click', () => {
    const maxIndex = venueItems.length - itemsPerView;
    if (currentVenueIndex < maxIndex) {
        currentVenueIndex++;
        updateSlider(venueItems, venueTrack, currentVenueIndex, venueIndicators, [venuePrevBtn, venueNextBtn]);
    }
});

updateSlider(venueItems, venueTrack, currentVenueIndex, venueIndicators, [venuePrevBtn, venueNextBtn]);

// Handle resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateSlider(venueItems, venueTrack, currentVenueIndex, venueIndicators, [venuePrevBtn, venueNextBtn]);
    }, 100);
});
