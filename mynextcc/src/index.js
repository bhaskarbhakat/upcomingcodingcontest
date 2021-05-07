console.log("aasdf");

let newsAccordion = document.getElementById("newsAccordion");

let newsHtml = "";
var apis = ["https://kontests.net/api/v1/all"];
for (var i = 0; i < apis.length; i++) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', apis[i], true);
  xhr.onload = function () {
    if (this.status === 200) {

      var result = JSON.parse(this.responseText);
      var sortedData= result.sort((function (a, b) { return new Date(a.start_time) - new Date(b.start_time) }));
      for (let contest in result) {
        if (result[contest].status === "BEFORE") {
          var utcDate = result[contest].start_time; 
          let localDate = new Date(utcDate);
          let show = `
          <div class="card text-dark bg-info mb-3" style="max-width: 18rem;">
          <div class="card-header"><h5>${result[contest].site}</h5></div>
          <div class="card-body">
            <p class="card-text">${result[contest].name}</p>
            <a href="${result[contest].url}" class="bg-light btn">${localDate}</a>
            
          </div>
        </div>
        </div>
        <br>
          `;
          newsHtml += show;
        }
      }
      newsAccordion.innerHTML = newsHtml;
      // result.forEach(function (element) {
      //   if(element["phase"]==="BEFORE")
      //   {
      //     let contest = `<div class="card" style="width: 45rem;">
      //     <ul class="list-group list-group-flush">
      //       <li class="list-group-item">${element["name"]}</li>
      //     </ul>
      //   </div>`;
      //   newsHtml += contest;
      //   }
      // });
      //  newsAccordion.innerHTML = newsHtml;

    }
    else {
      console.log("Some error occured")
    }
  }
  xhr.send();
}


