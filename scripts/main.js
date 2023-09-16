let score_difference = 0
let angle_generator = new AngleGenerator()
let figure_generator = new FigureGenerator()
figure_generator.generateFigure(angle_generator.angles["start"], angle_generator.angles["end"])
all_buttons = document.querySelectorAll('.keyboard_button')
let angle_keyboard = new AngleKeyboard(all_buttons)

let date = localStorage.getItem('dateDerniereAction');
if (date === new Date().toDateString()) {
    score_difference = localStorage.getItem('last_score')
    if (!isNaN(score_difference)) {
        let result_overlay = new ResultOverlay()
        result_overlay.show_result_overlay()
    }
}



