document.addEventListener('DOMContentLoaded', function () {
       const cardSwitcher = document.getElementById('toggle');
       const cardWrapper = document.querySelector('.card-wrapper');
   
       function toggleCards() {
           if (cardSwitcher.checked) {
               cardWrapper.style.transform = 'translateX(-100%)';
           } else {
               cardWrapper.style.transform = 'translateX(0)';
           }
       }
   
       cardSwitcher.addEventListener('change', toggleCards);
   
       // Initialize the view with the first card visible
       toggleCards();
   });
   