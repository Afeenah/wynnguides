const img = document.querySelector('.guide-img');
img.addEventListener('click', () => {
    img.classList.toggle('zoomed');
});

if (window.location.search === '' || !window.location.search.includes('v')) {
    window.location.href = window.location.pathname + '?v=2';
}