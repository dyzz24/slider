'use strict'
class Slider {
    constructor(parent, control_one, control_two, max_slides, points){

        // parent - оболочка слайдера
        // control_one - стрелка, следующий слайд
        // control_two - стрелка, предыдущий слайд
        // max_slides - максимальное число слайдов в контейнере (длина массива слайдов)
        // points - точки управления 
        this.slide_parent = document.querySelector(parent); // блок слайдера
        this.slide_control_one = document.querySelector(control_one); // контрол 1
        this.slide_control_two = document.querySelector(control_two); // контрол 2
        this.points = document.querySelectorAll(points); // точки управления
        this.counter = 0; // начальный счетчик слайдов
        this.max_slides = document.querySelectorAll(max_slides).length; // максимальный счетчик слайдов
        this.self = this; // указание на использование внутри методов
        this.touch_target; // для тача
        this.slide_control_one.addEventListener('click', () => {
            this.slider_implement(-1);
            this.slider_points_actives();
            this.slider_move();
        })
        this.slide_control_two.addEventListener('click', () => {
            this.slider_implement(1);
            this.slider_points_actives();
            this.slider_move();

        });

        for(let key of this.points) { // обработчики на управление по точкам слайдера
            key.addEventListener('click', (e) =>{
                this.slider_points_control(e)
            });
        }

        this.slide_parent.addEventListener('touchstart', (e) => {
            this.touchStart(e);
        });
        
        this.slide_parent.addEventListener('touchmove', (e) => {
            this.touchMove(e);
        });
    }

    touchStart(e) {
        this.touch_target = e.touches[0].clientX; // отлавили первичный тач
    }

    touchMove(e) {
        if(!this.touch_target) { // если не на блоке тач - выхожу
            return;
        }

        const x_touches = e.touches[0].clientX; // величина тача в движении
        const x_touch_different = this.touch_target - x_touches; // определили направление
        if(x_touch_different > 0) { // движение слайда
            this.self.slider_implement(1);
            this.self.slider_points_actives();
            this.self.slider_move();
        } 
        if(x_touch_different < 0) {
            this.self.slider_implement(-1);
            this.self.slider_points_actives();
            this.self.slider_move();
        }

        this.touch_target = null; // скидываю первоначальное значение
    }

    slider_implement(n) { // ф-я управления счетчиком слайдов
    this.counter = this.counter + n;
    if(this.counter >= this.max_slides){ // если дошли до максимального слайда
        this.counter = 0; // перепрыгнули на первый
    }
    if(this.counter < 0){ // аналогично при клике на первый слайд
        this.counter = this.max_slides - 1;        
    }
    }

    slider_points_actives(){ // ф-я управления активной точкой позицией
    for (let key of this.points) {
        key.classList.remove('active'); // скидываю все точки
    }
    this.points[this.counter].classList.add('active');
    }

    slider_move(){
        this.slide_parent.style.marginLeft =   - this.counter * 100 + '%'; // двигаю слайдера
    }

    slider_points_control(e){ // ловлю аттрибут точки слайдера
        this.counter = + e.target.dataset.count;
        this.slider_move();
        this.slider_points_actives(); // отменяю точки и делаю активной одну


    } 
}

const new_slider = new Slider('.slider_wrapper', '.slider__control_left', '.slider__control_right', '.slid', '.slider_btn');