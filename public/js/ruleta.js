


const socket = io();
var seg = 0;

var results = [];
socket.on('tiempo', (segs) => {
    seg = segs;
});


socket.on('resultado', (roll, segs) => {
    girar(roll);
    seg = segs;
});

/*

<li class="ball" data-rollid="3743007"><span class="dark">12</span></li>


 */


function girar(roll) {

 
    var elemb = document.getElementById("ruletita");
    var colors = ['G',
        'N',
        'R',
        'N',
        'R',
        'N',
        'R',
        'N',
        'R',
        'N',
        'R',
        'N',
        'R',
        'N',
        'R',
        'N',
        'R',
        'N',
        'R',
        'G',
        'R',
        'N',
        'R',
        'N',
        'R',
        'N',
        'R',
        'N',
        'R',
        'N',
        'R',
        'N',
        'R',
        'N',
        'R',
        'N',
        'R',
        'N'];
    var num = [0,
        28,
        9,
        26,
        30,
        11,
        7,
        20,
        32,
        17,
        5,
        22,
        34,
        15,
        3,
        24,
        36,
        13,
        1,
        0,
        27,
        10,
        25,
        29,
        12,
        8,
        19,
        31,
        18,
        6,
        21,
        33,
        16,
        4,
        23,
        35,
        14,
        2
    ]

    var indexP = 0;
    for (let index = 0; index < num.length; index++) {


        if (num[index] == roll) {
            indexP = index;

        }
    }

    var vueltas = Math.ceil(Math.random() * 1) + 2;

    var id = setInterval(frame, 10);
    var posx = elemb.style.backgroundPositionX.toString();
    posx = parseInt(posx.replace('px', ''), 10);

    var posT = (((elemb.clientWidth / 2) - 37) - (74 * indexP));

    var posV = posT + vueltas * 2812;
    var off = Math.ceil(Math.random() * 35) * (Math.round(Math.random()) ? 1 : -1);
    var posD = posV + off;
    var posR = posD;
    var dife = Math.abs(posx - posR);
    var difeI = Math.abs(posx - posR) - 1;
    var audio = new Audio('..\mp3\ring.mp3');
    audio.muted=true;
    function frame() {


        if (posx > posR) {
            if (posx == posR) {
                console.log(results);
                clearInterval(id);
                elemb.style.backgroundPositionX = posT + off + "px";
                document.getElementById("progreso").innerText = '- ' + roll + ' -';
                audio.play();
                var html = '';
                if (results.length < 5) {

                    if (colors[indexP] == 'N') {
                        results.push(`<li class="ball"><span class="dark">` + roll + `</span></li>`);
                    }
                    if (colors[indexP] == 'R') {
                        results.push(`<li class="ball"><span class="red">` + roll + `</span></li>`);
                    }
                    if (colors[indexP] == 'G') {
                        results.push(`<li class="ball"><span class="green">` + roll + `</span></li>`);
                    }
                    for (let i = 0; i < results.length; i++) {

                        html += results[i];
                    }

                    document.getElementById('resultados').innerHTML = html;


                } else {
                    
                    if (colors[indexP] == 'N') {
                        results.push(`<li class="ball"><span class="dark">` + roll + `</span></li>`);
                    }
                    if (colors[indexP] == 'R') {
                        results.push(`<li class="ball"><span class="red">` + roll + `</span></li>`);
                    }
                    if (colors[indexP] == 'G') {
                        results.push(`<li class="ball"><span class="green">` + roll + `</span></li>`);
                    }

                    for (let i = results.length-5; i < results.length; i++) {

                        html += results[i];
                    }

                    document.getElementById('resultados').innerHTML = html;

                }
            } else {
                document.getElementById("progreso").innerText = '--';

                var vel = (20 * (difeI) / dife) + 0.1;
            
                posx -= vel;

                if (Math.abs(posx - posR) < 0.1) {
                    posx = posR;
                }
                elemb.style.backgroundPositionX = posx + "px";
                difeI = Math.abs(posx - posR);
            }
        } else {

            if (posx == posR) {
                console.log(results);
                clearInterval(id);
                elemb.style.backgroundPositionX = posT + off + "px";
                document.getElementById("progreso").innerText = '- ' + roll + ' -';
                audio.play();
                var html = '';
                if (results.length <5) {

                    if (colors[indexP] == 'N') {
                        results.push(`<li class="ball"><span class="dark">` + roll + `</span></li>`);
                    }
                    if (colors[indexP] == 'R') {
                        results.push(`<li class="ball"><span class="red">` + roll + `</span></li>`);
                    }
                    if (colors[indexP] == 'G') {
                        results.push(`<li class="ball"><span class="green">` + roll + `</span></li>`);
                    }
                    for (let i = 0; i < results.length; i++) {

                        html += results[i];
                    }

                    document.getElementById('resultados').innerHTML = html;


                } else {
                    results.pop;
                    if (colors[indexP] == 'N') {
                        results.push(`<li class="ball"><span class="dark">` + roll + `</span></li>`);
                    }
                    if (colors[indexP] == 'R') {
                        results.push(`<li class="ball"><span class="red">` + roll + `</span></li>`);
                    }
                    if (colors[indexP] == 'G') {
                        results.push(`<li class="ball"><span class="green">` + roll + `</span></li>`);
                    }

                    for (let i = results.length-5; i < results.length; i++) {

                        html += results[i];
                    }
                }

                document.getElementById('resultados').innerHTML = html;
            } else {
                document.getElementById("progreso").innerText = '--';

                var vel = (20 * (difeI) / dife) + 0.1;

       
                posx += vel;
                if (Math.abs(posx - posR) < 0.1) {
                    posx = posR;
                }
                elemb.style.backgroundPositionX = posx + "px";
                difeI = Math.abs(posx - posR);
            }
        }

    }

}

setInterval(function () {
    seg -= 0.1;


    if (seg < -25) {

        seg = 55;
    }
    progreso(seg);
}, 100);

function progreso(seg) {




    var por = (100 * seg) / 30;

    var elem = document.getElementById("progreso");
    var elemf = document.getElementById("progresof");
    var width = por;
    segungos = seg + '';

    if (seg < 0 || seg > 30) {


    } else {
        if (seg < 10) {

            elem.innerText = segungos.substr(0, 3) + '..';
        }
        else {

            elem.innerText = segungos.substr(0, 4) + '..';

        }
    }

    elem.style.width = width + "%";



}