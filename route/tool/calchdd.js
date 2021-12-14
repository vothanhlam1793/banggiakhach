$("#frameSlide").on("slideStop", function(slideEvt) {
    $("#frameSlideData").attr('value', slideEvt.value);
    calculateSpace();
  });
  $("#hourSlide").on("slideStop", function(slideEvt) {
    $("#hourSlideData").attr('value', slideEvt.value);
    calculateSpace();
  });
  $("#daySlide").on("slideStop", function(slideEvt) {
    $("#daySlideData").attr('value', slideEvt.value);
    calculateSpace();
  });
  $("#cameraSlide").on("slideStop", function(slideEvt) {
    $("#cameraSlideData").attr('value', slideEvt.value);
    calculateSpace();
  });
  $("#qualitySlide").on("slideStop", function(slideEvt) {
    var myVal = slideEvt.value;
    switch (myVal) {
      case 1:
        myVal = "Low";
        break;
      case 2:
        myVal = "Medium";
        break;
      case 3:
        myVal = "High";
        break;
    }
    $("#qualitySlideData").attr('value', myVal);
    $("input[name=quality][value="+ $("#qualitySlideData").attr('value') +"]").trigger("click");
    calculateSpace();
  });
  $("#resolutionSlide").on("slideStop", function(slideEvt) {
    var myVal = slideEvt.value;
    switch (myVal) {
      case 1:
        myVal = "";
        break;
      case 2:
        myVal = "";
        break;
      case 3:
        myVal = "960";
        break;
      case 4:
        myVal = "720p";
        break;
      case 5:
        myVal = "1080p";
        break;
      case 6:
        myVal = "3MP";
        break;
      case 7:
        myVal = "5MP";
        break;
      case 8:
        myVal = "8MP\/4K";
        break;
    }
    $("#resolutionSlideData").attr('value', myVal);
    $("input[name=resolution]").trigger("click");
    calculateSpace();
  });
  /*$('input[type=radio][name=compType]').change(function() {
    calculateSpace();
  });*/
  $(".calculator-container").find("input").change(function() {
      var type = $(this).attr("type");
      if(isPhone()){
          $("#resolutionSlideData").attr('value', $("input[name=resolution]:checked").val());
          $('#resolutionSlide').slider('setValue', switchValue($("#resolutionSlideData").attr('value')));
          $("#qualitySlideData").attr('value', $("input[name=quality]:checked").val());
          $('#qualitySlide').slider('setValue', switchValue($("#qualitySlideData").attr('value')));
      }
      calculateSpace();
  });
  $(".slider-handle").on("mousedown", function() {
      calculateSpace();
  });
  
  $(".btn-group > select").change(function() {
      var $selectInput = $(this).next();
      $selectInput.val($(this).val());
      calculateSpace();
  });
  
  function switchValue(v){
      var myVal= 1;
      switch (v) {
          case "960":
            myVal = 3;
            break;
          case "720p":
            myVal = 4;
            break;
          case "1080p":
            myVal = 5;
            break;
          case "3MP":
            myVal = 6;
            break;
          case "5MP":
            myVal = 7;
            break;
          case "8MP\/4K":
            myVal = 8;
            break;
          case "Low":
            myVal = 1;
            break;
          case "Medium":
            myVal = 2;
            break;
          case "High":
            myVal = 3;
            break;
    }
    return myVal;
  }
  
  function checkValue(ele){
      var inputVal = ele.val();
      var inputMax =ele.parent().parent().find(".slider + input").attr("data-slider-max");
      if(inputVal < 1){
          ele.val('1');
      }else if(inputVal > inputMax) {
          ele.val(inputMax);
      }
  }
  
  function isPhone(){
      if($(".radio-resolution").css("display")!=="none"){
          return true;
      }else {
          return false;
      }
  }
  
  calculateSpace();
  
  function calculateSpace() {
    var myFrames = $("#frameSlideData").val();
    var myHours = $("#hourSlideData").val();
    var myDays = $("#daySlideData").val();
    var myCameras = $("#cameraSlideData").val();
    var myResolution = !isPhone()?$("#resolutionSlideData").val():$("input[name=resolution]:checked").val();
    var vidQuality = !isPhone()?$("#qualitySlideData").val():$("input[name=quality]:checked").val();
    var myResult = (myHours * myDays * myCameras * 3600) / (8 * 1000 * 1000);
    var compType = $("input[name=compType]:checked").val();
    if (compType == "MJPEG") {
      if (vidQuality == "High") {
        switch (myResolution) {
          case "960":
            myResult = myResult * ((myFrames * .8447) - .015);
            break;
          case "720p":
            myResult = myResult * ((myFrames * 1.4068) + .0047);
            break;
          case "1080p":
            myResult = myResult * ((myFrames * 3.16368) + .0094);
            break;
          case "3MP":
            myResult = myResult * ((myFrames * 4.8) - (Math.pow(4, -14)));
            break;
          case "5MP":
            myResult = myResult * ((myFrames * 7.6897) - .0117);
            break;
          case "8MP\/4K":
            myResult = myResult * ((myFrames * 12.654) + .0378);
            break;
        }
      } else if (vidQuality == "Medium") {
        switch (myResolution) {
          case "960":
            myResult = myResult * ((0.5493 * myFrames) + 0.0319);
            break;
          case "720p":
            myResult = myResult * ((0.9164 * myFrames) + 0.0039);
            break;
          case "1080p":
            myResult = myResult * ((2.0636 * myFrames) + 0.0094);
            break;
          case "3MP":
            myResult = myResult * ((3.131 * myFrames) - 0.0003);
            break;
          case "5MP":
            myResult = myResult * ((5.0146 * myFrames) - 0.0042);
            break;
          case "8MP\/4K":
            myResult = myResult * ((8.2539 * myFrames) + 0.0011);
            break;
        }
      } else if (vidQuality == "Low") {
        switch (myResolution) {
          case "960":
            myResult = myResult * ((0.2754 * myFrames) + 0.0108);
            break;
          case "720p":
            myResult = myResult * ((0.4592 * myFrames) + 0.0161);
            break;
          case "1080p":
            myResult = myResult * ((1.0324 * myFrames) + 0.0025);
            break;
          case "3MP":
            myResult = myResult * ((1.5653 * myFrames) + 0.0083);
            break;
          case "5MP":
            myResult = myResult * ((2.5068 * myFrames) + 0.0047);
            break;
          case "8MP\/4K":
            myResult = myResult * ((4.1278 * myFrames) - 0.0222);
            break;
        }
      }
    } else if (compType == "264") {
      if (vidQuality == "High") {
        switch (myResolution) {
          case "960":
            myResult = myResult * ((0.0485 * myFrames) + 0.0356);
            break;
          case "720p":
            myResult = myResult * ((0.0856 * myFrames) + 0.0203);
            break;
          case "1080p":
            myResult = myResult * ((0.2029 * myFrames) + 0.0805);
            break;
          case "3MP":
            myResult = myResult * ((0.2897 * myFrames) + 0.0071);
            break;
          case "5MP":
            myResult = myResult * ((0.4649 * myFrames) + 0.0345);
            break;
          case "8MP\/4K":
            myResult = myResult * ((0.7691 * myFrames) + 0.0213);
            break;
        }
      } else if (vidQuality == "Medium") {
        switch (myResolution) {
          case "960":
            myResult = myResult * ((0.0268 * myFrames) - 0.0082);
            break;
          case "720p":
            myResult = myResult * ((0.0454 * myFrames) - 0.0416);
            break;
          case "1080p":
            myResult = myResult * (0.1 * myFrames);
            break;
          case "3MP":
            myResult = myResult * ((0.1515 * myFrames) - 0.0356);
            break;
          case "5MP":
            myResult = myResult * ((0.2412 * myFrames) - 0.0285);
            break;
          case "8MP\/4K":
            myResult = myResult * ((0.3938 * myFrames) - 0.0061);
            break;
        }
      } else if (vidQuality == "Low") {
        switch (myResolution) {
          case "960":
            myResult = myResult * ((0.0165 * myFrames) - 0.0011);
            break;
          case "720p":
            myResult = myResult * ((0.0268 * myFrames) - 0.0082);
            break;
          case "1080p":
            myResult = myResult * ((0.0588 * myFrames) + 0.0285);
            break;
          case "3MP":
            myResult = myResult * ((0.0897 * myFrames) + 0.0071);
            break;
          case "5MP":
            myResult = myResult * ((0.1474 * myFrames) - 0.0224);
            break;
          case "8MP\/4K":
            myResult = myResult * ((0.2412 * myFrames) - 0.0285);
            break;
        }
      }
    } else if (compType == "265") {
      if (vidQuality == "High") {
        switch (myResolution) {
          case "960":
            myResult = myResult * ((0.0309 * myFrames) - 0.0213);
            break;
          case "720p":
            myResult = myResult * ((0.0515 * myFrames) - 0.0356);
            break;
          case "1080p":
            myResult = myResult * ((0.1134 * myFrames) - 0.0299);
            break;
          case "3MP":
            myResult = myResult * ((0.1691 * myFrames) + 0.0213);
            break;
          case "5MP":
            myResult = myResult * ((0.2691 * myFrames) + 0.0213);
            break;
          case "8MP\/4K":
            myResult = myResult * ((0.4474 * myFrames) - 0.0224);
            break;
        }
      } else if (vidQuality == "Medium") {
        switch (myResolution) {
          case "960":
            myResult = myResult * ((0.0144 * myFrames) - 0.0203);
            break;
          case "720p":
            myResult = myResult * ((0.0247 * myFrames) - 0.0274);
            break;
          case "1080p":
            myResult = myResult * ((0.0546 * myFrames) + 0.0416);
            break;
          case "3MP":
            myResult = myResult * ((0.0856 * myFrames) + 0.0203);
            break;
          case "5MP":
            myResult = myResult * ((0.1371 * myFrames) - 0.0153);
            break;
          case "8MP\/4K":
            myResult = myResult * ((0.2247 * myFrames) - 0.0274);
            break;
        }
      } else if (vidQuality == "Low") {
        switch (myResolution) {
          case "960":
            myResult = myResult * ((0.0103 * myFrames) - 0.0071);
            break;
          case "720p":
            myResult = myResult * ((0.0165 * myFrames) - 0.0011);
            break;
          case "1080p":
            myResult = myResult * ((0.0412 * myFrames) - 0.0285);
            break;
          case "3MP":
            myResult = myResult * ((0.0588 * myFrames) + 0.0285);
            break;
          case "5MP":
            myResult = myResult * ((0.0938 * myFrames) - 0.0061);
            break;
          case "8MP\/4K":
            myResult = myResult * ((0.1546 * myFrames) + 0.0416);
            break;
        }
      }
    }
    if (myResult > 1) {
      if (myResult < 1000)
        $("#storageCalc>span").text(myResult.toFixed(2) + " TB");
      else
        $("#storageCalc>span").text(myResult.toFixed(0) + " TB");
    } else {
      myResult = myResult * 1000;
      if (myResult < 1) {
        myResult = myResult * 1000;
        $("#storageCalc>span").text(myResult.toFixed(2) + " MB");
      } else $("#storageCalc>span").text(myResult.toFixed(2) + " GB");
    }
  }
  var elePos = $(".required-storage-space").offset().top;
  var swinPos = 0;
  var isFirstEvent = true;
  
  function checkPos(){
      if(isPhone()){
          var winHeight = $(window).height();
          var winPos = $(window).scrollTop();
          var eleHeight = $(".required-storage-space").outerHeight();
          if(elePos + eleHeight - winHeight > winPos){
              $(".required-storage-space").addClass("fixed");
          }
          else {
              $(".required-storage-space").removeClass("fixed");
          }
      }
  }
  checkPos();
  $(window).scroll(function(){
      checkPos();
  });
  
  $(window).resize(function(){
      checkPos();
  });
  
  $(".calculator-container").find("input,select").on("click touch",function() {
      if(isPhone()){
      var that = $(this);
          if(isFirstEvent){
              //$(".calculator-container").find("select").blur();
              var top = $(".calculator-container").offset().top;
              $('html, body').stop().animate({ scrollTop: top},function(){
                  swinPos = $(window).scrollTop();
                  isFirstEvent = false;
  
              });
          }else{
              if($(window).scrollTop() < swinPos){
                  //$(".calculator-container").find("select").blur();
                  var top = $(".calculator-container").offset().top;
                  $('html, body').stop().animate({ scrollTop: top},function(){
  
                  });
              }
          }
      }
  });