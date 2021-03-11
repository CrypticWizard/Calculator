const lower_display = document.querySelector('.lower-display');
const numpad = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operate');
const equal = document.querySelector('.equals');
const clrbtn = document.querySelector('.clear');
const delbtn = document.querySelector('.delete');

let operand = [];
let operator = '';
let num1 = null; let num2 = null;

function eval(operation, a, b) {

    switch (operation) {
        case '+':
            return a + b;
            break;
        case '-':
            return a - b;
            break;
        case '*':
            return a * b;
            break;
        case '/':
            return isFinite(a / b) ? a / b : "Invalid";
            break;
        case '%':
            return isFinite(a % b) ? a % b : "Invalid";
            break;
        default:
            return "Invalid";
    }
}

function clear() {
    lower_display.textContent = '';
    num1 = null;
    num2 = null;
    operand = [];
    operator = '';
    active_operator = '';
}

function calc() {
    numpad.forEach((num) => {
        num.addEventListener('click', () => {
            if (operand.length < 10) {
                if (num.getAttribute('id') == '.' && operand.includes('.')) { }
                else {
                    operand.push(num.getAttribute("id"));
                    lower_display.textContent = operand.join('');
                }
            }
        })
    })

    operators.forEach((operation) => {
        operation.addEventListener('click', () => {

            operator = operation.getAttribute('id');

            if (num1 == null) {
                num1 = Number(operand.join(''));
                active_operator = operator;
                lower_display.textContent = operator;
                operand = [];
                console.log(num1);
            }

            else if (num2 == null && operand.length != 0) {
                num2 = Number(operand.join(''));
                value = eval(active_operator, num1, num2);

                if (value == "Invalid") {
                    clear();
                    lower_display.textContent = "Invalid";
                }
                else {
                    if (String(value).length > 10)
                        lower_display.setAttribute("style", "font-size: 2.5rem;");
                    lower_display.textContent = value;
                    lower_display.removeAttribute("style");
                    num1 = value;
                    num2 = null;
                    operand = [];
                    active_operator = operator;
                }
                console.log(value, num2, num1);
            }
            else {
                lower_display.textContent = operator;
                active_operator = operator;
                operand = [];
            }
        })
    })

    equal.addEventListener('click', () => {
        if (operand.length != 0) {
            num2 = Number(operand.join(''));
            value = eval(active_operator, num1, num2);

            if (value == "Invalid") {
                clear();
                lower_display.textContent = "Invalid";
            }
            else {
                if (String(value).length > 10)
                    lower_display.setAttribute("style", "font-size: 2.5rem;");
                lower_display.textContent = value;
                lower_display.removeAttribute("style");
                num1 = value;
                num2 = null;
                operand = [];
                active_operator = operator;
            }
        }
    })

    clrbtn.addEventListener('click', clear);

    delbtn.addEventListener('click', () => {
        if (operand.length != 0) {
            operand.pop();
            lower_display.textContent = operand.join('');
        }
        else if (lower_display.textContent == value) { clear(); }
        else {
            operator = '';
            lower_display.textContent = '';
            operand = [];
        }

    })

    window.addEventListener('keydown', (e) => {
        const btn_press = document.querySelector(`.button-area div[data-key = "${e.keyCode}"]`);
        btn_press.click();
    })
}

calc();