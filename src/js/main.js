import imgMap from "/img/map-pin.png";

// btn menu
const headerBtn = document.querySelector("#header-btn");
const nav = document.querySelector("#header-nav");

if (headerBtn) {
    headerBtn.addEventListener("click", openMenu());
}

function openMenu() {
    let openMenu = false;

    return function () {
        if (!openMenu) {
            this.classList.add("header__btn-menu_active");
            nav.classList.add("header__nav_active");
            openMenu = true;
        } else {
            this.classList.remove("header__btn-menu_active");
            nav.classList.remove("header__nav_active");
            openMenu = false;
        }
    };
}

// example btn & slider
const btnWas = document.querySelector("#btn-was"),
    btnBecame = document.querySelector("#btn-became"),
    imgCatBig = document.querySelector("#img-cat-big"),
    imgCatSmal = document.querySelector("#img-cat-smal"),
    flag = document.querySelector(".example__flag"),
    rangeBtn = document.querySelector("#range-btn"),
    range = document.querySelector("#range"),
    rangeIndicador = document.querySelector("#range-indicador");

const rightEdge = range.offsetWidth;

if (btnWas) {
    btnWas.addEventListener("click", () => {
        flag.classList.remove("example__flag-active");
        rangeBtn.style.left = `${0}px`;
        rangeIndicador.style.right = `${rightEdge}px`;
        imgCatSmal.style.left = `${100}%`;
        imgCatBig.style.right = `${0}%`;
    });
}

if (btnBecame) {
    btnBecame.addEventListener("click", () => {
        flag.classList.add("example__flag-active");
        rangeBtn.style.left = `${rightEdge}px`;
        rangeIndicador.style.right = `${0}px`;
        imgCatSmal.style.left = `${0}%`;
        imgCatBig.style.right = `${100}%`;
    });
}

rangeBtn.addEventListener("pointerdown", shiftRange);

function shiftRange(even) {
    even.preventDefault();
    const widthWrapBtn = range.getBoundingClientRect().left;

    document.addEventListener("pointermove", onMouseMove);
    document.addEventListener("pointerup", onMouseUp);

    function onMouseMove(event) {
        let coordinateX = event.clientX - widthWrapBtn;

        if (coordinateX < 0) {
            coordinateX = 0;
        }

        if (coordinateX > rightEdge) {
            coordinateX = rightEdge;
        }

        rangeIndicador.style.right = `${rightEdge - coordinateX}px`;
        rangeBtn.style.left = `${coordinateX}px`;

        let shiftImg = Math.round(coordinateX / (rightEdge * 0.01));
        imgCatSmal.style.left = `${100 - shiftImg}%`;
        imgCatBig.style.right = `${shiftImg}%`;
    }

    function onMouseUp() {
        document.removeEventListener("pointerup", onMouseUp);
        document.removeEventListener("pointermove", onMouseMove);
    }
}

// map
ymaps.ready(init);
function init() {
    let myMap = new ymaps.Map("map", {
        center: [59.9389, 30.3225],
        zoom: 15,
        controls: ["zoomControl"],
        // behaviors: [],
    });

    const placemark = new ymaps.Placemark(
        [59.9386, 30.3227],
        {},
        {
            iconLayout: "default#image",
            iconImageHref: imgMap,
            iconImageSize: [57, 53],
        }
    );

    myMap.geoObjects.add(placemark);
}
