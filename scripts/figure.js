class AngleGenerator {
    constructor() {
        const today = new Date()
        const day = today.getDate()
        const month = today.getMonth() + 1
        const year = today.getFullYear()

        this.angles = this.generateRandomValues(day, month, year)
        this.angle_answer = this.angles["end"] - this.angles["start"]
    
        if (this.angle_answer <= 0){
             this.angle_answer += 360
        }
}



    generateRandomValues(day, month, year) {
        let seed = day + month * 31 + year * 366;

        let start_angle = Math.round(360 * this.seedRandom(seed))
        let end_angle = Math.round(360 * this.seedRandom(seed + 1))


        return { "start": start_angle, "end": end_angle };
    }

    seedRandom(seed) {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }
}

class FigureGenerator {
    line_length = 50
    bow_length = 5
    line_width = 0.5
    generateFigure(angle_1, angle_2) {
        const line1 = document.getElementById('line1')
        const line2 = document.getElementById('line2')
        const bow = document.getElementById('bow')

        let radian_1 = -angle_1 * (Math.PI / 180)
        let radian_2 = -angle_2 * (Math.PI / 180)

        let bizarre = "0"

        if ((angle_1 > angle_2 && Math.abs((360 + angle_2) - angle_1) >= 180) || (angle_1 <= angle_2 && Math.abs(angle_2 - angle_1) >= 180)) {
            bizarre = "1"
        }

        let end_coord_1 = this.calculate_end_coord(radian_1)
        line1.setAttribute('x2', this.line_length * end_coord_1["x2"])
        line1.setAttribute('y2', this.line_length * end_coord_1["y2"]);
        line1.setAttribute('stroke-width', this.line_width);
        line1.style.zIndex = "-1"

        let end_coord_2 = this.calculate_end_coord(radian_2)
        line2.setAttribute('x2', this.line_length * end_coord_2["x2"])
        line2.setAttribute('y2', this.line_length * end_coord_2["y2"]);
        line2.setAttribute('stroke-width', this.line_width);
        line2.style.zIndex = "-1"

        bow.setAttribute('d', `M ${this.bow_length * end_coord_1["x2"]} ${this.bow_length * end_coord_1["y2"]} A ${this.bow_length} ${this.bow_length} 0 ${bizarre} 0 ${this.bow_length * end_coord_2["x2"]} ${this.bow_length * end_coord_2["y2"]}`)
        bow.setAttribute('stroke-width', this.line_width);
        bow.style.zIndex = "-1"
    }


    calculate_end_coord(radian) {
        return { "x2": Math.cos(radian), "y2": Math.sin(radian) }
    }

}
