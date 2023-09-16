const number_list_str = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]


class AngleKeyboard {
    angle_input = ""

    constructor(list_of_buttons) {
        AngleKeyboard.angle_input = ""
        let button_dictionnary = {}
        for (let index = 0; index < list_of_buttons.length; index++) {
            let new_angle_key = new AngleKey(list_of_buttons[index])
            button_dictionnary[new_angle_key.content] = new_angle_key
        }

        this.buttons = button_dictionnary
    }

    print_button_state() {
        console.log(this.buttons)
    }
}

class AngleKey {
    constructor(button) {
        this.content = button.textContent
        this.content_int = this.calculate_content_int(button.textContent)
        this.button = button

        this.add_click_event();
    }

    calculate_content_int(str_content) {
        if (number_list_str.includes(str_content)) {
            return parseInt(str_content, 10);
        }
        return -1
    }

    add_click_event() {
        this.button.addEventListener('click', () => {
            if (this.content_int >= 0) {
                AngleKeyboard.angle_input += this.content
                document.getElementById("result_text").textContent = AngleKeyboard.angle_input;
            }
            else if (this.content === "X") {
                AngleKeyboard.angle_input = ""
                document.getElementById("result_text").textContent = "...";
            }
            else if (this.content === "✓") {
                if (AngleKeyboard.angle_input != "") {
                    score_difference = Math.abs(parseInt(AngleKeyboard.angle_input, 10) - angle_generator.angle_answer)

                    let result_overlay = new ResultOverlay()
                    result_overlay.show_result_overlay()

                }
                else {
                    document.getElementById("result_text").textContent = "...";
                }
            }
            else {
                console.error("Unknown key was pressed")
                document.getElementById("result_text").textContent = "...";
            }
        });
    }
}

class ResultOverlay {
    get_clipboard_message() {
        document.getElementById("overlay_result_share_button").addEventListener("click", async function () {
            try {
                const now = new Date();
                const then = new Date("2023-09-16T00:00:00+02:00");
                const diffInMs = now - then;
                const day = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
                let text_to_copy = `#AngleUnique jour n°${day}\n\nEcart: ${score_difference}°\n\nhttps://mathieugomila.github.io/angle_unique/`
                await navigator.clipboard.writeText(text_to_copy);
                document.getElementById("overlay_result_share_button").firstChild.nodeValue = `Score copié dans le presse-papier !`;
            } catch (err) {
                console.error('Erreur, texte non copié', err);
            }

        });
    }

    show_result_overlay() {
        console.log(`Ecart entre l'angle souhaité et répondu : ${score_difference}`)
        document.getElementById("result_text").textContent = AngleKeyboard.angle_input;
        document.getElementById("overlay_result_container").style.display = "flex"
        const now = new Date();
        const then = new Date("2023-09-16T00:00:00+02:00");
        const diffInMs = now - then;
        const day = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
        document.getElementById("overlay_result_text").innerHTML = `Jour n°${day}<br><br>Réponse attendue: ${angle_generator.angle_answer}<br><br>Ecart: ${score_difference}°`
        this.get_clipboard_message()
        localStorage.setItem('last_game', new Date().toDateString());
        localStorage.setItem('last_score', score_difference);
    }
}