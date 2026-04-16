$(document).ready(function(){
  var numberOfItemsDisplayedAtFirstTime = 8;
  var numberOfItemsShowWithSeeMoreButton = 6;
  var buttonSeeMore = $('.js-button-see-more-news');

  $("#news-page").find('.c-news-item').addClass('d-none');
  var items = $('#news-page').find('.c-news-item');
  var numberOfItems = items.length;

  for (var i = 0; i < numberOfItemsDisplayedAtFirstTime; i++) {
    items.eq(i).removeClass('d-none');
  }
  if (numberOfItemsDisplayedAtFirstTime >= numberOfItems ){
    buttonSeeMore.addClass('d-none');
  }

  buttonSeeMore.click(function() {
    var hideItemsList = $("#news-page").find('.c-news-item.d-none');
    for (var j = 0; j < numberOfItemsShowWithSeeMoreButton; j++) {
      hideItemsList.eq(j).removeClass('d-none');
    }
    var numberOfHideItems = hideItemsList.length;
    if (numberOfHideItems - numberOfItemsShowWithSeeMoreButton <= 0){
      buttonSeeMore.addClass('d-none');
    }
  });
});


