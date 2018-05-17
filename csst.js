/*************/
/*  Module   */
/*************/

// Root namespace definition
window.CSST = window.CSST || {};

// Module Definition
(function (Timer, $, undefined) {

    // Private field
    var name = "Foo";

    // Public property
    Timer.Title = "Bar";

    // Private function
    function test(args) {
        return 0;
    };

    // Init
    Timer.Init = function (args) {
        $(document).ready(function () {
            Timer.ViewModel = new TimerViewModel();
            ko.applyBindings(Timer.ViewModel, $(".wrapper1")[0]);
        });
    };

}(CSST.Timer = CSST.Timer || {}, $));

function TimerViewModel() {
    var self = this;

    // Defaults
    var countDownDefault = 10 * 60;
    var assessmentDefault = 1 * 60;
    var roundDefault = 1;

    self.TeamText = "Discuss...";
    self.AssessmentText = "Team Assessment.";

    self.CountDown = ko.observable(countDownDefault);
    self.Round = ko.observable(roundDefault);
    self.IsRoundOver = ko.observable(false);
    self.IntervalId = "";

    /* Timer */
    self.Start = function () {
        self.IntervalId = setInterval(function () {

            self.CountDown(self.CountDown() - 1);
            if (self.CountDown() == 0) {
                clearInterval(self.IntervalId);
            }
        }, 1000);
    }

    self.Stop = function () {
        clearInterval(self.IntervalId);
    }

    self.ResetTimer = function (sec) {
        self.Stop();

        if (sec) {
            self.CountDown(sec);
        }
        else {
            self.CountDown(countDownDefault);
        }

    }

    /* Round */
    self.Next = function () {
        if (self.IsRoundOver()) {
            self.Round(self.Round() + 1);
            self.ResetTimer();           
        }
        else {
            self.ResetTimer(assessmentDefault);
        }

        self.Start();
        self.IsRoundOver(!self.IsRoundOver());
    }

    self.PrettyCountDown = ko.computed(function () {
        return moment("2015-01-01").startOf('day').seconds(self.CountDown()).format('m:ss');
    });

    self.RoundText = ko.computed(function () {
        return self.IsRoundOver() ? self.AssessmentText : self.TeamText;
    });
}

CSST.Timer.Init();