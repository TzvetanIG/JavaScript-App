Frame = (function () {
    function Frame($htmlElement, width, height) {
        this._width = width;
        this._height = height;
        $htmlElement.css({
            width: width + 'px',
            height: height + 'px',
            display: 'inline-block'
        });
        this._$htmlElement = $htmlElement;
    }

    Frame.prototype.getWidth = function () {
        return this._width;
    };

    Frame.prototype.setWidth = function (width) {
        this._width = width;
    };

    Frame.prototype.getHeight = function () {
        return this._height;
    };

    Frame.prototype.setHeight = function (height) {
        this._height = height;
    };

    Frame.prototype.get$ = function () {
        return this._$htmlElement;
    };

    return Frame;
})();

Tape = (function () {
    function Tape(frames) {
        this._frames = frames;
        this._frameNumber = frames.length;
        this._height = frames[0].getHeight();
        this._step = frames[0].getWidth();

        this._tapeDiv = $('<div class="tape">');
        this._tapeDiv.css({
            width: this._frameNumber * this._step + 'px',
            position: 'relative',
            display: 'inline-block'
        });


        var i;
        for (i = 0; i < this._frames.length; i++) {
            this._tapeDiv.prepend(this._frames[i].get$());
        }
    }

    Tape.prototype.transferLastFrame = function () {
        var lastFrame = this._frames.pop();
        this._frames.splice(0, 0, lastFrame);
        this._tapeDiv.append(lastFrame.get$());
    };

    Tape.prototype.transferFirstFrame = function () {
        var firstFrame = this._frames.shift();
        this._frames.push(firstFrame);
        this._tapeDiv.prepend(firstFrame.get$());
    };

    Tape.prototype.getHeight = function () {
        return this._height;
    };

    Tape.prototype.getFrameNumber = function () {
        return this._frameNumber;
    };

    Tape.prototype.getStep = function () {
        return this._step;
    };

    Tape.prototype.get$ = function () {
        return this._tapeDiv;
    };

    return Tape;
})();

Slider = (function () {
    function Slider(id, tape) {
        this._tape = tape;
        this._height = tape.getHeight();
        this._width = tape.getStep();

        this._$slider = $('#' + id);
        this._$slider.css({
            overflow: 'hidden',
            width: this._width,
            height: this._height,
            position: 'relative',
            display: 'inline-block'
        });

        var $tape = tape.get$();
        $tape.css({
            left: -(tape.getFrameNumber() - 2) * this._width,
            zIndex: 1
        });

        this._$leftButton = $('<span id="leftButton" class="button">').text('<');
        this._$rightButton = $('<span id="rightButton" class="button">').text('>');

        this._$slider.append($tape);
        this._$slider.append(this._$leftButton);
        this._$slider.append(this._$rightButton);

        this._$slider.children('.button').css({
            fontSize: (this._height / 3) + 'px',
            top: (3 * this._height / 8) + 'px',
            position: 'absolute',
            zIndex: 10,
            cursor: 'pointer',
            color: '#fff'
        });

        this._$leftButton.css('left', 0);
        this._$rightButton.css('right', 0);
    }

    Slider.prototype.setSlidshowSpeed = function (slidshowSpeed) {
        var tape = this._tape;

        this._$rightButton.on('click', function () {
            changeSlides('right', slidshowSpeed, tape)
        });

        this._$leftButton.on('click', function () {
            changeSlides('left', slidshowSpeed, tape)
        });
    };

    function changeSlides(direction, slidshowSpeed, tape) {
        var $tape = tape.get$(),
            step = tape.getStep(),
            currentLeftPosition = -(tape.getFrameNumber() - 2) * step,
            dir;

        switch (direction) {
            case 'left':
                dir = '-';
                break;
            case 'right':
                dir = '+';
                break;
            default :
                throw new Error('Wrong direction.');
        }

        if ($tape.position().left != currentLeftPosition) {
            return;
        }

        $tape.animate({
            left: dir + '=' + step
        }, slidshowSpeed);

        setTimeout(
            function () {
                if (dir === '+') {
                    tape.transferFirstFrame();
                } else {
                    tape.transferLastFrame();
                }

                $tape.css('left', currentLeftPosition + 'px');
            },
            slidshowSpeed + 100
        );
    }

    Slider.prototype.setChangeTime = function (time) {
        var tape = this._tape
        setInterval(function () {
                changeSlides('right', 500, tape);
            },
            time
        );
    };

    return Slider;
})();


(function ($) {
    var frames = [],
        i,
        $div;

    frames.push(new Frame($('<img src="img/images.jpg">'), 600, 400));
    frames.push(new Frame($('<img src="img/image1.jpg">'), 600, 400));
    frames.push(new Frame($('<img src="img/image2.jpg">'), 600, 400));
    frames.push(new Frame($('<img src="img/image3.jpg">'), 600, 400));
    frames.push(new Frame($('<img src="img/image4.jpg">'), 600, 400));

    var tape = new Tape(frames);

    var $div = $('<div id="slider">');
    $div.css({
        margin: '100px'
    });

    $('body').append($div);

    var slider = new Slider('slider', tape);
    slider.setSlidshowSpeed(500);
    slider.setChangeTime(5000);


})(jQuery)