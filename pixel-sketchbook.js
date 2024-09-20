document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector("#grid-container");
    let penColor = "rgb(0, 0, 0)";

    function createGrid(width) {
        let penDown = false; // controls whether the pen is down (drawing) or not

        for (let i = 0; i < width * width; i++) {
            const div = document.createElement("div");
            div.classList.add("grid-item");

            div.addEventListener("click", () => {
                penDown = !penDown; // toggle penDown on click
            })

            div.addEventListener("mouseover", () => {
                if (penDown) {
                    let divColor = window.getComputedStyle(div).backgroundColor;
                    
                    if (penColor != divColor) {
                        div.style.opacity = "0";
                    }

                    div.style.backgroundColor = penColor;
                    let opacity = parseFloat(window.getComputedStyle(div).opacity);
                    opacity += 0.2;
                    div.style.opacity = opacity.toString();
                    
                }
            })

            div.style.flex = `0 0 calc(100% / ${width})`;
            div.style.height = `calc(100% / ${width})`;
    
            gridContainer.appendChild(div);
        }
    }

    function regenerateGrid() {
        let width = prompt("Enter the new width in pixels (limit: 100)");

        if (width === null) {
            return;
        }

        if (width > 100 || width < 0) {
            alert("Invalid width; please enter a different value");
        } else {
            const divs = gridContainer.querySelectorAll("div");
            divs.forEach((div) => div.remove());
            createGrid(width);
        }
    }

    function clearGrid() {
        const divs = gridContainer.querySelectorAll("div");
        divs.forEach((div) => {
            div.style.opacity = "0";
        });
    }

    // info button
    const infoButton = document.querySelector("#info-button");
    const infoPopup = document.querySelector("#info-popup");

    infoButton.addEventListener("mouseover", () => {
        infoPopup.classList.add("show");
    })

    infoButton.addEventListener("mouseout", () => {
        infoPopup.classList.remove("show");
    })

    // set size button
    const setSizeButton = document.querySelector("#set-size");

    setSizeButton.addEventListener("click", () => {
        regenerateGrid();
    });

    // clear button
    const clearButton = document.querySelector("#clear");

    clearButton.addEventListener("click", () => {
        clearGrid();
    });

    // eraser button


    // pen color buttons
    const colorButtons = document.querySelectorAll(".colorButton");

    let curColorButton = document.querySelector("#black");
    let prevColorButton = curColorButton;

    colorButtons.forEach((colorButton) => {
        colorButton.addEventListener("click", () => {
            prevColorButton = curColorButton;
            curColorButton = colorButton;

            prevColorButton.classList.remove("selected");
            colorButton.classList.add("selected"); // add the selected class to the selected button
            penColor = window.getComputedStyle(colorButton).backgroundColor;
        })
    })

    createGrid(50);
});