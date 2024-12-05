// Enum-like object for gift states
const GiftState = {
    Hidden: 'hidden',
    Visible: 'visible',
    Opened: 'opened',
    Stolen: 'stolen'
};

class GiftPosition {
    constructor(page, placement, x, y) {
        this.page = page;
        this.placement = placement;
        this.x = x;
        this.y = y;
    }

    onCurrentPage(page) {
        return this.page === page;
    }
}

class Gift {
    constructor(id, day, position, content) {
        this.id = id;
        this.day = day;
        this.pos = position;
        this.state = GiftState.Hidden;
        this.content = content;
        this.grinchStolen = false;
    }

    // Check if gift can be revealed based on current date
    canBeRevealed(currentDate) {
        const currentDay = currentDate.getDate();
        return currentDay >= this.day && !this.grinchStolen;
    }

    // Attempt to open the gift
    open(currentDate) {
        if (this.canBeRevealed(currentDate)) {
            this.state = GiftState.Opened;
            return true;
        }
        return false;
    }

    // Grinch steals the gift
    steal() {
        this.grinchStolen = true;
        this.state = GiftState.Stolen;
    }

    onCurrentPage(page, currentDate){
        console.log(page, this.pos.page)
        return this.pos.onCurrentPage(page);
    }

    // Render gift based on its current state
    render(currentDate) {
        const giftElement = document.createElement('div');
        giftElement.classList.add('gift');
        giftElement.style.position = 'absolute';
        giftElement.style.left = `${this.pos.x}px`;
        giftElement.style.top = `${this.pos.y}px`;

        switch (this.state) {
            case GiftState.Hidden:
                // Closed gift representation
                giftElement.innerHTML = `
                    <svg width="100" height="100" viewBox="0 0 100 100">
                        <rect x="10" y="10" width="80" height="80" fill="#C41E3A" stroke="#000" stroke-width="3"/>
                        <rect x="30" y="30" width="40" height="40" fill="#8B0000"/>
                        <text x="50" y="55" text-anchor="middle" fill="white" font-size="20">${this.day}</text>
                    </svg>
                `;
                // Make clickable only if it can be revealed
                if (this.canBeRevealed(currentDate)) {
                    giftElement.style.cursor = 'pointer';
                    giftElement.addEventListener('click', () => {
                        this.open(currentDate);
                        this.render(currentDate); // Re-render to show opened state
                    });
                }
                break;

            case GiftState.Opened:
                // Opened gift representation
                giftElement.innerHTML = `
                    <div class="opened-gift">
                        <p>${this.content}</p>
                    </div>
                `;
                break;

            case GiftState.Stolen:
                // Grinch stolen representation
                giftElement.innerHTML = `
                    <svg width="100" height="100" viewBox="0 0 100 100">
                        <text x="50" y="50" text-anchor="middle" fill="green">Mwahaha!</text>
                    </svg>
                `;
                break;
        }

        return giftElement;
    }
}

class GiftManager {
    constructor() {
        this.giftList = [];
        this.grinchStolenCount = 0;
        this.initializeGrinchSound();
        this.setupSoundUnlock();
    }

    initializeGrinchSound() {
        try {
            // Use a relative path, ensuring it matches your project structure
            this.grinchLaughSound = new Audio('/sound/VOXLaff_Rire horrible 4 (ID 2094)_LS.mp3');

            // Add error event listener
            this.grinchLaughSound.addEventListener('error', (e) => {
                console.error('Audio error:', e);
                console.log('Audio source:', this.grinchLaughSound.src);
            });

            // Verify audio source
            this.grinchLaughSound.addEventListener('loadedmetadata', () => {
                console.log('Audio loaded successfully');
            });
        } catch (error) {
            console.error('Error creating audio object:', error);
        }
    }

    setupSoundUnlock() {
        const unlockEvents = ['click', 'touchstart', 'keydown'];

        const unlockAudio = () => {

            this.playGrinchLaugh();

            // Remove event listeners after first interaction
            unlockEvents.forEach(event => {
                document.removeEventListener(event, unlockAudio);
            });
        };

        // Add event listeners to unlock audio
        unlockEvents.forEach(event => {
            document.addEventListener(event, unlockAudio, { once: false });
        });
    }

    playGrinchLaugh() {
        if (!this.grinchLaughSound) {
            console.error('Grinch laugh sound not initialized');
            return;
        }

        try {
            this.grinchLaughSound.currentTime = 0;
            this.grinchLaughSound.volume = 1.0;

            this.grinchLaughSound.play()
                .catch(error => {
                    console.error('Error playing Grinch laugh sound:', error);
                    console.log('Audio source:', this.grinchLaughSound.src);
                });
        } catch (error) {
            console.error('Error setting up Grinch laugh sound:', error);
        }
    }

    addGift(gift) {
        this.giftList.push(gift);
    }

    // Get gifts for current page and date
    getGiftsForPage(page, currentDate) {

        console.log("List of gifts " + this.giftList);
        return this.giftList.filter(gift =>
            gift.onCurrentPage(page, currentDate)
        );
    }

    // Grinch steals a random gift
    // Grinch steals a random gift
    grinchSteal() {
        const stealablePotentialGifts = this.giftList.filter(
            gift => gift.state === GiftState.Hidden && !gift.grinchStolen
        );

        if (stealablePotentialGifts.length > 0) {
            const randomIndex = Math.floor(Math.random() * stealablePotentialGifts.length);
            const stolenGift = stealablePotentialGifts[randomIndex];

            stolenGift.steal();
            this.grinchStolenCount++;

            // Play Grinch laugh sound
            this.playGrinchLaugh();

            // Optional: Trigger Grinch-o-meter update
            this.updateGrinchOMeter();
        }
    }


    // Update Grinch-o-meter visualization
    updateGrinchOMeter() {
        const grinchOMeter = document.getElementById('grinch-o-meter');
        if (grinchOMeter) {
            grinchOMeter.innerHTML = `Grinch-o-mètre: ${this.grinchStolenCount} boîtes volées`;
        }
    }
}

// Initialize Advent Calendar
document.addEventListener("DOMContentLoaded", () => {
    const giftManager = new GiftManager();
    const currentDate = new Date(); // Or use a specific date for testing
    const currentPath = window.location.pathname.substring(window.location.pathname.indexOf("/", 1 ));

    // Example gifts - you would populate this dynamically
    const gifts = [
        new Gift(1, 1, new GiftPosition("/", "top-left", 50, 50), "Une animation pétillante"),
        new Gift(2, 2, new GiftPosition("/", "bottom-right", 200, 200), "Une mélodie de Noël"),
        // Add more gifts...
    ];

    gifts.forEach(gift => giftManager.addGift(gift));

    // Render gifts on the page
    const giftContainer = document.getElementById('gift-container');
    console.log("Gift container " + giftContainer);
    if (giftContainer) {
        const pageGifts = giftManager.getGiftsForPage(currentPath, currentDate);
        console.log(pageGifts);
        pageGifts.forEach(gift => {
            const giftElement = gift.render(currentDate);
            giftContainer.appendChild(giftElement);
        });
    }

    // Optional: Add Grinch-o-meter
    const grinchOMeterContainer = document.createElement('div');
    grinchOMeterContainer.id = 'grinch-o-meter';
    document.body.appendChild(grinchOMeterContainer);

    // Simulate occasional Grinch stealing (you could add more logic)
    if (Math.random() < 0.1) {  // 10% chance of Grinch stealing
        giftManager.grinchSteal();
    }
});