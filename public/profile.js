const wrapper = document.querySelector('.wrapper');
const eyes = document.querySelectorAll('.eye');
const profile_start_btn = document.querySelector('.start-button');
const info_box_profile = document.querySelector(".info_box");

// if startQuiz button clicked
profile_start_btn.onclick = () => {
    info_box_profile.classList.add("activeInfo"); //show info box
    wrapper.classList.remove("activeWrapper");
};

let lFollowX = 5;
let    lFollowY = 1;
    let x = 0;
    let y = 0;
    let friction = 1 / 12;

function animate() {
    x += (lFollowX - x) * friction;
    y += (lFollowY - y) * friction;

    // Apply transformations to eyes
    eyes.forEach(eye => {
        eye.style.transform = `translate(${-x}px, ${-y}px)`;
    });

    // Apply transformations to wrapper
    wrapper.style.transform = `translate(-50%, -50%) perspective(600px) rotateY(${-x}deg) rotateX(${y}deg)`;

    requestAnimationFrame(animate);
}

function handleMouseMove(e) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const lMouseX = Math.max(-100, Math.min(100, windowWidth / 2 - e.clientX));
    const lMouseY = Math.max(-100, Math.min(100, windowHeight / 2 - e.clientY));

    lFollowX = (12 * lMouseX) / 100; // 100 : 12 = lMouseX : lFollowX
    lFollowY = (10 * lMouseY) / 100;
}

// Attach event listener for mousemove and click
window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('click', handleMouseMove);

// Start animation
animate();
