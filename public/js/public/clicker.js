document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const counterElement = document.getElementById('counter-container');
    const speedElement = document.getElementById('speed-container');
    const clickImage = document.getElementById('click-image');
    const shopContainer = document.getElementById('shop-container');

    let count = 0;
    let speed = 0;

    clickImage.classList.add('clickable-image');

    function updateCounter() {
        count += speed;
        counterElement.textContent = `Count: ${Math.floor(count)}`;
    }

    setInterval(updateCounter, 1000);

    clickImage.addEventListener('click', () => {
        count++;
        counterElement.textContent = `Count: ${Math.floor(count)}`;
        speedElement.textContent = `Speed: ${speed.toFixed(2)}`;

        clickImage.classList.add('shrink');

        setTimeout(() => {
            clickImage.classList.remove('shrink');
        }, 300);

        createFallingImage();
    });

    function createFallingImage() {
        const newImage = document.createElement('img');
        newImage.src = '../img/profil/viennotdavyd.png';
        newImage.alt = 'Falling Image';
        newImage.classList.add('falling-image');

        newImage.style.position = 'absolute';
        newImage.style.top = '0';
        newImage.style.left = Math.random() * 100 + 'vw';
        newImage.style.transform = 'translateX(-50%)';

        const imageSize = Math.random() * 50 + 50;
        newImage.style.width = imageSize + 'px';
        newImage.style.height = imageSize + 'px';

        const animationDuration = Math.random() * 5 + 5;
        newImage.style.animationDuration = animationDuration + 's';

        gameContainer.appendChild(newImage);

        setTimeout(() => {
            gameContainer.removeChild(newImage);
        }, animationDuration * 1000);
    }

    shopContainer.addEventListener('click', (event) => {
        if (event.target.closest('.shop-item')) {
            const shopItem = event.target.closest('.shop-item');
            const itemCost = parseInt(shopItem.getAttribute('data-cost'));
            const itemName = shopItem.getAttribute('data-name');
            const itemCountElement = shopItem.querySelector('.item-count');
            let itemCount = parseInt(itemCountElement.textContent.split(': ')[1]);

            if (count >= itemCost) {
                count -= itemCost;
                itemCount++;
                speed += itemCost * 0.01;

                itemCountElement.textContent = `Count: ${itemCount}`;
                counterElement.textContent = `Count: ${Math.floor(count)}`;
                speedElement.textContent = `Speed: ${speed.toFixed(2)}`;
            }
        }
    });
});
