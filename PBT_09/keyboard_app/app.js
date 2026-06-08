const images = Array.from(
    { length: 9 },
    (_, i) =>
        `https://placehold.co/600x300?text=Image+${i+1}`
);

let current = 0;
let playing = false;
let interval;

const commands = [
    {
        name: "First Image",
        action: () => {
            current = 0;
            renderImage();
        }
    },

    {
        name: "Last Image",
        action: () => {
            current = 8;
            renderImage();
        }
    },

    {
        name: "Random Image",
        action: () => {
            current =
                Math.floor(
                    Math.random() * 9
                );

            renderImage();
        }
    }
];

document.querySelector("#app").innerHTML = `
<h1>Keyboard Accessibility App</h1>

<button
 id="prevBtn"
 aria-label="Previous image">
 Previous
</button>

<img
 id="gallery"
 alt="Gallery image">

<button
 id="nextBtn"
 aria-label="Next image">
 Next
</button>

<p>
← → chuyển ảnh |
1-9 chọn ảnh |
Space play/pause |
Ctrl+K command palette
</p>

<div
 id="modal"
 class="modal hidden">

 <div class="modal-content">

  <img id="modalImg">

 </div>

</div>

<div
 id="palette"
 class="palette hidden">

 <div class="palette-content">

  <input
   id="commandInput"
   aria-label="Command Search"
   placeholder="Search command">

  <div
   id="commandList"
   class="palette-list">
  </div>

 </div>

</div>
`;

const gallery =
    document.querySelector("#gallery");

function renderImage() {
    gallery.src = images[current];
}

renderImage();

function nextImage() {
    current =
        (current + 1)
        % images.length;

    renderImage();
}

function prevImage() {
    current =
        (current - 1 + images.length)
        % images.length;

    renderImage();
}

document
    .querySelector("#nextBtn")
    .addEventListener(
        "click",
        nextImage
    );

document
    .querySelector("#prevBtn")
    .addEventListener(
        "click",
        prevImage
    );

gallery.addEventListener(
    "click",
    () => {

        document
            .querySelector("#modal")
            .classList
            .remove("hidden");

        document
            .querySelector("#modalImg")
            .src =
            images[current];
    }
);

function toggleSlideShow() {

    playing = !playing;

    if (playing) {

        interval =
            setInterval(
                nextImage,
                2000
            );

    } else {

        clearInterval(
            interval
        );
    }
}

function openPalette() {

    document
        .querySelector("#palette")
        .classList
        .remove("hidden");

    renderCommands(commands);

    document
        .querySelector("#commandInput")
        .focus();
}

function closePalette() {

    document
        .querySelector("#palette")
        .classList
        .add("hidden");
}

function renderCommands(list) {

    const box =
        document.querySelector(
            "#commandList"
        );

    box.innerHTML = "";

    list.forEach(cmd => {

        const div =
            document.createElement(
                "div"
            );

        div.className =
            "palette-item";

        div.textContent =
            cmd.name;

        div.onclick = () => {
            cmd.action();
            closePalette();
        };

        box.appendChild(div);
    });
}

document.addEventListener(
    "keydown",
    e => {

        if (
            e.ctrlKey &&
            e.key.toLowerCase() === "k"
        ) {
            e.preventDefault();
            openPalette();
        }

        if (e.key === "ArrowRight")
            nextImage();

        if (e.key === "ArrowLeft")
            prevImage();

        if (e.key === " ")
        {
            e.preventDefault();
            toggleSlideShow();
        }

        if (e.key === "Escape")
        {
            document
                .querySelector("#modal")
                .classList
                .add("hidden");

            closePalette();
        }

        if (
            /^[1-9]$/.test(e.key)
        ) {
            current =
                Number(e.key) - 1;

            renderImage();
        }
    }
);

document
    .querySelector("#commandInput")
    .addEventListener(
        "input",
        e => {

            const keyword =
                e.target.value
                .toLowerCase();

            renderCommands(
                commands.filter(
                    c =>
                        c.name
                        .toLowerCase()
                        .includes(
                            keyword
                        )
                )
            );
        }
    );

document
    .querySelector("#commandInput")
    .addEventListener(
        "keydown",
        e => {

            if (
                e.key === "Enter"
            ) {

                const first =
                    commands.find(
                        c =>
                        c.name
                        .toLowerCase()
                        .includes(
                            e.target.value
                            .toLowerCase()
                        )
                    );

                if (first)
                {
                    first.action();
                    closePalette();
                }
            }
        }
    );