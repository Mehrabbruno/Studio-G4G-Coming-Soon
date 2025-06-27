document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal');
    if (!modal) return;

    const toggles = document.querySelectorAll('.modal-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
        modal.classList.toggle('active');
        });
    });
});




const SET1_DURATION       = 300 + 900 + 900 + 500 + 500;
const DELAY_BETWEEN_SETS  = 600;
const SET2_DURATION       = 3000;
const STATE_DURATION      = 600;
const SET3_DURATION       = STATE_DURATION * 4;
const SET4_DURATION       = 2500;
const SET5_STEP     = 600;
const SET5_STEPS    = 4;
const SET5_DURATION = SET5_STEP * SET5_STEPS;
const SET6_DURATION       = 3000;

const SET3_STATES = [
  { cls: 'pos1', text: 'COMING'      },
  { cls: 'pos2', text: 'SOON'        },
  { cls: 'pos3', text: 'COMING SOON' },
  { cls: 'pos4', text: 'COMING SOON' }
];

function playSet1() {
    ['.text-set-2','.text-set-3','.text-set-4','.text-set-5', '.text-set-6']
        .forEach(sel => document.querySelector(sel).classList.add('hidden'));
    const s1 = document.querySelector('.text-set-1');
    s1.classList.remove('hidden','up','big','inter','charm','barrio');

    setTimeout(() => {
        s1.classList.add('up');
        setTimeout(() => {
            s1.classList.add('big');
            setTimeout(() => {
                s1.classList.add('inter');
                setTimeout(() => {
                    s1.classList.replace('inter','charm');
                    setTimeout(() => {
                        s1.classList.replace('charm','barrio');
                    }, 500);
                }, 500);
            }, 900);
        }, 900);
    }, 300);
}

function playSet2() {
    ['.text-set-1','.text-set-3','.text-set-4','.text-set-5', '.text-set-6']
        .forEach(sel => document.querySelector(sel).classList.add('hidden'));
    const s2 = document.querySelector('.text-set-2');
    s2.classList.remove('hidden');
}

function playSet3() {
    ['.text-set-1','.text-set-2','.text-set-4','.text-set-5', '.text-set-6']
        .forEach(sel => document.querySelector(sel).classList.add('hidden'));
    const s3 = document.querySelector('.text-set-3');
    s3.classList.remove('hidden','pos1','pos2','pos3','pos4');

    let idx = 0;
    function nextState() {
        const { cls, text } = SET3_STATES[idx];
        s3.classList.remove('pos1','pos2','pos3','pos4');
        s3.classList.add(cls);
        s3.textContent = text;

        idx++;
        if (idx < SET3_STATES.length) {
            setTimeout(nextState, STATE_DURATION);
        }
    }
    nextState();
}

function playSet4() {
    ['.text-set-1','.text-set-2','.text-set-3','.text-set-5', '.text-set-6']
        .forEach(sel => document.querySelector(sel).classList.add('hidden'));
    const s4 = document.querySelector('.text-set-4');
    s4.classList.remove('hidden');
}

function playSet5() {
    ['.text-set-1','.text-set-2','.text-set-3','.text-set-4', '.text-set-6']
        .forEach(sel => document.querySelector(sel).classList.add('hidden'));
    const s5 = document.querySelector('.text-set-5');
    s5.classList.remove('hidden');

    const items = Array.from({length: 4}, (_, i) => [
        s5.querySelector(`.wrapper-1 .text-${i+1}`),
        s5.querySelector(`.wrapper-2 .text-${i+1}`)
    ]);

    items.flat().forEach(el => el.classList.remove('visible'));

    items.forEach((pair, idx) => {
        setTimeout(() => {
        pair.forEach(el => el.classList.add('visible'));
        }, idx * SET5_STEP);
    });
}



function playSet6() {
    ['.text-set-1','.text-set-2','.text-set-3','.text-set-4', '.text-set-5']
        .forEach(sel => document.querySelector(sel).classList.add('hidden'));
    const s6 = document.querySelector('.text-set-6');
    s6.classList.remove('hidden');
}

function cycle() {
    playSet1();

    setTimeout(() => {
        playSet2();

        setTimeout(() => {
            document.querySelector('.text-set-2').classList.add('hidden');
            playSet3();

            setTimeout(() => {
                document.querySelector('.text-set-3').classList.add('hidden');
                playSet4();

                setTimeout(() => {
                    document.querySelector('.text-set-4').classList.add('hidden');
                    playSet5();

                    setTimeout(() => {
                        document.querySelector('.text-set-5').classList.add('hidden');
                        playSet6();

                        setTimeout(() => {
                            document.querySelector('.text-set-6').classList.add('hidden');
                            cycle();
                        }, SET6_DURATION);

                    }, SET5_DURATION);

                }, SET4_DURATION);

            }, SET3_DURATION);

        }, SET2_DURATION);

    }, SET1_DURATION + DELAY_BETWEEN_SETS);
}

window.onload = cycle;