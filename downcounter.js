
/**
 * @name Downcounter
 * @param id {String}
 * @param endDate {String}
 * @constructor
 */
function Downcounter(id,endDate){

  var elements  = {};
  elements.wrapper = document.getElementById(id);
  if(!elements.wrapper){
    console.log('Invalid ID form downcounter');
    return;
  }

  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".downcounter{color: #ccc;text-align: center;font-size: 40px;font-family: arial;display: inline-block;overflow: hidden;line-height: initial;margin: 0 15px;}" +
      ".downcounter span.days," +
      ".downcounter span.hours," +
      ".downcounter span.minutes," +
      ".downcounter span.seconds{  overflow: hidden;  display: inline-block;  }" +
      ".downcounter span .time{background-color: #333;border-radius: 6px;padding: 10px 5px;color: #ccc;text-align: center;font-size: 40px;text-shadow: 0 1px 2px #000;display: block;}" +
      ".downcounter span .label{display: block;/* line-height: 13px; */font-size: 13px;color: #000;}" +
      ".downcounter span.separator{color: #333;display: inline-block;line-height: 79px;overflow: inherit;}";
  document.body.appendChild(css);
  /**
   *
   * @param parent
   * @param id
   * @param className
   * @returns {Element|*} // time element
   */
  function appendTimeElement(parent,className,labelText){
    var wrapper = document.createElement('span');
    wrapper.classList.add('unit');
    wrapper.classList.add(className);
    var time = document.createElement('span');
    time.classList.add('time');
    var label = document.createElement('span');
    label.classList.add('label');
    label.innerHTML = labelText;

    wrapper.appendChild(label);
    wrapper.appendChild(time);
    parent.appendChild(wrapper);
    return time;
  }

  function appendSeparatorElement(parent,className){
    var wrapper = document.createElement('span');
    wrapper.innerHTML = ':';
    wrapper.classList.add(className);
    parent.appendChild(wrapper);
    return wrapper;
  }

  elements.days = appendTimeElement(elements.wrapper,'days','ימים');
  appendSeparatorElement(elements.wrapper,'separator');
  elements.hours = appendTimeElement(elements.wrapper,'hours','שעות');
  appendSeparatorElement(elements.wrapper,'separator');
  elements.minutes = appendTimeElement(elements.wrapper,'minutes','דקות');
  appendSeparatorElement(elements.wrapper,'separator');
  elements.seconds = appendTimeElement(elements.wrapper,'seconds','שניות');

  function getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
      'total': t,
      'days': days<10?'0'+days:days,
      'hours': hours<10?'0'+hours:hours,
      'minutes': minutes<10?'0'+minutes:minutes,
      'seconds': seconds<10?'0'+seconds:seconds
    };
  }

  function updateTime(){
    var t = getTimeRemaining(endDate);
    if(lastTime==null){
      lastTime = t;
      elements.days.innerHTML = t.days;
      elements.hours.innerHTML = t.hours;
      elements.minutes.innerHTML = t.minutes;
      elements.seconds.innerHTML = t.seconds;
    }

    if(t.days!=lastTime.days){
      lastTime.days=t.days;
      elements.days.innerHTML = t.days;
    }
    if(t.hours!=lastTime.hours){
      lastTime.hours=t.hours;
      elements.hours.innerHTML = t.hours;
    }
    if(t.minutes!=lastTime.minutes){
      lastTime.minutes=t.minutes;
      elements.minutes.innerHTML = t.minutes;
    }
    if(t.seconds!=lastTime.seconds){
      lastTime.seconds = t.seconds;
      elements.seconds.innerHTML = t.seconds;
    }

    if(t.total<=0){
      clearInterval(timeinterval);
    }
  }

  var lastTime = null;
  updateTime();
  var timeinterval = setInterval(updateTime,1000);
}
