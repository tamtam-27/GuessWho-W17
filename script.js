function showRules() {
    document.querySelectorAll('.div_regel, .black_overlay').forEach(el => {
        el.hidden = !el.hidden;
    });
}

function darken(element) {
    element.classList.toggle("black_filter");
}

function darkReset() {
    const pics = document.querySelectorAll('[id^="pic_"]');
    pics.forEach(pic => {
        pic.classList.remove("black_filter");
    });

    const highlighted = document.querySelectorAll(".highlight");
    highlighted.forEach(el => {
        el.classList.remove("highlight");
    });
}

const allGroups = ["Alpha", "Echo", "Golf", "Kilo", "November", "Oscar", "Tango", "Victor", "Whiskey"];

const allGroups1 = ["Alpha", "Echo", "Golf", "Kilo", "Oscar", "Tango", "Whiskey"];
const allGroups2 = ["November", "Victor"];

function showList() {
    const container = document.querySelector(".div_list");
    const overlay = document.querySelector(".black_overlay");
    container.classList.toggle("hidden");
    if (overlay) {
        overlay.hidden = !overlay.hidden;
    }

    let wrapper = container.querySelector(".list_wrapper");

    if (!wrapper) {
        wrapper = document.createElement("div");
        wrapper.className = "list_wrapper";

        const createCol = (title, items, listClass) => {
            const colu = document.createElement("div");
            colu.className = "list_column";

            const header = document.createElement("h3");
            header.textContent = title;
            header.className = "list_header";
            colu.appendChild(header);

            const ul = document.createElement("ul");
            ul.className = listClass;
            items.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                li.onclick = function () {
                    this.classList.toggle("highlight");
                }
                ul.appendChild(li);
            });
            colu.appendChild(ul);
            return colu;
        };

        const colStudent = createCol("Schüler", allGroups1, "dynlisti");
        const colTeach = createCol("Lehrperson", allGroups2, "dynlistu");

        wrapper.appendChild(colStudent);
        wrapper.appendChild(colTeach);

        const anchor = container.querySelector(".button_zurück");
        container.insertBefore(wrapper, anchor);
    } else {
        wrapper.hidden = !wrapper.hidden;
    }
}

function randomChar() {
    const randChar = allGroups[Math.floor(Math.random() * allGroups.length)];

    const box = document.getElementById("popup_char");
    const text = document.getElementById("popup_text");

    text.textContent = randChar;
    box.classList.remove("hidden");
}

function closePopup() {
    document.getElementById("popup_char").classList.add("hidden");
}

const groups = {
    five: { items: ["Oscar"], max: 5 },
    four: { items: ["Alpha", "Golf", "Whiskey"], max: 4 },
    three: { items: ["Kilo"], max: 3 },
    two: { items: ["Echo", "Tango"], max: 2 },
    one: { items: ["November", "Victor"], max: 1 }
}

function loadMedia() {
    const cloudName = "dnuk6xewd";
    const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/`;
    const screen = document.getElementById("screen");

    Object.values(groups).forEach(group => {
        group.items.forEach(name => {
            const pic = document.createElement("img");

            pic.id = `pic_${name}`;
            pic.alt = name;

            const randVer = Math.floor(Math.random() * group.max) + 1;
            pic.src = `${baseUrl}${name}${randVer}.png`;

            pic.addEventListener("click", () => darken(pic));

            screen.appendChild(pic);
        });
    });
}

window.onload = loadMedia;