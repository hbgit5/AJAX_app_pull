var app_data;
var list_container;
//carousel-animation
var boxes;
var arrow_next;
var box_next = 0;
var arrow_prev;
var box_index = 0;


$(document).ready(function () {
        list_container = $('#apps');
        $.ajax({
            url: 'https://itunes.apple.com/us/rss/topgrossingapplications/limit=50/genre=6023/json',
            success: function (data) {
                app_data = data;
                createList();
                init();
            },
            dataType: 'json'
        });
});


                  
function createList() {
    for (var i = 0; i < app_data.feed.entry.length; i++) {
        var item = app_data.feed.entry[i];
        console.log(item);
        var img = $('<img>').attr('src', item['im:image'][2].label);
        var name = $('<h3>').html(item['im:name'].label);
        //var summary = $('<p>').html(item['im:releaseDate'].attributes.label);
        //var summary = $('<p>').text(item['summary'].label);
         //var title = $('<h4>').html(Release-Date:);
        var li = $('<div>').addClass('box').append(img).append(name);
        list_container.append(li);
    }
}

function init() {
    carousel_container = $('#apps');
    boxes = $('.box');
    arrow_next = $('#right');
    arrow_prev = $('#left');
    arrow_next.click(slideNext);
    arrow_prev.click(slidePrev);
}

function slideNext() {
    console.log('slideNext');
    //Animate the current box
    $(boxes[box_index]).animate({
            left: '-400px'
        },
        500,
        function () {
            $(this).css('left', '400px');
        });

    box_index++;
    if (box_index === boxes.length) {
        box_index = 0;
    }
    $(boxes[box_index]).animate({
            left: '0px'
        },
        500,
        function () {
            //alert('Animation done');
        }
    );
}

/* Attempt to decrement box_index. If it's less than 0 (outside the boundaries of the array),
reset it so that it's the last item in the array.
Returns the new index*/
function previousBoxIndex() {
    if (box_index - 1 < 0) {
        return boxes.length - 1;
    }

    return box_index - 1;
}

function slidePrev() {

    $(boxes[previousBoxIndex()]).css("left", "-400px");

    $(boxes[box_index]).animate({
            left: '400px'
        },
        500);
    
    box_index = previousBoxIndex();
    
    $(boxes[box_index]).animate({
            left: '0'
        },
        500);

}
