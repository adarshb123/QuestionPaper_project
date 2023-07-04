// document.addEventListener('DOMContentLoaded', function () {
//   var searchForm = document.getElementById('searchForm');

//   searchForm.addEventListener('submit', function (event) {
//     event.preventDefault();

//     var studentClass = document.getElementById('class').value;
//     var subject = document.getElementById('subject').value;
//     var year = document.getElementById('year').value;

//     fetch('/search?studentClass=' + studentClass + '&subject=' + subject + '&year=' + year)
//       .then(function (response) {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(function (data) {
//         if (!data.filePath) {
//           console.log('Question paper not found.');
//           return;
//         }

//         var fileURL = decodeURIComponent(data.filePath);
//         console.log('Decoded file URL:', fileURL);

//         var embed = document.createElement('embed');
//         embed.setAttribute('src', fileURL);
//         embed.setAttribute('type', 'application/pdf');
//         embed.setAttribute('width', '100%');
//         embed.setAttribute('height', '500px');

//         var resultsDiv = document.getElementById('results');
//         resultsDiv.innerHTML = '';
//         resultsDiv.appendChild(embed);
//       })
//       .catch(function (error) {
//         console.log('Error:', error);
//       });
//   });
// });





// correct code

document.addEventListener('DOMContentLoaded', function () {
  var searchForm = document.getElementById('searchForm');

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var studentClass = document.getElementById('class').value;
    var subject = document.getElementById('subject').value;
    var year = document.getElementById('year').value;

    fetch('/search?studentClass=' + studentClass + '&subject=' + subject + '&year=' + year)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Expect HTML response
      })
      .then(function (data) {
        var resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = data;
        console.log(resultsDiv);
      })
      .catch(function (error) {
        console.log('Error:', error);
      });
  });
});

