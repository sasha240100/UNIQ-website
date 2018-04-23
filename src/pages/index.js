import '../scss/pages/index.scss';

const deviceWidth = screen.width;
const homeHeight = document.getElementsByClassName('home-wrap')[0].scrollHeight;
const projects = document.getElementsByClassName('project');
const pointers = document.getElementsByClassName('point');
document.querySelector('.section-detail').style.top = "-27%";
document.querySelector('.section-detail h3').innerHTML = "Home";
document.querySelector('.dott').style.top = "0.8%";

if(deviceWidth <= 768) {
  for(let i = 1; i <= projects.length; i++){
    document.querySelector('.p'+i).style.transform = "translateX(500%)";
  }
}

window.onscroll = function() {
  if(window.pageYOffset >= (homeHeight - 300)){
    for(let i = 1; i <= projects.length; i++){
      document.querySelector('.p'+i).style.transform = "translateX(0%)";
    }
  }

  if(window.pageYOffset < homeHeight-200) {
    document.querySelector('.section-detail').style.top = "-27%";
    document.querySelector('.section-detail h3').innerHTML = "Home";
    document.querySelector('.dott').style.top = "0.8%";
  }
  else {
    document.querySelector('.section-detail').style.top = "-2%";
    document.querySelector('.section-detail h3').innerHTML = "Projects";
    document.querySelector('.dott').style.top = "26%";
  }
}

for(let i = 0; i < pointers.length; i++) {
  pointers[i].addEventListener("click", function() {
    window.scrollTo(0, homeHeight * i);
  })
}

pointers[0].style.top = "0%";
pointers[1].style.top = "25%";
pointers[2].style.top = "50%";
pointers[3].style.top = "75%";
pointers[4].style.top = "100%";

// $(document).ready(function () {
//   //let  mainPageX = $("#dot_1").offset();
//     $(".side-inner-mobile").click(function (event) {
//         if (event.target.tagName != "A") {
//           return;
//         }
//         let dot = $("#active-dot");
//         let mainDot = dot.offset();
//         let mainDotLeftCoods = mainDot.top;
//         let target = $(event.target);
//         let dotTarget = target.offset();
//         let dotTargetLeftCoods = dotTarget.top;
//
//         dot.offset({ top: dotTargetLeftCoods });
//         target.offset({ top: mainDotLeftCoods });
//         // console.log(dotTargetLeftCoods);
//         // console.log(mainDotLeftCoods);
//     })
// });

window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);

let _animationActive = false;

function pointEventListener(point) {
  return point.addEventListener('click', () => {
    const activePoint = $('.side-inner-mobile__dot-mobile--active');

    if (_animationActive || point === activePoint) return;

    _animationActive = true;

    const offset = point.getBoundingClientRect().top - activePoint.getBoundingClientRect().top;

    activePoint.style.transform = `translateY(${offset}px) scale(1.2)`;
    point.style.transform = `translateY(${-offset}px)`;

    activePoint.addEventListener('transitionend', () => {
      activePoint.style.transform = '';
      point.style.transform = '';

      const _point = point.cloneNode();
      const _activePoint = activePoint.cloneNode();

      pointEventListener(_point);
      pointEventListener(_activePoint);

      activePoint.replaceWith(_point);
      point.replaceWith(_activePoint);

      for (let i = 0, points = $$('.side-inner-mobile__dot-mobile'); i < points.length; i++) {
        points[i].dataset.screen = i + 1;
      }

      _animationActive = false;
    });
  });
}

for (const point of $$('.side-inner-mobile__dot-mobile')) {
  pointEventListener(point);
}
