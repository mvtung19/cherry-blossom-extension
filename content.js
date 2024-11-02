const style = document.createElement("style");
style.textContent = `
    .flower {
        width: 50px;
        position: fixed;
        top: -50px;
        transition: transform 9s ease, top 9s ease;
        z-index: 99999;
        cursor: pointer;
    }
    .fall {
        transform: rotate(360deg);
        top: 100vh;
    }
    .explode {
        transform: scale(2);
        opacity: 0;
        transition: transform 0.5s ease, opacity 0.5s ease;
    }
    .petal {
        position: fixed;
        width: 10px;
        height: 10px;
        background: pink;
        border-radius: 50%;
        opacity: 0.8;
        transition: top 3s ease, transform 3s ease;
        z-index: 99999;
    }
`;
document.head.appendChild(style);

const flowerImageUrl = chrome.runtime.getURL("images/cherry-blossom.gif");

function createFlower() {
    const flower = document.createElement("img");
    flower.src = flowerImageUrl;
    flower.alt = "Cherry blossom";
    flower.className = "flower";
    flower.style.left = Math.random() * window.innerWidth + "px";

    flower.addEventListener("click", () => {
        flower.classList.add("explode");
        setTimeout(() => {
            flower.remove();
        }, 500);
    });

    document.body.appendChild(flower);

    setTimeout(() => {
        flower.classList.add("fall");
        setTimeout(() => {
            createPetals(flower);
            flower.remove();
        }, 9000);
    }, 100);
}

function createPetals(flower) {
    for (let i = 0; i < 10; i++) {
        const petal = document.createElement("div");
        petal.className = "petal";
        petal.style.left = (flower.offsetLeft + Math.random() * 50) + "px";
        petal.style.top = (window.innerHeight - 40) + "px";
        document.body.appendChild(petal);

        setTimeout(() => {
            petal.style.top = window.innerHeight + "px";
            petal.style.transform = `translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;
            setTimeout(() => {
                petal.remove();
            }, 3000);
        }, 100);
    }
}

function startFlowerAnimation() {
    createFlower();
    const randomDelay = Math.random() * 1500 + 500;
    setTimeout(startFlowerAnimation, randomDelay);
}

startFlowerAnimation();
