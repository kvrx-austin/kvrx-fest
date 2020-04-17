$(document).ready(() => {
    var stages = [ // Stages being performed at.
        { id: 'a', title: 'Cheer Up Charlies Outside' },
        { id: 'b', title: 'ACC Stage (Cheer Up Inside)' },
        { id: 'c', title: 'Symphony Square' }
    ];

    var $stagesDropdown = $("#stages"); // Dropdown list

    var $calendar = $('#calendar').fullCalendar({
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        defaultView: 'agendaDay',
        allDaySlot: false,
        eventClick: false,

        validRange: { // Days of the events
            start: '2019-05-10',
            end: '2019-05-13'
        },

        minTime: '14:00',
        maxTime: '26:00',

        slotLabelFormat: 'h:mma',
        googleCalendarApiKey: "AIzaSyB5Qych6FydX7Nu3363muSvkrPVD389ol4",

        header: false,

        resources: initializeResources(),

        eventSources: [
            // Stage 1
            {
                resourceId: 'a',
                className: 'cheer-up',
                googleCalendarId: "texasmedia.org_6iniq226h3n710bc764b3gosqk@group.calendar.google.com"
            },
            // Stage 2
            {
                resourceId: 'b',
                className: 'acc-stage',
                googleCalendarId: "texasmedia.org_nbullc0rn4gvgi7bqocpcpaiec@group.calendar.google.com"
            },
            // Stage 3
            {
                resourceId: 'c',
                className: 'symphony',
                googleCalendarId: "texasmedia.org_tk4ho578pon8dlvv57rmvev7i8@group.calendar.google.com"
            }
        ],

        height: 'auto',

        windowResize: function (view) {
            $('#calendar').fullCalendar('changeView', windowResize());
        },

        eventRender: function (eventObj, $el) {
            $el.addClass(slugify(eventObj.title));
        }
    });

    $stagesDropdown.on('change', stagesSelect);

    // Hides other stages
    function stagesSelect() {
        for (var i = 0; i < stages.length; i++)
            if ($stagesDropdown.val() === stages[i].id)
                $calendar.fullCalendar("addResource", stages[i]);
            else
                $calendar.fullCalendar("removeResource", stages[i]);
    };

    // Only display one stage on resize
    function windowResize() {
        if ($(window).width() < 514)
            stagesSelect();
        else {
            $calendar.fullCalendar("removeResource", stages[0]);
            $calendar.fullCalendar("removeResource", stages[1]);
            $calendar.fullCalendar("removeResource", stages[2]);
            $calendar.fullCalendar("addResource", stages[0]);
            $calendar.fullCalendar("addResource", stages[1]);
            $calendar.fullCalendar("addResource", stages[2]);
        }
    };

    // Initialize resources based on window size
    function initializeResources() {
        if ($(window).width() < 514)
            return [stages[0]]
        else
            return stages
    };

    $(".schedule-date-tab").click(e => {
        Array.from(document.getElementsByClassName("schedule-active")).forEach(element => {
            element.classList.remove("schedule-active");
        });
        $calendar.fullCalendar("gotoDate", $(e.currentTarget).val())
        e.currentTarget.classList.add("schedule-active")
    })

    function slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }
});