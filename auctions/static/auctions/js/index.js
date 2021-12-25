$(document).on('submit', '#addNewBid', function (e) {
   e.preventDefault()
   auction = $(this).data('auction')
   lastBid = $(this).data('lastbid')
   startingBid = $(this).data('startingbid')
   newBid = $('#newBid').val()
   message = $('#message')

   if (lastBid == 'None') {
      lastBid = 0
   } else {
      lastBid = parseInt(lastBid)
   }

   newBid = parseInt(newBid)
   startingBid = parseInt(startingBid)

   if (newBid > 0 && newBid > lastBid && newBid > startingBid) {
      $.ajax({
         type: 'POST',
         url: $(this).attr('action'),
         data: $(this).serialize(),
         success: function () {
            $(`.lastBid${auction}`).val(newBid)
            $(`.lastBid${auction}`).html(`Current Bid: ${newBid}`)
            totalValue = $('#smallTotalBid').html()
            $('#smallTotalBid').html(parseInt(totalValue) + 1)
            $('#yourLastBid').html('Your bid is in top')
            $('#newBid').val('')
            message.remove()
         },
      })
   } else if (newBid === lastBid || newBid === startingBid) {
      message.html('Your bid is not valid is equal than the current bid')
   } else {
      message.html('Your bid is not valid is lower than the current bid')
   }
})

$(document).on('submit', '#addWList', function (e) {
   e.preventDefault()

   if ($('#button-auction').hasClass('added')) {
      $.ajax({
         type: 'POST',
         url: $(this).attr('action'),
         data: $(this).serialize(),
         success: function () {
            watchlist = $('#watchListTotal')
            actualValue = watchlist.html()
            watchlist.text(parseInt(actualValue) - 1)
            $('#heart').css('color', 'white')
            $('#button-auction').removeClass('added')
            $('#button-auction').removeClass('text-red-700')
            $('#button-auction').removeClass('shadow')
         },
      })
   } else {
      $.ajax({
         type: 'POST',
         url: $(this).attr('action'),
         data: $(this).serialize(),
         success: function () {
            watchlist = $('#watchListTotal')
            actualValue = watchlist.html()
            watchlist.text(parseInt(actualValue) + 1)
            $('#heart').css('color', 'red')
            $('#button-auction').addClass('text-red-700')
            $('#button-auction').addClass('shadow')
            $('#button-auction').addClass('added')
         },
      })
   }
})

$(document).on('submit', '#deleteComment', function (e) {
   e.preventDefault()
   commentId = $(this).data('comment')
   comment = $(`#comment${commentId}`)

   $.ajax({
      type: 'POST',
      url: $(this).attr('action'),
      data: $(this).serialize(),
      success: function () {
         console.log('deleted')
         comment.remove()
      },
   })
})

function toggleVisibilityPassword(id, button) {
   var password = document.getElementById(id)
   var button = document.getElementById(button)

   if (password.type === 'password') {
      password.type = 'text'
      button.setAttribute('class', 'text-black')
   } else {
      password.type = 'password'
      button.setAttribute('class', 'text-gray-200')
   }
}
