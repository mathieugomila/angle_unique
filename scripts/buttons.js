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
            console.log("click on", this.content)
            if (this.content_int >= 0) {
                AngleKeyboard.angle_input += this.content
                document.getElementById("result_text").textContent = AngleKeyboard.angle_input;
            }
            else if (this.content === "X") {
                AngleKeyboard.angle_input = ""
                document.getElementById("result_text").textContent = AngleKeyboard.angle_input;
            }
            else if (this.content === "✓") {
                let difference = parseInt(AngleKeyboard.angle_input, 10) - angle_generator.angle_answer
                console.log(`Ecart entre l'angle souhaité et répondu : ${difference}`)
                document.getElementById("result_text").textContent = AngleKeyboard.angle_input;
            }
            else {
                console.error("Unknown key was pressed")
                document.getElementById("result_text").textContent = "";
            }
        });
    }
}