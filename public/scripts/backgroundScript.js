document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrollProgress = (scrollTop / scrollHeight) * 100;

        var hue = (scrollProgress / 100) * 360;
        var saturation = 100;
        var lightness = 50;

        var color = 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';

        document.body.style.backgroundColor = color;
    });
});
